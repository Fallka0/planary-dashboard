// Turning one beacon into one row: which site and page, where from, what kind of device, and a
// visitor hash that only holds for the day. Nothing here keeps an IP address or a full URL.

/** Sites that may send views: planary.ch and its subdomains. */
export function allowedSite(host: string): boolean {
  return host === 'planary.ch' || host.endsWith('.planary.ch');
}

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|monitor|curl|wget|python|go-http|java\//i;
export const isBot = (ua: string) => !ua || BOT.test(ua);

export function device(ua: string): 'mobile' | 'tablet' | 'desktop' {
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return 'tablet';
  if (/Mobi|iPhone|Android/i.test(ua)) return 'mobile';
  return 'desktop';
}

/**
 * The path without query or hash, with anything that looks like a token or an id replaced,
 * so share links (/w/<token>) or invite links never end up in the table.
 */
export function cleanPath(pathname: string): string {
  const parts = pathname.split('/').map((seg) => {
    let s = seg;
    try { s = decodeURIComponent(seg); } catch { /* keep it raw */ }
    if (/^\d+$/.test(s) || (s.length >= 16 && /\d/.test(s)) || s.length > 40) return ':id';
    return s;
  });
  const path = parts.join('/').replace(/\/+$/, '') || '/';
  return path.slice(0, 200);
}

/** The referring host, or '' when there is none or it is the same site. */
export function refHost(referrer: string, site: string): string {
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '').toLowerCase();
    return host === site ? '' : host.slice(0, 100);
  } catch {
    return '';
  }
}

export const today = (now = new Date()) => now.toISOString().slice(0, 10);

/** Today's salt, made on the first view of the day. Deleted again by the daily cron. */
export async function saltFor(db: D1Database, day: string): Promise<string> {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const fresh = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  await db.prepare('INSERT OR IGNORE INTO salts (day, salt) VALUES (?, ?)').bind(day, fresh).run();
  const row = await db.prepare('SELECT salt FROM salts WHERE day = ?').bind(day).first<{ salt: string }>();
  return row?.salt ?? fresh;
}

export async function visitorHash(salt: string, ip: string, ua: string, site: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}|${ip}|${ua}|${site}`);
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
  return [...digest.slice(0, 12)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
