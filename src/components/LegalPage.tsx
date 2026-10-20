import type { ReactNode } from 'react';
import { HeroNav } from './HeroNav';
import { SubpageShell } from './SubpageShell';

/** Shared layout of /impressum and /datenschutz: a plain title, then numbered text sections. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <SubpageShell>
      {(menu) => (
        <>
          <header className="thero">
            <HeroNav {...menu} anchorBase="/" signIn="ink" />
            <div className="wrap g thero-in">
              <h1 className="d h-xl t-h1"><span className="ln"><span>{title}</span></span></h1>
              <p className="sub t-sub">Stand: {updated}</p>
            </div>
          </header>
          <main id="main" tabIndex={-1} className="wrap g lg">
            <div className="lg-body">{children}</div>
          </main>
        </>
      )}
    </SubpageShell>
  );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="lg-sec" aria-labelledby={id}>
      <h2 id={id} className="d lg-h">{title}</h2>
      {children}
    </section>
  );
}
