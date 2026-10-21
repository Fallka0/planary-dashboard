import { useSvgIds } from '../lib/hooks';
import { HOME_URL } from '../lib/links';

/**
 * The flat Planary mark (assets/logo/planary-mark.svg) in currentColor.
 * The ring is fixed at −28°, rising to the right; don't change it.
 */
export function LogoMark() {
  const id = useSvgIds();
  const ring = 'M6 50A44 12.5 0 0 0 94 50';
  return (
    <svg className="wm-mark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
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
      <path d="M94 50A44 12.5 0 0 0 6 50" transform="rotate(-28 50 50)" stroke="currentColor" strokeWidth="5" strokeLinecap="round" mask={`url(#${id('back')})`} />
      <path d={ring} transform="rotate(-28 50 50)" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** The mark plus the wordmark. `href={null}` renders it as plain text (the foot of the beamer screen). */
export function Logo({ href = HOME_URL }: { href?: string | null }) {
  if (href === null) return <span className="wm"><LogoMark /><span>Planary</span></span>;
  return <a className="wm" href={href}><LogoMark /><span>Planary</span></a>;
}
