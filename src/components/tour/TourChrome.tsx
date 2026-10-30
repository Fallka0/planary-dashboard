import { useEffect, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { TOURNAMENT_PAGE as C } from '../../content/tournament-page.de';
import { VAULT_PAGE as V } from '../../content/vault-page.en';
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
  VAULT_INFO_URL,
  VAULT_LIVE_URL,
  WISHLIST_INFO_URL,
} from '../../lib/links';
import { useMenu } from '../../lib/useMenu';
import { Ic } from '../Ic';
import { Logo, LogoMark } from '../Logo';

/**
 * The chrome of the product pages, Tournament (German) and Vault (English), and the legal pages
 * (German text in the English site chrome of planary.ch, as today): nav, phone sheet and footer.
 */
export type ChromeVariant = 'tournament' | 'vault' | 'legal';

/** The product nav: app name, links, sign-in and the main call to action. */
function productNav(variant: ChromeVariant) {
  if (variant === 'tournament') return { app: C.nav.app, links: C.nav.links, signIn: C.nav.signIn, cta: C.nav.cta, ctaHref: TOURNAMENT_NEW_URL, menu: C.nav.menu, close: C.nav.close, label: 'Hauptnavigation' };
  if (variant === 'vault') return { app: V.nav.app, links: V.nav.links, signIn: V.nav.signIn, cta: V.nav.cta, ctaHref: VAULT_LIVE_URL, menu: V.nav.menu, close: V.nav.close, label: 'Main' };
  return null;
}

interface NavProps {
  variant: ChromeVariant;
  menuOpen: boolean;
  onOpenMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function TourNav({ variant, menuOpen, onOpenMenu, current }: NavProps & { current?: string }) {
  const p = productNav(variant);
  return (
    <nav className="nav" aria-label={p ? p.label : 'Main'} lang={variant === 'tournament' ? undefined : 'en'}>
      <a className="wm" href="/">
        <LogoMark />
        <span>Planary</span>
        {p && <span className="wm-app">{p.app}</span>}
      </a>
      {p ? (
        <>
          <ul className="nav-links">
            {p.links.map((l) => <li key={l.href}><a className="ul" href={l.href} aria-current={current === l.href ? 'page' : undefined}>{l.label}</a></li>)}
          </ul>
          <div className="nav-r">
            <a className="tl ul" href={AUTH_URL}>{p.signIn}</a>
            <a className="btn btn-pri btn-s" href={p.ctaHref}>{p.cta}</a>
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
        {p ? p.menu : 'Menu'}
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
  const p = productNav(variant);
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
      aria-label={p ? p.menu : 'Menu'}
      lang={variant === 'tournament' ? undefined : 'en'}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose(true);
      }}
    >
      <div className="sheet-top">
        <Logo href={null} />
        <button ref={closeRef} className="menu-btn" style={{ display: 'inline-flex' }} type="button" onClick={() => onClose(true)} aria-label={p ? p.close : 'Close menu'}>
          <Ic name="x" />
        </button>
      </div>
      {p ? (
        <>
          <ul className="sheet-nav">
            {p.links.map((l) => <li key={l.href}><a href={l.href} onClick={() => onClose(false)}>{l.label}</a></li>)}
          </ul>
          <div className="sheet-foot">
            <a className="btn btn-paper" href={p.ctaHref}>{p.cta}</a>
            <a className="btn btn-scr" href={AUTH_URL}>{p.signIn}</a>
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
  { h: 'Produkte', links: [['Tournament', TOURNAMENT_INFO_URL, true], ['Casino', CASINO_INFO_URL], ['Wishlist', WISHLIST_INFO_URL], ['Vault', VAULT_INFO_URL], ['Konto', ACCOUNT_INFO_URL]] },
  { h: 'Studio', links: [['Team', TEAM_URL], ['Kontakt', CONTACT_MAILTO], ['Anmelden', AUTH_URL]] },
  { h: 'Anderswo', links: [['Instagram', INSTAGRAM_URL], ['TikTok', TIKTOK_URL], ['GitHub', GITHUB_URL]] },
];
const footEn = (vault: boolean): { h: string; links: FootLink[] }[] => [
  { h: 'Products', links: [['Casino', CASINO_INFO_URL], ['Tournament', TOURNAMENT_INFO_URL], ['Wishlist', WISHLIST_INFO_URL], ['Vault', VAULT_INFO_URL, vault], ['Account', ACCOUNT_INFO_URL]] },
  { h: 'Studio', links: [['Team', TEAM_URL], ['Contact', CONTACT_MAILTO], ['Sign in', AUTH_URL]] },
  { h: 'Elsewhere', links: [['Instagram', INSTAGRAM_URL], ['TikTok', TIKTOK_URL], ['GitHub', GITHUB_URL]] },
];

function TourFooter({ variant, legalCurrent }: { variant: ChromeVariant; legalCurrent?: 'impressum' | 'datenschutz' }) {
  const tour = variant === 'tournament';
  const cols = tour ? FOOT_DE : footEn(variant === 'vault');
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
        <span>{variant === 'vault' ? V.footer.copy : C.footer.copy}</span>
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
    <div className={variant === 'vault' ? 'pl pl-ink' : 'pl'} lang={variant === 'vault' ? 'en' : 'de'}>
      <div className="site" inert={menuOpen}>
        <a className="skip" href="#main">{variant === 'vault' ? 'Skip to content' : 'Zum Inhalt springen'}</a>
        {children({ menuOpen, onOpenMenu: openMenu })}
        {!bare && <TourFooter variant={variant} legalCurrent={legalCurrent} />}
      </div>
      {!bare && <TourSheet variant={variant} open={menuOpen} onClose={closeMenu} />}
    </div>
  );
}
