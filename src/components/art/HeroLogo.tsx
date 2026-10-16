import { useSvgIds } from '../../lib/hooks';

/**
 * The hero's animated Planary logo: the glossy planet scales in, the chrome ring
 * draws itself (back half, then front), its shadow falls on the planet, a light
 * sweep runs along the ring every 8 s and the whole object floats. All motion is
 * CSS (see homepage.css); with reduced motion it renders fully drawn and still.
 */
export function HeroLogo() {
  const id = useSvgIds();
  return (
    <svg className="hl" viewBox="2 2 96 96" aria-hidden="true">
    <defs>
    <mask id={id('hP')} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="130"><rect x="-10" y="-10" width="120" height="130" fill="#ffffff" /><path d="M6 50A44 12.5 0 0 0 94 50" transform="rotate(-28 50 50)" fill="none" stroke="#000000" strokeWidth="11" /></mask>
    <mask id={id('hB')} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="130"><rect x="-10" y="-10" width="120" height="130" fill="#ffffff" /><circle cx="50" cy="50" r="28" fill="#000000" /></mask>
    <radialGradient id={id('hPlanet')} gradientUnits="userSpaceOnUse" cx="38" cy="33" r="42"><stop offset="0" stopColor="#6a6a74" /><stop offset=".28" stopColor="#26262d" /><stop offset=".68" stopColor="#0a0a0d" /><stop offset="1" stopColor="#000000" /></radialGradient>
    <linearGradient id={id('hRing')} gradientUnits="userSpaceOnUse" x1="8" y1="30" x2="92" y2="70"><stop offset="0" stopColor="#ffffff" /><stop offset=".22" stopColor="#b9b9c3" /><stop offset=".48" stopColor="#3a3a42" /><stop offset=".7" stopColor="#e9e9ee" /><stop offset="1" stopColor="#5a5a64" /></linearGradient>
    <clipPath id={id('hC')}><circle cx="50" cy="50" r="25" /></clipPath>
    <filter id={id('hBl1')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation=".7" /></filter>
    <filter id={id('hBl2')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" /></filter>
    <filter id={id('hBl5')} x="-40%" y="-400%" width="180%" height="900%"><feGaussianBlur stdDeviation="4" /></filter>
    </defs>
    <ellipse className="hl-shadow" cx="50" cy="88" rx="24" ry="2.8" fill="#0b0b0f" opacity=".3" filter={`url(#${id('hBl5')})`} />
    <g className="hl-float">
    <path className="hl-ring" pathLength="1" d="M94 50A44 12.5 0 0 0 6 50" transform="rotate(-28 50 50)" fill="none" stroke={`url(#${id('hRing')})`} strokeWidth="5" strokeLinecap="round" mask={`url(#${id('hB')})`} />
    <g className="hl-planet" mask={`url(#${id('hP')})`}>
    <circle cx="50" cy="50" r="25" fill={`url(#${id('hPlanet')})`} />
    <ellipse cx="41" cy="37" rx="9" ry="3.6" transform="rotate(-28 41 37)" fill="#ffffff" opacity=".55" filter={`url(#${id('hBl2')})`} />
    <ellipse cx="43.5" cy="35.4" rx="3.2" ry="1.1" transform="rotate(-28 43.5 35.4)" fill="#ffffff" opacity=".85" />
    <ellipse cx="62" cy="66" rx="10" ry="3" transform="rotate(-28 62 66)" fill="#a2a2ae" opacity=".32" filter={`url(#${id('hBl2')})`} />
    <g clipPath={`url(#${id('hC')})`}><path className="hl-cast" d="M6 50A44 12.5 0 0 0 94 50" transform="translate(.8 3.2) rotate(-28 50 50)" fill="none" stroke="#000000" strokeWidth="5" opacity=".55" filter={`url(#${id('hBl2')})`} /></g>
    </g>
    <path className="hl-ring hl-front" pathLength="1" d="M6 50A44 12.5 0 0 0 94 50" transform="rotate(-28 50 50)" fill="none" stroke={`url(#${id('hRing')})`} strokeWidth="5" strokeLinecap="round" />
    <path className="hl-glint" pathLength="1" d="M6 50A44 12.5 0 0 0 94 50" transform="translate(0 -.6) rotate(-28 50 50)" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" filter={`url(#${id('hBl1')})`} />
    </g>
    </svg>
  );
}
