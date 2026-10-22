// planary-stats: Planary's own page-view counter on stats.planary.ch.
//   POST /e          a page view from planary.ch or a subdomain (the beacon in the web apps)
//   GET  /api/sites  the sites with views in the range, for the console (admins only)
//   GET  /api/stats  the numbers for one site (admins only)
//   GET  /api/internal/visitors  unique visitors per day and site, for planary-org (x-internal-key)
// No cookies, no IP addresses stored. Visitors are counted per day with a salt that is deleted
// the next day, so a visitor can't be recognised across days.
import { Hono, type Context } from 'hono';
import { cors } from 'hono/cors';
import { emailFromRequest, isAdmin } from './auth';
import { allowedSite, cleanPath, device, isBot, refHost, saltFor, today, visitorHash } from './collect';
import type { Env } from './env';

type C = Context<{ Bindings: Env }>;

/** Rows older than this are deleted by the daily cron. */
const KEEP_DAYS = 395;

const app = new Hono<{ Bindings: Env }>();

const originHost = (c: C) => {
  try {
    return new URL(c.req.header('origin') ?? '').hostname;
  } catch {
    return '';
  }
};

// ── Collecting ──

// The beacon is sent as text/plain so the browser needs no preflight; JSON bodies work too.
app.options('/e', (c) => {
  const host = originHost(c);
  if (!allowedSite(host)) return c.body(null, 403);
  return c.body(null, 204, {
    'Access-Control-Allow-Origin': `https://${host}`,
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  });
});

app.post('/e', async (c) => {
  const host = originHost(c);
  if (!allowedSite(host)) return c.body(null, 403);
  const headers = { 'Access-Control-Allow-Origin': `https://${host}`, 'Cache-Control': 'no-store' };

  let body: { u?: unknown; r?: unknown };
  try {
    body = JSON.parse(await c.req.text());
  } catch {
    return c.body(null, 400, headers);
  }
  let url: URL;
  try {
    url = new URL(String(body.u ?? ''));
  } catch {
    return c.body(null, 400, headers);
  }
  // The page must belong to the site that sent it.
  const site = url.hostname.toLowerCase();
  if (site !== host) return c.body(null, 400, headers);

  const ua = c.req.header('user-agent') ?? '';
  if (isBot(ua)) return c.body(null, 204, headers);

  const day = today();
  const ip = c.req.header('cf-connecting-ip') ?? '';
  const salt = await saltFor(c.env.DB, day);
  const country = String((c.req.raw as { cf?: { country?: unknown } }).cf?.country ?? '').slice(0, 2);
  await c.env.DB.prepare(
    'INSERT INTO views (day, site, path, ref, country, device, visitor) VALUES (?, ?, ?, ?, ?, ?, ?)',
  )
    .bind(day, site, cleanPath(url.pathname), refHost(String(body.r ?? ''), site), country, device(ua), await visitorHash(salt, ip, ua, site))
    .run();
  return c.body(null, 204, headers);
});

// ── Reading (the Planary Console) ──

app.use(
  '/api/*',
  cors({
    origin: (o) => {
      try {
        return allowedSite(new URL(o).hostname) ? o : null;
      } catch {
        return null;
      }
    },
    allowHeaders: ['Authorization'],
    allowMethods: ['GET'],
    maxAge: 86400,
  }),
);
app.use('/api/*', async (c, next) => {
  await next();
  c.res.headers.set('Cache-Control', 'no-store');
});
app.use('/api/*', async (c, next) => {
  if (c.req.method === 'OPTIONS') return next();
  // Worker to worker, with its own key check below.
  if (c.req.path.startsWith('/api/internal/')) return next();
  const email = await emailFromRequest(c.env, c.req.raw);
  if (!email) return c.json({ error: 'Sign in to continue.', code: 'unauthorized' }, 401);
  if (!isAdmin(c.env, email)) return c.json({ error: 'Only Planary admins can see this.', code: 'forbidden' }, 403);
  return next();
});

/** The date range from ?days= (1 to 365, default 30), ending today. */
function range(c: C): { from: string; to: string } | null {
  const raw = c.req.query('days') ?? '30';
  const days = /^\d+$/.test(raw) ? Number(raw) : 0;
  if (days < 1 || days > 365) return null;
  const to = new Date();
  const from = new Date(to.getTime() - (days - 1) * 86_400_000);
  return { from: today(from), to: today(to) };
}

const badRange = (c: C) => c.json({ error: 'days must be between 1 and 365.', code: 'invalid' }, 400);

app.get('/api/sites', async (c) => {
  const r = range(c);
  if (!r) return badRange(c);
  const { results } = await c.env.DB.prepare(
    'SELECT site, COUNT(*) AS views FROM views WHERE day BETWEEN ? AND ? GROUP BY site ORDER BY views DESC',
  ).bind(r.from, r.to).all<{ site: string; views: number }>();
  return c.json({ ...r, sites: results });
});

app.get('/api/stats', async (c) => {
  const r = range(c);
  if (!r) return badRange(c);
  const site = (c.req.query('site') ?? 'planary.ch').toLowerCase();
  if (!allowedSite(site)) return c.json({ error: 'Unknown site.', code: 'invalid' }, 400);

  const db = c.env.DB;
  const where = 'WHERE site = ? AND day BETWEEN ? AND ?';
  const args = [site, r.from, r.to];
  const top = (col: string, limit: number, extra = '') =>
    db.prepare(`SELECT ${col} AS key, COUNT(*) AS views FROM views ${where} ${extra} GROUP BY ${col} ORDER BY views DESC, key LIMIT ${limit}`).bind(...args);
  const [daily, paths, refs, countries, devices] = await db.batch<Record<string, string | number>>([
    db.prepare(`SELECT day, COUNT(*) AS views, COUNT(DISTINCT visitor) AS visitors FROM views ${where} GROUP BY day ORDER BY day`).bind(...args),
    top('path', 20),
    top('ref', 20, "AND ref <> ''"),
    top('country', 20, "AND country <> ''"),
    top('device', 3),
  ]);
  const days = daily.results as { day: string; views: number; visitors: number }[];
  return c.json({
    site,
    ...r,
    // Visitors are unique per day; the total is the sum of the days, not unique people.
    totals: {
      views: days.reduce((n, d) => n + d.views, 0),
      visitors: days.reduce((n, d) => n + d.visitors, 0),
    },
    daily: days,
    paths: paths.results,
    referrers: refs.results,
    countries: countries.results,
    devices: devices.results,
  });
});

/** Constant-time comparison, so the key can't be guessed byte by byte from response times. */
async function keyOk(env: Env, given: string | undefined) {
  if (!env.INTERNAL_KEY || !given) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([crypto.subtle.digest('SHA-256', enc.encode(given)), crypto.subtle.digest('SHA-256', enc.encode(env.INTERNAL_KEY))]);
  return crypto.subtle.timingSafeEqual(a, b);
}

/** Unique visitors per day and site, oldest first, days without views as 0. Only counts leave. */
app.get('/api/internal/visitors', async (c) => {
  if (!(await keyOk(c.env, c.req.header('x-internal-key')))) return c.json({ error: 'Not found.', code: 'not_found' }, 404);
  const r = range(c);
  if (!r) return badRange(c);
  const days: string[] = [];
  for (let d = new Date(`${r.from}T00:00:00Z`); today(d) <= r.to; d = new Date(d.getTime() + 86_400_000)) days.push(today(d));
  const { results } = await c.env.DB.prepare(
    'SELECT site, day, COUNT(DISTINCT visitor) AS visitors FROM views WHERE day BETWEEN ? AND ? GROUP BY site, day',
  ).bind(r.from, r.to).all<{ site: string; day: string; visitors: number }>();
  const sites: Record<string, number[]> = {};
  for (const row of results) {
    sites[row.site] ??= days.map(() => 0);
    sites[row.site][days.indexOf(row.day)] = row.visitors;
  }
  return c.json({ days, sites });
});

app.get('/', (c) => c.text('planary-stats'));
app.notFound((c) => c.json({ error: 'Not found.', code: 'not_found' }, 404));
app.onError((err, c) => {
  console.log(`error: ${err}`);
  return c.json({ error: 'Something went wrong.', code: 'internal' }, 500);
});

/** Drops every salt but today's (so yesterday's hashes can't be matched again) and old views. */
export async function cleanUp(db: D1Database, now = new Date()) {
  const cutoff = today(new Date(now.getTime() - KEEP_DAYS * 86_400_000));
  await db.batch([
    db.prepare('DELETE FROM salts WHERE day < ?').bind(today(now)),
    db.prepare('DELETE FROM views WHERE day < ?').bind(cutoff),
  ]);
}

export default {
  fetch: app.fetch,
  scheduled: (_event: ScheduledController, env: Env, ctx: ExecutionContext) => ctx.waitUntil(cleanUp(env.DB)),
} satisfies ExportedHandler<Env>;

export { app };
