import { useEffect, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { TOURNAMENT_PAGE as C } from '../../content/tournament-page.de';
import {
  ACCOUNT_INFO_URL,
  AUTH_URL,
  CASINO_INFO_URL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  DATENSCHUTZ_URL,
  GITHUB_URL,
  IMPRESSUM_URL,
  INSTAGRAM_URL,
  TEAM_URL,
  TIKTOK_URL,
  TOURNAMENT_INFO_URL,
  TOURNAMENT_NEW_URL,
  WISHLIST_INFO_URL,
} from '../../lib/links';
import { useMenu } from '../../lib/useMenu';
import { Ic } from '../Ic';
import { Logo, LogoMark } from '../Logo';

/**
 * The chrome of the Tournament page (German) and the legal pages (German text in the
 * English site chrome of planary.ch, as today): nav, phone sheet and footer.
 */
export type ChromeVariant = 'tournament' | 'legal';

interface NavProps {
  variant: ChromeVariant;
  menuOpen: boolean;
  onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function TourNav({ variant, menuOpen, onOpenMenu }: NavProps) {
  const tour = variant === 'tournament';
  return (
    <nav className="nav" aria-label={tour ? 'Hauptnavigation' : 'Main'} lang={tour ? undefined : 'en'}>
      <a className="wm" href="/">
        <LogoMark />
        <span>Planary</span>
        {tour && <span className="wm-app">{C.nav.app}</span>}
      </a>
      {tour ? (
        <>
          <ul className="nav-links">
            {C.nav.links.map((l) => <li key={l.href}><a className="ul" href={l.href}>{l.label}</a></li>)}
          </ul>
          <div className="nav-r">
            <a className="tl ul" href={AUTH_URL}>{C.nav.signIn}</a>
            <a className="btn btn-pri btn-s" href={TOURNAMENT_NEW_URL}>{C.nav.cta}</a>
          </div>
        </>
      ) : (
        <>
          <ul className="nav-links">
            <li><a className="ul" href="/#products">Products</a></li>
            <li><a className="ul" href={TEAM_URL}>Team</a></li>
            <li><a className="ul" href={CONTACT_MAILTO}>Contact</a></li>
          </ul>
          <div className="nav-r"><a className="btn btn-pri btn-s" href={AUTH_URL}>Sign in</a></div>
        </>
      )}
      <button className="menu-btn" type="button" aria-expanded={menuOpen} aria-controls="menu-sheet" onClick={onOpenMenu}>
        {tour ? C.nav.menu : 'Menu'}
      </button>
    </nav>
  );
}

interface SheetProps {
  variant: ChromeVariant;
  open: boolean;
  onClose: (refocus: boolean) => void;
}

function TourSheet({ variant, open, onClose }: SheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const tour = variant === 'tournament';
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
      aria-label={tour ? C.nav.menu : 'Menu'}
      lang={tour ? undefined : 'en'}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose(true);
      }}
    >
      <div className="sheet-top">
        <Logo href={null} />
        <button ref={closeRef} className="menu-btn" style={{ display: 'inline-flex' }} type="button" onClick={() => onClose(true)} aria-label={tour ? C.nav.close : 'Close menu'}>
          <Ic name="x" />
        </button>
      </div>
      {tour ? (
        <>
          <ul className="sheet-nav">
            {C.nav.links.map((l) => <li key={l.href}><a href={l.href} onClick={() => onClose(false)}>{l.label}</a></li>)}
          </ul>
          <div className="sheet-foot">
            <a className="btn btn-paper" href={TOURNAMENT_NEW_URL}>{C.nav.cta}</a>
            <a className="btn btn-scr" href={AUTH_URL}>{C.nav.signIn}</a>
          </div>
        </>
      ) : (
        <>
          <ul className="sheet-nav">
            <li><a href="/#products">Products</a></li>
            <li><a href={TEAM_URL}>Team</a></li>
            <li><a href={CONTACT_MAILTO}>Contact</a></li>
          </ul>
          <div className="sheet-foot"><a className="btn btn-paper" href={AUTH_URL}>Sign in</a></div>
        </>
      )}
    </div>
  );
}

type FootLink = [label: string, href: string, current?: boolean];

const FOOT_DE: { h: string; links: FootLink[] }[] = [
  { h: 'Produkte', links: [['Tournament', TOURNAMENT_INFO_URL, true], ['Casino', CASINO_INFO_URL], ['Wishlist', WISHLIST_INFO_URL], ['Konto', ACCOUNT_INFO_URL]] },
  { h: 'Studio', links: [['Team', TEAM_URL], ['Kontakt', CONTACT_MAILTO], ['Anmelden', AUTH_URL]] },
  { h: 'Anderswo', links: [['Instagram', INSTAGRAM_URL], ['TikTok', TIKTOK_URL], ['GitHub', GITHUB_URL]] },
];
const FOOT_EN: { h: string; links: FootLink[] }[] = [
  { h: 'Products', links: [['Casino', CASINO_INFO_URL], ['Tournament', TOURNAMENT_INFO_URL], ['Wishlist', WISHLIST_INFO_URL], ['Account', ACCOUNT_INFO_URL]] },
  { h: 'Studio', links: [['Team', TEAM_URL], ['Contact', CONTACT_MAILTO], ['Sign in', AUTH_URL]] },
  { h: 'Elsewhere', links: [['Instagram', INSTAGRAM_URL], ['TikTok', TIKTOK_URL], ['GitHub', GITHUB_URL]] },
];

function TourFooter({ variant, legalCurrent }: { variant: ChromeVariant; legalCurrent?: 'impressum' | 'datenschutz' }) {
  const tour = variant === 'tournament';
  const cols = tour ? FOOT_DE : FOOT_EN;
  return (
    <footer className="foot wrap g">
      <div className="foot-wm"><Logo /></div>
      {cols.map((c, i) => (
        <div className={`fc${i + 1}`} key={c.h} lang={tour ? undefined : 'en'}>
          <h2>{c.h}</h2>
          <ul>
            {c.links.map(([label, href, cur]) => (
              <li key={label}><a className="ul" href={href} aria-current={cur ? 'page' : undefined}>{label}</a></li>
            ))}
          </ul>
        </div>
      ))}
      <div className="legal">
        <span>{C.footer.copy}</span>
        <span className="legal-links">
          <a className="ul" href={IMPRESSUM_URL} aria-current={legalCurrent === 'impressum' ? 'page' : undefined}>Impressum</a>
          <a className="ul" href={DATENSCHUTZ_URL} aria-current={legalCurrent === 'datenschutz' ? 'page' : undefined}>Datenschutz</a>
          <span>{CONTACT_EMAIL}</span>
        </span>
      </div>
    </footer>
  );
}

interface TourFrameProps {
  variant: ChromeVariant;
  legalCurrent?: 'impressum' | 'datenschutz';
  /** Hides nav, footer and sheet (the beamer view takes the whole frame). */
  bare?: boolean;
  /** Receives the menu controls, renders the page's header and main. */
  children: (menu: { menuOpen: boolean; onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void }) => ReactNode;
}

/** Frame, skip link, phone sheet and footer around a Tournament or legal page. */
export function TourFrame({ variant, legalCurrent, bare = false, children }: TourFrameProps) {
  const { menuOpen, openMenu, closeMenu } = useMenu();
  return (
    <div className="pl" lang="de">
      <div className="site" inert={menuOpen}>
        <a className="skip" href="#main">Zum Inhalt springen</a>
        {children({ menuOpen, onOpenMenu: openMenu })}
        {!bare && <TourFooter variant={variant} legalCurrent={legalCurrent} />}
      </div>
      {!bare && <TourSheet variant={variant} open={menuOpen} onClose={closeMenu} />}
    </div>
  );
}
