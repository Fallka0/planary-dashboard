import { Ic } from '../components/Ic';
import { PricingCards } from '../components/tour/PricingCards';
import { TourFrame, TourNav } from '../components/tour/TourChrome';
import { COMPARE, PRICING, PRICING_PAGE as P } from '../content/pricing.de';

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <><Ic name="check" small /><span className="sr">{COMPARE.yes}</span></>;
  if (v === false) return <><span className="cmp-no" aria-hidden="true">–</span><span className="sr">{COMPARE.no}</span></>;
  return <>{v}</>;
}

export function PricingPage() {
  return (
    <TourFrame variant="tournament">
      {(menu) => (
        <>
          <header className="tp-hero pp-hero">
            <TourNav variant="tournament" {...menu} />
            <div className="wrap g pp-hero-in">
              <div className="pr-h">
                <h1 className="d h-xl">{P.title}</h1>
                <p className="sub">{PRICING.lede}</p>
                <p className="lede" style={{ marginTop: 16 }}>{P.lede}</p>
              </div>
            </div>
          </header>

          <main id="main" tabIndex={-1}>
            <section className="sec wrap g pp-plans" aria-label="Pläne">
              <PricingCards compareHref={`#${COMPARE.id}`} />
            </section>

            <section id={COMPARE.id} className="sec wrap g" aria-labelledby="cmp-h">
              <h2 id="cmp-h" className="d h-m cmp-h">{COMPARE.h2}</h2>
              <div className="cmp-wrap">
                <table className="cmp">
                  <thead>
                    <tr>
                      <td />
                      {COMPARE.cols.map((c, i) => <th scope="col" key={c}><span className="cmp-n">{c}</span><span className="cmp-p">{COMPARE.price[i]}</span></th>)}
                    </tr>
                  </thead>
                  {COMPARE.groups.map((g) => (
                    <tbody key={g.h}>
                      <tr className="cmp-g"><th scope="colgroup" colSpan={5}>{g.h}</th></tr>
                      {g.rows.map(([label, ...vals]) => (
                        <tr key={String(label)}>
                          <th scope="row">{label}</th>
                          {vals.map((v, i) => <td key={i}><Cell v={v} /></td>)}
                        </tr>
                      ))}
                    </tbody>
                  ))}
                </table>
              </div>
              <p className="pr-line"><Ic name="info" small />{PRICING.line}</p>
            </section>

            <section id="faq" className="sec wrap g" aria-labelledby="fq-h">
              <div className="fq-h"><h2 id="fq-h" className="d h-m">{P.faq.h2}</h2></div>
              <div className="fq">
                {P.faq.items.map((item, i) => (
                  <details key={item.q} open={i === 0}>
                    <summary>{item.q}<span className="pm" aria-hidden="true"><Ic name="plus" small /></span></summary>
                    <div className="ans">{item.a.map((p) => <p key={p}>{p}</p>)}</div>
                  </details>
                ))}
              </div>
            </section>
          </main>
        </>
      )}
    </TourFrame>
  );
}
