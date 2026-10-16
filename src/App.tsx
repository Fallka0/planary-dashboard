import { useCallback, useEffect, useRef, useState } from 'react';
import { AccountRow } from './components/AccountRow';
import { ContactCard } from './components/ContactCard';
import { Footer } from './components/Footer';
import { Frame } from './components/Frame';
import { Hero } from './components/Hero';
import { MenuSheet } from './components/MenuSheet';
import { Principles } from './components/Principles';
import { ProductCasino } from './components/ProductCasino';
import { ProductTournament } from './components/ProductTournament';
import { ProductWishlist } from './components/ProductWishlist';
import { SectionIndex } from './components/SectionIndex';
import { Statement } from './components/Statement';
import { Studio } from './components/Studio';
import { useReveals } from './lib/useReveals';

export default function App() {
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

  return (
    <Frame
      rootRef={rootRef}
      inert={menuOpen}
      overlay={<MenuSheet open={menuOpen} onClose={closeMenu} />}
    >
      <Hero menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} menuButtonRef={menuButtonRef} />

      <div className="body">
        <SectionIndex />

        <main className="main">
          <Statement />

          <section id="products" aria-labelledby="products-h">
            <div className="g" data-reveal=""><h2 id="products-h" className="d sec-h products-h">What’s on the shelf</h2></div>
            <ProductCasino />
            <ProductTournament />
            <ProductWishlist />
            <AccountRow />
          </section>

          <Principles />
          <Studio />
          <ContactCard />
        </main>
      </div>

      <Footer />
    </Frame>
  );
}
