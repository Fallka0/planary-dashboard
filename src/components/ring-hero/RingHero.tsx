import { useLayoutEffect, useRef } from 'react';
import { HOME } from '../../content/home.en';
import { whenVisible } from '../../lib/whenVisible';
import { ArrowRight } from '../icons';
import { ORBIT_SECONDS, RING_APPS } from './ring-apps';
import { RingPreviews } from './RingPreviews';

/*
 * The hero: "Planned properly." with the Planary ring wrapped around it and the apps orbiting on the ring.
 *
 * Layers, back to front:
 *   back svg   back halves of both ellipses, dots on the back half
 *   headline
 *   front svg  a background-coloured band that cuts the letters, front halves, dots on the front half
 *   hit svg    transparent links over every dot and label (focus ring lives here)
 *   CTAs
 *   previews   the app cards that open from a dot on hover, focus or a first tap (RingPreviews.tsx)
 *
 * One requestAnimationFrame loop writes attributes on fixed DOM nodes. No React render per frame.
 */

const INNER = 0.965; // inner ellipse scale, like the band in the Planary mark
const MID = (1 + INNER) / 2; // the band's middle line: dots and the occluding stroke sit here
const SEG = 72; // points per half ellipse
const DEG = Math.PI / 180;
const HOVER_SPEED = 0.13;
/** Width of a label's hit area: roughly the rendered text width at 11px with the label tracking. */
// Preview placement, in px from the hero's edges.
const PV = { gap: 44, edge: 16, top: 76, bottom: 16, close: 140 };
/** Where each preview links to, by app id. */
const PV_URLS = Object.fromEntries(RING_APPS.map((a) => [a.id, a.url]));
const labelWidth = (name: string) => Math.round(name.length * 7.2 + 10);

// Entrance, in ms after the start.
const T = { line1: [0, 1100], line2: [150, 1250], ring: [500, 2200], dots: 1700, dotStagger: 180, dotDur: 700, cta: [1600, 2600] } as const;

/** Exponential ease-out, used for everything that animates once. */
const expo = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const span = (t: number, [a, b]: readonly [number, number]) => expo((t - a) / (b - a));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** Frame-rate independent smoothing: `rate` is the fraction covered per 60 Hz frame. */
const follow = (cur: number, target: number, rate: number, dt: number) => cur + (target - cur) * (1 - Math.pow(1 - rate, dt * 60));

interface Geo {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  tilt: number; // radians
}

function point(g: Geo, scale: number, th: number): [number, number] {
  const x = g.rx * scale * Math.cos(th);
  const y = g.ry * scale * Math.sin(th);
  const c = Math.cos(g.tilt);
  const s = Math.sin(g.tilt);
  return [g.cx + x * c - y * s, g.cy + x * s + y * c];
}

/** Half an ellipse as a polyline `points` string. Front = 0..π (bottom), back = π..2π (top). */
function half(g: Geo, scale: number, front: boolean) {
  const a0 = front ? 0 : Math.PI;
  let out = '';
  for (let i = 0; i <= SEG; i++) {
    const [x, y] = point(g, scale, a0 + (i / SEG) * Math.PI);
    out += `${x.toFixed(1)},${y.toFixed(1)} `;
  }
  return out;
}

export function RingHero() {
  const root = useRef<HTMLDivElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const lines = useRef<(HTMLSpanElement | null)[]>([]);
  const cta = useRef<HTMLDivElement>(null);
  const backOuter = useRef<SVGPolylineElement>(null);
  const backInner = useRef<SVGPolylineElement>(null);
  const frontOuter = useRef<SVGPolylineElement>(null);
  const frontInner = useRef<SVGPolylineElement>(null);
  const occluder = useRef<SVGPolylineElement>(null);
  const svgs = useRef<(SVGSVGElement | null)[]>([]);
  // Per app: a visual group in the back svg, one in the front svg, and the link in the hit svg.
  const gBack = useRef<(SVGGElement | null)[]>([]);
  const gFront = useRef<(SVGGElement | null)[]>([]);
  const hits = useRef<(SVGAElement | null)[]>([]);
  const hovered = useRef(-1); // the app under the pointer or focus; its preview is open
  const pvLayer = useRef<HTMLDivElement>(null);
  const lead = useRef<SVGLineElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const n = RING_APPS.length;

    // ── state ──
    let W = 0;
    let H = 0;
    let hlCy = 0; // headline centre, the ring's centre
    let start = reduce ? -Infinity : Number.POSITIVE_INFINITY; // entrance clock origin (performance.now)
    let angle = 0; // orbit rotation in degrees, shared by every app
    let speed = 1;
    const hover = new Array<number>(n).fill(1); // eased hover scale per app
    const outline = new Array<number>(n).fill(0); // eased hover outline per app
    const side = new Array<boolean | null>(n).fill(null); // true = front, cached to avoid DOM churn
    const at: [number, number][] = RING_APPS.map(() => [0, 0]); // dot positions this frame
    const cards = RING_APPS.map((a) => pvLayer.current?.querySelector<HTMLElement>(`[data-pv="${a.id}"]`) ?? null);
    let par = { x: 0, y: 0 }; // smoothed pointer, -1..1
    let parTarget = { x: 0, y: 0 };
    let visible = true;
    let raf = 0;
    let last = 0;

    const measure = () => {
      const r = el.getBoundingClientRect();
      W = r.width;
      H = r.height;
      const hr = h1.current?.getBoundingClientRect();
      const ty = h1.current ? new DOMMatrixReadOnly(getComputedStyle(h1.current).transform).m42 : 0; // ignore our own scroll offset
      hlCy = hr ? hr.top - r.top - ty + hr.height / 2 : H / 2;
      for (const s of svgs.current) s?.setAttribute('viewBox', `0 0 ${W} ${H}`);
    };

    const frame = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const t = now - start; // ms since the entrance began (negative or -Infinity before / reduced)
      const done = reduce || t > 3200;

      // ── scroll: 0 at rest, 1 when the ring has flattened onto the next section's top edge ──
      const top = el.getBoundingClientRect().top;
      const p = clamp01(-top / (H * 0.62));
      const e = p * p * (3 - 2 * p);
      const flat = reduce ? 0 : e; // reduced motion: no flattening, just the fade below
      const fade = reduce ? clamp01(1 - p * 1.4) : 1;

      // ── orbit + hover easing ──
      if (!reduce) {
        speed = follow(speed, hovered.current >= 0 ? HOVER_SPEED : 1, hovered.current >= 0 ? 0.12 : 0.04, dt);
        angle = (angle + (360 / ORBIT_SECONDS) * speed * dt) % 360;
        if (!touch) {
          par = { x: follow(par.x, parTarget.x, 0.05, dt), y: follow(par.y, parTarget.y, 0.05, dt) };
        }
      }
      for (let i = 0; i < n; i++) {
        const on = hovered.current === i;
        hover[i] = reduce ? (on ? 1.25 : 1) : follow(hover[i], on ? 1.25 : 1, 0.16, dt);
        outline[i] = reduce ? (on ? 1 : 0) : follow(outline[i], on ? 1 : 0, 0.16, dt);
      }

      // ── geometry ──
      const narrow = W < 640;
      // Phones: a steeper, rounder ring, so it still wraps both lines of the headline.
      const rx0 = W * (narrow ? 0.46 : 0.45);
      const ry0 = rx0 * (narrow ? 0.4 : 0.19);
      const tilt0 = narrow ? -30 : -18;
      const g: Geo = {
        cx: W / 2,
        cy: lerp(hlCy, H - 0.55, flat),
        rx: lerp(rx0, W / 2 + 1, flat),
        ry: Math.max(0, (ry0 + par.y * 11) * (1 - flat)),
        tilt: (tilt0 + par.x * 3.5) * (1 - flat) * DEG,
      };

      const set = (node: SVGPolylineElement | null, pts: string, opacity: number) => {
        if (!node) return;
        node.setAttribute('points', pts);
        node.style.opacity = String(opacity);
      };
      const ringDraw = reduce ? 1 : span(t, T.ring);
      const dash = String(1 - ringDraw);
      // At the end only the front outer stroke is left: one clean line handing over to the next section.
      set(backOuter.current, half(g, 1, false), 0.16 * (1 - flat) * fade);
      set(backInner.current, half(g, INNER, false), 0.08 * (1 - flat) * fade);
      set(frontOuter.current, half(g, 1, true), 0.8 * fade);
      set(frontInner.current, half(g, INNER, true), 0.35 * (1 - flat) * fade);
      set(occluder.current, half(g, MID, true), (1 - flat) * fade);
      // Hand-over: once the line lies on the hero's bottom edge, the next section's top border takes over.
      const next = el.closest('.hero')?.nextElementSibling as HTMLElement | null | undefined;
      next?.style.setProperty('--rh-edge', reduce || flat > 0.995 ? '1' : '0');
      for (const node of [backOuter, backInner, frontOuter, frontInner, occluder]) node.current?.style.setProperty('stroke-dashoffset', dash);

      // ── headline, CTAs ──
      const [l1, l2] = lines.current;
      if (l1) l1.style.transform = `translateY(${((1 - (reduce ? 1 : span(t, T.line1))) * 110).toFixed(2)}%)`;
      if (l2) l2.style.transform = `translateY(${((1 - (reduce ? 1 : span(t, T.line2))) * 110).toFixed(2)}%)`;
      if (h1.current) {
        h1.current.style.transform = `translateY(${(-40 * flat).toFixed(2)}px)`;
        h1.current.style.opacity = String(clamp01(1 - flat * 1.25) * fade);
      }
      if (cta.current) {
        const c = reduce ? 1 : span(t, T.cta);
        cta.current.style.opacity = String(c * clamp01(1 - e * 2.2) * (reduce ? fade : 1));
        cta.current.style.transform = `translateY(${((1 - c) * 10).toFixed(2)}px)`;
        cta.current.style.visibility = c * (1 - e) < 0.02 && done ? 'hidden' : '';
      }

      // ── apps ──
      const labelFade = clamp01(1 - e * 2) * fade;
      const dotFade = clamp01(1 - (flat - 0.55) / 0.4) * fade;
      for (let i = 0; i < n; i++) {
        const app = RING_APPS[i];
        const th = (app.offset + angle) * DEG;
        const sin = Math.sin(th);
        const k = (sin + 1) / 2; // 0 at the back, 1 at the front
        const appear = reduce ? 1 : expo((t - T.dots - i * T.dotStagger) / T.dotDur);
        const [x, y] = point(g, MID, th);
        at[i] = [x, y];
        const r = app.size * (0.7 + 0.3 * k) * hover[i] * appear;
        const front = sin > 0; // switches exactly at the ends of the major axis
        const labelLeft = x > W - 110;

        if (side[i] !== front) {
          side[i] = front;
          gFront.current[i]?.style.setProperty('display', front ? '' : 'none');
          gBack.current[i]?.style.setProperty('display', front ? 'none' : '');
        }
        const gv = front ? gFront.current[i] : gBack.current[i];
        if (gv) {
          gv.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
          const [dot, ring, label] = gv.children as unknown as [SVGCircleElement, SVGCircleElement, SVGTextElement];
          dot.setAttribute('r', Math.max(0, r).toFixed(2));
          dot.style.opacity = String((0.4 + 0.6 * k) * dotFade);
          ring.setAttribute('r', (r + 5).toFixed(2));
          ring.style.opacity = String(0.6 * outline[i] * appear * dotFade);
          label.setAttribute('x', String(labelLeft ? -(r + 8) : r + 8));
          label.setAttribute('text-anchor', labelLeft ? 'end' : 'start');
          label.style.opacity = String((0.25 + 0.75 * k) * appear * labelFade);
        }
        const hit = hits.current[i];
        if (hit) {
          hit.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
          const [area, labelArea, focus] = hit.children as unknown as [SVGCircleElement, SVGRectElement, SVGCircleElement];
          // A hovered dot keeps moving slowly; the bigger area keeps it under a resting cursor.
          area.setAttribute('r', String(Math.max(hovered.current === i ? 30 : 16, r + 10)));
          labelArea.setAttribute('x', String(labelLeft ? -(r + 4) - labelWidth(app.name) : r + 4));
          focus.setAttribute('r', (Math.max(r, 3) + 5).toFixed(2));
          // Out of reach while hidden: before the entrance and once the ring has flattened.
          const live = appear > 0.5 && labelFade > 0.2;
          if (hit.style.display !== (live ? '' : 'none')) hit.style.display = live ? '' : 'none';
          if (!live && hovered.current === i) closeNow();
        }
      }
      placePreview();
    };

    // ── previews: the open card follows its (slowed) dot and stays inside the hero ──
    const placePreview = () => {
      const i = hovered.current;
      const card = i >= 0 ? cards[i] : null;
      const line = lead.current;
      if (!card) return;
      const [x, y] = at[i];
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      let left: number;
      let top: number;
      let flip = false;
      let to: [number, number] | null = null;
      if (RING_APPS[i].id === 'account') {
        // the lens sits on its dot
        const lens = card.querySelector<HTMLElement>('.pv-lens');
        const lensMid = lens ? lens.offsetTop + lens.offsetHeight / 2 : h / 2;
        left = Math.min(Math.max(PV.edge, x - w / 2), W - PV.edge - w);
        top = Math.min(Math.max(PV.top, y - lensMid), H - PV.bottom - h);
      } else {
        const right = x + PV.gap + w <= W - PV.edge;
        flip = !right;
        left = Math.max(PV.edge, right ? x + PV.gap : x - PV.gap - w);
        top = Math.max(PV.top, Math.min(H - PV.bottom - h, y - h / 2));
        to = [right ? left : left + w, Math.max(top + 24, Math.min(top + h - 24, y))];
        // the wishlist tag hangs from its dot by a string to the punched hole
        if (RING_APPS[i].id === 'wishlist') to = [right ? left + 20 : left + w - 20, top + h / 2];
      }
      card.style.left = `${left.toFixed(1)}px`;
      card.style.top = `${top.toFixed(1)}px`;
      card.style.setProperty('--ox', `${(x - left).toFixed(1)}px`);
      card.style.setProperty('--oy', `${(y - top).toFixed(1)}px`);
      card.classList.toggle('is-flip', flip);
      if (line) {
        line.style.display = to ? '' : 'none';
        if (to) {
          line.setAttribute('x1', x.toFixed(1));
          line.setAttribute('y1', y.toFixed(1));
          line.setAttribute('x2', to[0].toFixed(1));
          line.setAttribute('y2', to[1].toFixed(1));
        }
      }
    };
    let closeTimer = 0;
    const openCard = (i: number) => {
      window.clearTimeout(closeTimer);
      if (hovered.current === i) return;
      if (hovered.current >= 0) cards[hovered.current]?.classList.remove('is-open');
      hovered.current = i;
      placePreview();
      cards[i]?.classList.add('is-open');
      pvLayer.current?.setAttribute('data-open', RING_APPS[i].id);
      if (reduce) once();
    };
    function closeNow() {
      window.clearTimeout(closeTimer);
      if (hovered.current >= 0) cards[hovered.current]?.classList.remove('is-open');
      hovered.current = -1;
      pvLayer.current?.setAttribute('data-open', '');
      if (reduce) once();
    }
    const closeSoon = () => {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(closeNow, PV.close);
    };

    // ── loop control: continuous while visible and the tab is shown; on demand with reduced motion ──
    const loop = (now: number) => {
      frame(now);
      raf = requestAnimationFrame(loop);
    };
    const run = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const once = () => requestAnimationFrame(frame);

    measure();
    frame(performance.now()); // paint the start state before the first paint: no flash
    const cancelWait = reduce ? () => {} : whenVisible(() => (start = performance.now()));

    const ro = new ResizeObserver(() => {
      measure();
      if (reduce || !raf) once();
    });
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
      else stop();
    });
    io.observe(el);
    const onVis = () => (document.hidden ? stop() : run());
    document.addEventListener('visibilitychange', onVis);
    const onScroll = () => reduce && once();
    window.addEventListener('scroll', onScroll, { passive: true });
    if (document.fonts) document.fonts.ready.then(() => { measure(); if (reduce) once(); });

    const move = (ev: PointerEvent) => {
      if (ev.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      parTarget = { x: ((ev.clientX - r.left) / r.width) * 2 - 1, y: ((ev.clientY - r.top) / r.height) * 2 - 1 };
    };
    const leave = () => (parTarget = { x: 0, y: 0 });
    if (!touch && !reduce) {
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
    }

    // Hover and keyboard focus open the app's preview, slow the orbit and highlight the dot.
    // On touch the first tap opens the preview and the second one follows the link.
    let lastType = 'mouse';
    const offs: (() => void)[] = [];
    const listen = (node: EventTarget, type: string, fn: (e: Event) => void) => {
      node.addEventListener(type, fn);
      offs.push(() => node.removeEventListener(type, fn));
    };
    hits.current.forEach((a, i) => {
      if (!a) return;
      listen(a, 'pointerdown', (e) => (lastType = (e as PointerEvent).pointerType));
      listen(a, 'pointerenter', (e) => (e as PointerEvent).pointerType === 'mouse' && openCard(i));
      listen(a, 'pointerleave', (e) => (e as PointerEvent).pointerType === 'mouse' && closeSoon());
      // a tap focuses the link too: that focus must not open the card, or the click would follow the link
      listen(a, 'focus', () => lastType === 'mouse' && openCard(i));
      listen(a, 'blur', closeSoon);
      listen(a, 'click', (e) => {
        if (lastType !== 'mouse' && hovered.current !== i) {
          e.preventDefault();
          openCard(i);
        }
        lastType = 'mouse';
      });
    });
    cards.forEach((c) => {
      if (!c) return;
      listen(c, 'pointerenter', () => window.clearTimeout(closeTimer));
      listen(c, 'pointerleave', closeSoon);
    });
    listen(document, 'pointerdown', (e) => {
      const t = e.target as Element | null;
      if (hovered.current >= 0 && t && !t.closest('.rh-hit, .pv')) closeNow();
    });

    run();
    return () => {
      stop();
      cancelWait();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      offs.forEach((f) => f());
      window.clearTimeout(closeTimer);
    };
  }, []);

  const dotGroup = (front: boolean) =>
    RING_APPS.map((app, i) => (
      <g
        key={app.id}
        ref={(n) => {
          (front ? gFront : gBack).current[i] = n;
        }}
        className="rh-app"
        style={{ display: 'none' }}
      >
        <circle className="rh-dot" r={0} />
        <circle className="rh-outline" r={0} />
        <text className="rh-label" dy="0.35em">{app.name}</text>
      </g>
    ));

  const poly = (ref: React.RefObject<SVGPolylineElement | null>, cls: string) => (
    <polyline ref={ref} className={`rh-ring ${cls}`} pathLength={1} />
  );

  return (
    <div className="rh" ref={root}>
      <svg className="rh-svg rh-back" ref={(n) => { svgs.current[0] = n; }} aria-hidden="true" focusable="false">
        {poly(backOuter, 'rh-outer')}
        {poly(backInner, 'rh-inner')}
        {dotGroup(false)}
      </svg>

      {/* Before the copy in the DOM so Tab goes nav, dots, CTAs; z-index keeps the visual layers. */}
      <svg className="rh-svg rh-hits" ref={(n) => { svgs.current[2] = n; }}>
        {RING_APPS.map((app, i) => (
          <a
            key={app.id}
            href={app.url}
            className="rh-hit"
            aria-label={`${app.name}, ${app.url.replace(/^https?:\/\//, '')}`}
            aria-describedby={`pv-${app.id}`}
            ref={(n) => { hits.current[i] = n as unknown as SVGAElement | null; }}
            style={{ display: 'none' }}
          >
            <circle r={16} />
            <rect y={-11} width={labelWidth(app.name)} height={22} />
            <circle className="rh-focus" r={8} />
          </a>
        ))}
      </svg>

      <div className="rh-copy">
        <h1 className="d rh-h" ref={h1}>
          {['Planned', 'properly.'].map((w, i) => (
            <span className="rh-ln" key={w}>
              <span ref={(n) => { lines.current[i] = n; }}>{w}</span>
            </span>
          ))}
        </h1>
        <div className="rh-cta" ref={cta}>
          <a className="btn btn-paper" href={HOME.hero.cta.href}>{HOME.hero.cta.label}</a>
          <a className="alink rh-all" href={HOME.hero.alt.href}>{HOME.hero.alt.label} <ArrowRight /></a>
        </div>
      </div>

      <svg className="rh-svg rh-front" ref={(n) => { svgs.current[1] = n; }} aria-hidden="true" focusable="false">
        {poly(occluder, 'rh-occ')}
        {poly(frontOuter, 'rh-outer')}
        {poly(frontInner, 'rh-inner')}
        {dotGroup(true)}
      </svg>


      <div className="rh-pv" ref={pvLayer} data-open="">
        <svg className="rh-lead" aria-hidden="true" focusable="false">
          <line ref={lead} />
        </svg>
        <RingPreviews urls={PV_URLS} />
      </div>
    </div>
  );
}
