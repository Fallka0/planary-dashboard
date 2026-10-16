import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { useReducedMotion } from '../lib/hooks';
import { AUTH_URL } from '../lib/links';
import { HeroNav } from './HeroNav';
import { Socials } from './Socials';
import { HeroLogo } from './art/HeroLogo';
import { Starfield } from './art/Starfield';
import { ArrowDown } from './icons';

interface HeroProps {
  menuOpen: boolean;
  onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Hero({ menuOpen, onOpenMenu }: HeroProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The logo drifts up to 8px/6px toward the pointer, the starfield the other way.
  // 2D translate only: a 3D rotate made the browser rasterize the SVG.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || reduce) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', `${(((e.clientX - r.left) / r.width - 0.5) * 16).toFixed(1)}px`);
      el.style.setProperty('--py', `${(((e.clientY - r.top) / r.height - 0.5) * 12).toFixed(1)}px`);
    };
    const leave = () => {
      el.style.setProperty('--px', '0px');
      el.style.setProperty('--py', '0px');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      leave();
    };
  }, [reduce]);

  return (
    <header className="hero">
      <div className="hero-l">
        <HeroNav menuOpen={menuOpen} onOpenMenu={onOpenMenu} />
        <div className="hero-copy">
          <h1 className="d h-hero"><span className="ln"><span>Planned</span></span><span className="ln"><span>properly.</span></span></h1>
          <p className="hero-sub">Planary is a small studio in Switzerland making a few focused apps, all behind one sign-in.</p>
          <div className="hero-cta"><a className="btn btn-paper" href="#products">See the products</a></div>
        </div>
        <a className="scroll" href="#statement" aria-label="Scroll to the next section"><ArrowDown /></a>
      </div>

      <div className="hero-r" ref={panelRef}>
        <a className="btn btn-ink signin" href={AUTH_URL}>Sign in</a>
        <Starfield />
        <div className="obj">
          <HeroLogo />
        </div>
        <Socials />
      </div>
    </header>
  );
}
