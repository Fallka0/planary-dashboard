import { useEffect, useRef } from 'react';
import type { Ref } from 'react';
import { useReducedMotion } from '../lib/hooks';
import { AUTH_URL } from '../lib/links';
import { HeroNav } from './HeroNav';
import { HeroObject } from './HeroObject';
import { Socials } from './Socials';
import { UiCrop } from './UiCrop';
import { ArrowDown } from './icons';
// Crops of the real casino UI: a Blackjack round and the lobby header's chip balance.
import blackjackTable from '../assets/crops/blackjack-table.webp';
import lobbyBalance from '../assets/crops/lobby-balance.webp';

interface HeroProps {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: Ref<HTMLButtonElement>;
}

export function Hero({ menuOpen, onOpenMenu, menuButtonRef }: HeroProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Tilt the object toward the pointer: rotateX ±4°, rotateY ±5°.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || reduce) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(((e.clientY - r.top) / r.height - 0.5) * -8).toFixed(2)}deg`);
    };
    const leave = () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
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
        <HeroNav menuOpen={menuOpen} onOpenMenu={onOpenMenu} menuButtonRef={menuButtonRef} />
        <div className="hero-copy">
          <h1 className="d h-hero">Planned<br />properly.</h1>
          <p className="hero-sub">Planary is a small studio in Switzerland making a few focused apps, all behind one sign-in.</p>
          <div className="hero-cta"><a className="btn btn-paper" href="#products">See the products</a></div>
        </div>
        <a className="scroll" href="#statement" aria-label="Scroll to the next section"><ArrowDown /></a>
      </div>

      <div className="hero-r" ref={panelRef}>
        <a className="btn btn-ink signin" href={AUTH_URL}>Sign in</a>
        <HeroObject />
        <UiCrop className="crop-a" title="Casino UI crop" note="Blackjack table, from your screenshot" src={blackjackTable} alt="" />
        <UiCrop className="crop-b" title="Casino UI crop" note="Chip balance in the lobby header" src={lobbyBalance} alt="" />
        <Socials />
      </div>
    </header>
  );
}
