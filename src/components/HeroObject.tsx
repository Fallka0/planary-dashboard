import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Application } from '@splinetool/runtime';
import { useReducedMotion } from '../lib/hooks';
import { HERO_SCENE_SPIN_OBJECT, HERO_SCENE_URL } from '../lib/links';
import { HeroPoster } from './art/HeroPoster';

const Spline = lazy(() => import('@splinetool/react-spline'));

/** One full turn every 12 s, in radians per ms. */
const TURN_RATE = (2 * Math.PI) / 12_000;
/** The scene's own Start spin: 1 s settle plus a 10 s turn, with some margin. */
const AUTHORED_SPIN_MS = 11_500;

/** If the runtime or scene fails to load, keep the poster and carry on. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Wait for the page to finish loading and go idle, so the runtime never competes with first paint or LCP. */
function whenIdle(cb: () => void) {
  const hasIdle = typeof window.requestIdleCallback === 'function';
  let handle = 0;
  const schedule = () => {
    handle = hasIdle ? window.requestIdleCallback(cb, { timeout: 3000 }) : window.setTimeout(cb, 200);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
  return () => {
    window.removeEventListener('load', schedule);
    if (hasIdle) window.cancelIdleCallback(handle);
    else window.clearTimeout(handle);
  };
}

/**
 * After the scene's authored spin has run, keep the object turning at one turn
 * per 12 s, unless the scene is still animating it (a looping spin).
 */
function keepTurning(app: Application, name: string) {
  const obj = app.findObjectByName(name);
  if (!obj) return () => {};
  let raf = 0;
  let last = 0;
  const step = (t: number) => {
    if (last) obj.rotation.y += (t - last) * TURN_RATE;
    last = t;
    raf = requestAnimationFrame(step);
  };
  let sampled = 0;
  const timer = window.setTimeout(() => {
    sampled = obj.rotation.y;
    window.setTimeout(() => {
      if (Math.abs(obj.rotation.y - sampled) < 1e-4) raf = requestAnimationFrame(step);
    }, 250);
  }, AUTHORED_SPIN_MS);
  return () => {
    window.clearTimeout(timer);
    cancelAnimationFrame(raf);
  };
}

/**
 * The hero's single 3D object, in the reserved `.obj` square. The poster stays
 * until the Spline scene has loaded; with reduced motion only the poster renders.
 */
export function HeroObject({ posterSrc }: { posterSrc?: string }) {
  const reduce = useReducedMotion();
  const sceneUrl = reduce ? null : HERO_SCENE_URL;
  const boxRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!sceneUrl) return;
    return whenIdle(() => setMount(true));
  }, [sceneUrl]);

  useEffect(() => {
    if (!sceneUrl) setReady(false);
  }, [sceneUrl]);

  // Keep the spin going once the scene is up; pause rendering while the hero is off screen.
  useEffect(() => {
    const app = appRef.current;
    const box = boxRef.current;
    if (!ready || !app || !box) return;
    const stopTurning = HERO_SCENE_SPIN_OBJECT ? keepTurning(app, HERO_SCENE_SPIN_OBJECT) : () => {};
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? app.play() : app.stop()));
    io.observe(box);
    return () => {
      stopTurning();
      io.disconnect();
    };
  }, [ready]);

  function handleLoad(app: Application) {
    app.setBackgroundColor('transparent');
    appRef.current = app;
    setReady(true);
  }

  const sceneClass = ['obj-scene', ready && 'is-ready', !HERO_SCENE_SPIN_OBJECT && 'is-spun'].filter(Boolean).join(' ');

  return (
    <div className={ready ? 'obj is-ready' : 'obj'} ref={boxRef}>
      <div className="obj-poster">
        <HeroPoster src={posterSrc} />
      </div>
      {sceneUrl && mount && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <div className={sceneClass} aria-hidden="true">
              <Spline scene={sceneUrl} onLoad={handleLoad} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
