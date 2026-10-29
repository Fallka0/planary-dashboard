// Who is signed in, for the profile menu. planary.ch has no token of its own: it asks
// auth.planary.ch, which reads its session cookie (same site, so the cookie goes along).
// The last answer is kept for the tab, so a signed-in visitor doesn't see "Sign in" flash first.
import { useSyncExternalStore } from 'react';
import { AUTH_URL } from './links';

export interface Session {
  name: string;
  email: string;
}

const KEY = 'planary:session';
type State = Session | null | undefined; // undefined = not known yet

function cached(): State {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw === null ? undefined : (JSON.parse(raw) as Session | null);
  } catch {
    return undefined;
  }
}

let state: State = typeof window === 'undefined' ? undefined : cached();
const subs = new Set<() => void>();
let asked = false;

function set(next: Session | null) {
  state = next;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // private mode: no cache, the next page asks again
  }
  subs.forEach((f) => f());
}

function ask() {
  if (asked) return;
  asked = true;
  fetch(`${AUTH_URL}/api/session`, { credentials: 'include', cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((d: { signedIn?: boolean; user?: Session } | null) => {
      if (d) set(d.signedIn && d.user ? { name: d.user.name || d.user.email, email: d.user.email } : null);
    })
    .catch(() => {
      // auth.planary.ch unreachable: keep what we had, so the nav doesn't flip
    });
}

function subscribe(fn: () => void) {
  subs.add(fn);
  ask();
  return () => subs.delete(fn);
}

/** The signed-in person, null when nobody is signed in, undefined while unknown. */
export function useSession(): State {
  return useSyncExternalStore(subscribe, () => state, () => undefined);
}

/** Signs out on auth.planary.ch and comes back to this page. */
export function signOutUrl() {
  return `${AUTH_URL}/logout?returnTo=${encodeURIComponent(window.location.origin + window.location.pathname)}`;
}

export function forgetSession() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // nothing cached
  }
}
