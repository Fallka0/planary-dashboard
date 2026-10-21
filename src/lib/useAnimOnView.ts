import { useLayoutEffect, useRef } from 'react';
import { prefersReducedMotion } from './hooks';

/**
 * For a `[data-anim]` wrapper: arms it on mount (hidden, `.is-armed`) and plays it
 * once (`.is-play`) when 30% of it is visible. With reduced motion, or without
 * JS, nothing is armed and the object simply shows in place.
 */
export function useAnimOnView<T extends Element>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    if (el.classList.contains('is-play')) return;
    el.classList.add('is-armed');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-play');
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
