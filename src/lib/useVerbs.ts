import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { prefersReducedMotion } from './hooks';

/**
 * Vault's "It goes like this." The large word travels with scroll, Upload → Organise → Share,
 * like the homepage's "Small on purpose.": the walk starts once the row's top passes 75% of the
 * viewport and ends when it reaches 25%, with the same short follow (140 ms), so it never steps.
 * Every word is set at the large size and scaled from its baseline, so nothing reflows.
 * Reduced motion or no JS: the static row from the CSS (Upload large, Share small).
 */
export function useVerbs(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const st = sectionRef.current;
    const words = st ? [...st.querySelectorAll<HTMLElement>('.v-w')] : [];
    const texts = st ? [...st.querySelectorAll<HTMLElement>('.v p')] : [];
    const row = st?.querySelector<HTMLElement>('.v');
    if (!st || !row || !words.length || prefersReducedMotion()) return;
    st.classList.add('verbs-js');
    let cur = -1;
    let target = 0;
    let raf = 0;
    let lastT = 0;

    function draw(p: number) {
      const sm = parseFloat(getComputedStyle(st!).getPropertyValue('--v-sm')) || 0.4;
      const t = p * (words.length - 1);
      words.forEach((w, i) => {
        const near = Math.max(0, 1 - Math.abs(t - i));
        const e = near * near * (3 - 2 * near);
        w.style.transform = `scale(${(sm + (1 - sm) * e).toFixed(4)})`;
        texts[i]?.style.setProperty('opacity', (0.45 + 0.55 * e).toFixed(3));
      });
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

    const onScroll = () => {
      const vh = window.innerHeight;
      target = Math.max(0, Math.min(1, (vh * 0.75 - row.getBoundingClientRect().top) / (vh * 0.5)));
      if (cur < 0) {
        cur = target;
        draw(cur);
      } else if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      st.classList.remove('verbs-js');
      for (const w of words) w.style.transform = '';
      for (const p of texts) p.style.removeProperty('opacity');
    };
  }, [sectionRef]);
}
