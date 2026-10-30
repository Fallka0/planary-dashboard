import { useRef, useState } from 'react';
import { VAULT_COMPARE, VAULT_PAGE as C, VAULT_PLANS } from '../content/vault-page.en';
import { Ic } from '../components/Ic';
import { TourFrame, TourNav } from '../components/tour/TourChrome';
import { CONTACT_MAILTO, VAULT_PRICING_URL } from '../lib/links';
import { useReveals } from '../lib/useReveals';
import { VaultFaq, VaultPlanCards } from './VaultPage';

const P = C.pricingPage;

function Cell({ v }: { v: string | boolean | null }) {
  if (v === true) return <Ic name="check" small />;
  if (v === null || v === false) return <span className="vp-dash" aria-label="Not included">–</span>;
  return <>{v}</>;
}

export function VaultPricingPage() {
  const mainRef = useRef<HTMLElement>(null);
  useReveals(mainRef);
  const [period, setPeriod] = useState<'month' | 'year'>('month');
  const priceOf = (id: (typeof VAULT_PLANS)[number]['id']) => {
    const p = VAULT_PLANS.find((x) => x.id === id)!;
    if (id === 'free') return 'CHF 0 forever';
    return period === 'year' ? `CHF ${p.yearly} per year` : `CHF ${p.monthly} per month`;
  };

  return (
    <TourFrame variant="vault">
      {(menu) => (
        <>
          <header>
            <TourNav variant="vault" current={VAULT_PRICING_URL} {...menu} />
          </header>
          <main id="main" tabIndex={-1} ref={mainRef}>
            <section className="wrap g vp-pp-head" aria-labelledby="pp-h">
              <div className="vp-pp-t">
                <h1 id="pp-h" className="d h-xl">{P.h1}</h1>
                <p className="sub">{P.sub}</p>
              </div>
              <div className="vp-period">
                <div className="vp-seg" role="group" aria-label="Billing period">
                  <button type="button" aria-pressed={period === 'month'} onClick={() => setPeriod('month')}>{P.monthly}</button>
                  <button type="button" aria-pressed={period === 'year'} onClick={() => setPeriod('year')}>{P.yearly}</button>
                </div>
                <span className="chip chip-ph">{P.save}</span>
              </div>
              <VaultPlanCards period={period} />
              <p className="pr-note">{P.notes.map((n) => <span key={n}>{n}</span>)}</p>
            </section>

            <section className="sec wrap g" aria-labelledby="cmp-h">
              <h2 id="cmp-h" className="d h-m vp-get-h" data-reveal="">{P.compared}</h2>
              <div className="vp-cmp-wrap" data-reveal="">
                <table className="vp-cmp">
                  <thead>
                    <tr>
                      <td />
                      {VAULT_PLANS.map((p) => (
                        <th key={p.id} scope="col"><b>{p.n}</b><span>{priceOf(p.id)}</span></th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="vp-cmp-g"><th scope="rowgroup" colSpan={4}>{P.group}</th></tr>
                    {VAULT_COMPARE.map(([label, ...cells]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        {cells.map((v, i) => <td key={i}><Cell v={v} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="fine vp-more">{P.more} <a className="alink" href={CONTACT_MAILTO}>{P.write}<Ic name="arrow-r" small /></a></p>
            </section>

            <VaultFaq items={P.faq} />
            <div style={{ height: 120 }} aria-hidden="true" />
          </main>
        </>
      )}
    </TourFrame>
  );
}
