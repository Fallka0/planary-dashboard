// Copy for planary.ch/vault and planary.ch/vault/pricing (handoff 17, 18 and 18b, BRIEF section 9).
// Plans and limits match the Vault app (shared/plans.ts there) and planary-org's ADR 0003.

export type VaultPlanId = 'free' | 'plus' | 'pro';

export const VAULT_PLANS: { id: VaultPlanId; n: string; for: string; monthly: number; yearly: number; li: string[]; cta: string }[] = [
  { id: 'free', n: 'Free', for: 'For your important papers.', monthly: 0, yearly: 0, li: ['10 GB', '2 GB per file', '30 days of versions', 'Links up to 7 days'], cta: 'Start free' },
  { id: 'plus', n: 'Plus', for: 'For a whole household of paperwork.', monthly: 4, yearly: 40, li: ['200 GB', '20 GB per file', '1 year of versions', 'Links up to 1 year', '100 downloads per link'], cta: 'Choose Plus' },
  { id: 'pro', n: 'Pro', for: 'For families and small teams.', monthly: 10, yearly: 100, li: ['2 TB', '50 GB per file', 'All versions, kept', 'Links without limits'], cta: 'Choose Pro' },
];

/** Rows of the comparison on the pricing page: label, then Free, Plus, Pro. `true` is a check, `null` a dash. */
export const VAULT_COMPARE: [label: string, free: string | boolean | null, plus: string | boolean | null, pro: string | boolean | null][] = [
  ['Storage', '10 GB', '200 GB', '2 TB'],
  ['Max file size', '2 GB', '20 GB', '50 GB'],
  ['Version history', '30 days', '1 year', 'Unlimited'],
  ['Link expiry', 'Up to 7 days', 'Up to 1 year', 'No limit'],
  ['Downloads per link', '10', '100', 'Unlimited'],
  ['Password on links', true, true, true],
  ['Share folders with Planary users', true, true, true],
  ['End-to-end encryption', true, true, true],
  ['Recovery key', true, true, true],
  ['Pay by invoice', null, 'Yearly', 'Yearly'],
];

export const VAULT_PAGE = {
  nav: {
    app: 'Vault',
    links: [
      { label: 'How it works', href: '/vault#how' },
      { label: 'Security', href: '/vault#security' },
      { label: 'Pricing', href: '/vault/pricing' },
      { label: 'FAQ', href: '/vault#faq' },
    ],
    signIn: 'Sign in',
    cta: 'Open Vault',
    menu: 'Menu',
    close: 'Close menu',
  },
  hero: {
    h1: ['Documents', 'only you can', 'open.'],
    sub: "Encrypted in your browser before upload. Planary can't read them.",
    cta: 'Open Vault',
    alt: 'How it works',
    fine: 'Free up to 10 GB. No card needed.',
    screenLabel: 'Vault: a list of encrypted documents, one of them still encrypting',
    files: [
      ['PDF', 'Lease agreement.pdf', '1.2 MB'],
      ['PDF', 'Tax return 2025.pdf', '3.4 MB'],
      ['JPG', 'Passport scan.jpg', '2.1 MB'],
      ['PDF', 'Health insurance 2026.pdf', '640 KB'],
    ],
    encrypting: 'Pillar 3a statement.pdf',
  },
  verbs: {
    h2: 'It goes like this.',
    items: [
      { t: 'Upload', p: "Drop a file. It's encrypted on your device first." },
      { t: 'Organise', p: 'Folders and tags. Search finds any file by name.' },
      { t: 'Share', p: 'Send a link with a password and an end date.' },
    ],
  },
  features: {
    h2: 'What you get.',
    items: [
      { t: 'Version history', p: 'Go back to any older version of a file.' },
      { t: 'Share links', p: 'Password, end date and download limit.' },
      { t: 'Fast search', p: 'Names, folders and tags, searched on your device.' },
      { t: 'Recovery key', p: 'Your way back in if you forget the passphrase.' },
      { t: 'On your phone', p: 'Works in any browser, no app needed.' },
      { t: 'One account', p: 'Same sign-in as Tournament and Wishlist.' },
    ],
  },
  security: {
    h2: "What we can't see.",
    hidden: { h: 'Hidden from Planary', li: ['File contents', 'File and folder names', 'Tags', 'Your passphrase'] },
    seen: { h: 'What we do see', li: ['Your Planary email', 'How much space you use', 'When you sign in'] },
  },
  pricing: {
    h2: 'Start free. Pay for more space.',
    note: 'Prices in CHF. Yearly saves two months.',
    all: 'All prices and differences',
  },
  faq: {
    h2: 'Common questions',
    missing: 'Something missing?',
    items: [
      { q: 'What if I forget my passphrase?', a: ['Use your recovery key. Without it, nobody can open your files, not even us.'] },
      {
        q: 'Can Planary open my files?',
        a: [
          'No. Files, their names and tags are encrypted in your browser before they leave it, with keys only your passphrase or recovery key can open.',
          'We store the encrypted data and see your Planary email, how much space you use and when you sign in.',
        ],
      },
      {
        q: 'Can I share with someone without an account?',
        a: [
          'Yes, with a link. The key to the file is in the part of the link after the #, which never reaches our servers. Add a password, an end date and a download limit if you like.',
          'To share a folder, or to let someone edit, they need a Planary account.',
        ],
      },
      {
        q: 'What happens if I cancel?',
        a: ['Your plan runs to the end of the paid period, then you are on Vault Free. Nothing is deleted. Over 10 GB you can still open and download everything, but not upload until there is room.'],
      },
    ],
  },
  end: { h2: 'Open your vault.', cta: 'Open Vault', alt: 'See pricing' },
  pricingPage: {
    h1: 'More room for your documents.',
    sub: 'Every plan is end-to-end encrypted.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    save: '2 months free',
    notes: ['Prices in CHF. Cancel anytime in Vault.', 'Billed through your Planary account.'],
    compared: 'Compared',
    group: 'Vault',
    more: 'Need more space?',
    write: 'Write to us',
    faq: [
      { q: 'Can I switch plans anytime?', a: ['Yes. Upgrades apply right away. Downgrades apply at the end of the period.'] },
      {
        q: 'What happens to my files if I downgrade?',
        a: [
          'Nothing is deleted. If you use more than the new plan allows, you can still open, download and share everything, but not upload until there is room.',
          'Older versions are kept by your old plan’s rules for 30 more days.',
        ],
      },
      { q: 'Can I pay by invoice?', a: ['Yes, for Plus and Pro paid yearly: one invoice with a QR-bill, payable within 30 days. Monthly plans are paid by card.'] },
      {
        q: 'Does a plan cover other Planary apps?',
        a: ['No. Vault plans are for Vault. Planary Plus covers Tournament and Wishlist. Both are billed through the same Planary account, with one place for invoices and your card.'],
      },
    ],
  },
  footer: { copy: '© 2026 Planary, Switzerland' },
} as const;
