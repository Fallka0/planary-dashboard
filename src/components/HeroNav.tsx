import type { Ref } from 'react';
import { TEAM_URL } from '../lib/links';
import { Logo } from './Logo';

interface HeroNavProps {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: Ref<HTMLButtonElement>;
}

export function HeroNav({ menuOpen, onOpenMenu, menuButtonRef }: HeroNavProps) {
  return (
    <nav className="nav" aria-label="Main">
      <Logo />
      <ul className="nav-links">
        <li><a className="ul" href="#products">Products</a></li>
        <li><a className="ul" href={TEAM_URL}>Team</a></li>
        <li><a className="ul" href="#contact">Contact</a></li>
      </ul>
      <button
        ref={menuButtonRef}
        className="menu-btn"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="menu-sheet"
        onClick={onOpenMenu}
      >
        Menu
      </button>
    </nav>
  );
}
