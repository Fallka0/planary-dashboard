import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, RefObject } from 'react';
import { TOURNAMENT_PAGE as C } from '../content/tournament-page.de';
import { Ic } from '../components/Ic';
import { Logo } from '../components/Logo';
import { Bracket } from '../components/tour/Bracket';
import { TourFrame, TourNav } from '../components/tour/TourChrome';
import type { IconName } from '../design/icons';
import { TOURNAMENT_NEW_URL } from '../lib/links';
import { ROUNDS_DE, SCHEDULE_DE, STATE_DE, TEAMS, roundsDe, side } from '../lib/sampleTournament';

const BRACKET = roundsDe();
const BRACKET_MINI = roundsDe({ from: 1, liveShort: true });
const ALL = ROUNDS_DE.flatMap((r) => r.ms.map((m) => ({ ...m, round: r.name })));
const META_ICONS: IconName[] = ['game', 'cal', 'pin', 'bracket'];
type Tab = (typeof C.example.tabs)[number]['id'];

/** The match in the side panel: teams, scores, state, station, time and a note. */
function selection(id: string) {
  const m = ALL.find((x) => x.id === id) ?? ALL[5];
  const a = side(m, 'a');
  const b = side(m, 'b');
  if (m.state === 'live') {
    a.cls = '';
    b.cls = 'lose';
  }
  const note = m.note
    ?? (m.state === 'later' ? 'Die Teams stehen fest, sobald beide Halbfinals gespielt sind.' : m.state === 'next' ? 'Beide Teams sind eingecheckt.' : 'Resultat von beiden Teams bestätigt.');
  return { title: m.round + (m.code.startsWith('F') ? '' : ` · ${m.code}`), a, b, state: STATE_DE[m.state], st: m.st, when: m.t, note };
}

function Screen({ label }: { label: string }) {
  return (
    <figure className="tp-scr" aria-label={label}>
      <div className="scr">
        <div className="scr-top"><span className="scr-t">Gurten LAN</span><span className="scr-live"><span className="live-dot" />Live · Halbfinals</span><span className="scr-clock">16:20</span></div>
        <div className="bk-wrap"><Bracket rounds={BRACKET} /></div>
        <div className="scr-foot"><Logo href={null} /></div>
      </div>
    </figure>
  );
}

function Steps() {
  const s = C.steps;
  const [one, two, three] = s.items;
  return (
    <section id={s.id} className="sec wrap g" aria-labelledby="ab-h">
      <div className="st-h"><h2 id="ab-h" className="d h-m">{s.h2}</h2><p className="lede">{s.lede}</p></div>
      <ol className="st-list">
        <li className="st">
          <span className="st-n" aria-hidden="true">{one.n}</span>
          <div><h3 className="st-t">{one.t}</h3><p className="st-p">{one.p}</p></div>
          <div className="vg" aria-hidden="true">
            <span className="vg-l">{s.vgFormat.label}</span>
            <div className="vg-row">{s.vgFormat.opts.map((o, i) => <span key={o} className={`vg-pill${i === s.vgFormat.on ? ' on' : ''}`}>{o}</span>)}</div>
            <span className="vg-l">{s.vgFormat.label2}</span>
            <div className="vg-row">{s.vgFormat.opts2.map((o, i) => <span key={o} className={`vg-pill${i === s.vgFormat.on2 ? ' on' : ''}`}>{o}</span>)}</div>
          </div>
        </li>
        <li className="st">
          <span className="st-n" aria-hidden="true">{two.n}</span>
          <div><h3 className="st-t">{two.t}</h3><p className="st-p">{two.p}</p></div>
          <div className="vg" aria-hidden="true">
            <span className="vg-l">{s.vgInvite.label}</span>
            <div className="vg-url"><Ic name="link" small /><span>{s.vgInvite.url}</span><b style={{ fontSize: 12 }}>{s.vgInvite.copy}</b></div>
            <div className="vg-bar"><i style={{ width: '75%' }} /></div>
            <div className="vg-meta"><b>{s.vgInvite.count}</b><span>{s.vgInvite.left}</span></div>
          </div>
        </li>
        <li className="st">
          <span className="st-n" aria-hidden="true">{three.n}</span>
          <div><h3 className="st-t">{three.t}</h3><p className="st-p">{three.p}</p></div>
          <div className="vg" aria-hidden="true">
            <span className="vg-l">{s.vgScore.label}</span>
            <div className="vg-score"><span className="vg-team"><span className="mono">{s.vgScore.at}</span><span>{s.vgScore.a}</span></span><span className="vg-step"><i>−</i><b>{s.vgScore.sa}</b><i>+</i></span></div>
            <div className="vg-score"><span className="vg-team"><span className="mono">{s.vgScore.bt}</span><span>{s.vgScore.b}</span></span><span className="vg-step"><i>−</i><b>{s.vgScore.sb}</b><i>+</i></span></div>
            <span className="vg-ok"><Ic name="check" small />{s.vgScore.ok}</span>
          </div>
        </li>
      </ol>
    </section>
  );
}

function Features() {
  const f = C.features;
  return (
    <section id={f.id} className="sec wrap g" aria-labelledby="ft-h">
      <div className="ft-h"><h2 id="ft-h" className="d h-m">{f.h2}</h2></div>
      <div className="ft">
        <article className="ft-big">
          <div><h3 className="ft-t">{f.big.t}</h3><p className="lede" style={{ marginTop: 14 }}>{f.big.p}</p></div>
          <div className="scr" aria-hidden="true">
            <div className="scr-top"><span className="scr-t">Gurten LAN</span><span className="scr-live"><span className="live-dot" />Live</span><span className="scr-clock">16:20</span></div>
            <div className="bk-wrap"><Bracket rounds={BRACKET_MINI} seeds={false} fit /></div>
          </div>
          <p className="fine" style={{ color: 'var(--scr-t2)' }}>{f.big.foot}</p>
        </article>
        {f.small.map((s) => (
          <article className="ft-s" key={s.t}>
            <h3 className="ft-t">{s.t}</h3>
            <p className="lede">{s.p}</p>
            <ul>{s.li.map((x) => <li key={x}><Ic name="check" small /><span>{x}</span></li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

interface ExampleProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
  sel: string;
  setSel: (id: string) => void;
  onOpenBeamer: () => void;
  beamerBtnRef: RefObject<HTMLButtonElement | null>;
}

function Example({ tab, setTab, sel, setSel, onOpenBeamer, beamerBtnRef }: ExampleProps) {
  const e = C.example;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = selection(sel);

  // Tabs follow the ARIA pattern: arrows, Home and End move between them, Tab goes into the panel.
  function onTabKey(ev: KeyboardEvent<HTMLDivElement>) {
    const i = e.tabs.findIndex((t) => t.id === tab);
    const n = e.tabs.length;
    const next = ev.key === 'ArrowRight' ? (i + 1) % n : ev.key === 'ArrowLeft' ? (i - 1 + n) % n : ev.key === 'Home' ? 0 : ev.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    ev.preventDefault();
    setTab(e.tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id={e.id} className="sec wrap g" aria-labelledby="ex-h">
      <div className="ex-h"><h2 id="ex-h" className="d h-m">{e.h2}</h2><p className="lede">{e.lede}</p></div>
      <p className="ex-hint"><Ic name="info" small />{e.hint}</p>
      <div className="ex">
        <div className="ex-top">
          <div>
            <p className="scr-live" style={{ width: 'max-content' }}><span className="live-dot" />Live · Halbfinals</p>
            <h3 className="ex-name" style={{ marginTop: 14 }}>{e.name}</h3>
            <p className="ex-meta">{e.meta.map((m, i) => <span key={m}><Ic name={META_ICONS[i]} small />{m}</span>)}</p>
          </div>
          <div className="ex-acts">
            <button ref={beamerBtnRef} className="btn btn-paper btn-s" type="button" onClick={onOpenBeamer}><Ic name="screen" small />{e.beamer}</button>
          </div>
        </div>
        <div className="ex-tabs" role="tablist" aria-label="Ansicht" onKeyDown={onTabKey}>
          {e.tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              id={`ex-tab-${t.id}`}
              className={`ex-tab${tab === t.id ? ' on' : ''}`}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls="ex-panel"
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {'c' in t && <span style={{ marginLeft: 6, color: 'var(--scr-t2)', fontWeight: 500 }}>{t.c}</span>}
            </button>
          ))}
        </div>
        <div className="ex-body">
          <div className="ex-main" role="tabpanel" id="ex-panel" aria-labelledby={`ex-tab-${tab}`}>
            {tab === 'bracket' && (
              <div className="bk-wrap" style={{ marginTop: 0 }} tabIndex={0} role="group" aria-label="Bracket, klick auf ein Spiel">
                <Bracket rounds={BRACKET} selected={sel} onPick={setSel} />
              </div>
            )}
            {tab === 'plan' && (
              <ol className="sch">
                {SCHEDULE_DE.map(([t, a, b, state, where, live]) => (
                  <li className={`sch-r${live ? ' is-live' : ''}`} key={`${t}${where}`}>
                    <span className="sch-t">{t}</span>
                    <span className="sch-v">{a ? TEAMS[a][0] : 'Sieger HF 1'} <i>–</i> {b ? TEAMS[b][0] : 'Sieger HF 2'}</span>
                    <span className="sch-st"><b>{state}</b>{where}</span>
                  </li>
                ))}
              </ol>
            )}
            {tab === 'teams' && (
              <ul className="tms">
                {Object.entries(TEAMS).map(([k, [name, , grp]]) => (
                  <li className="tm" key={k}><span className="mono">{k.toUpperCase()}</span><span>{name}</span><small>Gruppe {grp}</small></li>
                ))}
              </ul>
            )}
          </div>
          <aside className="ex-side" aria-live="polite" aria-label={e.sideH}>
            <h3>{s.title}</h3>
            <div className="ex-mt">
              <div className={`ex-tm ${s.a.cls}`}><span className="mono">{s.a.tag}</span><span className="nm">{s.a.name}</span><span className="sc">{s.a.sc}</span></div>
              <div className={`ex-tm ${s.b.cls}`}><span className="mono">{s.b.tag}</span><span className="nm">{s.b.name}</span><span className="sc">{s.b.sc}</span></div>
            </div>
            <dl className="ex-kv"><dt>Status</dt><dd>{s.state}</dd><dt>Station</dt><dd>{s.st}</dd><dt>Zeit</dt><dd>{s.when}</dd><dt>Format</dt><dd>Best of 3</dd></dl>
            <p className="ex-note">{s.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const p = C.pricing;
  return (
    <section id={p.id} className="sec wrap g" aria-labelledby="pr-h">
      <div className="pr-h"><h2 id="pr-h" className="d h-m">{p.h2}</h2><p className="lede">{p.lede}</p></div>
      <div className="pr">
        {p.plans.map((plan) => (
          <article className={`pc${plan.style === 'ink' ? ' ink' : ''}`} aria-labelledby={`pc-${plan.id}`} key={plan.id}>
            <div>
              <h3 id={`pc-${plan.id}`} className="pc-n">{plan.n}{'tag' in plan && <span className="pc-tag">· {plan.tag}</span>}</h3>
              <p className="pc-for" style={{ marginTop: 8 }}>{plan.for}</p>
            </div>
            <p className="pc-price">
              <span className="pc-cur">{plan.cur}</span><span className="pc-amt">{plan.amt}</span><span className="pc-per">{plan.per}</span>
              {plan.ph && <span className="chip chip-ph">{p.ph}</span>}
            </p>
            <ul>{plan.li.map((x) => <li key={x}><Ic name="check" small /><span>{x}</span></li>)}</ul>
            <a className={`btn ${plan.style === 'ink' ? 'btn-paper' : 'btn-pri'}`} href={`${TOURNAMENT_NEW_URL}?plan=${plan.id}`}>{plan.cta}</a>
          </article>
        ))}
      </div>
      <p className="pr-note">{p.notes.map((n) => <span key={n}><Ic name="info" small />{n}</span>)}</p>
    </section>
  );
}

function Faq() {
  const f = C.faq;
  return (
    <section id={f.id} className="sec wrap g" aria-labelledby="fq-h">
      <div className="fq-h"><h2 id="fq-h" className="d h-m">{f.h2}</h2><p className="lede">{f.lede}</p></div>
      <div className="fq">
        {f.items.map((item, i) => (
          <details key={item.q} open={i === 0}>
            <summary>{item.q}<span className="pm" aria-hidden="true"><Ic name="plus" small /></span></summary>
            <div className="ans">{item.a.map((p) => <p key={p}>{p}</p>)}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** The beamer view of the example: in production this is the Tournament app's /<slug>/beamer. */
function Beamer({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [onClose]);
  return (
    <main id="main" className="bmr" aria-label="Beamer-Ansicht: Gurten LAN">
      <div className="bmr-top">
        <div>
          <h1 className="bmr-name">{C.example.name}</h1>
          <p className="bmr-sub"><span>Halbfinals</span><span>Counter-Strike 2</span><span>Gurtenpark, Bern</span></p>
        </div>
        <div className="bmr-r">
          <span className="scr-live"><span className="live-dot" />Live</span>
          <span className="bmr-clock">16:20</span>
          <button ref={closeRef} className="btn btn-scr btn-s" type="button" onClick={onClose} aria-label={C.beamer.close}><Ic name="x" small />Schliessen</button>
        </div>
      </div>
      <div className="bmr-body">
        <div className="bk-wrap" style={{ marginTop: 0 }}><Bracket rounds={BRACKET} /></div>
        <div className="bmr-side">
          <section className="bmr-now" aria-labelledby="bn-h">
            <h3 id="bn-h"><span className="live-dot" />{C.beamer.now} · Halbfinal 2 · Stage 2</h3>
            <div className="bmr-sc ex-mt">
              <div className="ex-tm"><span className="mono">AR</span><span className="nm">Aare Raiders</span><span className="sc">1</span></div>
              <div className="ex-tm lose"><span className="mono">ZG</span><span className="nm">Zytglogge</span><span className="sc">0</span></div>
            </div>
            <p className="ex-note" style={{ marginTop: 14 }}>Map 2 von 3 · Inferno · 9–6</p>
          </section>
          <section className="bmr-next" aria-labelledby="bx-h">
            <h3 id="bx-h">{C.beamer.next}</h3>
            <ol>
              <li><b>17:15</b><div>Night Owls – Pixel Kollektiv<span>Halbfinal 1 · Stream</span></div></li>
              <li><b>19:00</b><div>Final<span>Sieger HF 1 – Sieger HF 2 · Stream</span></div></li>
            </ol>
          </section>
        </div>
      </div>
      <div className="bmr-foot"><span>{C.beamer.follow} <b style={{ color: '#f1f1f4' }}>{C.beamer.foot}</b></span><Logo href={null} /></div>
    </main>
  );
}

export function TournamentPage() {
  // Lives here, not in the example, so the tab and the match survive a trip to the beamer view.
  const [tab, setTab] = useState<Tab>('bracket');
  const [sel, setSel] = useState('s2');
  const [beamer, setBeamer] = useState(false);
  const beamerBtnRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef(0);

  function openBeamer() {
    returnTo.current = window.scrollY;
    setBeamer(true);
    window.scrollTo(0, 0);
  }

  // Back from the beamer: to where the example was, focus on the button that opened it.
  useEffect(() => {
    if (beamer || !returnTo.current) return;
    window.scrollTo(0, returnTo.current);
    beamerBtnRef.current?.focus({ preventScroll: true });
    returnTo.current = 0;
  }, [beamer]);

  return (
    <TourFrame variant="tournament" bare={beamer}>
      {(menu) => beamer ? <Beamer onClose={() => setBeamer(false)} /> : (
        <>
          <header className="tp-hero">
            <TourNav variant="tournament" {...menu} />
            <div className="wrap g tp-hero-in">
              <div className="tp-txt">
                <h1 className="d h-xl"><span style={{ display: 'block' }}>{C.hero.h1[0]}</span><span style={{ display: 'block' }}>{C.hero.h1[1]}</span></h1>
                <p className="sub">{C.hero.sub}</p>
                <div className="acts">
                  <a className="btn btn-pri" href={TOURNAMENT_NEW_URL}>{C.hero.cta}</a>
                  <a className="alink" href="#beispiel">{C.hero.alt}<Ic name="arrow-r" small /></a>
                </div>
                <p className="fine"><Ic name="check" small />{C.hero.fine}</p>
              </div>
              <Screen label={C.hero.screenLabel} />
            </div>
          </header>

          <main id="main" tabIndex={-1}>
            <Steps />
            <Features />
            <Example tab={tab} setTab={setTab} sel={sel} setSel={setSel} onOpenBeamer={openBeamer} beamerBtnRef={beamerBtnRef} />
            <Pricing />
            <Faq />
            <section className="end" aria-labelledby="end-h">
              <h2 id="end-h" className="d h-l">{C.end.h2}</h2>
              <div className="acts">
                <a className="btn btn-paper" href={TOURNAMENT_NEW_URL}>{C.end.cta}</a>
                <a className="alink" href="#preise" style={{ color: '#f1f1f4' }}>{C.end.alt}<Ic name="arrow-r" small /></a>
              </div>
              <p className="fine">{C.end.fine}</p>
            </section>
          </main>
        </>
      )}
    </TourFrame>
  );
}
