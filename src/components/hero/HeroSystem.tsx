import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { HOME } from '../../content/home.en';
import { useReducedMotion } from '../../lib/hooks';
import { AUTH_URL, CASINO_LIVE_URL, TOURNAMENT_LIVE_URL, WISHLIST_LIVE_URL } from '../../lib/links';
import { Previews } from './Previews';
import { SystemArt } from './SystemArt';
import { CHAOS, chaosFrame, placePreview, restPoints, toPanel } from './system';
import type { Placed, PreviewKey, Pt } from './system';

const HOTSPOTS: { key: PreviewKey; href: string; label: string }[] = [
  { key: 'account', href: AUTH_URL, label: 'Planary Account, auth.planary.ch' },
  { key: 'casino', href: CASINO_LIVE_URL, label: 'Planary Casino, casino.planary.ch' },
  { key: 'tournament', href: TOURNAMENT_LIVE_URL, label: 'Planary Tournament, tournament.planary.ch' },
  { key: 'wishlist', href: WISHLIST_LIVE_URL, label: 'Planary Wishlist, wishlist.planary.ch' },
];

const REST = restPoints();
const CLOSE_DELAY = 140;

interface Layout {
  anchors: Record<PreviewKey, Pt>;
  placed: Partial<Record<PreviewKey, Placed>>;
}

/** Write one frame of the opening onto the svg as CSS variables (no React render per frame). */
function paint(svg: SVGSVGElement, t: number) {
  const f = chaosFrame(t);
  for (let i = 0; i < 4; i++) {
    svg.style.setProperty(`--sy-t${i}`, f.tilt[i].toFixed(3));
    svg.style.setProperty(`--sy-s${i}`, f.scale[i].toFixed(4));
  }
  f.bodies.forEach(([x, y], i) => {
    svg.style.setProperty(`--sy-b${i}x`, x.toFixed(2));
    svg.style.setProperty(`--sy-b${i}y`, y.toFixed(2));
  });
  svg.style.setProperty('--sy-dial', f.dial.toFixed(2));
}

/** Drop the inline variables so the CSS fallbacks (the rest state) take over. */
function unpaint(svg: SVGSVGElement) {
  for (let i = 0; i < 4; i++) {
    svg.style.removeProperty(`--sy-t${i}`);
    svg.style.removeProperty(`--sy-s${i}`);
  }
  for (let i = 0; i < 3; i++) {
    svg.style.removeProperty(`--sy-b${i}x`);
    svg.style.removeProperty(`--sy-b${i}y`);
  }
  svg.style.removeProperty('--sy-dial');
}

/**
 * Calls start once the hero can be seen. On the first page of a visit the
 * intro covers the page for about 1.2 s (transitions.ts / transitions.css), so
 * the opening waits for the intro's lift to begin (or for a skip). Returns a cancel function.
 */
function whenVisible(start: () => void) {
  const html = document.documentElement;
  const intro = document.querySelector<HTMLElement>('.pt-intro');
  if (!intro || !html.classList.contains('pt-first')) {
    start();
    return () => {};
  }
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    cleanup();
    start();
  };
  const onStart = (e: AnimationEvent) => e.target === intro && go();
  const fallback = window.setTimeout(go, 2000);
  const cleanup = () => {
    window.clearTimeout(fallback);
    intro.removeEventListener('animationstart', onStart);
  };
  // The lift is the intro's own animation (1150 ms delay, 0 when skipped).
  intro.addEventListener('animationstart', onStart);
  return () => {
    done = true;
    cleanup();
  };
}

/**
 * The hero object: the Planary system. On load the orbits spin and wobble for
 * 3.4 s and settle flat at the Planary ring angle; then each dot is a link that
 * opens a preview of its app on hover or focus (first tap on touch).
 */
export function HeroSystem() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const [settled, setSettled] = useState(reduce);
  const [open, setOpen] = useState<PreviewKey | ''>('');
  const [layout, setLayout] = useState<Layout | null>(null);
  const closeTimer = useRef(0);
  // When the last touch on the panel began: a tap focuses the link too, and that focus must not open the preview.
  const touchAt = useRef(0);
  const recentTouch = () => performance.now() - touchAt.current < 1000;

  // The opening. Frame 0 is painted before the first paint, so there is no flash of the rest state.
  useLayoutEffect(() => {
    const svg = artRef.current;
    if (!svg) return;
    if (reduce) {
      unpaint(svg);
      setSettled(true);
      return;
    }
    setSettled(false);
    paint(svg, 0);
    let raf = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / CHAOS.duration);
      paint(svg, t);
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        raf = 0;
        unpaint(svg);
        setSettled(true);
      }
    };
    const cancelWait = whenVisible(() => {
      raf = requestAnimationFrame(step);
    });
    return () => {
      cancelWait();
      if (raf) cancelAnimationFrame(raf);
      unpaint(svg);
    };
  }, [reduce]);

  // Where the dots rest in panel pixels, and where each preview opens. Re-measured on resize.
  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const W = root.clientWidth;
    const H = root.clientHeight;
    if (!W || !H) return;
    const anchors = {} as Record<PreviewKey, Pt>;
    (Object.keys(REST) as PreviewKey[]).forEach((k) => (anchors[k] = toPanel(REST[k], W, H)));
    const placed: Layout['placed'] = {};
    root.querySelectorAll<HTMLElement>('[data-pv]').forEach((el) => {
      const k = el.dataset.pv as PreviewKey;
      const lens = k === 'account' ? el.querySelector<HTMLElement>('.pv-lens')?.offsetHeight ?? 0 : 0;
      placed[k] = placePreview(k, anchors[k], el.offsetWidth, el.offsetHeight, W, H, lens);
    });
    setLayout({ anchors, placed });
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    // Card heights depend on the webfonts; measure again once they are in.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const show = (k: PreviewKey) => {
    window.clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(''), CLOSE_DELAY);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      window.clearTimeout(closeTimer.current);
      setOpen('');
    }
  };
  // On touch, a tap anywhere else in the panel closes the open preview.
  const onPanelDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    touchAt.current = performance.now();
    if (!(e.target as Element).closest('.hs-hot')) setOpen('');
  };

  const active = settled ? open : '';
  const lead = active && layout?.placed[active]?.lead ? { from: layout.anchors[active], to: layout.placed[active]!.lead! } : null;

  return (
    <div
      ref={rootRef}
      className={`hs${settled ? ' is-settled' : ''}${active ? ' has-open' : ''}`}
      onKeyDown={onKeyDown}
      onPointerDown={onPanelDown}
    >
      <SystemArt ref={artRef} active={active} />
      <div className="hs-layer">
        <svg className="hs-lead" width="100%" height="100%" aria-hidden="true">
          {lead && (
            <>
              <line x1={lead.from[0]} y1={lead.from[1]} x2={lead.to[0]} y2={lead.to[1]} />
              <circle cx={lead.to[0]} cy={lead.to[1]} r="3" />
            </>
          )}
        </svg>
        {layout &&
          HOTSPOTS.map((h) => (
            <a
              key={h.key}
              className="hs-hot"
              href={h.href}
              style={{ left: layout.anchors[h.key][0], top: layout.anchors[h.key][1] }}
              aria-label={h.label}
              aria-describedby={`pv-${h.key}`}
              tabIndex={settled ? 0 : -1}
              onPointerEnter={(e: PointerEvent) => e.pointerType === 'mouse' && show(h.key)}
              onPointerLeave={(e: PointerEvent) => e.pointerType === 'mouse' && hide()}
              onFocus={(_e: FocusEvent) => !recentTouch() && show(h.key)}
              onBlur={hide}
              onClick={(e: MouseEvent) => {
                // First tap on a touch screen previews, the second one follows the link.
                if (recentTouch() && open !== h.key) {
                  e.preventDefault();
                  show(h.key);
                }
              }}
            />
          ))}
        <Previews open={active} placed={layout?.placed ?? {}} />
      </div>
      <p className="hs-cap">
        <b>{HOME.hero.artCaption.title}</b>
        {HOME.hero.artCaption.hint}
      </p>
    </div>
  );
}
