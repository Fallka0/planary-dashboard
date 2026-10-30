import { AUTH_URL, CASINO_LIVE_URL, TOURNAMENT_LIVE_URL, VAULT_LIVE_URL, WISHLIST_LIVE_URL } from '../../lib/links';

/** One Planary app as a dot on the hero ring. Add an entry here to add a dot. */
export interface RingApp {
  id: string;
  name: string;
  url: string;
  /** Dot radius in px at the front of the ring (it shrinks to 70% at the back). */
  size: number;
  /** Position on the ring in degrees. 0 = right end of the major axis, 90 = front (bottom), 270 = back (top). */
  offset: number;
}

export const RING_APPS: RingApp[] = [
  { id: 'tournament', name: 'Tournament', url: TOURNAMENT_LIVE_URL, size: 6.5, offset: 52 },
  { id: 'casino', name: 'Casino', url: CASINO_LIVE_URL, size: 4.75, offset: 124 },
  { id: 'wishlist', name: 'Wishlist', url: WISHLIST_LIVE_URL, size: 4.75, offset: 196 },
  { id: 'vault', name: 'Vault', url: VAULT_LIVE_URL, size: 4.75, offset: 268 },
  { id: 'account', name: 'Account', url: AUTH_URL, size: 4.25, offset: 340 },
];

/** One full orbit, in seconds. Every app moves at the same angular speed. */
export const ORBIT_SECONDS = 70;
