import { TOURNAMENT_INFO_URL, TOURNAMENT_LIVE_URL } from '../lib/links';
import { BracketSculpture } from './art/BracketSculpture';
import { OpenLink } from './OpenLink';
import { ArrowRight } from './icons';

export function ProductTournament({ artSrc }: { artSrc?: string }) {
  return (
    <article className="tour" data-reveal="" aria-labelledby="tour-h">
      <div className="tour-txt">
        <h3 id="tour-h" className="d p-name">Tournament</h3>
        <p className="lede">Brackets, schedules and match flow for organisers, clubs and gaming communities, so everyone knows who plays whom, and when.</p>
        <div className="links">
          <OpenLink href={TOURNAMENT_LIVE_URL}>Open Tournament</OpenLink>
          <a className="alink" href={TOURNAMENT_INFO_URL}>More about Tournament <ArrowRight /></a>
        </div>
      </div>
      <div className="tour-art" aria-hidden="true">
        <BracketSculpture src={artSrc} />
      </div>
    </article>
  );
}
