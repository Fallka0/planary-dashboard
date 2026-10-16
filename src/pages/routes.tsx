import { AccountRow } from '../components/AccountRow';
import { ContactCard } from '../components/ContactCard';
import { ProductCasino } from '../components/ProductCasino';
import { ProductTournament } from '../components/ProductTournament';
import { ProductWishlist } from '../components/ProductWishlist';
import { Studio } from '../components/Studio';
import { DetailPage } from './DetailPage';
import { HomePage } from './HomePage';

/** Every page, by path. Anything else falls back to the homepage. */
export function pageFor(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  switch (path) {
    case '/casino':
      return <DetailPage title="Planary Casino"><ProductCasino heading="h1" more={false} /></DetailPage>;
    case '/tournament':
      return <DetailPage title="Tournament"><ProductTournament heading="h1" more={false} /></DetailPage>;
    case '/wishlist':
      return <DetailPage title="Planary Wishlist"><ProductWishlist heading="h1" more={false} /></DetailPage>;
    case '/account':
      return <DetailPage title="Planary Account"><AccountRow heading="h1" /></DetailPage>;
    case '/team':
      return (
        <DetailPage title="Team">
          <Studio heading="h1" />
          <ContactCard />
        </DetailPage>
      );
    default:
      return <HomePage />;
  }
}
