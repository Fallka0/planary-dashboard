import type { ReactNode } from 'react';
import { useSvgIds } from '../../lib/hooks';

/** The flat Planary mark for the card's corner indices (same paths as Logo.tsx). */
function Mark() {
  const id = useSvgIds();
  const ring = 'M6 50A44 12.5 0 0 0 94 50';
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <mask id={id('cut')} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <path d={ring} transform="rotate(-28 50 50)" stroke="#000" strokeWidth="11" />
        </mask>
        <mask id={id('back')} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <circle cx="50" cy="50" r="28" fill="#000" />
        </mask>
      </defs>
      <circle cx="50" cy="50" r="25" fill="currentColor" mask={`url(#${id('cut')})`} />
      <path d="M94 50A44 12.5 0 0 0 6 50" transform="rotate(-28 50 50)" stroke="currentColor" strokeWidth="5" mask={`url(#${id('back')})`} />
      <path d={ring} transform="rotate(-28 50 50)" stroke="currentColor" strokeWidth="5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M8 16 16 8M9 8h7v7" />
    </svg>
  );
}

/** The account preview: one person, signed in once, connected to every app. Drawn, not a screenshot. */
function AccountArt() {
  return (
    <svg className="pv-lens-art" viewBox="0 0 208 208" aria-hidden="true">
      <rect width="208" height="208" fill="#0b0b0f" />
      <g fill="none" stroke="#2c2c34">
        <circle cx="104" cy="80" r="44" />
        <circle cx="104" cy="80" r="62" strokeDasharray="2 5" />
      </g>
      <g stroke="#3a3a43" fill="none">
        <path d="M104 106 L47 160" />
        <path d="M104 106 L85 160" />
        <path d="M104 106 L123 160" />
        <path d="M104 106 L161 160" />
      </g>
      <circle cx="104" cy="80" r="26" fill="#f5f5f7" />
      <text x="104" y="85" textAnchor="middle" className="la-av">NB</text>
      <text x="104" y="124" textAnchor="middle" className="la-n">Noa Brunner</text>
      {/* Casino: a chip */}
      <g transform="translate(-11 0)">
        <circle cx="58" cy="166" r="14" fill="#1e1e24" />
        <circle cx="58" cy="166" r="6.5" fill="none" stroke="#f5f5f7" strokeWidth="1.6" />
        <circle cx="58" cy="166" r="10" fill="none" stroke="#f5f5f7" strokeWidth="1.2" strokeDasharray="2.2 2.2" />
      </g>
      {/* Tournament: a bracket */}
      <g transform="translate(-19 0)">
        <circle cx="104" cy="166" r="14" fill="#1e1e24" />
        <path d="M96 160h5v12h-5M101 166h5M106 162h3v8h-3" fill="none" stroke="#f5f5f7" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      {/* Wishlist: a gift */}
      <g transform="translate(-27 0)">
        <circle cx="150" cy="166" r="14" fill="#1e1e24" />
        <rect x="143" y="164" width="14" height="9" rx="1.5" fill="none" stroke="#f5f5f7" strokeWidth="1.5" />
        <path d="M142 161h16v3h-16zM150 161v12M150 161c-2-4-6-4-6-1.5s4 1.5 6 1.5c2 0 6 1 6-1.5s-4-2.5-6 1.5" fill="none" stroke="#f5f5f7" strokeWidth="1.3" strokeLinejoin="round" />
      </g>
      {/* Vault: a padlock */}
      <g>
        <circle cx="161" cy="166" r="14" fill="#1e1e24" />
        <path d="M157 164v-3a4 4 0 0 1 8 0v3" fill="none" stroke="#f5f5f7" strokeWidth="1.5" />
        <rect x="155" y="164" width="12" height="9" rx="1.5" fill="none" stroke="#f5f5f7" strokeWidth="1.5" />
      </g>
      {/* signed in to each */}
      <g fill="#f5f5f7">
        {[58, 96, 134, 172].map((x) => <circle key={x} cx={x} cy="154" r="3.2" />)}
      </g>
      <g fill="none" stroke="#0b0b0f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {[58, 96, 134, 172].map((x) => <path key={x} d={`M${x - 1.4} 154.1l1 1 2-2.2`} />)}
      </g>
    </svg>
  );
}

/** The Vault preview: the encrypted file list, one file still encrypting. Drawn, not a screenshot. */
function VaultArt() {
  const rows: [string, string, number][] = [['PDF', 'Lease agreement', 52], ['PDF', 'Tax return 2025', 60], ['JPG', 'Passport scan', 48]];
  return (
    <svg className="pv-folder-art" viewBox="0 0 272 150" aria-hidden="true">
      <rect width="272" height="150" fill="#0b0b0f" />
      {rows.map(([type, , w], i) => (
        <g key={i} transform={`translate(14 ${14 + i * 30})`}>
          <rect width="244" height="24" rx="6" fill="#1a1a1f" />
          <rect x="8" y="6" width="22" height="12" rx="3" fill="#26262d" />
          <text x="19" y="14.6" textAnchor="middle" className="va-t">{type}</text>
          <rect x="40" y="9" width={w * 1.6} height="6" rx="3" fill="#5a5a64" />
          <rect x="206" y="9" width="28" height="6" rx="3" fill="#3a3a43" />
        </g>
      ))}
      <g transform="translate(14 104)">
        <rect width="244" height="32" rx="6" fill="none" stroke="#3a3a43" />
        <rect x="10" y="9" width="96" height="6" rx="3" fill="#5a5a64" />
        <rect x="10" y="22" width="224" height="3" rx="1.5" fill="#26262d" />
        <rect className="va-bar" x="10" y="22" width="140" height="3" rx="1.5" fill="#f2f2f5" />
        <path d="M222 6.5v-2a4 4 0 0 1 8 0v2" fill="none" stroke="#f2f2f5" strokeWidth="1.5" />
        <rect x="220" y="6.5" width="12" height="9" rx="2" fill="#f2f2f5" />
      </g>
    </svg>
  );
}

/** Each preview is a link to its app (out of the tab order: the dot is the link for keyboards). */
function Shell({ id, url, children }: { id: string; url: string; children: ReactNode }) {
  return (
    <a className={`pv pv-${id}`} id={`pv-${id}`} data-pv={id} href={url} tabIndex={-1} role="tooltip">
      {children}
    </a>
  );
}

/**
 * The five previews. Each one has its own shape: a lens for the account, a
 * playing card for Casino, a ticket for Tournament, a gift tag for Wishlist and
 * a document folder for Vault.
 * They are always rendered (hidden with visibility) so they can be measured and
 * so the dots can point at them with aria-describedby. RingHero places and opens them.
 */
export function RingPreviews({ urls }: { urls: Record<string, string> }) {
  return (
    <>
      <Shell id="account" url={urls.account}>
        <div className="pv-lens">
          <AccountArt />
          <span className="pv-ring" aria-hidden="true" />
        </div>
        <p className="pv-n">Account</p>
        <p className="pv-l">One sign-in for every Planary app</p>
        <p className="pv-u">auth.planary.ch<ExternalIcon /></p>
      </Shell>

      <Shell id="casino" url={urls.casino}>
        <div className="pv-card">
          <span className="pv-idx">C<Mark /></span>
          <div className="pv-card-pic"><img src="/hero/pv-casino.webp" alt="" width="420" height="420" decoding="async" /></div>
          <p className="pv-n">Casino</p>
          <p className="pv-l">Play-money tables, one chip balance</p>
          <span className="pv-idx pv-idx-b" aria-hidden="true">C<Mark /></span>
        </div>
      </Shell>

      <Shell id="tournament" url={urls.tournament}>
        <div className="pv-ticket">
          <div className="pv-ticket-pic"><img src="/hero/pv-tournament.webp" alt="" width="640" height="354" decoding="async" /></div>
          <div className="pv-ticket-stub">
            <div>
              <p className="pv-n">Tournament</p>
              <p className="pv-l">Brackets, schedules, live scores</p>
            </div>
            <p className="pv-ticket-no" aria-hidden="true">Nº 2026<br />Admit all</p>
          </div>
        </div>
      </Shell>

      <Shell id="wishlist" url={urls.wishlist}>
        <div className="pv-tag">
          <svg className="pv-tag-edge" viewBox="0 0 300 244" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="40,0.5 299.5,0.5 299.5,243.5 40,243.5 0.5,204 0.5,40" vectorEffect="non-scaling-stroke" />
            <line x1="34" y1="6" x2="34" y2="238" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="pv-hole" aria-hidden="true" />
          <div className="pv-tag-pic"><img src="/hero/pv-wishlist.webp" alt="" width="560" height="417" decoding="async" /></div>
          <div className="pv-tag-txt">
            <p className="pv-n">Wishlist</p>
            <p className="pv-l">Lists you share, gifts you plan</p>
          </div>
        </div>
      </Shell>

      <Shell id="vault" url={urls.vault}>
        <div className="pv-folder">
          <span className="pv-folder-tab" aria-hidden="true" />
          <div className="pv-folder-pic"><VaultArt /></div>
          <div className="pv-folder-txt">
            <div>
              <p className="pv-n">Vault</p>
              <p className="pv-l">Documents only you can open</p>
            </div>
            <p className="pv-folder-seal" aria-hidden="true">End-to-end<br />encrypted</p>
          </div>
        </div>
      </Shell>
    </>
  );
}
