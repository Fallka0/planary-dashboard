import { AccountRow } from '../components/AccountRow';
import { ContactCard } from '../components/ContactCard';
import { Hero } from '../components/Hero';
import { Principles } from '../components/Principles';
import { ProductCasino } from '../components/ProductCasino';
import { ProductTournament } from '../components/ProductTournament';
import { ProductWishlist } from '../components/ProductWishlist';
import { SectionIndex } from '../components/SectionIndex';
import { SiteShell } from '../components/SiteShell';
import { Statement } from '../components/Statement';
import { Studio } from '../components/Studio';

export function HomePage() {
  return (
    <SiteShell anchorBase="" header={(menu) => <Hero {...menu} />}>
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
    </SiteShell>
  );
}
