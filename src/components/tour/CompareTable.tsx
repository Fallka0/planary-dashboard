import type { RefObject } from 'react';
import { PRICING_PAGE as P } from '../../content/pricing.de';
import { Ic } from '../Ic';

const PRICE = ['CHF 0', 'CHF 29', 'CHF 149'];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <><Ic name="check" /><span className="sr">ja</span></>;
  if (v === false) return <><span className="ct-no" aria-hidden="true" /><span className="sr">nein</span></>;
  return <>{v}</>;
}

/** The comparison: the Tournament group on /preise, every group with buttons on /preise/vergleich. */
export function CompareTable({ full, tableRef }: { full: boolean; tableRef?: RefObject<HTMLTableElement | null> }) {
  const groups = full ? P.groups : P.groups.filter((g) => !('full' in g && g.full));
  return (
    <table ref={tableRef} className={`ct${full ? ' full' : ''}`} aria-labelledby="cmp-h" role="table">
      <thead role="rowgroup">
        <tr className="ct-r ct-hd" role="row">
          <td className="ct-c" role="cell"><span className="sr">Leistung</span></td>
          {P.plans.map((plan, i) => (
            <th scope="col" role="columnheader" className="ct-c ct-pl" key={plan.id}>
              <b>{plan.n}</b>
              <span>{PRICE[i]} <small>{plan.per}</small></span>
              {full && <a className={`btn btn-s ${plan.id === 'plus' ? 'btn-pri' : 'btn-line'}`} href={plan.href}>{plan.cta}</a>}
            </th>
          ))}
        </tr>
      </thead>
      {groups.map((g) => (
        <tbody key={g.h} role="rowgroup">
          <tr className="ct-gr" role="row"><th scope="colgroup" role="rowheader" colSpan={4} className="ct-g">{g.h}</th></tr>
          {g.rows.map(([label, ...vals]) => (
            <tr className="ct-r" role="row" key={String(label)}>
              <th scope="row" role="rowheader" className="ct-c ct-l">{label}</th>
              {vals.map((v, i) => <td role="cell" className={`ct-c${i === 2 ? ' plus' : ''}`} key={i}><Cell v={v} /></td>)}
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}

export function BiggerOrg() {
  return (
    <p className="big">{P.big.t}<a className="alink" href={P.big.href}>{P.big.cta}<Ic name="arrow-r" small /></a></p>
  );
}
