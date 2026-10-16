import { WISHLIST_INFO_URL, WISHLIST_LIVE_URL } from '../lib/links';
import { GiftStack } from './art/GiftStack';
import { useAnimOnView } from '../lib/useAnimOnView';
import { OpenLink } from './OpenLink';
import { ArrowRight } from './icons';

export function ProductWishlist({ artSrc }: { artSrc?: string }) {
  const artRef = useAnimOnView<HTMLAnchorElement>();
  return (
    <article className="wish g" data-reveal="" aria-labelledby="wish-h">
      <a className="wish-media" href={WISHLIST_INFO_URL} tabIndex={-1} aria-hidden="true" data-anim="" ref={artRef}>
        <GiftStack src={artSrc} />
      </a>
      <h3 id="wish-h" className="d p-name wish-name">Planary Wishlist</h3>
      <div className="wish-body">
        <p className="lede">Save gift ideas the moment you have them, sort them into lists and share a list with family or friends before the birthday comes round.</p>
        <div className="links">
          <OpenLink href={WISHLIST_LIVE_URL}>Open Wishlist</OpenLink>
          <a className="alink" href={WISHLIST_INFO_URL}>More about Wishlist <ArrowRight /></a>
        </div>
      </div>
    </article>
  );
}
