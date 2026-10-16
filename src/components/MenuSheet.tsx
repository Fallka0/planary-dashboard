import { useEffect, useRef } from 'react';
import { AUTH_URL, TEAM_URL } from '../lib/links';
import { Logo } from './Logo';
import { Socials } from './Socials';

interface MenuSheetProps {
  open: boolean;
  /** `refocus` returns focus to the Menu button (Close and Esc do; in-page links don't). */
  onClose: (refocus: boolean) => void;
}

/** Full-screen phone menu. Opens and closes instantly, no animation. */
export function MenuSheet({ open, onClose }: MenuSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <div
      className="sheet"
      id="menu-sheet"
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose(true);
      }}
    >
      <div className="sheet-top">
        <Logo />
        <button ref={closeRef} className="menu-btn" type="button" style={{ display: 'inline-flex' }} onClick={() => onClose(true)}>
          Close
        </button>
      </div>
      <ul className="sheet-nav">
        <li><a href="#products" onClick={() => onClose(false)}>Products</a></li>
        <li><a href={TEAM_URL}>Team</a></li>
        <li><a href="#contact" onClick={() => onClose(false)}>Contact</a></li>
      </ul>
      <div className="sheet-foot">
        <a className="btn btn-paper" href={AUTH_URL}>Sign in</a>
        <Socials />
      </div>
    </div>
  );
}
