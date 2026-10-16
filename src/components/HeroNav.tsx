import type { Ref } from 'react';
import { AUTH_URL, TEAM_URL } from '../lib/links';
import { Logo } from './Logo';

interface HeroNavProps {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: Ref<HTMLButtonElement>;
  /** '' on the homepage, '/' on other pages. */
  anchorBase?: string;
  /** Show the Sign in pill in the bar (pages without the hero's light panel). */
  signIn?: boolean;
}

export function HeroNav({ menuOpen, onOpenMenu, menuButtonRef, anchorBase = '', signIn = false }: HeroNavProps) {
  return (
    <nav className="nav" aria-label="Main">
      <Logo />
      <ul className="nav-links">
        <li><a className="ul" href={`${anchorBase}#products`}>Products</a></li>
        <li><a className="ul" href={TEAM_URL}>Team</a></li>
        <li><a className="ul" href={`${anchorBase}#contact`}>Contact</a></li>
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
      {signIn && <a className="btn btn-paper nav-signin" href={AUTH_URL}>Sign in</a>}
    </nav>
  );
}
