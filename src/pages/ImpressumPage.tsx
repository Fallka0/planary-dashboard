import { LegalPage } from '../components/LegalPage';
import { CONTACT_EMAIL, CONTACT_MAILTO, DATENSCHUTZ_URL, LEGAL_ADDRESS, LEGAL_EMAIL } from '../lib/links';

export function ImpressumPage() {
  return (
    <LegalPage
      page="impressum"
      title="Impressum"
      updated="21. Oktober 2026"
      sections={[
        {
          id: 'betreiber',
          title: 'Verantwortlich für diese Website',
          body: (
            <>
              <dl className="lg-dl">
                <dt>Name</dt><dd>{LEGAL_ADDRESS[0]}</dd>
                <dt>Adresse</dt><dd>{LEGAL_ADDRESS[1]}, {LEGAL_ADDRESS[2]}</dd>
                <dt>Land</dt><dd>{LEGAL_ADDRESS[3]}</dd>
              </dl>
              <p>E-Mail: <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a></p>
            </>
          ),
        },
        {
          id: 'kontakt',
          title: 'Kontakt',
          body: <p>Fragen zu unseren Apps beantworten wir unter <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.</p>,
        },
        {
          id: 'geltung',
          title: 'Geltungsbereich',
          body: <p>Dieses Impressum gilt für planary.ch und die Planary-Apps unter planary.ch, zum Beispiel tournament.planary.ch, casino.planary.ch, wishlist.planary.ch und auth.planary.ch.</p>,
        },
        {
          id: 'haftung',
          title: 'Haftung',
          body: (
            <>
              <p>Wir prüfen die Inhalte dieser Website sorgfältig, übernehmen aber keine Gewähr für ihre Richtigkeit, Vollständigkeit und Aktualität. Für die Inhalte verlinkter Websites sind ausschliesslich deren Betreiber verantwortlich.</p>
              <p>Planary Casino ist ein Spiel mit Spielgeld. Es gibt keine Einsätze mit echtem Geld und keine Gewinne, die sich auszahlen lassen.</p>
            </>
          ),
        },
        {
          id: 'rechte',
          title: 'Urheberrechte',
          body: <p>Texte, Bilder, Logos und Code auf dieser Website gehören Planary, soweit nicht anders angegeben. Wer sie verwenden möchte, fragt uns bitte vorher.</p>,
        },
        {
          id: 'daten',
          title: 'Datenschutz',
          body: <p>Wie wir mit Personendaten umgehen, steht in der <a href={DATENSCHUTZ_URL}>Datenschutzerklärung</a>.</p>,
        },
      ]}
    />
  );
}
