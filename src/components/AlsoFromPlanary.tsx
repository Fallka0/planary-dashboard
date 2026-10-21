import type { ReactNode } from 'react';
import { HOME } from '../content/home.en';
import { CASINO_INFO_URL, CASINO_LIVE_URL, WISHLIST_INFO_URL, WISHLIST_LIVE_URL } from '../lib/links';
import { useAnimOnView } from '../lib/useAnimOnView';
import { ChipStack } from './art/ChipStack';
import { GiftStack } from './art/GiftStack';
import { Ic } from './Ic';

const P = HOME.products;

interface AppCardProps {
  id: string;
  name: string;
  text: string;
  open: string;
  live: string;
  more: string;
  /** Completes "More" for screen readers. */
  moreSr: string;
  ink?: boolean;
  art: ReactNode;
}

function AppCard({ id, name, text, open, live, more, moreSr, ink = false, art }: AppCardProps) {
  const artRef = useAnimOnView<HTMLDivElement>();
  return (
    <article className="app" data-reveal="" aria-labelledby={id}>
      <div className={`app-pic${ink ? ' app-pic-ink' : ''} app-art`} aria-hidden="true" data-anim="" ref={artRef}>{art}</div>
      <div className="app-txt">
        <h3 id={id} className="d app-n">{name}</h3>
        <p className="app-p">{text}</p>
        <div className="app-acts">
          <a className="open" href={live}><span className="rbtn" aria-hidden="true"><Ic name="arrow-ur" small /></span>{open}</a>
          <a className="alink" href={more}>{P.casino.more}<span className="sr"> {moreSr}</span><Ic name="arrow-r" small /></a>
        </div>
      </div>
    </article>
  );
}

/** Casino and Wishlist as two equal cards; each object builds once when it scrolls into view. */
export function AlsoFromPlanary() {
  return (
    <>
      <div className="also g" data-reveal="">
        <h3 className="also-h">{P.also.h}</h3>
      </div>
      <div className="apps g">
        <AppCard id="ap-casino" name={P.casino.name} text={P.casino.p} open={P.casino.open} live={CASINO_LIVE_URL} more={CASINO_INFO_URL} moreSr="about the casino" ink art={<ChipStack />} />
        <AppCard id="ap-wish" name={P.wishlist.name} text={P.wishlist.p} open={P.wishlist.open} live={WISHLIST_LIVE_URL} more={WISHLIST_INFO_URL} moreSr="about Wishlist" art={<GiftStack />} />
      </div>
    </>
  );
}
