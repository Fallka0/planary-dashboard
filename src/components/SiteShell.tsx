import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { useReveals } from '../lib/useReveals';
import { Footer } from './Footer';
import { Frame } from './Frame';
import { MenuSheet } from './MenuSheet';

export interface MenuControls {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}

interface SiteShellProps {
  /** '' on the homepage; '/' elsewhere, so "Products" and "Contact" lead back to the homepage. */
  anchorBase: string;
  header: (menu: MenuControls) => ReactNode;
  children: ReactNode;
}

/** Frame, phone menu and footer, shared by every page. */
export function SiteShell({ anchorBase, header, children }: SiteShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const refocusMenuButton = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useReveals(rootRef);

  const closeMenu = useCallback((refocus: boolean) => {
    refocusMenuButton.current = refocus;
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen && refocusMenuButton.current) {
      refocusMenuButton.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <Frame rootRef={rootRef} inert={menuOpen} overlay={<MenuSheet open={menuOpen} onClose={closeMenu} anchorBase={anchorBase} />}>
      {header({ menuOpen, onOpenMenu: () => setMenuOpen(true), menuButtonRef })}
      {children}
      <Footer />
    </Frame>
  );
}
