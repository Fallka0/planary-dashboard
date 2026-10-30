import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { prefersReducedMotion } from './hooks';

/** Scroll per word while the row is pinned, as a share of the viewport height. */
const STEP = 0.6;

/**
 * Vault's "It goes like this.", in the spirit of the homepage's "Small on purpose.": when the
 * section reaches the middle of the screen it pins (sticky), and scrolling moves the large word
 * Upload → Organise → Share instead of the page. After Share the page scrolls on. The track
 * (the `<section>`) gets the extra height; the `.verbs` block inside it sticks. Words are set at
 * the large size and scaled from their baseline, so nothing reflows; a short follow (140 ms)
 * keeps it from stepping. Reduced motion or no JS: the static row from the CSS, no pinning.
 */
export function useVerbs(trackRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const track = trackRef.current;
    const stick = track?.querySelector<HTMLElement>('.verbs');
    const words = track ? [...track.querySelectorAll<HTMLElement>('.v-w')] : [];
    const texts = track ? [...track.querySelectorAll<HTMLElement>('.v p')] : [];
    if (!track || !stick || words.length < 2 || prefersReducedMotion()) return;
    track.classList.add('verbs-js');
    let pinTop = 0;
    let span = 1;
    let cur = -1;
    let target = 0;
    let raf = 0;
    let lastT = 0;

    function draw(p: number) {
      const sm = parseFloat(getComputedStyle(track!).getPropertyValue('--v-sm')) || 0.4;
      const t = p * (words.length - 1);
      words.forEach((w, i) => {
        const near = Math.max(0, 1 - Math.abs(t - i));
        const e = near * near * (3 - 2 * near);
        w.style.transform = `scale(${(sm + (1 - sm) * e).toFixed(4)})`;
        texts[i]?.style.setProperty('opacity', (0.45 + 0.55 * e).toFixed(3));
      });
    }

    /** Centres the block's content (not its top padding) on screen and gives the track its scroll length. */
    function measure() {
      const vh = window.innerHeight;
      const pad = parseFloat(getComputedStyle(stick!).paddingTop) || 0;
      const content = stick!.offsetHeight - pad;
      pinTop = (content <= vh ? (vh - content) / 2 : vh - content) - pad;
      span = (words.length - 1) * STEP * vh;
      stick!.style.top = `${pinTop.toFixed(1)}px`;
      track!.style.height = `${(stick!.offsetHeight + span).toFixed(1)}px`;
      onScroll();
    }

    function tick(now: number) {
      const dt = Math.min(64, now - (lastT || now));
      lastT = now;
      cur += (target - cur) * (1 - Math.exp(-dt / 140));
      if (Math.abs(target - cur) < 0.0008) {
        cur = target;
        raf = 0;
        lastT = 0;
        draw(cur);
        return;
      }
      draw(cur);
      raf = requestAnimationFrame(tick);
    }

    function onScroll() {
      // How far the track has scrolled past the point where the block pins.
      const scrolled = pinTop - track!.getBoundingClientRect().top;
      target = Math.max(0, Math.min(1, scrolled / span));
      if (cur < 0) {
        cur = target;
        draw(cur);
      } else if (!raf) raf = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(measure) : null;
    ro?.observe(stick);
    measure();
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    return () => {
      alive = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      ro?.disconnect();
      cancelAnimationFrame(raf);
      track.classList.remove('verbs-js');
      track.style.height = stick.style.top = '';
      for (const w of words) w.style.transform = '';
      for (const p of texts) p.style.removeProperty('opacity');
    };
  }, [trackRef]);
}
