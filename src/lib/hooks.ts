import { useId, useSyncExternalStore } from 'react';

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

export function prefersReducedMotion() {
  return window.matchMedia(REDUCE_QUERY).matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
}

/** Per-instance SVG ids, so masks, gradients and filters never collide. */
export function useSvgIds() {
  const base = 'p' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (name: string) => `${base}-${name}`;
}
