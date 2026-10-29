import { useEffect, useRef } from 'react';
import { TEAM_URL } from '../lib/links';
import { Logo } from './Logo';
import { SheetAccount } from './Profile';
import { Socials } from './Socials';

interface MenuSheetProps {
  open: boolean;
  /** `refocus` returns focus to the Menu button (Close and Esc do; in-page links don't). */
  onClose: (refocus: boolean) => void;
  /** Subpage version: links lead back to the homepage, no socials, Team can be current. */
  subpage?: { current?: 'team' };
}

/** Full-screen phone menu. Opens and closes instantly, no animation. */
export function MenuSheet({ open, onClose, subpage }: MenuSheetProps) {
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
      {subpage ? (
        <>
          <ul className="sheet-nav">
            <li><a href="/#products">Products</a></li>
            <li><a href={TEAM_URL} aria-current={subpage.current === 'team' ? 'page' : undefined}>Team</a></li>
            <li><a href="/#contact" style={{ borderBottom: '1px solid #2a2a31' }}>Contact</a></li>
          </ul>
          <div className="sheet-foot"><SheetAccount /></div>
        </>
      ) : (
        <>
          <ul className="sheet-nav">
            <li><a href="#products" onClick={() => onClose(false)}>Products</a></li>
            <li><a href={TEAM_URL}>Team</a></li>
            <li><a href="#contact" onClick={() => onClose(false)}>Contact</a></li>
          </ul>
          <div className="sheet-foot">
            <SheetAccount />
            <Socials />
          </div>
        </>
      )}
    </div>
  );
}
