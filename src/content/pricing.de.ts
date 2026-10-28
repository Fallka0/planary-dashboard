// Plans and prices for Tournament, as settled in the pricing brief (planary-admin
// docs/plans/DESIGN-PROMPT.md). The ids stay gratis / event / verein until the plan
// rename lands; Pro has no id yet, so it can be asked for but not bought.

export type PlanCard = {
  id: 'gratis' | 'verein' | 'pro' | 'event';
  n: string;
  for: string;
  amt: string;
  per: string;
  li: string[];
  cta: string;
  href: string;
  style: 'card' | 'ink' | 'pass';
  tag?: string;
};

const NEW = 'https://tournament.planary.ch/neu';

export const PRICING = {
  h2: 'Gratis anfangen. Zahlen, wenn es gross wird.',
  lede: 'Kleine Turniere kosten nichts. Wer das ganze Jahr Turniere macht, nimmt Plus. Für ein einzelnes grosses Turnier gibt es den Tournament Pass.',
  plans: [
    {
      id: 'gratis',
      n: 'Free',
      for: 'Zum Ausprobieren und für kleine, interne Turniere.',
      amt: '0',
      per: 'für immer',
      li: ['Bis 16 Teams pro Turnier', 'Ein Turnier gleichzeitig', 'Zwei Organisatoren', 'Anmeldung, Check-in, Spielplan, Bracket'],
      cta: 'Gratis starten',
      href: `${NEW}?plan=gratis`,
      style: 'card',
    },
    {
      id: 'verein',
      n: 'Plus',
      for: 'Für Organisationen, die das ganze Jahr Turniere machen.',
      amt: '149',
      per: 'pro Jahr, eine Rechnung',
      li: ['Unbegrenzt viele Turniere gleichzeitig', 'Bis 128 Teams pro Turnier', 'Zehn Organisatoren', 'Eigenes Logo und Farben, Warteliste, Export', 'Zahlung auf Rechnung'],
      cta: 'Plus wählen',
      href: `${NEW}?plan=verein`,
      style: 'ink',
      tag: 'Das ganze Produkt',
    },
    {
      id: 'pro',
      n: 'Pro',
      for: 'Für Organisationen, bei denen der Turniertag nicht schiefgehen darf.',
      amt: '390',
      per: 'pro Jahr, eine Rechnung',
      li: ['Alles aus Plus', 'Unbegrenzt viele Teams und Organisatoren', 'Hilfe beim Einrichten des Turniers', 'Am Turniertag per Telefon und Chat erreichbar, mindestens zwei Wochen vorher gebucht', 'Deine Fragen beantworten wir zuerst'],
      cta: 'Pro anfragen',
      href: 'mailto:info@planary.ch?subject=Planary%20Pro',
      style: 'card',
    },
    {
      id: 'event',
      n: 'Tournament Pass',
      for: 'Für ein einzelnes Turnier: eine LAN, ein Abend, einmal im Jahr.',
      amt: '29',
      per: 'einmal, für ein Turnier',
      li: ['Dieses Turnier bekommt alles aus Plus', 'Bis 128 Teams und zehn Organisatoren', 'Bezahlen mit Karte oder TWINT', 'Ein Pass pro Turnier, beliebig viele'],
      cta: 'Pass kaufen',
      href: `${NEW}?plan=event`,
      style: 'pass',
      tag: 'Kein Abo',
    },
  ] satisfies PlanCard[],
  line: 'Ab fünf Turnieren im Jahr lohnt sich Plus.',
  notes: [
    'Preise in CHF.',
    'Plus und Pro mit Karte oder auf Rechnung mit QR-Code, den Pass mit Karte oder TWINT.',
    'Plus und Pro verlängern sich jährlich, mit Erinnerung 30 Tage vorher. Kündigen geht mit einem Klick im Kundenportal.',
  ],
  compareLink: 'Alle Leistungen vergleichen',
} as const;

/** The full comparison: Free, Tournament Pass, Plus, Pro. `true` / `false` render as a check or a dash. */
export const COMPARE = {
  id: 'vergleich',
  h2: 'Alles im Vergleich',
  cols: ['Free', 'Tournament Pass', 'Plus', 'Pro'],
  price: ['CHF 0', 'CHF 29 pro Turnier', 'CHF 149 pro Jahr', 'CHF 390 pro Jahr'],
  groups: [
    {
      h: 'Turniere',
      rows: [
        ['Teams pro Turnier', '16', '128', '128', 'unbegrenzt'],
        ['Turniere gleichzeitig', '1', 'das gekaufte', 'unbegrenzt', 'unbegrenzt'],
        ['Organisatoren', '2', '10', '10', 'unbegrenzt'],
        ['Check-in vor Ort', true, true, true, true],
        ['Warteliste', false, true, true, true],
        ['Eigenes Logo und Farben', false, true, true, true],
        ['Export (CSV, Resultate)', false, true, true, true],
      ],
    },
    {
      h: 'Bezahlen',
      rows: [
        ['Karte', false, true, true, true],
        ['TWINT', false, true, false, false],
        ['Auf Rechnung mit QR-Code', false, false, true, true],
      ],
    },
    {
      h: 'Hilfe',
      rows: [
        ['Hilfe beim Einrichten des Turniers', false, false, false, true],
        ['Am Turniertag erreichbar', false, false, false, true],
        ['Antworten zuerst', false, false, false, true],
      ],
    },
    {
      h: 'Andere Apps',
      rows: [['Wishlist-Listen', '3', '3', 'unbegrenzt', 'unbegrenzt']],
    },
  ] as { h: string; rows: (string | boolean)[][] }[],
  yes: 'Ja',
  no: 'Nein',
} as const;

export const PRICING_PAGE = {
  title: 'Preise',
  lede: 'Ein Planary-Abo gehört der Organisation und gilt in allen Apps. Keine Monatsabos, keine versteckten Kosten.',
  faq: {
    h2: 'Fragen zu den Preisen',
    items: [
      {
        q: 'Was passiert nach dem Turnier?',
        a: ['Ein Turnier mit Tournament Pass behält alles, was es hatte, für immer. Nach dem Turnier kannst du es weiter ansehen und exportieren. Ein Pass wird nie nachträglich entfernt.'],
      },
      {
        q: 'Kann ich wechseln?',
        a: ['Ja. Von Free zu Plus oder Pro jederzeit, im Kundenportal. Wer schon einen Pass für ein Turnier hat, behält ihn. Von Plus zurück zu Free wechselst du auf das Ende des bezahlten Jahres.'],
      },
      {
        q: 'Kann ich auf Rechnung bezahlen?',
        a: ['Plus und Pro: ja, eine Rechnung pro Jahr mit QR-Code, zahlbar innert 30 Tagen. Den Tournament Pass bezahlst du mit Karte oder TWINT.'],
      },
      {
        q: 'Wie kündige ich?',
        a: ['Mit einem Klick im Kundenportal, ohne E-Mail an uns. Dein Plan läuft bis zum Ende des bezahlten Jahres, danach bist du auf Free. Deine Turniere bleiben erhalten.'],
      },
    ],
  },
} as const;
