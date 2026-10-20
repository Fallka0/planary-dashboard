import { LegalPage, LegalSection } from '../components/LegalPage';
import { CONTACT_EMAIL, CONTACT_MAILTO, DATENSCHUTZ_URL, LEGAL_EMAIL } from '../lib/links';

export function ImpressumPage() {
  return (
    <LegalPage title="Impressum" updated="Oktober 2026">
      <LegalSection id="betreiber" title="Verantwortlich für diese Website">
        <address>
          Mykyta Pantelei<br />
          Meienstrasse 4<br />
          3052 Zollikofen<br />
          Schweiz
        </address>
        <p>E-Mail: <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a></p>
      </LegalSection>

      <LegalSection id="kontakt" title="Kontakt">
        <p>Fragen zu unseren Apps beantworten wir unter <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.</p>
      </LegalSection>

      <LegalSection id="geltung" title="Geltungsbereich">
        <p>Dieses Impressum gilt für planary.ch und die Planary-Apps unter planary.ch, zum Beispiel casino.planary.ch, wishlist.planary.ch und auth.planary.ch.</p>
      </LegalSection>

      <LegalSection id="haftung" title="Haftung">
        <p>Wir prüfen die Inhalte dieser Website sorgfältig, übernehmen aber keine Gewähr für ihre Richtigkeit, Vollständigkeit und Aktualität. Für die Inhalte verlinkter Websites sind ausschliesslich deren Betreiber verantwortlich.</p>
        <p>Planary Casino ist ein Spiel mit Spielgeld. Es gibt keine Einsätze mit echtem Geld und keine Gewinne, die sich auszahlen lassen.</p>
      </LegalSection>

      <LegalSection id="rechte" title="Urheberrechte">
        <p>Texte, Bilder, Logos und Code auf dieser Website gehören Planary, soweit nicht anders angegeben. Wer sie verwenden möchte, fragt uns bitte vorher.</p>
      </LegalSection>

      <LegalSection id="daten" title="Datenschutz">
        <p>Wie wir mit Personendaten umgehen, steht in der <a href={DATENSCHUTZ_URL}>Datenschutzerklärung</a>.</p>
      </LegalSection>
    </LegalPage>
  );
}
