import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { CONTACT_EMAIL, CONTACT_MAILTO, LEGAL_ADDRESS, LEGAL_EMAIL } from '../lib/links';
import { Ic } from './Ic';
import { TourFrame, TourNav } from './tour/TourChrome';

/*
 * The chrome strings from content/legal.de.ts. Copied, not imported: that file also holds
 * the handoff's placeholder bodies ("[Text folgt]"), which must never ship to production.
 */
const LEGAL = {
  crumb: 'Rechtliches',
  updatedLabel: 'Stand',
  toc: 'Inhalt',
  print: 'Seite drucken',
  scope: 'Gilt für planary.ch und alle Planary-Apps',
  contact: { h: 'Fragen zum Datenschutz?', imprH: 'Fragen zum Impressum?', agbH: 'Fragen zu den AGB?', mailL: 'E-Mail', respL: 'Antwort' },
};

export interface LegalSectionDef {
  id: string;
  title: string;
  /**
   * Not reviewed yet, marked "Entwurf". Pages add drafted sections only when
   * `__LEGAL_DRAFTS__` is set (dev and preview builds), so production never ships them.
   */
  draft?: boolean;
  body: ReactNode;
}

interface LegalPageProps {
  page: 'impressum' | 'datenschutz' | 'agb';
  title: string;
  /** The date of the last change, e.g. "21. Oktober 2026". */
  updated: string;
  sections: LegalSectionDef[];
}

/** The current section: the last one whose top has passed 35% of the viewport. */
function useCurrentSection(ids: string[]) {
  const [cur, setCur] = useState(ids[0]);
  useEffect(() => {
    let raf = 0;
    const track = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let next = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) next = id;
      }
      // At the very bottom the last sections can't reach the line: mark the last one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) next = ids[ids.length - 1];
      setCur(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(track);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    track();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ids]);
  return cur;
}

/** One reading layout for /impressum, /datenschutz and /agb: head, sticky contents, numbered sections, contact block. */
export function LegalPage({ page, title, updated, sections }: LegalPageProps) {
  const shown = __LEGAL_DRAFTS__ ? sections : sections.filter((s) => !s.draft);
  const [ids] = useState(() => shown.map((s) => s.id));
  const cur = useCurrentSection(ids);
  const hasDrafts = __LEGAL_DRAFTS__ && shown.some((s) => s.draft);
  const c = LEGAL.contact;

  return (
    <TourFrame variant="legal" legalCurrent={page}>
      {(menu) => (
        <>
          <header>
            <TourNav variant="legal" {...menu} />
            <div className="wrap g lg-head">
              <p className="lg-crumb"><a className="ul" href="/">Planary</a><Ic name="chev-r" small />{LEGAL.crumb}</p>
              <h1 className="d h-xl">{title}</h1>
              <p className="lg-meta">
                <span><Ic name="cal" small />{LEGAL.updatedLabel} <b>{updated}</b></span>
                <span>{LEGAL.scope}</span>
                {hasDrafts && <span className="chip chip-ph">Entwurf</span>}
              </p>
            </div>
          </header>

          <main id="main" tabIndex={-1} className="wrap g lg">
            <nav className="lg-toc" aria-labelledby="toc-h">
              <h2 id="toc-h">{LEGAL.toc}</h2>
              <ol>
                {shown.map((s, i) => (
                  <li key={s.id}>
                    <a className={cur === s.id ? 'on' : undefined} href={`#${s.id}`} aria-current={cur === s.id ? 'location' : undefined}>
                      <i>{i + 1}</i><span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="lg-print">
                <button className="alink" type="button" onClick={() => window.print()}><Ic name="file" small />{LEGAL.print}</button>
              </div>
            </nav>

            <div className="lg-body">
              {hasDrafts && (
                <p className="lg-note">
                  <Ic name="info" small />
                  <span><b>Entwurf.</b> Abschnitte mit dem Vermerk «Entwurf» sind noch nicht geprüft. Sie erscheinen nur in der Vorschau und kommen erst nach der Freigabe auf planary.ch.</span>
                </p>
              )}
              {shown.map((s, i) => (
                <section className="lg-sec" id={s.id} aria-labelledby={`${s.id}-h`} key={s.id}>
                  <h2 className="lg-h" id={`${s.id}-h`}>
                    <i>{i + 1}</i>
                    <span>{s.title}{__LEGAL_DRAFTS__ && s.draft && <> <span className="chip chip-ph lg-draft">Entwurf</span></>}</span>
                  </h2>
                  <div>{s.body}</div>
                </section>
              ))}

              <section className="lg-contact" aria-labelledby="lc-h">
                <h2 id="lc-h">{page === 'impressum' ? c.imprH : page === 'agb' ? c.agbH : c.h}</h2>
                <address>{LEGAL_ADDRESS.map((line) => <span style={{ display: 'block' }} key={line}>{line}</span>)}</address>
                <dl>
                  <div><dt>{c.mailL}</dt><dd><a className="ul" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a></dd></div>
                  <div><dt>{c.respL}</dt><dd>innert 30 Tagen</dd></div>
                </dl>
                <p className="fine">Für Fragen zu den Apps: <a className="ul" href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.</p>
              </section>
            </div>
          </main>
        </>
      )}
    </TourFrame>
  );
}
