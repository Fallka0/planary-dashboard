// Plans and prices on planary.ch (/preise, /preise/vergleich and the /tournament section),
// from the pricing handoff (content/pricing-page.de.json). Buttons follow the portal's checkout URLs.

export const PRICING_PAGE = {
  "nav": [
    {
      "label": "Produkte",
      "href": "https://planary.ch/#products"
    },
    {
      "label": "Tournament",
      "href": "/tournament"
    },
    {
      "label": "Preise",
      "href": "/preise",
      "cur": "page"
    },
    {
      "label": "Fragen",
      "href": "#faq"
    }
  ],
  "h1": [
    "Ein Abo für",
    "deine Organisation."
  ],
  "sub": "Es gilt in jeder Planary-App, die ihr nutzt.",
  "plans": [
    {
      "id": "gratis",
      "n": "Gratis",
      "for": "Zum Ausprobieren und für Kleines.",
      "amt": "0",
      "per": "für immer",
      "li": [
        "Bis 16 Teams",
        "Ein Turnier gleichzeitig",
        "2 Organisatoren",
        "Check-in am Turniertag"
      ],
      "cta": "Gratis starten",
      "style": "",
      "href": "https://tournament.planary.ch/neu"
    },
    {
      "id": "pass",
      "n": "Turnier-Pass",
      "for": "Für das eine grosse Turnier im Jahr.",
      "amt": "29",
      "per": "einmal, für ein Turnier",
      "tag": "Kein Abo",
      "li": [
        "Bis 128 Teams",
        "10 Organisatoren",
        "Warteliste",
        "Eigenes Logo und Farben",
        "Export der Resultate"
      ],
      "cta": "Pass kaufen",
      "style": "pass",
      "href": "https://portal.planary.ch/kasse?pass=tournament"
    },
    {
      "id": "plus",
      "n": "Plus",
      "for": "Für Organisationen, die das ganze Jahr Turniere machen.",
      "amt": "149",
      "per": "pro Jahr, eine Rechnung",
      "li": [
        "Alles aus dem Pass, für jedes Turnier",
        "Unbegrenzt viele gleichzeitig",
        "Support am Turniertag",
        "Zahlung auf Rechnung"
      ],
      "cta": "Plus wählen",
      "style": "ink",
      "href": "https://portal.planary.ch/kasse?plan=plus"
    }
  ],
  "notes": [
    "Preise in CHF.",
    "Plus verlängert sich jährlich, kündigen geht mit einem Klick."
  ],
  "five": {
    "h": "Ab fünf Turnieren im Jahr lohnt sich Plus.",
    "axis": "Turniere im Jahr",
    "plus": "Plus CHF 149",
    "bars": [
      29,
      58,
      87,
      116,
      145,
      174
    ]
  },
  "cmpH": "Im Vergleich",
  "cmpAll": "Alle Unterschiede",
  "cmpAllH": "Alle Unterschiede",
  "cols": [
    "Gratis",
    "Turnier-Pass",
    "Plus"
  ],
  "groups": [
    {
      "h": "Tournament",
      "rows": [
        [
          "Teams pro Turnier",
          "16",
          "128",
          "128"
        ],
        [
          "Turniere gleichzeitig",
          "1",
          "das eine",
          "unbegrenzt"
        ],
        [
          "Organisatoren",
          "2",
          "10",
          "10"
        ],
        [
          "Check-in",
          true,
          true,
          true
        ],
        [
          "Warteliste",
          false,
          true,
          true
        ],
        [
          "Eigenes Logo und Farben",
          false,
          true,
          true
        ],
        [
          "Export (CSV, Resultate)",
          false,
          true,
          true
        ],
        [
          "Support am Turniertag",
          false,
          false,
          true
        ]
      ]
    },
    {
      "h": "Wishlist",
      "rows": [
        [
          "Listen",
          "3",
          "3",
          "unbegrenzt"
        ]
      ],
      "full": true
    },
    {
      "h": "Abrechnung",
      "rows": [
        [
          "Bezahlen",
          false,
          "Karte",
          "Karte oder Rechnung"
        ],
        [
          "Laufzeit",
          "für immer",
          "ein Turnier",
          "ein Jahr, verlängert sich"
        ],
        [
          "Kündigen",
          false,
          false,
          "mit einem Klick im Portal"
        ]
      ],
      "full": true
    }
  ],
  "faqH": "Häufige Fragen",
  "faq": [
    {
      "q": "Was passiert nach dem Turnier?",
      "a": [
        "Ein Turnier mit Pass behält alles, was es hatte: Teams, Resultate, Bracket und Export. Es bleibt für immer sichtbar. Ändern kannst du es danach im Rahmen von Gratis."
      ]
    },
    {
      "q": "Kann ich wechseln?",
      "a": [
        "Ja. Zu Plus jederzeit, es gilt ab dem Kauf ein Jahr. Zurück zu Gratis geht es auf das Ende des bezahlten Jahres. Pässe, die du schon gekauft hast, bleiben gültig."
      ]
    },
    {
      "q": "Kann ich auf Rechnung zahlen?",
      "a": [
        "Mit Plus ja. Die Rechnung kommt per E-Mail mit Schweizer QR-Rechnung und ist in 30 Tagen fällig. Den Turnier-Pass bezahlst du mit Karte."
      ]
    },
    {
      "q": "Wie kündige ich?",
      "a": [
        "Im Portal unter Abrechnung, mit einem Klick. Plus läuft bis zum Ende des bezahlten Jahres. 30 Tage vor der Verlängerung erinnern wir dich per E-Mail."
      ]
    }
  ],
  "big": {
    "t": "Grössere Organisation?",
    "cta": "Schreib uns",
    "href": "https://portal.planary.ch/support/neu?topic=plan"
  }
} as const;

/** The /tournament pricing section: same plans, the section's own heading, notes and link. */
export const TOURNAMENT_PRICING = {
  "id": "preise",
  "h2": "Gratis anfangen. Zahlen, wenn es gross wird.",
  "lede": "Kleine Turniere kosten nichts. Für ein grosses Turnier gibt es den Pass, für das ganze Jahr Plus.",
  "notes": [
    "Preise in CHF.",
    "Ab fünf Turnieren im Jahr lohnt sich Plus."
  ],
  "all": "Alle Preise und Unterschiede"
} as const;
