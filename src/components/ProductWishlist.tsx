import { WISHLIST_INFO_URL, WISHLIST_LIVE_URL } from '../lib/links';
import { RibbonScene } from './art/RibbonScene';
import { OpenLink } from './OpenLink';
import { ArrowRight } from './icons';

interface ProductProps {
  artSrc?: string;
  /** h3 on the homepage, h1 on the product's own page. */
  heading?: 'h1' | 'h3';
  /** The "More about …" link; off on the product's own page. */
  more?: boolean;
}

export function ProductWishlist({ artSrc, heading: Heading = 'h3', more = true }: ProductProps) {
  return (
    <article className="wish g" data-reveal="" aria-labelledby="wish-h">
      <a className="wish-media" href={more ? WISHLIST_INFO_URL : WISHLIST_LIVE_URL} tabIndex={-1} aria-hidden="true">
        <RibbonScene src={artSrc} />
      </a>
      <Heading id="wish-h" className="d p-name wish-name">Planary Wishlist</Heading>
      <div className="wish-body">
        <p className="lede">Save gift ideas the moment you have them, sort them into lists and share a list with family or friends before the birthday comes round.</p>
        <div className="links">
          <OpenLink href={WISHLIST_LIVE_URL}>Open Wishlist</OpenLink>
          {more && <a className="alink" href={WISHLIST_INFO_URL}>More about Wishlist <ArrowRight /></a>}
        </div>
      </div>
    </article>
  );
}
