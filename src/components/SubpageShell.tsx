import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { useReveals } from '../lib/useReveals';
import { Footer } from './Footer';
import type { ProductPage } from './Footer';
import { Frame } from './Frame';
import { MenuSheet } from './MenuSheet';

export interface MenuControls {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}

interface SubpageShellProps {
  /** The page you're on: Team is marked in the nav and menu, products in the footer. */
  current: 'team' | ProductPage;
  /** The page's own header and main; each subpage lays these out itself. */
  children: (menu: MenuControls) => ReactNode;
}

/** Frame, phone menu, reveals and footer for the subpages. */
export function SubpageShell({ current, children }: SubpageShellProps) {
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

  const sheet = <MenuSheet open={menuOpen} onClose={closeMenu} subpage={{ current: current === 'team' ? 'team' : undefined }} />;

  return (
    <Frame rootRef={rootRef} inert={menuOpen} overlay={sheet}>
      {children({ menuOpen, onOpenMenu: () => setMenuOpen(true), menuButtonRef })}
      <Footer current={current === 'team' ? undefined : current} />
    </Frame>
  );
}
