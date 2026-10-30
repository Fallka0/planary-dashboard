import { useEffect, useRef } from 'react';
import { Ic } from '../components/Ic';
import { BiggerOrg, CompareTable } from '../components/tour/CompareTable';
import { PricingCards } from '../components/tour/PricingCards';
import { TourFrame, TourNav } from '../components/tour/TourChrome';
import { PRICING_PAGE as P } from '../content/pricing.de';

const MAX = Math.max(...P.five.bars);
const PLUS = 149;
/** Bar heights in px: the tallest bar is 156, the board's scale. */
const px = (v: number) => Math.round((v / MAX) * 156);

/** Passes against Plus: bars for 1 to 6 passes, a dashed line at CHF 149. */
function Five() {
  const f = P.five;
  return (
    <section className="five wrap" aria-labelledby="fv-h">
      <div className="fv">
        <h2 id="fv-h" className="d fv-h">{f.h}</h2>
        <figure className="fv-ch" aria-label="Turnier-Pässe gegen Plus: 1 Pass CHF 29, 5 Pässe CHF 145, 6 Pässe CHF 174. Plus kostet CHF 149 im Jahr, ab dem sechsten Turnier zahlst du mit Pässen mehr.">
          <div className="fv-plot" aria-hidden="true">
            <span className="fv-line" style={{ bottom: px(PLUS) }}><span>{f.plus}</span></span>
            {f.bars.map((v, i) => (
              <div className={`fv-b${v > PLUS ? ' over' : ''}`} key={v}>
                <span className="fv-v">CHF {v}</span><i style={{ height: px(v) }} /><span className="fv-n">{i + 1}</span>
              </div>
            ))}
          </div>
          <figcaption className="fv-ax">{f.axis} · Turnier-Pass je CHF 29</figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Marks the plan header of /preise/vergleich as stuck while it sticks, for its shadow. */
export function useStuck() {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    const head = ref.current?.querySelector<HTMLElement>('.ct-hd');
    if (!head) return;
    const onScroll = () => head.classList.toggle('stuck', head.getBoundingClientRect().top <= 0 && window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}

export function PricingPage() {
  return (
    <TourFrame variant="pricing">
      {(menu) => (
        <>
          <header>
            <TourNav variant="pricing" {...menu} />
          </header>
          <main id="main" tabIndex={-1}>
            <section className="pp wrap g" aria-labelledby="pp-h">
              <div className="pp-head">
                <h1 id="pp-h" className="d h-xl"><span style={{ display: 'block' }}>{P.h1[0]}</span><span style={{ display: 'block' }}>{P.h1[1]}</span></h1>
                <p className="sub">{P.sub}</p>
              </div>
              <PricingCards page />
              <p className="pr-note">{P.notes.map((n) => <span key={n}><Ic name="info" small />{n}</span>)}</p>
            </section>

            <Five />

            <section id="vergleich" className="cmp wrap" aria-labelledby="cmp-h">
              <div className="cmp-head">
                <h2 id="cmp-h" className="d h-m">{P.cmpH}</h2>
                <a className="alink" href="/preise/vergleich">{P.cmpAll}<Ic name="arrow-r" small /></a>
              </div>
              <CompareTable full={false} />
              <BiggerOrg />
            </section>

            <section id="faq" className="sec wrap g" aria-labelledby="fq-h">
              <div className="fq-h"><h2 id="fq-h" className="d h-m">{P.faqH}</h2></div>
              <div className="fq">
                {P.faq.map((item, i) => (
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

export function ComparePage() {
  const ref = useStuck();
  return (
    <TourFrame variant="pricing">
      {(menu) => (
        <>
          <header>
            <TourNav variant="pricing" {...menu} />
          </header>
          <main id="main" tabIndex={-1}>
            <section className="cmp solo wrap" aria-labelledby="cmp-h">
              <div className="cmp-head"><h1 id="cmp-h" className="d h-m">{P.cmpAllH}</h1></div>
              <CompareTable full tableRef={ref} />
              <BiggerOrg />
            </section>
          </main>
        </>
      )}
    </TourFrame>
  );
}
