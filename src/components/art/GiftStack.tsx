import { useSvgIds } from '../../lib/hooks';

/**
 * Glossy black isometric gift boxes with chrome ribbons, for Wishlist. Boxes are
 * `.gdrop gN` groups (bottom to top) and the bow is `.bow`, so they drop in and the
 * bow pops when the `[data-anim]` wrapper plays. Stand-in until a final render
 * arrives: pass `src` to swap in an image without touching layout.
 */
export function GiftStack({ src }: { src?: string }) {
  const id = useSvgIds();
  if (src) return <img className="art-img" src={src} alt="" />;
  return (
    <svg className="gifts" viewBox="-211.9 -283.5 479.2 642.5" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs>
    <linearGradient id={id('gTop')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a8a94"/><stop offset=".5" stopColor="#4a4a52"/><stop offset="1" stopColor="#26262d"/></linearGradient>
    <linearGradient id={id('gFront')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34343c"/><stop offset="1" stopColor="#16161b"/></linearGradient>
    <linearGradient id={id('gSide')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0e0e12"/><stop offset="1" stopColor="#020203"/></linearGradient>
    <linearGradient id={id('gRib')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset=".5" stopColor="#b9b9c3"/><stop offset="1" stopColor="#e9e9ee"/></linearGradient>
    <linearGradient id={id('gRibF')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c9c9d1"/><stop offset="1" stopColor="#6b6b75"/></linearGradient>
    <linearGradient id={id('gRibS')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9e9ee"/><stop offset="1" stopColor="#8e8e98"/></linearGradient>
    <radialGradient id={id('gBow')} cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#ffffff"/><stop offset=".55" stopColor="#c4c4cc"/><stop offset="1" stopColor="#7a7a84"/></radialGradient>
    <filter id={id('gSh')} x="-40%" y="-60%" width="180%" height="220%"><feGaussianBlur stdDeviation="12"/></filter>
    </defs>
    <ellipse cx="20.7" cy="134" rx="205" ry="112" fill="#0b0b0f" opacity=".26" filter={`url(#${id('gSh')})`}/><ellipse cx="155.2" cy="275" rx="96" ry="54" fill="#0b0b0f" opacity=".24" filter={`url(#${id('gSh')})`}/>
    <g className="gdrop g0">
    <path d="M-181.9 -15 L17.3 100 L17.3 220 L-181.9 105Z" fill={`url(#${id('gFront')})`}/>
    <path d="M199.2 -5 L17.3 100 L17.3 220 L199.2 115Z" fill={`url(#${id('gSide')})`}/>
    <path d="M0 -120 L199.2 -5 L17.3 100 L-181.9 -15Z" fill={`url(#${id('gTop')})`}/>
    <path d="M89.2 -68.5 L110 -56.5 L-71.9 48.5 L-92.7 36.5Z" fill={`url(#${id('gRib')})`}/>
    <path d="M-80.5 -73.5 L118.6 41.5 L97.9 53.5 L-101.3 -61.5Z" fill={`url(#${id('gRib')})`}/>
    <path d="M-92.7 36.5 L-71.9 48.5 L-71.9 168.5 L-92.7 156.5Z" fill={`url(#${id('gRibF')})`}/>
    <path d="M118.6 41.5 L97.9 53.5 L97.9 173.5 L118.6 161.5Z" fill={`url(#${id('gRibS')})`}/>
    <path d="M-181.9 -15 L17.3 100 L199.2 -5" fill="none" stroke="#ffffff" strokeOpacity=".5" strokeWidth="1.2" strokeLinejoin="round"/>
    </g>
    <g className="gdrop g1">
    <path d="M-125.6 -104.5 L13 -24.5 L13 67.5 L-125.6 -12.5Z" fill={`url(#${id('gFront')})`}/>
    <path d="M142.9 -99.5 L13 -24.5 L13 67.5 L142.9 -7.5Z" fill={`url(#${id('gSide')})`}/>
    <path d="M4.3 -179.5 L142.9 -99.5 L13 -24.5 L-125.6 -104.5Z" fill={`url(#${id('gTop')})`}/>
    <path d="M65 -144.5 L82.3 -134.5 L-47.6 -59.5 L-65 -69.5Z" fill={`url(#${id('gRib')})`}/>
    <path d="M-52 -147 L86.6 -67 L69.3 -57 L-69.3 -137Z" fill={`url(#${id('gRib')})`}/>
    <path d="M-65 -69.5 L-47.6 -59.5 L-47.6 32.5 L-65 22.5Z" fill={`url(#${id('gRibF')})`}/>
    <path d="M86.6 -67 L69.3 -57 L69.3 35 L86.6 25Z" fill={`url(#${id('gRibS')})`}/>
    <path d="M-125.6 -104.5 L13 -24.5 L142.9 -99.5" fill="none" stroke="#ffffff" strokeOpacity=".5" strokeWidth="1.2" strokeLinejoin="round"/>
    </g>
    <g className="gdrop g2">
    <path d="M-78.8 -174.5 L11.3 -122.5 L11.3 -52.5 L-78.8 -104.5Z" fill={`url(#${id('gFront')})`}/>
    <path d="M96.1 -171.5 L11.3 -122.5 L11.3 -52.5 L96.1 -101.5Z" fill={`url(#${id('gSide')})`}/>
    <path d="M6.1 -223.5 L96.1 -171.5 L11.3 -122.5 L-78.8 -174.5Z" fill={`url(#${id('gTop')})`}/>
    <path d="M44.2 -201.5 L58 -193.5 L-26.8 -144.5 L-40.7 -152.5Z" fill={`url(#${id('gRib')})`}/>
    <path d="M-29.4 -203 L60.6 -151 L46.8 -143 L-43.3 -195Z" fill={`url(#${id('gRib')})`}/>
    <path d="M-40.7 -152.5 L-26.8 -144.5 L-26.8 -74.5 L-40.7 -82.5Z" fill={`url(#${id('gRibF')})`}/>
    <path d="M60.6 -151 L46.8 -143 L46.8 -73 L60.6 -81Z" fill={`url(#${id('gRibS')})`}/>
    <path d="M-78.8 -174.5 L11.3 -122.5 L96.1 -171.5" fill="none" stroke="#ffffff" strokeOpacity=".5" strokeWidth="1.2" strokeLinejoin="round"/>
    </g>
    <g className="gdrop g3">
    <path d="M57.2 185 L147.2 237 L147.2 309 L57.2 257Z" fill={`url(#${id('gFront')})`}/>
    <path d="M237.3 185 L147.2 237 L147.2 309 L237.3 257Z" fill={`url(#${id('gSide')})`}/>
    <path d="M147.2 133 L237.3 185 L147.2 237 L57.2 185Z" fill={`url(#${id('gTop')})`}/>
    <path d="M185.3 155 L199.2 163 L109.1 215 L95.3 207Z" fill={`url(#${id('gRib')})`}/>
    <path d="M109.1 155 L199.2 207 L185.3 215 L95.3 163Z" fill={`url(#${id('gRib')})`}/>
    <path d="M95.3 207 L109.1 215 L109.1 287 L95.3 279Z" fill={`url(#${id('gRibF')})`}/>
    <path d="M199.2 207 L185.3 215 L185.3 287 L199.2 279Z" fill={`url(#${id('gRibS')})`}/>
    <path d="M57.2 185 L147.2 237 L237.3 185" fill="none" stroke="#ffffff" strokeOpacity=".5" strokeWidth="1.2" strokeLinejoin="round"/>
    </g>
    <g className="bow-at" transform="translate(8.7 -173) scale(1.35)"><g className="bow"><path d="M0 -2 C-10 -30 -46 -34 -44 -16 C-42 -4 -18 0 0 -2Z" fill={`url(#${id('gBow')})`} stroke="#5a5a64" strokeWidth=".8"/><path d="M0 -2 C10 -30 46 -34 44 -16 C42 -4 18 0 0 -2Z" fill={`url(#${id('gBow')})`} stroke="#5a5a64" strokeWidth=".8"/><path d="M-6 -4 C-14 -22 -34 -24 -34 -15 C-33 -9 -18 -6 -6 -4Z" fill="#2a2a31" opacity=".35"/><path d="M6 -4 C14 -22 34 -24 34 -15 C33 -9 18 -6 6 -4Z" fill="#2a2a31" opacity=".35"/><ellipse cx="0" cy="-3" rx="8" ry="6" fill={`url(#${id('gBow')})`} stroke="#5a5a64" strokeWidth=".8"/><ellipse cx="-30" cy="-24" rx="9" ry="2.6" transform="rotate(-12 -30 -24)" fill="#ffffff" opacity=".75"/></g></g>
    </svg>
  );
}
