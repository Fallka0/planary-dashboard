import type { MouseEvent } from 'react';
import { HeroNav } from './HeroNav';
import { RingHero } from './ring-hero/RingHero';

interface HeroProps {
  menuOpen: boolean;
  onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

/** The homepage hero: nav on top, the ring composition filling the rest. */
export function Hero({ menuOpen, onOpenMenu }: HeroProps) {
  return (
    <header className="hero rh-hero">
      <HeroNav menuOpen={menuOpen} onOpenMenu={onOpenMenu} signIn="paper" />
      <RingHero />
    </header>
  );
}
