// The real routes on a local D1, with a fake planary-auth (vitest.config.ts).
import { env } from 'cloudflare:workers';
import { beforeEach, describe, expect, it } from 'vitest';
import { app, cleanUp } from '../src/index';
import { cleanPath, device, isBot, refHost, today } from '../src/collect';

const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/141.0 Safari/537.36';
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';

function view(u: string, opts: { origin?: string; r?: string; ua?: string; ip?: string } = {}) {
  const origin = opts.origin ?? new URL(u).origin;
  return app.request('/e', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'text/plain', 'User-Agent': opts.ua ?? CHROME, 'CF-Connecting-IP': opts.ip ?? '203.0.113.7' },
    body: JSON.stringify({ u, r: opts.r ?? '' }),
  }, env);
}

const read = (path: string, who: string | null, origin?: string) =>
  app.request(path, { headers: { ...(who ? { Authorization: `Bearer test|u1|${who}` } : {}), ...(origin ? { Origin: origin } : {}) } }, env);

const rows = async () => (await env.DB.prepare('SELECT * FROM views ORDER BY id').all<Record<string, string>>()).results;

beforeEach(async () => {
  await env.DB.batch([env.DB.prepare('DELETE FROM views'), env.DB.prepare('DELETE FROM salts')]);
});

describe('collecting', () => {
  it('stores a view without the query, the IP or the full referrer', async () => {
    const res = await view('https://planary.ch/team?email=a@b.ch#x', { r: 'https://www.google.com/search?q=planary' });
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://planary.ch');
    const [row] = await rows();
    expect(row).toMatchObject({ day: today(), site: 'planary.ch', path: '/team', ref: 'google.com', device: 'desktop' });
    expect(JSON.stringify(row)).not.toContain('203.0.113.7');
    expect(JSON.stringify(row)).not.toContain('email');
    expect(row.visitor).toMatch(/^[0-9a-f]{24}$/);
  });

  it('only takes views from planary.ch and its subdomains, for their own pages', async () => {
    expect((await view('https://evil.example/', {})).status).toBe(403);
    expect((await view('https://planary.ch.evil.example/', {})).status).toBe(403);
    expect((await view('https://casino.planary.ch/', { origin: 'https://planary.ch' })).status).toBe(400);
    expect((await view('https://casino.planary.ch/play')).status).toBe(204);
    const pre = await app.request('/e', { method: 'OPTIONS', headers: { Origin: 'https://wishlist.planary.ch' } }, env);
    expect(pre.status).toBe(204);
    expect((await rows()).map((r) => r.site)).toEqual(['casino.planary.ch']);
  });

  it('rejects broken bodies and skips bots', async () => {
    const broken = await app.request('/e', { method: 'POST', headers: { Origin: 'https://planary.ch', 'User-Agent': CHROME }, body: '{nope' }, env);
    expect(broken.status).toBe(400);
    expect((await view('https://planary.ch/', { ua: 'Googlebot/2.1' })).status).toBe(204);
    expect(await rows()).toHaveLength(0);
  });

  it('counts the same visitor once a day, and different ones apart', async () => {
    await view('https://planary.ch/');
    await view('https://planary.ch/team');
    await view('https://planary.ch/', { ip: '198.51.100.2', ua: IPHONE });
    const r = await rows();
    expect(r[0].visitor).toBe(r[1].visitor);
    expect(r[2].visitor).not.toBe(r[0].visitor);
    expect(r[2].device).toBe('mobile');
  });

  it('forgets the salt the next day, so hashes change', async () => {
    await view('https://planary.ch/');
    const first = (await rows())[0].visitor;
    await cleanUp(env.DB, new Date(Date.now() + 86_400_000));
    expect((await env.DB.prepare('SELECT COUNT(*) AS n FROM salts').first<{ n: number }>())?.n).toBe(0);
    await view('https://planary.ch/');
    expect((await rows())[1].visitor).not.toBe(first);
  });

  it('deletes views older than about 13 months', async () => {
    await env.DB.prepare("INSERT INTO views (day, site, path, device, visitor) VALUES ('2000-01-01', 'planary.ch', '/', 'desktop', 'x')").run();
    await view('https://planary.ch/');
    await cleanUp(env.DB);
    expect((await rows()).map((r) => r.day)).toEqual([today()]);
  });
});

describe('reading', () => {
  it('is for Planary admins only', async () => {
    expect((await read('/api/stats', null)).status).toBe(401);
    expect((await read('/api/stats', 'someone@planary.test')).status).toBe(403);
    expect((await read('/api/stats', 'second@planary.test')).status).toBe(200);
  });

  it('sums up one site', async () => {
    await view('https://planary.ch/', { r: 'https://www.google.com/' });
    await view('https://planary.ch/team');
    await view('https://planary.ch/', { ip: '198.51.100.2', ua: IPHONE });
    await view('https://casino.planary.ch/');
    const res = await read('/api/stats?site=planary.ch&days=7', 'admin@planary.test');
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    const body = (await res.json()) as Record<string, unknown>;
    expect(body.totals).toEqual({ views: 3, visitors: 2 });
    expect(body.daily).toEqual([{ day: today(), views: 3, visitors: 2 }]);
    expect(body.paths).toEqual([{ key: '/', views: 2 }, { key: '/team', views: 1 }]);
    expect(body.referrers).toEqual([{ key: 'google.com', views: 1 }]);
    expect(body.devices).toEqual([{ key: 'desktop', views: 2 }, { key: 'mobile', views: 1 }]);

    const sites = (await (await read('/api/sites', 'admin@planary.test')).json()) as { sites: unknown[] };
    expect(sites.sites).toEqual([{ site: 'planary.ch', views: 3 }, { site: 'casino.planary.ch', views: 1 }]);
  });

  it('checks its input and answers the console origin', async () => {
    expect((await read('/api/stats?days=0', 'admin@planary.test')).status).toBe(400);
    expect((await read('/api/stats?site=evil.example', 'admin@planary.test')).status).toBe(400);
    const res = await read('/api/stats', 'admin@planary.test', 'https://admin.planary.ch');
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://admin.planary.ch');
    const other = await read('/api/stats', 'admin@planary.test', 'https://evil.example');
    expect(other.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});

describe('helpers', () => {
  it('keeps tokens and ids out of paths', () => {
    expect(cleanPath('/w/k3J9xQ2mZpL8vT4n')).toBe('/w/:id');
    expect(cleanPath('/lists/42/')).toBe('/lists/:id');
    expect(cleanPath('/')).toBe('/');
    expect(cleanPath('/datenschutz')).toBe('/datenschutz');
  });

  it('reads devices, bots and referrers', () => {
    expect(device(IPHONE)).toBe('mobile');
    expect(device('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)')).toBe('tablet');
    expect(device(CHROME)).toBe('desktop');
    expect(isBot('')).toBe(true);
    expect(isBot(CHROME)).toBe(false);
    expect(refHost('https://planary.ch/team', 'planary.ch')).toBe('');
    expect(refHost('https://casino.planary.ch/', 'planary.ch')).toBe('casino.planary.ch');
    expect(refHost('not a url', 'planary.ch')).toBe('');
  });
});

describe('internal visitors', () => {
  const internal = (path: string, key?: string) => app.request(path, { headers: key ? { 'x-internal-key': key } : {} }, env);

  it('answers 404 without the key, even for admins', async () => {
    expect((await internal('/api/internal/visitors?days=7')).status).toBe(404);
    expect((await internal('/api/internal/visitors?days=7', 'wrong')).status).toBe(404);
    expect((await read('/api/internal/visitors?days=7', 'admin@planary.test')).status).toBe(404);
  });

  it('counts unique visitors per day and site, zero-filled, oldest first', async () => {
    await view('https://tournament.planary.ch/gurten-lan', { ip: '203.0.113.1' });
    await view('https://tournament.planary.ch/gurten-lan/beamer', { ip: '203.0.113.1' });
    await view('https://tournament.planary.ch/', { ip: '203.0.113.2' });
    await view('https://casino.planary.ch/', { ip: '203.0.113.3', ua: IPHONE });
    const old = new Date(Date.now() - 2 * 86_400_000);
    await env.DB.prepare("INSERT INTO views (day, site, path, ref, country, device, visitor) VALUES (?, 'tournament.planary.ch', '/', '', '', 'desktop', 'abc')").bind(today(old)).run();

    const res = await internal('/api/internal/visitors?days=7', 'test-internal-key');
    expect(res.status).toBe(200);
    const body = (await res.json()) as { days: string[]; sites: Record<string, number[]> };
    expect(body.days).toHaveLength(7);
    expect(body.days[6]).toBe(today());
    expect(body.days[4]).toBe(today(old));
    expect(body.sites['tournament.planary.ch']).toEqual([0, 0, 0, 0, 1, 0, 2]);
    expect(body.sites['casino.planary.ch']).toEqual([0, 0, 0, 0, 0, 0, 1]);
    expect(JSON.stringify(body)).not.toContain('gurten-lan');
    expect((await internal('/api/internal/visitors?days=0', 'test-internal-key')).status).toBe(400);
  });
});
