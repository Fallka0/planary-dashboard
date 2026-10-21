import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { prefersReducedMotion } from './hooks';

const px = (v: string) => parseFloat(v) || 0;

interface Word { fs: number; r: number; w: number; lh: number; bl: number }

/**
 * The studio heading: "Small" starts huge and shrinks while "on purpose." grows. The swap
 * starts once the heading's top passes 72% of the viewport and ends half a viewport later,
 * eased in-out, with a short follow (time constant 140 ms) so it never steps. Both words
 * are set at the large size and scaled from their baseline, so nothing reflows. Reduced
 * motion or no JS: the plain end state from the CSS. Ported from the W-Home board.
 */
export function usePun(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const st = sectionRef.current;
    const h = st?.querySelector<HTMLElement>('.pun');
    const a = st?.querySelector<HTMLElement>('.pun-s');
    const b = st?.querySelector<HTMLElement>('.pun-b');
    if (!st || !h || !a || !b || prefersReducedMotion()) return;
    let m: { A: Word; B: Word; col: boolean; H: number; BL: number } | null = null;
    let cur = -1;
    let target = 0;
    let raf = 0;
    let lastT = 0;
    h.classList.add('pun-js');

    function draw(p: number) {
      if (!m || !a || !b) return;
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const { A, B } = m;
      const s1 = 1 + (A.r - 1) * e;
      const s2 = B.r + (1 - B.r) * e;
      let ya: number;
      let yb: number;
      let xb: number;
      if (m.col) {
        yb = m.H - B.lh * s2;
        ya = yb - 4 - A.lh * s1;
        xb = 0;
      } else {
        ya = m.BL - A.bl;
        yb = m.BL - B.bl;
        xb = A.w * s1 + 8 + 0.22 * Math.min(A.fs * s1, B.fs * s2);
      }
      a.style.transform = `translate3d(0,${ya.toFixed(2)}px,0) scale(${s1.toFixed(4)})`;
      b.style.transform = `translate3d(${xb.toFixed(2)}px,${yb.toFixed(2)}px,0) scale(${s2.toFixed(4)})`;
    }

    function measure() {
      if (!st || !h || !a || !b) return;
      a.style.transform = b.style.transform = '';
      const cs = getComputedStyle(st);
      const sm = px(cs.getPropertyValue('--sm'));
      const one = (el: HTMLElement): Word => {
        const fs = px(getComputedStyle(el).fontSize);
        const top = el.getBoundingClientRect().top;
        const mark = el.querySelector('.pun-bl');
        return { fs, r: sm / fs, w: el.offsetWidth, lh: el.offsetHeight, bl: (mark ? mark.getBoundingClientRect().top : top) - top };
      };
      const A = one(a);
      const B = one(b);
      const col = cs.getPropertyValue('--col').trim() === '1';
      if (col) {
        m = { A, B, col, BL: 0, H: Math.max(A.lh + B.lh * B.r, A.lh * A.r + B.lh) + 4 };
        a.style.transformOrigin = b.style.transformOrigin = '0 0';
      } else {
        const BL = Math.max(A.bl, B.bl);
        m = { A, B, col, BL, H: BL + Math.max(A.lh - A.bl, B.lh - B.bl) };
        a.style.transformOrigin = `0 ${A.bl}px`;
        b.style.transformOrigin = `0 ${B.bl}px`;
      }
      h.style.setProperty('--ph', `${m.H.toFixed(1)}px`);
      draw(cur < 0 ? target : cur);
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

    function set(p: number) {
      target = Math.max(0, Math.min(1, p));
      if (cur < 0) {
        cur = target;
        draw(cur);
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    }

    const onScroll = () => {
      if (!h) return;
      const vh = window.innerHeight;
      set((vh * 0.72 - h.getBoundingClientRect().top) / (vh * 0.5));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(measure) : null;
    ro?.observe(st);
    measure();
    onScroll();
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    return () => {
      alive = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro?.disconnect();
      cancelAnimationFrame(raf);
      h.classList.remove('pun-js');
      h.style.removeProperty('--ph');
      a.style.transform = b.style.transform = a.style.transformOrigin = b.style.transformOrigin = '';
    };
  }, [sectionRef]);
}
