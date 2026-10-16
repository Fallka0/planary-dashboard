import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { HeroNav } from '../components/HeroNav';
import { SiteShell } from '../components/SiteShell';

/**
 * Stub for a detail page (/casino, /tournament, …): the site's nav on an ink
 * band, then the block the homepage already shows for that product.
 */
export function DetailPage({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = `${title} | Planary`;
  }, [title]);

  return (
    <SiteShell
      anchorBase="/"
      header={(menu) => (
        <header className="page-head">
          <HeroNav {...menu} anchorBase="/" signIn />
        </header>
      )}
    >
      <main className="page-main">{children}</main>
    </SiteShell>
  );
}
