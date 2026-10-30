import { useRef } from 'react';
import { VAULT_PAGE as C, VAULT_PLANS } from '../content/vault-page.en';
import { Ic } from '../components/Ic';
import { Logo } from '../components/Logo';
import { TourFrame, TourNav } from '../components/tour/TourChrome';
import { CONTACT_EMAIL, CONTACT_MAILTO, VAULT_LIVE_URL, VAULT_PLANS_URL, VAULT_PRICING_URL } from '../lib/links';
import { useReveals } from '../lib/useReveals';
import { useVerbs } from '../lib/useVerbs';

/** The hero's screen: an encrypted file list, one file still encrypting. Always dark, like the app. */
function Files() {
  return (
    <figure className="tp-scr vp-files" aria-label={C.hero.screenLabel}>
      <div className="scr">
        <div className="scr-top">
          <span className="scr-t">All files</span>
          <span className="scr-live"><Ic name="lock" small />Encrypted</span>
          <span className="scr-clock">2.4 GB</span>
        </div>
        <ul className="vp-rows">
          {C.hero.files.map(([type, name, size]) => (
            <li key={name}><span className="vp-type">{type}</span><span className="vp-name">{name}</span><span className="vp-size">{size}</span></li>
          ))}
          <li className="vp-enc">
            <span className="vp-name">{C.hero.encrypting}</span>
            <span className="vp-size">Encrypting…</span>
            <span className="vp-bar" aria-hidden="true"><i /></span>
          </li>
        </ul>
        <div className="scr-foot"><Logo href={null} /></div>
      </div>
    </figure>
  );
}

/** A small piece of the app above each feature: drawn in HTML, decorative, so screen readers skip it. */
function FeatureArt({ id }: { id: string }) {
  switch (id) {
    case 'history':
      return (
        <ol className="fa-hist">
          <li className="is-cur"><span>Tax return 2025.pdf</span><em>Today</em></li>
          <li><span>Version 2</span><em>12 Mar</em></li>
          <li><span>Version 1</span><em>3 Feb</em></li>
        </ol>
      );
    case 'links':
      return (
        <div className="fa-link">
          <p className="fa-url"><Ic name="lock" small /><span>vault.planary.ch/s/k3Q9…</span></p>
          <p className="fa-chips"><span>Password</span><span>Ends 14 Nov</span><span>10 downloads</span></p>
        </div>
      );
    case 'search':
      return (
        <div className="fa-search">
          <p className="fa-field"><Ic name="search" small /><span>tax<i /></span></p>
          <p className="fa-hit"><b>Tax</b> return 2025.pdf<em>Finance</em></p>
          <p className="fa-hit"><b>Tax</b> office letter.pdf<em>Letters</em></p>
        </div>
      );
    case 'recovery':
      return (
        <div className="fa-key">
          <p className="fa-key-l">Recovery key</p>
          <p className="fa-key-c"><span>7KQ2</span><span>M9XD</span><span>4PLA</span><span>R8TN</span><span>W2HC</span><span>Q6VE</span></p>
        </div>
      );
    case 'phone':
      return (
        <div className="fa-phone">
          <div className="fa-ph">
            <span className="fa-ph-n" />
            {[62, 48, 70, 40].map((w) => <span key={w} className="fa-ph-r"><i style={{ width: `${w}%` }} /></span>)}
          </div>
        </div>
      );
    default:
      return (
        <div className="fa-acct">
          <span className="fa-av">NB</span>
          <p className="fa-apps">{['Tournament', 'Wishlist', 'Vault'].map((a) => <span key={a}><Ic name="check" small />{a}</span>)}</p>
        </div>
      );
  }
}

/** The three plan cards; the pricing page has the same ones with a monthly/yearly switch. */
export function VaultPlanCards({ period }: { period: 'month' | 'year' }) {
  return (
    <div className="pr">
      {VAULT_PLANS.map((plan) => {
        const amount = period === 'year' ? plan.yearly : plan.monthly;
        const href = plan.id === 'free' ? VAULT_LIVE_URL : `${VAULT_PLANS_URL}?plan=${plan.id}&period=${period}`;
        return (
          <article className={`pc${plan.id === 'pro' ? ' vp-hl' : ''}`} aria-labelledby={`pc-${plan.id}`} key={plan.id}>
            <div>
              <h3 id={`pc-${plan.id}`} className="pc-n">{plan.n}</h3>
              <p className="pc-for" style={{ marginTop: 8 }}>{plan.for}</p>
            </div>
            <p className="pc-price">
              <span className="pc-cur">CHF</span><span className="pc-amt">{amount}</span>
              <span className="pc-per">{plan.id === 'free' ? 'forever' : period === 'year' ? 'per year, one invoice' : 'per month'}</span>
            </p>
            <ul>{plan.li.map((x) => <li key={x}><Ic name="check" small /><span>{x}</span></li>)}</ul>
            <a className="btn btn-pri" href={href}>{plan.cta}</a>
          </article>
        );
      })}
    </div>
  );
}

export function VaultFaq({ items, aside }: { items: readonly { q: string; a: readonly string[] }[]; aside?: boolean }) {
  return (
    <section id="faq" className="sec wrap g" aria-labelledby="fq-h">
      <div className="fq-h">
        <h2 id="fq-h" className="d h-m" data-reveal="">{C.faq.h2}</h2>
        {aside && <p className="lede">{C.faq.missing} <a className="ul vp-mail" href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a></p>}
      </div>
      <div className="fq">
        {items.map((item, i) => (
          <details key={item.q} open={i === 0}>
            <summary>{item.q}<span className="pm" aria-hidden="true"><Ic name="plus" small /></span></summary>
            <div className="ans">{item.a.map((p) => <p key={p}>{p}</p>)}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function VaultPage() {
  const mainRef = useRef<HTMLElement>(null);
  const verbsRef = useRef<HTMLElement>(null);
  useReveals(mainRef);
  useVerbs(verbsRef);
  return (
    <TourFrame variant="vault">
      {(menu) => (
        <>
          <header className="tp-hero vp-hero">
            <TourNav variant="vault" {...menu} />
            <div className="wrap g tp-hero-in">
              <div className="tp-txt">
                <h1 className="d h-xl">{C.hero.h1.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}</h1>
                <p className="sub">{C.hero.sub}</p>
                <div className="acts">
                  <a className="btn btn-pri" href={VAULT_LIVE_URL}>{C.hero.cta}</a>
                  <a className="alink" href="#how">{C.hero.alt}<Ic name="arrow-r" small /></a>
                </div>
                <p className="fine"><Ic name="check" small />{C.hero.fine}</p>
              </div>
              <Files />
            </div>
          </header>

          <main id="main" tabIndex={-1} ref={mainRef}>
            <section id="how" className="verbs-track" aria-labelledby="verbs-h" ref={verbsRef}>
              <div className="sec wrap g verbs">
                <h2 id="verbs-h" className="d h-m verbs-h" data-reveal="">{C.verbs.h2}</h2>
                {C.verbs.items.map((v, i) => (
                  <div key={v.t} className={`v v${i + 1}`} data-reveal=""><h3><span className="v-w">{v.t}</span></h3><p>{v.p}</p></div>
                ))}
              </div>
            </section>

            <section className="sec wrap g" aria-labelledby="get-h">
              <h2 id="get-h" className="d h-m vp-get-h" data-reveal="">{C.features.h2}</h2>
              <ul className="vp-get" data-reveal="">
                {C.features.items.map((f) => (
                  <li key={f.id}>
                    <div className="fa" aria-hidden="true"><FeatureArt id={f.id} /></div>
                    <h3><Ic name={f.icon} small />{f.t}</h3>
                    <p>{f.p}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="security" className="sec wrap g" aria-labelledby="sec-h">
              <h2 id="sec-h" className="d h-m vp-get-h" data-reveal="">{C.security.h2}</h2>
              <div className="vp-see" data-reveal="">
                <div className="vp-hidden">
                  <h3>{C.security.hidden.h}</h3>
                  <ul>{C.security.hidden.li.map((x) => <li key={x}><Ic name="lock" small />{x}</li>)}</ul>
                </div>
                <div className="vp-seen">
                  <h3>{C.security.seen.h}</h3>
                  <ul>{C.security.seen.li.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
            </section>

            <section id="pricing" className="sec wrap g" aria-labelledby="pr-h">
              <div className="pr-h"><h2 id="pr-h" className="d h-m" data-reveal="">{C.pricing.h2}</h2></div>
              <VaultPlanCards period="month" />
              <div className="vp-pr-foot">
                <p className="fine">{C.pricing.note}</p>
                <a className="alink" href={VAULT_PRICING_URL}>{C.pricing.all}<Ic name="arrow-r" small /></a>
              </div>
            </section>

            <VaultFaq items={C.faq.items} aside />

            <section className="end vp-end" aria-labelledby="end-h">
              <h2 id="end-h" className="d h-l">{C.end.h2}</h2>
              <div className="acts">
                <a className="btn btn-paper" href={VAULT_LIVE_URL}>{C.end.cta}</a>
                <a className="btn btn-line vp-line" href={VAULT_PRICING_URL}>{C.end.alt}</a>
              </div>
            </section>
          </main>
        </>
      )}
    </TourFrame>
  );
}
