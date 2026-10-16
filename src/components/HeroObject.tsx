import { Component, lazy, Suspense, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Application } from '@splinetool/runtime';
import { useReducedMotion } from '../lib/hooks';
import { HERO_SCENE_HAS_OWN_MOTION, HERO_SCENE_URL } from '../lib/links';
import { HeroPoster } from './art/HeroPoster';

const Spline = lazy(() => import('@splinetool/react-spline'));

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
 * The hero's single 3D object, in the reserved `.obj` square. The poster stays
 * until the Spline scene has loaded; with reduced motion only the poster renders.
 */
export function HeroObject({ posterSrc }: { posterSrc?: string }) {
  const reduce = useReducedMotion();
  const sceneUrl = reduce ? null : HERO_SCENE_URL;
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!sceneUrl) return;
    return whenIdle(() => setMount(true));
  }, [sceneUrl]);

  function handleLoad(app: Application) {
    app.setBackgroundColor('transparent');
    setReady(true);
  }

  const sceneClass = ['obj-scene', ready && 'is-ready', !HERO_SCENE_HAS_OWN_MOTION && 'is-spun']
    .filter(Boolean)
    .join(' ');

  return (
    <div className="obj">
      {!ready && <HeroPoster src={posterSrc} />}
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
