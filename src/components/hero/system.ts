/**
 * Geometry and timing for the hero system: the Planary account in the middle,
 * one app per orbit. Pure functions only, so the maths can be unit-tested.
 *
 * Everything is in the art's own coordinates: viewBox 0 0 600 860, centre
 * (300, 430), drawn with preserveAspectRatio="xMidYMid slice".
 */

export const VIEW_W = 600;
export const VIEW_H = 860;
export const CX = 300;
export const CY = 430;

/** The flat stage everything settles on: every orbit tilted -28deg (the Planary ring angle) and squashed to 40%. */
export const REST_TILT = -28;
export const REST_SCALE = 0.4;

/** Orbit radii, inside out. The fourth one is the dashed outer orbit and carries no app. */
export const ORBITS = [122, 190, 258, 330] as const;

export type AppKey = 'casino' | 'tournament' | 'wishlist';
export type PreviewKey = 'account' | AppKey;

/** Apps in orbit order, with their dot size and resting angle on the orbit (radians, found so no two labels touch). */
export const BODIES: { key: AppKey; orbit: number; r: number; rest: number }[] = [
  { key: 'casino', orbit: 122, r: 8, rest: -1.0462 },
  { key: 'tournament', orbit: 190, r: 11, rest: 2.0169 },
  { key: 'wishlist', orbit: 258, r: 9, rest: -1.2912 },
];

/**
 * The opening: each orbit starts at its own tilt and roundness and wobbles, the
 * apps race round their orbits, and everything decelerates onto the flat stage.
 */
export const CHAOS = {
  duration: 3400,
  tilt0: [-150, 95, 40, -205],
  scale0: [0.95, 0.7, 1, 0.85],
  wobble: [26, 34, 20, 14],
  wobbleFreq: [7, 5.2, 9, 4],
  spin: [-9 * Math.PI, 7 * Math.PI, -5 * Math.PI],
  dial: -150,
} as const;

export type Pt = [number, number];

/** A point at angle phi on an orbit of radius rx, squashed to s and tilted by tilt degrees, around the centre. */
export function place(rx: number, s: number, tilt: number, phi: number): Pt {
  const x = rx * Math.cos(phi);
  const y = rx * s * Math.sin(phi);
  const a = (tilt * Math.PI) / 180;
  return [CX + x * Math.cos(a) - y * Math.sin(a), CY + x * Math.sin(a) + y * Math.cos(a)];
}

export interface Frame {
  tilt: number[];
  scale: number[];
  bodies: Pt[];
  dial: number;
}

/** The state of the opening at t in [0, 1]. Quartic ease-out, so it lands softly; at t = 1 it is exactly the rest state. */
export function chaosFrame(t: number): Frame {
  const k = Math.min(1, Math.max(0, t));
  const e = 1 - (1 - k) ** 4;
  const left = 1 - e;
  const tilt: number[] = [];
  const scale: number[] = [];
  for (let i = 0; i < 4; i++) {
    tilt.push(REST_TILT + (CHAOS.tilt0[i] - REST_TILT) * left + CHAOS.wobble[i] * Math.sin(CHAOS.wobbleFreq[i] * k * 3.4) * left * left);
    scale.push(REST_SCALE + (CHAOS.scale0[i] - REST_SCALE) * left);
  }
  const bodies = BODIES.map((b, i) => place(b.orbit, scale[i], tilt[i], b.rest + CHAOS.spin[i] * left));
  return { tilt, scale, bodies, dial: CHAOS.dial * left * left };
}

/** Where each dot rests, in art coordinates. */
export function restPoints(): Record<PreviewKey, Pt> {
  const out = { account: [CX, CY] } as Record<PreviewKey, Pt>;
  for (const b of BODIES) out[b.key] = place(b.orbit, REST_SCALE, REST_TILT, b.rest);
  return out;
}

/** Art coordinates to panel pixels for a panel of w x h (the art is drawn with xMidYMid slice). */
export function toPanel([x, y]: Pt, w: number, h: number): Pt {
  const s = Math.max(w / VIEW_W, h / VIEW_H);
  return [Math.round((w - VIEW_W * s) / 2 + x * s), Math.round((h - VIEW_H * s) / 2 + y * s)];
}

export interface Placed {
  x: number;
  y: number;
  /** The card sits to the left of its dot. */
  flip: boolean;
  /** The dot, relative to the card: the reveal grows from here. */
  ox: number;
  oy: number;
  /** End of the dashed leader from the dot to the card, in panel pixels (null for the account lens). */
  lead: Pt | null;
}

/** Keep cards clear of the Sign in button and of the caption and socials at the bottom. */
export const SAFE_TOP = 76;
export const SAFE_BOTTOM = 96;
export const GAP = 30;
export const EDGE = 16;

/**
 * Where a preview of w x h opens for a dot at a. App cards open to the right of
 * their dot when they fit, otherwise to the left. The account lens opens centred
 * on its own dot (lensH is the lens's height, so its middle sits on the dot).
 */
export function placePreview(key: PreviewKey, a: Pt, w: number, h: number, W: number, H: number, lensH = 0): Placed {
  if (key === 'account') {
    const x = Math.round(a[0] - w / 2);
    const y = Math.round(a[1] - lensH / 2);
    return { x, y, flip: false, ox: a[0] - x, oy: a[1] - y, lead: null };
  }
  const right = a[0] + GAP + w <= W - EDGE;
  const x = Math.max(EDGE, right ? a[0] + GAP : a[0] - GAP - w);
  const y = Math.round(Math.max(SAFE_TOP, Math.min(H - SAFE_BOTTOM - h, a[1] - h / 2)));
  let lead: Pt = [right ? x : x + w, Math.max(y + 24, Math.min(y + h - 24, a[1]))];
  // The wishlist tag hangs from its dot by a string to the punched hole.
  if (key === 'wishlist') lead = [right ? x + 20 : x + w - 20, y + h / 2];
  return { x, y, flip: !right, ox: a[0] - x, oy: a[1] - y, lead };
}

/** The dial: 240 ticks, one every 1.5deg. Every 20th is long, every 5th medium. */
export function dialTicks() {
  const R = 286;
  const ticks: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];
  for (let i = 0; i < 240; i++) {
    const a = (i * 1.5 * Math.PI) / 180;
    const len = i % 20 === 0 ? 16 : i % 5 === 0 ? 8 : 4;
    const o = i % 20 === 0 ? 0.55 : i % 5 === 0 ? 0.3 : 0.14;
    const sx = Math.sin(a);
    const cy = -Math.cos(a);
    ticks.push({
      x1: +(CX + R * sx).toFixed(1),
      y1: +(CY + R * cy).toFixed(1),
      x2: +(CX + (R - len) * sx).toFixed(1),
      y2: +(CY + (R - len) * cy).toFixed(1),
      o,
    });
  }
  return ticks;
}
