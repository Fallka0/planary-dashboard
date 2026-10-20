// Sign-in for the read API: auth.planary.ch issues the access token, planary-auth's /api/auth/me
// confirms it over the service binding, and ADMIN_EMAILS decides who may see the numbers.
import type { Env } from './env';

function bearer(req: Request): string | null {
  const m = /^Bearer\s+(\S.*)$/i.exec(req.headers.get('authorization')?.trim() ?? '');
  return m ? m[1].trim() : null;
}

/** The email of the signed-in account behind the request, or null. */
export async function emailFromRequest(env: Env, req: Request): Promise<string | null> {
  const token = bearer(req);
  if (!token) return null;
  const init = { headers: { Authorization: `Bearer ${token}` } };
  const res = env.AUTH_API_URL
    ? await fetch(`${env.AUTH_API_URL.replace(/\/+$/, '')}/api/auth/me`, init)
    : await env.AUTH.fetch(new Request('https://auth.internal/api/auth/me', init));
  if (!res.ok) return null;
  const body = (await res.json()) as { user?: { email?: string } };
  return body.user?.email?.toLowerCase() || null;
}

export function isAdmin(env: Env, email: string): boolean {
  const list = (env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  return list.includes(email.toLowerCase());
}
