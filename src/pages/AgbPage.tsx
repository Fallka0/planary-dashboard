import { LegalPage } from '../components/LegalPage';
import { CONTACT_EMAIL, CONTACT_MAILTO, DATENSCHUTZ_URL, LEGAL_ADDRESS } from '../lib/links';

const PORTAL = 'https://portal.planary.ch';

export function AgbPage() {
  return (
    <LegalPage
      page="agb"
      title={"Allgemeine Geschäfts\u00adbedingungen"}
      updated="29. Oktober 2026"
      sections={[
        {
          id: 'geltung',
          title: 'Geltungsbereich und Anbieter',
          body: (
            <>
              <p>Diese Bedingungen gelten für die Nutzung von Planary, also planary.ch und die Apps unter planary.ch, und für alles, was Sie bei uns kaufen. Anbieter ist {LEGAL_ADDRESS[0]}, {LEGAL_ADDRESS[1]}, {LEGAL_ADDRESS[2]}, {LEGAL_ADDRESS[3]} («Planary», «wir»).</p>
              <p>Kostenpflichtig sind heute nur der Plan Plus und der Turnier-Pass für Planary Tournament. Planary Casino (nur Spielgeld) und Planary Wishlist sind kostenlos; für sie gelten die Abschnitte zur Nutzung, zur Haftung und zum Recht.</p>
            </>
          ),
        },
        {
          id: 'leistungen',
          title: 'Leistungen',
          body: (
            <>
              <dl className="lg-dl">
                <dt>Gratis</dt><dd>CHF 0. Turniere bis 16 Teams, ein Turnier gleichzeitig, zwei Organisatoren.</dd>
                <dt>Turnier-Pass</dt><dd>CHF 29, einmalig, für ein bestimmtes Turnier. Dieses Turnier erhält die Turnier-Leistungen von Plus, zum Beispiel bis 128 Teams, Warteliste, eigenes Logo und Export.</dd>
                <dt>Plus</dt><dd>CHF 149 pro Jahr für eine Organisation. Unbegrenzt viele Turniere gleichzeitig, bis 128 Teams pro Turnier, zehn Organisatoren, Support am Turniertag und Zahlung auf Rechnung.</dd>
              </dl>
              <p>Was jeder Plan genau umfasst, steht auf <a href="/preise/vergleich">planary.ch/preise/vergleich</a>. Massgebend ist die Fassung zum Zeitpunkt des Kaufs. Während einer bezahlten Laufzeit nehmen wir keine Leistungen weg, die zum Plan gehören.</p>
            </>
          ),
        },
        {
          id: 'vertrag',
          title: 'Vertragsschluss',
          body: (
            <>
              <p>Für die Nutzung brauchen Sie ein Planary-Konto. Käufe erfolgen im Kundenportal ({PORTAL.replace('https://', '')}) für eine Organisation. Wer noch keine Organisation hat, legt sie beim Kauf an und wird ihr Inhaber. Vertragspartnerin ist die Organisation, vertreten durch die Person, die kauft.</p>
              <p>Der Vertrag kommt zustande, wenn Sie den Kauf abschliessen: bei Kartenzahlung mit der erfolgreichen Zahlung, bei Plus auf Rechnung mit der Bestätigung im Kundenportal. Sie erhalten eine Bestätigung per E-Mail.</p>
            </>
          ),
        },
        {
          id: 'zahlung',
          title: 'Preise und Zahlung',
          body: (
            <>
              <p>Alle Preise sind in Schweizer Franken. Planary ist nicht mehrwertsteuerpflichtig, die Preise enthalten keine Mehrwertsteuer.</p>
              <ul>
                <li>Turnier-Pass: Zahlung mit Karte beim Kauf.</li>
                <li>Plus: Zahlung mit Karte beim Kauf und danach jährlich bei der Verlängerung, oder auf Rechnung mit QR-Code, zahlbar innert 30 Tagen.</li>
              </ul>
              <p>Die Zahlungen wickelt unser Zahlungsanbieter Stripe ab. Kartendaten geben Sie direkt bei Stripe ein, sie kommen nie zu uns.</p>
            </>
          ),
        },
        {
          id: 'laufzeit',
          title: 'Laufzeit, Verlängerung und Kündigung',
          body: (
            <>
              <h3>Plus</h3>
              <p>Plus läuft ein Jahr ab dem Kauf und verlängert sich danach jeweils um ein weiteres Jahr. 30 Tage vor der Verlängerung erinnern wir Sie per E-Mail daran. Sie können jederzeit im Kundenportal unter Abrechnung kündigen, mit einem Klick. Die Kündigung gilt auf das Ende des bezahlten Jahres; bis dahin läuft Plus normal weiter. Danach ist die Organisation auf Gratis. Turniere und Daten bleiben erhalten; was über die Grenzen von Gratis hinausgeht, ist danach nur noch lesbar.</p>
              <h3>Turnier-Pass</h3>
              <p>Ein Turnier-Pass gilt für das Turnier, für das er gekauft wurde, bis dieses abgeschlossen ist. Er verlängert sich nicht und muss nicht gekündigt werden. Ein abgeschlossenes Turnier behält alles, was es hatte, und bleibt sichtbar.</p>
              <h3>Durch Planary</h3>
              <p>Wir können einen Vertrag aus wichtigem Grund beenden, insbesondere bei schweren Verstössen gegen diese Bedingungen. Bereits bezahlte Beträge für die nicht genutzte Zeit erstatten wir dann anteilig, ausser der Grund liegt bei Ihnen.</p>
            </>
          ),
        },
        {
          id: 'verzug',
          title: 'Offene Rechnungen',
          body: (
            <>
              <p>Ist eine Rechnung für Plus nach dem Fälligkeitsdatum noch offen, erinnern wir Sie daran. Plus läuft bis 26 Tage nach dem Fälligkeitsdatum normal weiter. Danach erhalten neue Turniere die Grenzen von Gratis, bis die Rechnung bezahlt ist. Laufende und geplante Turniere laufen weiter, und wir löschen nichts. Brauchen Sie mehr Zeit, schreiben Sie uns.</p>
            </>
          ),
        },
        {
          id: 'rueckerstattung',
          title: 'Rückerstattung',
          body: (
            <>
              <ul>
                <li><b>Turnier-Pass:</b> Bis das Turnier begonnen hat, also bevor das erste Spiel gestartet ist, erstatten wir den vollen Betrag. Danach ist keine Rückerstattung möglich.</li>
                <li><b>Plus, erstes Jahr:</b> Innert 14 Tagen nach dem ersten Kauf erstatten wir den vollen Betrag, wenn Sie es wünschen. Die Organisation ist dann sofort auf Gratis.</li>
                <li><b>Plus, später:</b> Eine Kündigung gilt auf das Ende des bezahlten Jahres. Für ein angebrochenes Jahr erstatten wir nichts zurück.</li>
                <li><b>Fehler:</b> Doppelte oder irrtümliche Belastungen erstatten wir immer vollständig.</li>
              </ul>
              <p>Für eine Rückerstattung schreiben Sie an <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a> oder stellen im Kundenportal eine Anfrage. Wir zahlen auf das ursprüngliche Zahlungsmittel zurück, in der Regel innert 10 Arbeitstagen.</p>
            </>
          ),
        },
        {
          id: 'pflichten',
          title: 'Ihre Pflichten',
          body: (
            <>
              <ul>
                <li>Sie halten Ihre Zugangsdaten geheim und sind für Handlungen unter Ihrem Konto verantwortlich.</li>
                <li>Sie laden nur Inhalte hoch, die Sie verwenden dürfen, zum Beispiel Logos, und keine rechtswidrigen oder verletzenden Inhalte.</li>
                <li>Turnierseiten sind öffentlich. Als Organisator sorgen Sie dafür, dass Teilnehmende mit der Veröffentlichung ihrer Team- und Spielernamen einverstanden sind.</li>
                <li>Sie nutzen Planary nicht so, dass der Betrieb für andere gestört wird.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'verfuegbarkeit',
          title: 'Verfügbarkeit und Änderungen am Dienst',
          body: (
            <>
              <p>Wir betreiben Planary sorgfältig und mit dem Ziel, dass es immer erreichbar ist, können eine ununterbrochene Verfügbarkeit aber nicht garantieren. Wartungen planen wir möglichst ausserhalb von Turnierzeiten. Den Stand bei Störungen sehen Sie im Kundenportal.</p>
              <p>Wir entwickeln Planary weiter und dürfen Funktionen ändern, solange die bezahlten Leistungen eines Plans für die laufende Laufzeit erhalten bleiben.</p>
            </>
          ),
        },
        {
          id: 'haftung',
          title: 'Haftung',
          body: (
            <>
              <p>Wir haften für Schäden, die wir absichtlich oder grobfahrlässig verursachen. Für leichte Fahrlässigkeit und für indirekte Schäden oder Folgeschäden, etwa entgangenen Gewinn oder Kosten eines Anlasses, haften wir nicht, soweit das Gesetz es zulässt. In jedem Fall ist unsere Haftung auf den Betrag begrenzt, den Sie uns in den letzten zwölf Monaten bezahlt haben. Für die kostenlosen Angebote haften wir nur bei Absicht oder grober Fahrlässigkeit.</p>
            </>
          ),
        },
        {
          id: 'daten',
          title: 'Datenschutz',
          body: <p>Wie wir mit Personendaten umgehen, steht in der <a href={DATENSCHUTZ_URL}>Datenschutzerklärung</a>.</p>,
        },
        {
          id: 'aenderungen',
          title: 'Änderungen dieser Bedingungen',
          body: (
            <>
              <p>Wir können diese Bedingungen anpassen. Kundinnen und Kunden mit Plus informieren wir mindestens 30 Tage im Voraus per E-Mail; die neue Fassung gilt dann ab der nächsten Verlängerung. Sind Sie nicht einverstanden, können Sie auf diesen Zeitpunkt kündigen. Für einen bereits gekauften Turnier-Pass gilt die Fassung zum Zeitpunkt des Kaufs.</p>
            </>
          ),
        },
        {
          id: 'recht',
          title: 'Anwendbares Recht und Gerichtsstand',
          body: (
            <>
              <p>Es gilt Schweizer Recht, unter Ausschluss des Wiener Kaufrechts. Gerichtsstand ist Zollikofen (Kanton Bern), soweit das Gesetz keinen anderen zwingenden Gerichtsstand vorsieht, etwa für Konsumentinnen und Konsumenten.</p>
            </>
          ),
        },
      ]}
    />
  );
}
