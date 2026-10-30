import { useSvgIds } from '../../lib/hooks';

/** The left face of the safe, as a matrix: x along its bottom edge, y straight down, origin at its top corner. */
const FACE = 'matrix(.866 .5 0 1 -181.9 -15)';

/**
 * A glossy black isometric safe for Vault, in the style of the Wishlist gift boxes. Two sheets
 * drop into the slot on top (`.sdrop`), then the dial turns (`.vdial`) when the `[data-anim]`
 * wrapper plays. Stand-in until a final render arrives: pass `src` to swap in an image.
 */
export function VaultSafe({ src }: { src?: string }) {
  const id = useSvgIds();
  if (src) return <img className="art-img" src={src} alt="" />;
  const sheet = (dx: number, dy: number, cls: string) => (
    <g className={`sdrop ${cls}`} transform={`translate(${dx} ${dy})`}>
      <path d="M-38 17 L50 -34 L50 -150 L-38 -99Z" fill={`url(#${id('paper')})`} stroke="#ffffff" strokeOpacity=".6" strokeWidth="1" />
      {/* lines of text, along the sheet's top edge (slope -tan 30°) */}
      {[62, 62, 62, 36].map((len, i) => (
        <path key={i} d={`M-26 ${-82 + i * 16} l${len} ${(-0.577 * len).toFixed(1)}`} stroke="#9a9aa4" strokeWidth="4" strokeLinecap="round" />
      ))}
    </g>
  );
  return (
    <svg className="safe" viewBox="-232 -232 470 470" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id={id('top')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a8a94" /><stop offset=".5" stopColor="#4a4a52" /><stop offset="1" stopColor="#26262d" /></linearGradient>
        <linearGradient id={id('front')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34343c" /><stop offset="1" stopColor="#16161b" /></linearGradient>
        <linearGradient id={id('side')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0e0e12" /><stop offset="1" stopColor="#020203" /></linearGradient>
        <linearGradient id={id('chrome')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".5" stopColor="#b9b9c3" /><stop offset="1" stopColor="#e9e9ee" /></linearGradient>
        <linearGradient id={id('paper')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#d4d4da" /></linearGradient>
        <filter id={id('sh')} x="-40%" y="-60%" width="180%" height="220%"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      <ellipse cx="20.7" cy="150" rx="205" ry="100" fill="#0b0b0f" opacity=".26" filter={`url(#${id('sh')})`} />
      <path d="M-181.9 -15 L17.3 100 L17.3 220 L-181.9 105Z" fill={`url(#${id('front')})`} />
      <path d="M199.2 -5 L17.3 100 L17.3 220 L199.2 115Z" fill={`url(#${id('side')})`} />
      <path d="M0 -120 L199.2 -5 L17.3 100 L-181.9 -15Z" fill={`url(#${id('top')})`} />
      <path d="M-181.9 -15 L17.3 100 L199.2 -5" fill="none" stroke="#ffffff" strokeOpacity=".5" strokeWidth="1.2" strokeLinejoin="round" />
      {/* the door: an inset panel, the dial and the handle */}
      <g transform={FACE}>
        <rect x="16" y="14" width="198" height="92" rx="6" fill="none" stroke="#ffffff" strokeOpacity=".18" strokeWidth="1.5" />
        <circle cx="96" cy="60" r="30" fill={`url(#${id('chrome')})`} />
        <circle cx="96" cy="60" r="22" fill="#1e1e24" />
        <g className="vdial">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="96" y1="41" x2="96" y2={i % 3 ? 44 : 47} stroke="#e9e9ee" strokeWidth="1.6" transform={`rotate(${i * 30} 96 60)`} />
          ))}
          <circle cx="96" cy="60" r="6" fill={`url(#${id('chrome')})`} />
        </g>
        <rect x="150" y="54" width="44" height="12" rx="6" fill={`url(#${id('chrome')})`} />
        <circle cx="156" cy="60" r="9" fill={`url(#${id('chrome')})`} />
      </g>
      {/* the slot on top, then the sheets standing in it */}
      <path d="M-48.6 17 L55.4 -43 L65.8 -37 L-38.2 23Z" fill="#020203" />
      {sheet(-4, -2, 's0')}
      {sheet(6, 4, 's1')}
    </svg>
  );
}
