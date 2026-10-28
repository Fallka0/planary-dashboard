import { PRICING } from '../../content/pricing.de';
import { Ic } from '../Ic';

/** The three plans and the Tournament Pass beside them, on /tournament and /preise. */
export function PricingCards({ compareHref }: { compareHref: string }) {
  const p = PRICING;
  return (
    <>
      <div className="pr">
        {p.plans.map((plan) => (
          <article className={`pc${plan.style === 'ink' ? ' ink' : ''}${plan.style === 'pass' ? ' pass' : ''}`} aria-labelledby={`pc-${plan.id}`} key={plan.id}>
            <div>
              <h3 id={`pc-${plan.id}`} className="pc-n">{plan.n}{'tag' in plan && <span className="pc-tag">· {plan.tag}</span>}</h3>
              <p className="pc-for" style={{ marginTop: 8 }}>{plan.for}</p>
            </div>
            <p className="pc-price">
              <span className="pc-cur">CHF</span><span className="pc-amt">{plan.amt}</span><span className="pc-per">{plan.per}</span>
            </p>
            <ul>{plan.li.map((x) => <li key={x}><Ic name="check" small /><span>{x}</span></li>)}</ul>
            <a className={`btn ${plan.style === 'ink' ? 'btn-paper' : 'btn-pri'}`} href={plan.href}>{plan.cta}</a>
          </article>
        ))}
      </div>
      <p className="pr-line"><Ic name="info" small />{p.line}</p>
      <p className="pr-note">
        {p.notes.map((n) => <span key={n}>{n}</span>)}
        <a className="alink" href={compareHref}>{p.compareLink}<Ic name="arrow-r" small /></a>
      </p>
    </>
  );
}
