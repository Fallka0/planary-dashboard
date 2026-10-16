import { useRef } from 'react';
import { AccountRow } from './components/AccountRow';
import { CompactBar } from './components/CompactBar';
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
import { useMenu } from './lib/useMenu';
import { useReveals } from './lib/useReveals';

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { menuOpen, openMenu, closeMenu } = useMenu();
  useReveals(rootRef);

  return (
    <Frame
      rootRef={rootRef}
      inert={menuOpen}
      bar={<CompactBar anchorBase="" menuOpen={menuOpen} onOpenMenu={openMenu} inert={menuOpen} />}
      overlay={<MenuSheet open={menuOpen} onClose={closeMenu} />}
    >
      <Hero menuOpen={menuOpen} onOpenMenu={openMenu} />

      <div className="body">
        <SectionIndex />

        <main className="main" id="main" tabIndex={-1}>
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
