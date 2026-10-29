import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { TEAM_URL } from '../lib/links';
import { Logo } from './Logo';
import { ProfileButton } from './Profile';

interface CompactBarProps {
  /** '' on the homepage, '/' elsewhere. */
  anchorBase: string;
  current?: 'team';
  menuOpen: boolean;
  onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void;
  /** While the phone menu is open. */
  inert?: boolean;
}

/**
 * The sticky ink bar inside the frame. Hidden while the page header is in view;
 * slides in when scrolling up and out when scrolling down (one rAF per frame).
 */
export function CompactBar({ anchorBase, current, menuOpen, onOpenMenu, inert = false }: CompactBarProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const bar = ref.current;
    const header = document.querySelector<HTMLElement>('.site > header');
    if (!bar) return;
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (!header || y <= header.offsetHeight) bar.classList.remove('is-on');
      else if (y < lastY - 2) bar.classList.add('is-on');
      else if (y > lastY + 2) bar.classList.remove('is-on');
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="bar" aria-label="Site" ref={ref} inert={inert}>
      <Logo />
      <ul className="nav-links">
        <li><a className="ul" href={`${anchorBase}#products`}>Products</a></li>
        <li><a className="ul" href={TEAM_URL} aria-current={current === 'team' ? 'page' : undefined}>Team</a></li>
        <li><a className="ul" href={`${anchorBase}#contact`}>Contact</a></li>
      </ul>
      <ProfileButton className="signin-b" signInClass="btn btn-paper" tone="paper" />
      <button className="menu-btn" type="button" aria-controls="menu-sheet" aria-expanded={menuOpen} onClick={onOpenMenu}>
        Menu
      </button>
    </header>
  );
}
