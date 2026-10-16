import { useSvgIds } from '../../lib/hooks';

/** Two stacks of play-money chips for the casino card. Stand-in until the final render arrives. Pass `src` to swap in a final image without touching layout. */
export function ChipStack({ src }: { src?: string }) {
  const id = useSvgIds();
  if (src) return <img className="art-img" src={src} alt="" />;
  return (
    <svg viewBox="40 250 600 430">
    <defs>
    <linearGradient id={id('chipSide')} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000000" /><stop offset=".16" stopColor="#34343c" /><stop offset=".34" stopColor="#101014" /><stop offset=".7" stopColor="#050506" /><stop offset=".9" stopColor="#24242a" /><stop offset="1" stopColor="#000000" /></linearGradient>
    <linearGradient id={id('chipInsert')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f4f7" /><stop offset="1" stopColor="#a9a9b3" /></linearGradient>
    <radialGradient id={id('chipTop')} cx=".38" cy=".3" r=".8"><stop offset="0" stopColor="#43434c" /><stop offset=".55" stopColor="#141418" /><stop offset="1" stopColor="#050506" /></radialGradient>
    <radialGradient id={id('chipInlay')} cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#26262d" /><stop offset="1" stopColor="#0b0b0e" /></radialGradient>
    <radialGradient id={id('chipSpot')} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#2a2a31" /><stop offset="1" stopColor="#0b0b0f" stopOpacity="0" /></radialGradient>
    <filter id={id('cB14')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
    <g id={id('chip')}>
    <path d="M-150 0V24A150 46 0 0 0 150 24V0A150 46 0 0 1 -150 0Z" fill={`url(#${id('chipSide')})`} />
    <path d="M147 9.1 L145.2 11.6 L142.9 14 L140.1 16.4 L140.1 40.4 L142.9 38 L145.2 35.6 L147 33.1Z" fill={`url(#${id('chipInsert')})`} />
    <path d="M124.4 25.7 L119.6 27.8 L114.5 29.7 L109 31.6 L109 55.6 L114.5 53.7 L119.6 51.8 L124.4 49.7Z" fill={`url(#${id('chipInsert')})`} />
    <path d="M82.9 38.3 L75.9 39.7 L68.7 40.9 L61.2 42 L61.2 66 L68.7 64.9 L75.9 63.7 L82.9 62.3Z" fill={`url(#${id('chipInsert')})`} />
    <path d="M28.7 45.1 L20.6 45.6 L12.4 45.8 L4.2 46 L4.2 70 L12.4 69.8 L20.6 69.6 L28.7 69.1Z" fill={`url(#${id('chipInsert')})`} />
    <path d="M-29.8 45.1 L-37.8 44.5 L-45.8 43.8 L-53.5 43 L-53.5 67 L-45.8 67.8 L-37.8 68.5 L-29.8 69.1Z" fill={`url(#${id('chipInsert')})`} />
    <path d="M-83.8 38.2 L-90.5 36.7 L-96.9 35.1 L-103.1 33.4 L-103.1 57.4 L-96.9 59.1 L-90.5 60.7 L-83.8 62.2Z" fill={`url(#${id('chipInsert')})`} />
    <path d="M-125 25.4 L-129.4 23.3 L-133.4 21.1 L-136.9 18.8 L-136.9 42.8 L-133.4 45.1 L-129.4 47.3 L-125 49.4Z" fill={`url(#${id('chipInsert')})`} />
    <path d="M-147.2 8.8 L-148.6 6.3 L-149.5 3.8 L-149.9 1.3 L-149.9 25.3 L-149.5 27.8 L-148.6 30.3 L-147.2 32.8Z" fill={`url(#${id('chipInsert')})`} />
    <ellipse cx="0" cy="0" rx="150" ry="46" fill={`url(#${id('chipTop')})`} />
    <path d="M142.6 8.9 L138.6 13.6 L132.9 18.2 L125.5 22.6 L103.5 18.6 L109.6 15 L114.3 11.2 L117.6 7.3Z" fill="#d9d9e0" opacity=".9" />
    <path d="M80.4 37.2 L66.6 39.7 L52 41.7 L36.8 43.2 L30.3 35.6 L42.9 34.4 L54.9 32.7 L66.3 30.7Z" fill="#d9d9e0" opacity=".9" />
    <path d="M-28.9 43.7 L-44.4 42.5 L-59.3 40.7 L-73.5 38.5 L-60.7 31.8 L-48.9 33.6 L-36.6 35 L-23.8 36.1Z" fill="#d9d9e0" opacity=".9" />
    <path d="M-121.3 24.7 L-129.4 20.4 L-135.9 15.9 L-140.8 11.3 L-116.1 9.3 L-112.1 13.2 L-106.7 16.8 L-100 20.3Z" fill="#d9d9e0" opacity=".9" />
    <path d="M-142.6 -8.9 L-138.6 -13.6 L-132.9 -18.2 L-125.5 -22.6 L-103.5 -18.6 L-109.6 -15 L-114.3 -11.2 L-117.6 -7.3Z" fill="#d9d9e0" opacity=".9" />
    <path d="M-80.4 -37.2 L-66.6 -39.7 L-52 -41.7 L-36.8 -43.2 L-30.3 -35.6 L-42.9 -34.4 L-54.9 -32.7 L-66.3 -30.7Z" fill="#d9d9e0" opacity=".9" />
    <path d="M28.9 -43.7 L44.4 -42.5 L59.3 -40.7 L73.5 -38.5 L60.7 -31.8 L48.9 -33.6 L36.6 -35 L23.8 -36.1Z" fill="#d9d9e0" opacity=".9" />
    <path d="M121.3 -24.7 L129.4 -20.4 L135.9 -15.9 L140.8 -11.3 L116.1 -9.3 L112.1 -13.2 L106.7 -16.8 L100 -20.3Z" fill="#d9d9e0" opacity=".9" />
    <ellipse cx="0" cy="0" rx="93" ry="28.5" fill="none" stroke="#3a3a44" strokeWidth="1.5" />
    <ellipse cx="0" cy="0" rx="84" ry="25.8" fill={`url(#${id('chipInlay')})`} />
    </g>
    </defs>
    <ellipse cx="330" cy="470" rx="300" ry="220" fill={`url(#${id('chipSpot')})`} />
    <ellipse cx="260" cy="600" rx="170" ry="26" fill="#000000" opacity=".7" filter={`url(#${id('cB14')})`} />
    <use href={`#${id('chip')}`} transform="translate(250 560)" />
    <use href={`#${id('chip')}`} transform="translate(255 536) scale(-1 1)" />
    <use href={`#${id('chip')}`} transform="translate(249 512)" />
    <use href={`#${id('chip')}`} transform="translate(256 488) scale(-1 1)" />
    <use href={`#${id('chip')}`} transform="translate(252 464)" />
    <use href={`#${id('chip')}`} transform="translate(246 440) scale(-1 1)" />
    <use href={`#${id('chip')}`} transform="translate(252 416)" />
    <use href={`#${id('chip')}`} transform="translate(257 392) scale(-1 1)" />
    <use href={`#${id('chip')}`} transform="translate(251 368)" />
    <use href={`#${id('chip')}`} transform="translate(248 344) scale(-1 1)" />
    <ellipse cx="226" cy="334" rx="80" ry="12" fill="#ffffff" opacity=".14" filter={`url(#${id('cB14')})`} />
    <ellipse cx="455" cy="650" rx="140" ry="22" fill="#000000" opacity=".7" filter={`url(#${id('cB14')})`} />
    <use href={`#${id('chip')}`} transform="translate(452 610) scale(.86)" />
    <use href={`#${id('chip')}`} transform="translate(456 589.4) scale(-.86 .86)" />
    <use href={`#${id('chip')}`} transform="translate(450 568.8) scale(.86)" />
    <use href={`#${id('chip')}`} transform="translate(454 548.2) scale(-.86 .86)" />
    <ellipse cx="434" cy="540" rx="64" ry="10" fill="#ffffff" opacity=".14" filter={`url(#${id('cB14')})`} />
    </svg>
  );
}
