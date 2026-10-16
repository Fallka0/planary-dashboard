import type { MouseEvent } from 'react';
import { AUTH_URL, TEAM_URL } from '../lib/links';
import { Logo } from './Logo';

interface HeroNavProps {
  menuOpen: boolean;
  onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void;
  /** '' on the homepage; '/' on subpages, so Products and Contact lead back to the homepage. */
  anchorBase?: string;
  /** Marks the Team link as the current page. */
  current?: 'team';
  /** Subpages carry the Sign in pill in the nav; the homepage has it on the hero's light panel. */
  signIn?: 'ink' | 'paper';
}

export function HeroNav({ menuOpen, onOpenMenu, anchorBase = '', current, signIn }: HeroNavProps) {
  return (
    <nav className="nav" aria-label="Main">
      <Logo />
      <ul className="nav-links">
        <li><a className="ul" href={`${anchorBase}#products`}>Products</a></li>
        <li><a className="ul" href={TEAM_URL} aria-current={current === 'team' ? 'page' : undefined}>Team</a></li>
        <li><a className="ul" href={`${anchorBase}#contact`}>Contact</a></li>
      </ul>
      {signIn && <a className={`btn btn-${signIn} signin`} href={AUTH_URL}>Sign in</a>}
      <button
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
