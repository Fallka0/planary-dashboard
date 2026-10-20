import { LegalPage, LegalSection } from '../components/LegalPage';
import { CONTACT_EMAIL, CONTACT_MAILTO, LEGAL_EMAIL } from '../lib/links';

export function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz" updated="Oktober 2026">
      <LegalSection id="kurz" title="Kurz gesagt">
        <ul>
          <li>planary.ch setzt keine Cookies und lädt nichts von fremden Servern, auch keine Schriften.</li>
          <li>Besuche zählen wir mit einem eigenen Zähler, ohne Cookies und ohne IP-Adressen zu speichern.</li>
          <li>Für die Apps brauchen Sie ein Planary-Konto. Wir speichern dafür nur, was die Apps zum Funktionieren brauchen.</li>
          <li>Wir verkaufen keine Daten und zeigen keine Werbung.</li>
        </ul>
      </LegalSection>

      <LegalSection id="verantwortlich" title="Verantwortlich">
        <p>Verantwortlich für die Bearbeitung von Personendaten nach dem Schweizer Datenschutzgesetz (DSG) ist:</p>
        <address>
          Mykyta Pantelei<br />
          Meienstrasse 4<br />
          3052 Zollikofen<br />
          Schweiz<br />
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </address>
        <p>Diese Erklärung gilt für planary.ch und die Planary-Apps: auth.planary.ch (Planary-Konto), casino.planary.ch, wishlist.planary.ch und künftige Apps unter planary.ch.</p>
      </LegalSection>

      <LegalSection id="website" title="Besuch von planary.ch">
        <p>planary.ch läuft bei Vercel Inc. (USA). Wenn Sie die Seite aufrufen, verarbeitet Vercel technisch nötige Angaben wie IP-Adresse, Zeitpunkt, aufgerufene Adresse und Browser, um die Seite auszuliefern und vor Angriffen zu schützen. Wir werten diese Serverprotokolle nicht aus.</p>
        <p>Schriften und Bilder liefern wir selbst aus. Für die Seitenübergänge merkt sich Ihr Browser im Sitzungsspeicher, ob Sie die Einleitung schon gesehen haben. Das bleibt auf Ihrem Gerät und verschwindet, wenn Sie den Tab schliessen.</p>
      </LegalSection>

      <LegalSection id="statistik" title="Besuchsstatistik">
        <p>Um zu sehen, welche Seiten gelesen werden, zählen wir Seitenaufrufe auf planary.ch und den Apps mit einem eigenen Zähler (stats.planary.ch, betrieben bei Cloudflare). Pro Aufruf speichern wir:</p>
        <ul>
          <li>Datum und Website, zum Beispiel planary.ch</li>
          <li>die aufgerufene Seite ohne Parameter; Links mit Tokens wie Teilen- oder Einladungslinks werden gekürzt</li>
          <li>die Website, von der Sie kamen (nur der Name, etwa google.com)</li>
          <li>das Land, abgeleitet aus der IP-Adresse</li>
          <li>die Geräteart: Smartphone, Tablet oder Computer</li>
          <li>eine Besucherkennung für diesen Tag</li>
        </ul>
        <p>Die Besucherkennung ist ein Hash aus IP-Adresse, Browserkennung und einem Zufallswert, der nur einen Tag gilt und danach gelöscht wird. So können wir Besucher pro Tag zählen, aber niemanden über mehrere Tage wiedererkennen. Die IP-Adresse selbst speichern wir nicht. Es werden keine Cookies gesetzt und nichts in Ihrem Browser gespeichert.</p>
        <p>Wenn Ihr Browser «Do Not Track» sendet, zählen wir Ihren Besuch nicht. Die Einträge löschen wir nach 13 Monaten. Sehen können die Zahlen nur wir.</p>
      </LegalSection>

      <LegalSection id="konto" title="Planary-Konto">
        <p>Für die Apps melden Sie sich auf auth.planary.ch an. Dafür speichern wir:</p>
        <ul>
          <li>E-Mail-Adresse und Name</li>
          <li>Ihr Passwort, aber nur als nicht umkehrbaren Hash. Wer sich mit Google oder GitHub anmeldet, hat bei uns kein Passwort.</li>
          <li>ob Ihre E-Mail-Adresse bestätigt ist</li>
          <li>bei Anmeldung mit Google oder GitHub: die Kennung Ihres Kontos dort. Google bzw. GitHub teilt uns dabei Ihre E-Mail-Adresse und Ihren Namen mit.</li>
          <li>Anmeldesitzungen, nur als Hash und mit Ablaufdatum</li>
        </ul>
        <p>Um Missbrauch wie das Durchprobieren von Passwörtern zu bremsen, zählen wir Anmeldeversuche kurzzeitig.</p>
        <h3>Cookies und Speicher im Browser</h3>
        <p>auth.planary.ch setzt ein Sitzungscookie, damit Sie angemeldet bleiben, und während der Anmeldung mit Google oder GitHub ein kurzlebiges Cookie zum Schutz vor Fälschungen. Beide sind technisch nötig. Die Apps speichern ihren Anmeldeschlüssel im Speicher Ihres Browsers.</p>
        <h3>E-Mails</h3>
        <p>Bestätigungs- und Passwort-Links sowie Einladungen aus den Apps verschicken wir über Resend Inc. (USA). Resend erhält dafür die Empfängeradresse und den Inhalt der Nachricht.</p>
      </LegalSection>

      <LegalSection id="casino" title="Planary Casino">
        <p>Planary Casino ist ein Spiel mit Spielgeld, ohne echtes Geld. Wir speichern Ihr Profil (Anzeigename, Avatar), Ihren Spielgeld-Kontostand mit Verlauf, Spielrunden, Gegenstände, Erfolge und Statistiken, Ihre Freundschaften, Direktnachrichten an Freunde, Benachrichtigungen und Ihren Online-Status (wann und an welchem Tisch Sie zuletzt waren). Andere Spieler sehen Ihr Profil, Ihren Online-Status, die Ranglisten und was Sie ihnen schicken.</p>
        <p>Damit wir bei Betrug oder Fehlern helfen können, haben Mitglieder des Planary-Teams Zugriff auf die Spieldaten. Jede Änderung, die sie vornehmen, wird protokolliert.</p>
      </LegalSection>

      <LegalSection id="wishlist" title="Planary Wishlist">
        <p>Wir speichern Ihre Listen, Wünsche und Anlässe sowie die E-Mail-Adressen der Personen, die Sie zu einer Liste einladen. Wer über einen geteilten Link etwas reserviert, kann das mit einem Planary-Konto oder nur mit einer E-Mail-Adresse tun. Die E-Mail-Adresse brauchen wir, um einen Link zum Rückgängigmachen zu schicken. Wer eine Liste besitzt, sieht nie, wer was reserviert hat.</p>
      </LegalSection>

      <LegalSection id="empfaenger" title="Dienstleister und Ausland">
        <p>Wir betreiben Planary nicht auf eigenen Servern, sondern bei diesen Anbietern, die die Daten in unserem Auftrag bearbeiten:</p>
        <dl className="lg-dl">
          <dt>Vercel Inc., USA</dt><dd>Auslieferung von planary.ch</dd>
          <dt>Cloudflare Inc., USA</dt><dd>Betrieb der Apps und Datenbanken, Besuchsstatistik</dd>
          <dt>Resend Inc., USA</dt><dd>Versand von E-Mails</dd>
          <dt>Google, GitHub</dt><dd>nur wenn Sie sich darüber anmelden</dd>
        </dl>
        <p>Dabei können Daten in die USA und andere Länder gelangen, deren Datenschutz nicht dem der Schweiz entspricht. Wir stützen uns dafür auf das Swiss-U.S. Data Privacy Framework, soweit der Anbieter zertifiziert ist, und sonst auf die Standardvertragsklauseln der EU-Kommission, die der EDÖB anerkennt.</p>
        <p>Andere Empfänger gibt es nicht, ausser wir sind gesetzlich zur Herausgabe verpflichtet.</p>
      </LegalSection>

      <LegalSection id="dauer" title="Wie lange wir Daten aufbewahren">
        <p>Kontodaten und die Daten in den Apps behalten wir, solange Ihr Konto besteht. Wenn Sie Ihr Konto löschen möchten, schreiben Sie uns; wir löschen es dann mit den zugehörigen Daten, soweit wir sie nicht aus rechtlichen Gründen aufbewahren müssen. Abgelaufene Sitzungen und Links werden laufend unbrauchbar, Statistikeinträge nach 13 Monaten gelöscht.</p>
      </LegalSection>

      <LegalSection id="rechte" title="Ihre Rechte">
        <p>Sie können Auskunft über Ihre Daten verlangen, sie berichtigen oder löschen lassen, der Bearbeitung widersprechen und Ihre Daten in einem gängigen Format erhalten. Schreiben Sie dafür an <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> oder <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>. Wir können Sie bitten, sich auszuweisen.</p>
        <p>Wenn Sie finden, dass wir Ihre Daten nicht richtig behandeln, können Sie sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) beschweren.</p>
      </LegalSection>

      <LegalSection id="sicherheit" title="Sicherheit">
        <p>Alle Verbindungen sind verschlüsselt. Passwörter, Sitzungen und Links aus E-Mails speichern wir nur als Hash. Zugriff auf die Systeme haben nur wir.</p>
      </LegalSection>

      <LegalSection id="aenderungen" title="Änderungen">
        <p>Wenn sich unsere Apps ändern, passen wir diese Erklärung an. Es gilt die Fassung auf dieser Seite.</p>
      </LegalSection>
    </LegalPage>
  );
}
