import { useEffect, useId, useRef, useState } from 'react';
import { AUTH_URL } from '../lib/links';
import { forgetSession, signOutUrl, useSession } from '../lib/session';

export const PORTAL_URL = 'https://portal.planary.ch';

const TEXT = {
  en: { signIn: 'Sign in', open: 'Your Planary account', account: 'Account', portal: 'Portal', signOut: 'Sign out' },
  de: { signIn: 'Anmelden', open: 'Dein Planary-Konto', account: 'Konto', portal: 'Portal', signOut: 'Abmelden' },
} as const;
type Lang = keyof typeof TEXT;

export function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M4.75 19.5c1.2-3.4 4-5.25 7.25-5.25s6.05 1.85 7.25 5.25" />
    </svg>
  );
}

/**
 * Sign in, or, once signed in, a person icon that opens a small menu (name, e-mail, Account,
 * Portal, Sign out). `className` places it like the Sign in pill it replaces; `signInClass` styles
 * that pill while nobody is signed in.
 */
export function ProfileButton({ className = '', signInClass, tone = 'paper', lang = 'en' }: { className?: string; signInClass: string; tone?: 'paper' | 'ink'; lang?: Lang }) {
  const me = useSession();
  const t = TEXT[lang];
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key !== 'Escape') return;
        box.current?.querySelector<HTMLButtonElement>('.pf-btn')?.focus();
      } else if (box.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener('mousedown', close);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('mousedown', close);
      window.removeEventListener('keydown', close);
    };
  }, [open]);

  if (!me) return <a className={`${signInClass} ${className}`.trim()} href={AUTH_URL}>{t.signIn}</a>;

  return (
    <div className={`pf pf-${tone} ${className}`.trim()} ref={box}>
      <button className="pf-btn" type="button" aria-expanded={open} aria-controls={menuId} aria-label={`${t.open}, ${me.name}`} onClick={() => setOpen((o) => !o)}>
        <PersonIcon />
      </button>
      {open && (
        <div className="pf-menu" id={menuId}>
          <p className="pf-who">
            <b>{me.name}</b>
            {me.email !== me.name && <span>{me.email}</span>}
          </p>
          <a href={AUTH_URL}>{t.account}</a>
          <a href={PORTAL_URL}>{t.portal}</a>
          <a href={signOutUrl()} onClick={forgetSession}>{t.signOut}</a>
        </div>
      )}
    </div>
  );
}

/** For the phone menu sheet: Sign in, or the signed-in person with the same links. */
export function SheetAccount({ signInClass = 'btn btn-paper', lang = 'en' }: { signInClass?: string; lang?: Lang }) {
  const me = useSession();
  const t = TEXT[lang];
  if (!me) return <a className={signInClass} href={AUTH_URL}>{t.signIn}</a>;
  return (
    <div className="pf-sheet">
      <p className="pf-who">
        <span className="pf-av" aria-hidden="true"><PersonIcon /></span>
        <span>
          <b>{me.name}</b>
          {me.email !== me.name && <span>{me.email}</span>}
        </span>
      </p>
      <div className="pf-sheet-l">
        <a href={AUTH_URL}>{t.account}</a>
        <a href={PORTAL_URL}>{t.portal}</a>
        <a href={signOutUrl()} onClick={forgetSession}>{t.signOut}</a>
      </div>
    </div>
  );
}

/** A footer link: Sign in, or Account once signed in. */
export function AccountLink({ className = 'ul', lang = 'en' }: { className?: string; lang?: Lang }) {
  const me = useSession();
  const t = TEXT[lang];
  return <a className={className} href={AUTH_URL}>{me ? t.account : t.signIn}</a>;
}
