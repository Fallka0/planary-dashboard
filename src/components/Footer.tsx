import {
  ACCOUNT_INFO_URL,
  AUTH_URL,
  CASINO_INFO_URL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  GITHUB_URL,
  INSTAGRAM_URL,
  TEAM_URL,
  TIKTOK_URL,
  TOURNAMENT_INFO_URL,
  WISHLIST_INFO_URL,
} from '../lib/links';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="foot g">
      <div className="foot-wm"><Logo /></div>
      <div className="fc1">
        <h2>Products</h2>
        <ul>
          <li><a className="ul" href={CASINO_INFO_URL}>Planary Casino</a></li>
          <li><a className="ul" href={TOURNAMENT_INFO_URL}>Tournament</a></li>
          <li><a className="ul" href={WISHLIST_INFO_URL}>Planary Wishlist</a></li>
          <li><a className="ul" href={ACCOUNT_INFO_URL}>Planary Account</a></li>
        </ul>
      </div>
      <div className="fc2">
        <h2>Studio</h2>
        <ul>
          <li><a className="ul" href={TEAM_URL}>Team</a></li>
          <li><a className="ul" href={CONTACT_MAILTO}>Contact</a></li>
          <li><a className="ul" href={AUTH_URL}>Sign in</a></li>
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
      <div className="legal"><span>© Planary, Switzerland</span><span>{CONTACT_EMAIL}</span></div>
    </footer>
  );
}
