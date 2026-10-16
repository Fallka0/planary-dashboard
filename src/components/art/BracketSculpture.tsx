import { useSvgIds } from '../../lib/hooks';

/**
 * Stepped bracket plates. Plates are `.plate kN` groups and connectors are
 * `.rod rN` paths, so the bracket can build round by round when its `[data-anim]`
 * wrapper plays. Stand-in until the final render arrives: pass `src` to swap in an
 * image without touching layout.
 */
export function BracketSculpture({ src }: { src?: string }) {
  const id = useSvgIds();
  if (src) return <img className="art-img" src={src} alt="" />;
  return (
    <svg viewBox="-30 -240 880 420">
    <defs>
    <linearGradient id={id('plateTop')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#55555f" /><stop offset=".45" stopColor="#16161b" /><stop offset="1" stopColor="#050507" /></linearGradient>
    </defs>
    <path className="rod r0" pathLength="1" d="M515.7 -99 L584.9 -59 L584.9 -129 L528.6 -96.5" fill="none" stroke="#0b0b0f" strokeWidth="3" strokeLinejoin="round" />
    <path className="rod r1" pathLength="1" d="M403.1 -34 L472.4 6 L472.4 -64 L528.6 -96.5" fill="none" stroke="#0b0b0f" strokeWidth="3" strokeLinejoin="round" />
    <path className="rod r2" pathLength="1" d="M290.5 31 L359.8 71 L359.8 1 L303.5 33.5" fill="none" stroke="#0b0b0f" strokeWidth="3" strokeLinejoin="round" />
    <path className="rod r3" pathLength="1" d="M177.9 96 L247.2 136 L247.2 66 L303.5 33.5" fill="none" stroke="#0b0b0f" strokeWidth="3" strokeLinejoin="round" />
    <path className="rod r4" pathLength="1" d="M675.9 -11.5 L745.2 28.5 L745.2 -41.5 L632.6 23.5" fill="none" stroke="#0b0b0f" strokeWidth="3" strokeLinejoin="round" />
    <path className="rod r5" pathLength="1" d="M450.7 118.5 L520 158.5 L520 88.5 L632.6 23.5" fill="none" stroke="#0b0b0f" strokeWidth="3" strokeLinejoin="round" />
    <g className="plate k0"><path d="M326.9 -168 L474.1 -83 L474.1 -67 L326.9 -152Z" fill="#050507" /><path d="M557.2 -131 L474.1 -83 L474.1 -67 L557.2 -115Z" fill="#1a1a20" /><path d="M410 -216 L557.2 -131 L474.1 -83 L326.9 -168Z" fill={`url(#${id('plateTop')})`} /><path d="M326.9 -168 L474.1 -83" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2" /></g>
    <g className="plate k1"><path d="M214.3 -103 L361.5 -18 L361.5 -2 L214.3 -87Z" fill="#050507" /><path d="M444.6 -66 L361.5 -18 L361.5 -2 L444.6 -50Z" fill="#1a1a20" /><path d="M297.4 -151 L444.6 -66 L361.5 -18 L214.3 -103Z" fill={`url(#${id('plateTop')})`} /><path d="M214.3 -103 L361.5 -18" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2" /></g>
    <g className="plate k2"><path d="M101.7 -38 L248.9 47 L248.9 63 L101.7 -22Z" fill="#050507" /><path d="M332.1 -1 L248.9 47 L248.9 63 L332.1 15Z" fill="#1a1a20" /><path d="M184.8 -86 L332.1 -1 L248.9 47 L101.7 -38Z" fill={`url(#${id('plateTop')})`} /><path d="M101.7 -38 L248.9 47" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2" /></g>
    <g className="plate k4"><path d="M487.1 -80.5 L634.3 4.5 L634.3 20.5 L487.1 -64.5Z" fill="#050507" /><path d="M717.4 -43.5 L634.3 4.5 L634.3 20.5 L717.4 -27.5Z" fill="#1a1a20" /><path d="M570.2 -128.5 L717.4 -43.5 L634.3 4.5 L487.1 -80.5Z" fill={`url(#${id('plateTop')})`} /><path d="M487.1 -80.5 L634.3 4.5" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2" /></g>
    <g className="plate k3"><path d="M-10.9 27 L136.3 112 L136.3 128 L-10.9 43Z" fill="#050507" /><path d="M219.5 64 L136.3 112 L136.3 128 L219.5 80Z" fill="#1a1a20" /><path d="M72.3 -21 L219.5 64 L136.3 112 L-10.9 27Z" fill={`url(#${id('plateTop')})`} /><path d="M-10.9 27 L136.3 112" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2" /></g>
    <g className="plate k5"><path d="M261.9 49.5 L409.1 134.5 L409.1 150.5 L261.9 65.5Z" fill="#050507" /><path d="M492.3 86.5 L409.1 134.5 L409.1 150.5 L492.3 102.5Z" fill="#1a1a20" /><path d="M345 1.5 L492.3 86.5 L409.1 134.5 L261.9 49.5Z" fill={`url(#${id('plateTop')})`} /><path d="M261.9 49.5 L409.1 134.5" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2" /></g>
    <g className="plate plate-final"><path d="M591 39.5 L738.2 124.5 L738.2 140.5 L591 55.5Z" fill="#050507" /><path d="M821.4 76.5 L738.2 124.5 L738.2 140.5 L821.4 92.5Z" fill="#1a1a20" /><path d="M674.1 -8.5 L821.4 76.5 L738.2 124.5 L591 39.5Z" fill={`url(#${id('plateTop')})`} /><path d="M591 39.5 L738.2 124.5" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2" /></g>
    </svg>
  );
}
