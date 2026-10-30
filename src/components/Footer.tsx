import {
  ACCOUNT_INFO_URL,
  CASINO_INFO_URL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  AGB_URL,
  DATENSCHUTZ_URL,
  GITHUB_URL,
  IMPRESSUM_URL,
  INSTAGRAM_URL,
  TEAM_URL,
  TIKTOK_URL,
  TOURNAMENT_INFO_URL,
  VAULT_INFO_URL,
  WISHLIST_INFO_URL,
} from '../lib/links';
import { Logo } from './Logo';
import { AccountLink } from './Profile';

export type ProductPage = 'casino' | 'tournament' | 'wishlist' | 'vault' | 'account';

/** `current` marks the product page you're on in the Products list. */
export function Footer({ current }: { current?: ProductPage }) {
  const cur = (page: ProductPage) => (current === page ? ('page' as const) : undefined);
  return (
    <footer className="foot g">
      <div className="foot-wm"><Logo /></div>
      <div className="fc1">
        <h2>Products</h2>
        <ul>
          <li><a className="ul" href={CASINO_INFO_URL} aria-current={cur('casino')}>Casino</a></li>
          <li><a className="ul" href={TOURNAMENT_INFO_URL} aria-current={cur('tournament')}>Tournament</a></li>
          <li><a className="ul" href={WISHLIST_INFO_URL} aria-current={cur('wishlist')}>Wishlist</a></li>
          <li><a className="ul" href={VAULT_INFO_URL} aria-current={cur('vault')}>Vault</a></li>
          <li><a className="ul" href={ACCOUNT_INFO_URL} aria-current={cur('account')}>Account</a></li>
        </ul>
      </div>
      <div className="fc2">
        <h2>Studio</h2>
        <ul>
          <li><a className="ul" href={TEAM_URL}>Team</a></li>
          <li><a className="ul" href={CONTACT_MAILTO}>Contact</a></li>
          <li><AccountLink /></li>
        </ul>
      </div>
      <div className="fc3">
        <h2>Elsewhere</h2>
        <ul>
          <li><a className="ul" href={INSTAGRAM_URL}>Instagram</a></li>
          <li><a className="ul" href={TIKTOK_URL}>TikTok</a><span>@planaryofficial</span></li>
          <li><a className="ul" href={GITHUB_URL}>GitHub</a></li>
        </ul>
      </div>
      <div className="legal"><span>© 2026 Planary, Switzerland</span><span className="legal-links"><a className="ul" href={IMPRESSUM_URL}>Impressum</a><a className="ul" href={DATENSCHUTZ_URL}>Datenschutz</a><a className="ul" href={AGB_URL}>AGB</a><span>{CONTACT_EMAIL}</span></span></div>
    </footer>
  );
}
