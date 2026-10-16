import { useSvgIds } from '../../lib/hooks';

/** Key for the Planary Account row. Stand-in until the final render arrives. Pass `src` to swap in a final image without touching layout. */
export function KeyObject({ src }: { src?: string }) {
  const id = useSvgIds();
  if (src) return <img className="acct-key art-img" src={src} alt="" aria-hidden="true" />;
  return (
    <svg className="acct-key" viewBox="0 0 140 64" aria-hidden="true">
    <defs><linearGradient id={id('kG')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5e5e68" /><stop offset=".45" stopColor="#17171c" /><stop offset="1" stopColor="#000000" /></linearGradient></defs>
    <path fillRule="evenodd" fill={`url(#${id('kG')})`} d="M32 6a26 26 0 1 1 0 52a26 26 0 1 1 0-52Zm0 16a10 10 0 1 0 0 20a10 10 0 1 0 0-20Z" />
    <path fill={`url(#${id('kG')})`} d="M56 26H132a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-8v10h-10v-10h-8v14h-10v-14H56Z" />
    <path d="M13 22a22 22 0 0 1 22-13" stroke="#ffffff" strokeOpacity=".6" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M60 29.5H128" stroke="#ffffff" strokeOpacity=".45" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
