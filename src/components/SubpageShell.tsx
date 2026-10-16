import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { useMenu } from '../lib/useMenu';
import { useReveals } from '../lib/useReveals';
import { CompactBar } from './CompactBar';
import { Footer } from './Footer';
import type { ProductPage } from './Footer';
import { Frame } from './Frame';
import { MenuSheet } from './MenuSheet';

export interface MenuControls {
  menuOpen: boolean;
  onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface SubpageShellProps {
  /** The page you're on: Team is marked in the nav and menu, products in the footer. None on the 404. */
  current?: 'team' | ProductPage;
  /** The page's own header and main; each subpage lays these out itself. */
  children: (menu: MenuControls) => ReactNode;
}

/** Frame, compact bar, phone menu, reveals and footer for the subpages. */
export function SubpageShell({ current, children }: SubpageShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { menuOpen, openMenu, closeMenu } = useMenu();
  useReveals(rootRef);

  const team = current === 'team' ? 'team' : undefined;
  return (
    <Frame
      rootRef={rootRef}
      inert={menuOpen}
      bar={<CompactBar anchorBase="/" current={team} menuOpen={menuOpen} onOpenMenu={openMenu} inert={menuOpen} />}
      overlay={<MenuSheet open={menuOpen} onClose={closeMenu} subpage={{ current: team }} />}
    >
      {children({ menuOpen, onOpenMenu: openMenu })}
      <Footer current={current === 'team' ? undefined : current} />
    </Frame>
  );
}
