import { useSvgIds } from '../../lib/hooks';

/**
 * Ink starfield behind the hero logo: about 80 dots, some twinkling, and one
 * shooting star every 12 s along the ring's −28° tilt. Static with reduced motion.
 */
export function Starfield() {
  const id = useSvgIds();
  return (
    <svg className="stars" viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id={id('stTail')} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="53" y2="-28"><stop offset="0" stopColor="#0b0b0f" stopOpacity=".7" /><stop offset="1" stopColor="#0b0b0f" stopOpacity="0" /></linearGradient></defs>
    <g fill="#0b0b0f">
    <circle cx="165" cy="111" r="0.7" fill-opacity="0.19" />
    <circle cx="43" cy="375" r="1" fill-opacity="0.36" />
    <circle cx="290" cy="630" r="0.9" fill-opacity="0.32" />
    <circle className="tw" cx="26" cy="305" r="0.7" fill-opacity="0.19" />
    <circle className="tw b" cx="124" cy="385" r="0.7" fill-opacity="0.29" />
    <circle className="tw c" cx="408" cy="93" r="0.9" fill-opacity="0.38" />
    <circle className="tw d" cx="313" cy="407" r="0.7" fill-opacity="0.34" />
    <circle cx="287" cy="279" r="0.9" fill-opacity="0.2" />
    <circle cx="31" cy="595" r="1" fill-opacity="0.5" />
    <circle cx="211" cy="378" r="1.8" fill-opacity="0.55" />
    <circle cx="157" cy="566" r="0.8" fill-opacity="0.49" />
    <circle className="tw" cx="99" cy="75" r="0.7" fill-opacity="0.21" />
    <circle className="tw b" cx="281" cy="431" r="1.3" fill-opacity="0.42" />
    <circle className="tw c" cx="337" cy="300" r="1" fill-opacity="0.19" />
    <circle className="tw d" cx="233" cy="640" r="1" fill-opacity="0.43" />
    <circle cx="346" cy="175" r="1.8" fill-opacity="0.42" />
    <circle cx="153" cy="347" r="1" fill-opacity="0.22" />
    <circle cx="482" cy="89" r="1.1" fill-opacity="0.32" />
    <circle cx="88" cy="242" r="1.3" fill-opacity="0.58" />
    <circle className="tw" cx="390" cy="568" r="1" fill-opacity="0.44" />
    <circle className="tw b" cx="289" cy="320" r="0.7" fill-opacity="0.26" />
    <circle className="tw c" cx="465" cy="332" r="0.7" fill-opacity="0.23" />
    <circle className="tw d" cx="37" cy="488" r="1.8" fill-opacity="0.58" />
    <circle cx="489" cy="570" r="1" fill-opacity="0.36" />
    <circle cx="355" cy="615" r="1" fill-opacity="0.4" />
    <circle cx="37" cy="533" r="0.8" fill-opacity="0.21" />
    <circle cx="365" cy="280" r="1.3" fill-opacity="0.36" />
    <circle className="tw" cx="405" cy="599" r="1" fill-opacity="0.4" />
    <circle className="tw b" cx="350" cy="683" r="1.1" fill-opacity="0.32" />
    <circle className="tw c" cx="93" cy="167" r="0.9" fill-opacity="0.2" />
    <circle className="tw d" cx="96" cy="201" r="0.8" fill-opacity="0.48" />
    <circle cx="211" cy="261" r="1.8" fill-opacity="0.51" />
    <circle cx="424" cy="658" r="0.7" fill-opacity="0.44" />
    <circle cx="229" cy="604" r="1.5" fill-opacity="0.37" />
    <circle cx="58" cy="442" r="0.7" fill-opacity="0.45" />
    <circle className="tw" cx="100" cy="682" r="1.3" fill-opacity="0.37" />
    <circle className="tw b" cx="33" cy="8" r="0.8" fill-opacity="0.46" />
    <circle className="tw c" cx="268" cy="657" r="1.8" fill-opacity="0.46" />
    <circle className="tw d" cx="305" cy="110" r="1" fill-opacity="0.29" />
    <circle cx="470" cy="420" r="1.3" fill-opacity="0.49" />
    <circle cx="67" cy="589" r="1.3" fill-opacity="0.58" />
    <circle cx="241" cy="221" r="0.8" fill-opacity="0.27" />
    <circle cx="86" cy="24" r="1.5" fill-opacity="0.38" />
    <circle className="tw" cx="183" cy="480" r="0.7" fill-opacity="0.35" />
    <circle className="tw b" cx="375" cy="212" r="0.7" fill-opacity="0.26" />
    <circle className="tw c" cx="382" cy="372" r="1.5" fill-opacity="0.38" />
    <circle className="tw d" cx="168" cy="161" r="0.9" fill-opacity="0.23" />
    <circle cx="259" cy="251" r="0.7" fill-opacity="0.2" />
    <circle cx="237" cy="140" r="1.8" fill-opacity="0.4" />
    <circle cx="462" cy="684" r="1" fill-opacity="0.28" />
    <circle cx="47" cy="78" r="1.3" fill-opacity="0.43" />
    <circle className="tw" cx="415" cy="336" r="1" fill-opacity="0.42" />
    <circle className="tw b" cx="387" cy="521" r="1.3" fill-opacity="0.42" />
    <circle className="tw c" cx="438" cy="305" r="1" fill-opacity="0.34" />
    <circle className="tw d" cx="50" cy="655" r="1.1" fill-opacity="0.24" />
    <circle cx="232" cy="516" r="0.7" fill-opacity="0.29" />
    <circle cx="359" cy="124" r="0.8" fill-opacity="0.19" />
    <circle cx="21" cy="412" r="1.3" fill-opacity="0.41" />
    <circle cx="326" cy="248" r="1.5" fill-opacity="0.35" />
    <circle className="tw" cx="273" cy="23" r="0.7" fill-opacity="0.41" />
    <circle className="tw b" cx="408" cy="152" r="1" fill-opacity="0.36" />
    <circle className="tw c" cx="111" cy="351" r="1.8" fill-opacity="0.4" />
    <circle className="tw d" cx="166" cy="380" r="0.8" fill-opacity="0.33" />
    <circle cx="442" cy="461" r="1.5" fill-opacity="0.58" />
    <circle cx="251" cy="372" r="1.5" fill-opacity="0.38" />
    <circle cx="384" cy="424" r="0.8" fill-opacity="0.44" />
    <circle cx="277" cy="544" r="0.7" fill-opacity="0.32" />
    <circle className="tw" cx="435" cy="47" r="0.9" fill-opacity="0.34" />
    <circle className="tw b" cx="223" cy="427" r="1.5" fill-opacity="0.56" />
    <circle className="tw c" cx="301" cy="144" r="1" fill-opacity="0.31" />
    <circle className="tw d" cx="464" cy="186" r="1.5" fill-opacity="0.48" />
    <circle cx="225" cy="293" r="1.1" fill-opacity="0.4" />
    <circle cx="222" cy="58" r="0.9" fill-opacity="0.49" />
    <circle cx="384" cy="651" r="1" fill-opacity="0.29" />
    <circle cx="469" cy="280" r="1.3" fill-opacity="0.56" />
    <circle className="tw" cx="87" cy="465" r="0.9" fill-opacity="0.41" />
    <circle className="tw b" cx="86" cy="303" r="1.5" fill-opacity="0.51" />
    <circle className="tw c" cx="181" cy="71" r="1" fill-opacity="0.31" />
    </g>
    <g className="shoot"><line x1="0" y1="0" x2="53" y2="-28" stroke={`url(#${id('stTail')})`} strokeWidth="1.4" strokeLinecap="round" /><circle r="1.4" fill="#0b0b0f" fill-opacity=".75" /></g>
    </svg>
  );
}
