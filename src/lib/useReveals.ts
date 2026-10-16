import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { prefersReducedMotion } from './hooks';

/**
 * Fade-and-rise for `[data-reveal]` blocks: only those below the fold at load,
 * once each, no stagger. Runs before first paint so nothing flashes.
 */
export function useReveals(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.classList.contains('is-in')) return;
      if (el.getBoundingClientRect().top > vh) {
        el.classList.add('is-pre');
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [rootRef]);
}
