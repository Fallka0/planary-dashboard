import { HOME } from '../content/home.en';
import type { IconName } from '../design/icons';
import { roundsEn } from '../lib/sampleTournament';
import { Ic } from './Ic';
import { Logo } from './Logo';
import { Bracket } from './tour/Bracket';

const T = HOME.products.tournament;
const LIST_ICONS: IconName[] = ['screen', 'users', 'cal', 'phone'];
const ROUNDS = roundsEn();

/** Tournament, the main product: ink card with the beamer screen and the live bracket. */
export function ProductTournament() {
  return (
    <article className="tf" data-reveal="" aria-labelledby="tf-h">
      <div className="tf-txt">
        <h3 id="tf-h" className="d tf-name">{T.name}</h3>
        <p className="domain">{T.domain}</p>
        <p className="tf-lede">{T.lede}</p>
        <ul className="tf-list">
          {T.list.map((item, i) => (
            <li key={item}><Ic name={LIST_ICONS[i]} small />{item}</li>
          ))}
        </ul>
        <div className="tf-acts">
          <a className="btn btn-paper" href={T.cta.href}>{T.cta.label}</a>
          <a className="alink tf-more" href={T.more.href}>{T.more.label}<Ic name="arrow-r" small /></a>
        </div>
      </div>
      <figure className="tf-scr" aria-label={T.screenLabel}>
        <div className="scr">
          <div className="scr-top"><span className="scr-t">Gurten LAN</span><span className="scr-live"><span className="live-dot" />Live · Semifinals</span><span className="scr-clock">16:20</span></div>
          <div className="bk-wrap"><Bracket rounds={ROUNDS} /></div>
          <div className="scr-foot"><Logo href={null} /></div>
        </div>
      </figure>
    </article>
  );
}
