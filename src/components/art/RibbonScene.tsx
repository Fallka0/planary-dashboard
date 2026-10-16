import { useSvgIds } from '../../lib/hooks';

/** Ribbon bow on the lavender scene for Wishlist. Stand-in until the final render arrives. Pass `src` to swap in a final image without touching layout. */
export function RibbonScene({ src }: { src?: string }) {
  const id = useSvgIds();
  if (src) return <img className="art-img" src={src} alt="" />;
  return (
    <svg viewBox="0 0 1000 562" preserveAspectRatio="xMidYMid slice">
    <defs>
    <linearGradient id={id('wSky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6e3fb" /><stop offset=".62" stopColor="#d6d1f8" /><stop offset="1" stopColor="#c9c3f5" /></linearGradient>
    <radialGradient id={id('wPearl')} cx=".35" cy=".28" r=".85"><stop offset="0" stopColor="#ffffff" /><stop offset=".42" stopColor="#f0eefd" /><stop offset=".78" stopColor="#d2cbf7" /><stop offset="1" stopColor="#b2a9ec" /></radialGradient>
    <radialGradient id={id('wPuff')} cx=".38" cy=".32" r=".7"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#e2defb" /><stop offset="1" stopColor="#bdb5f0" /></radialGradient>
    <filter id={id('wB40')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40" /></filter>
    <filter id={id('wB12')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12" /></filter>
    <filter id={id('wB4')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
    </defs>
    <rect width="1000" height="562" fill={`url(#${id('wSky')})`} />
    <circle cx="760" cy="110" r="190" fill="#ffffff" opacity=".6" filter={`url(#${id('wB40')})`} />
    <ellipse cx="160" cy="610" rx="470" ry="180" fill="#bfb7f1" />
    <ellipse cx="880" cy="630" rx="450" ry="200" fill="#b8afee" />
    <ellipse cx="520" cy="650" rx="560" ry="150" fill="#cdc7f6" />
    <circle cx="110" cy="452" r="48" fill={`url(#${id('wPuff')})`} />
    <circle cx="196" cy="476" r="30" fill={`url(#${id('wPuff')})`} />
    <circle cx="872" cy="458" r="56" fill={`url(#${id('wPuff')})`} />
    <circle cx="792" cy="490" r="28" fill={`url(#${id('wPuff')})`} />
    <circle cx="660" cy="512" r="20" fill={`url(#${id('wPuff')})`} />
    <circle cx="338" cy="516" r="16" fill={`url(#${id('wPuff')})`} />
    <ellipse cx="500" cy="506" rx="180" ry="20" fill="#7f75cf" opacity=".35" filter={`url(#${id('wB12')})`} />
    <g transform="translate(500 246) scale(1.12)">
    <path d="M-8 8 C-40 62 -80 128 -122 186 L-84 198 L-72 168 C-44 118 -18 62 10 12 Z" fill={`url(#${id('wPearl')})`} />
    <path d="M8 8 C34 70 62 138 74 206 L108 186 L124 196 C94 128 44 60 14 4 Z" fill={`url(#${id('wPearl')})`} />
    <path d="M0 0 C-40 -62 -172 -114 -192 -40 C-206 16 -112 42 0 0 Z" fill={`url(#${id('wPearl')})`} />
    <path d="M0 0 C40 -62 172 -114 192 -40 C206 16 112 42 0 0 Z" fill={`url(#${id('wPearl')})`} />
    <path d="M-20 -6 C-60 -46 -142 -72 -152 -36 C-157 -10 -92 6 -20 -6 Z" fill="#b5acee" opacity=".55" />
    <path d="M20 -6 C60 -46 142 -72 152 -36 C157 -10 92 6 20 -6 Z" fill="#b5acee" opacity=".55" />
    <rect x="-28" y="-30" width="56" height="54" rx="18" fill={`url(#${id('wPearl')})`} />
    <ellipse cx="-118" cy="-62" rx="44" ry="10" transform="rotate(-18 -118 -62)" fill="#ffffff" opacity=".8" filter={`url(#${id('wB4')})`} />
    <ellipse cx="98" cy="-66" rx="36" ry="8" transform="rotate(16 98 -66)" fill="#ffffff" opacity=".65" filter={`url(#${id('wB4')})`} />
    <ellipse cx="-8" cy="-16" rx="12" ry="6" fill="#ffffff" opacity=".9" filter={`url(#${id('wB4')})`} />
    </g>
    </svg>
  );
}
