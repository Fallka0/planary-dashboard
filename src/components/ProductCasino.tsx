import { CASINO_INFO_URL, CASINO_LIVE_URL } from '../lib/links';
import { ChipStack } from './art/ChipStack';
import { ArrowRight } from './icons';

export function ProductCasino({ artSrc }: { artSrc?: string }) {
  return (
    <article className="casino" data-reveal="" aria-labelledby="casino-h">
      <div className="casino-art" aria-hidden="true">
        <ChipStack src={artSrc} />
      </div>
      <div className="casino-txt">
        <h3 id="casino-h" className="d p-name">Planary Casino</h3>
        <p className="domain">casino.planary.ch</p>
        <p className="casino-lede">A game lobby that runs on play money, with one chip balance that follows your account to every table, plus friends, a weekly leaderboard, achievements and a market for cosmetics.</p>
        <ul className="games" aria-label="Games in the lobby">
          <li>Blackjack</li>
          <li>Roulette</li>
          <li>Slots</li>
          <li>Hold’em poker</li>
          <li>Grimoire <small>a solo card game</small></li>
          <li>Nerve</li>
        </ul>
        <p className="fine">It’s play money only: chips have no cash value and can’t be bought, sold or exchanged. Every game is provably fair.</p>
        <div className="actions">
          <a className="btn btn-paper" href={CASINO_LIVE_URL}>Open the casino</a>
          <a className="alink" href={CASINO_INFO_URL}>More about the casino <ArrowRight /></a>
        </div>
      </div>
    </article>
  );
}
