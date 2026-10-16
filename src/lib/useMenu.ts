import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';

/**
 * Phone menu state. Remembers which Menu button opened it (the hero/page nav or
 * the compact bar) so Close and Esc hand focus back to that one.
 */
export function useMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const refocus = useRef(false);

  const openMenu = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    opener.current = e.currentTarget;
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback((refocusOpener: boolean) => {
    refocus.current = refocusOpener;
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen && refocus.current) {
      refocus.current = false;
      opener.current?.focus();
    }
  }, [menuOpen]);

  return { menuOpen, openMenu, closeMenu };
}
