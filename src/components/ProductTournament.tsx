import { TOURNAMENT_INFO_URL, TOURNAMENT_LIVE_URL } from '../lib/links';
import { BracketSculpture } from './art/BracketSculpture';
import { OpenLink } from './OpenLink';
import { ArrowRight } from './icons';

interface ProductProps {
  artSrc?: string;
  /** h3 on the homepage, h1 on the product's own page. */
  heading?: 'h1' | 'h3';
  /** The "More about …" link; off on the product's own page. */
  more?: boolean;
}

export function ProductTournament({ artSrc, heading: Heading = 'h3', more = true }: ProductProps) {
  return (
    <article className="tour" data-reveal="" aria-labelledby="tour-h">
      <div className="tour-txt">
        <Heading id="tour-h" className="d p-name">Tournament</Heading>
        <p className="lede">Brackets, schedules and match flow for organisers, clubs and gaming communities, so everyone knows who plays whom, and when.</p>
        <div className="links">
          <OpenLink href={TOURNAMENT_LIVE_URL}>Open Tournament</OpenLink>
          {more && <a className="alink" href={TOURNAMENT_INFO_URL}>More about Tournament <ArrowRight /></a>}
        </div>
      </div>
      <div className="tour-art" aria-hidden="true">
        <BracketSculpture src={artSrc} />
      </div>
    </article>
  );
}
