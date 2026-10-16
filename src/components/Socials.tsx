import { GITHUB_URL, INSTAGRAM_URL, TIKTOK_URL } from '../lib/links';
import { GitHubIcon, InstagramIcon, TikTokIcon } from './icons';

export function Socials() {
  return (
    <ul className="socials">
      <li>
        <a className="sbtn" href={INSTAGRAM_URL} aria-label="Planary on Instagram"><InstagramIcon /></a>
      </li>
      <li>
        <a className="sbtn" href={TIKTOK_URL} aria-label="Planary on TikTok"><TikTokIcon /></a>
      </li>
      <li>
        <a className="sbtn" href={GITHUB_URL} aria-label="Planary on GitHub"><GitHubIcon /></a>
      </li>
    </ul>
  );
}
