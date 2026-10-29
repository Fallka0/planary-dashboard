import { PRICING_PAGE as P } from '../../content/pricing.de';
import { Ic } from '../Ic';

/**
 * Gratis, Turnier-Pass and Plus. On /preise the pass is drawn as a ticket ("Kein Abo") and
 * the cards carry h2s; in the /tournament section they are plain cards under its h2.
 */
export function PricingCards({ page }: { page: boolean }) {
  const H = page ? 'h2' : 'h3';
  return (
    <div className={`pr${page ? ' pp-cards' : ''}`}>
      {P.plans.map((plan) => {
        const pass = plan.style === 'pass';
        const ink = plan.style === 'ink';
        const btn = ink ? 'btn-paper' : page && plan.id === 'gratis' ? 'btn-line' : 'btn-pri';
        return (
          <article className={`pc${ink ? ' ink' : ''}${page && pass ? ' pass' : ''}`} aria-labelledby={`pc-${plan.id}`} key={plan.id}>
            <div>
              <div className="pc-top">
                <H id={`pc-${plan.id}`} className="pc-n">{plan.n}</H>
                {page && 'tag' in plan && <span className="chip chip-ph">{plan.tag}</span>}
              </div>
              <p className="pc-for" style={{ marginTop: 8 }}>{plan.for}</p>
            </div>
            <p className="pc-price"><span className="pc-cur">CHF</span><span className="pc-amt">{plan.amt}</span><span className="pc-per">{plan.per}</span></p>
            <ul>{plan.li.map((x) => <li key={x}><Ic name="check" small /><span>{x}</span></li>)}</ul>
            <a className={`btn ${btn}`} href={plan.href}>{plan.cta}</a>
          </article>
        );
      })}
    </div>
  );
}
