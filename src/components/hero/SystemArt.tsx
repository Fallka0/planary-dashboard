import { forwardRef, memo } from 'react';
import { BODIES, CX, CY, ORBITS, dialTicks } from './system';
import type { PreviewKey } from './system';

const TICKS = dialTicks();

const LABELS: Record<PreviewKey, { name: string; host: string }> = {
  account: { name: 'Account', host: 'auth.planary.ch' },
  casino: { name: 'Casino', host: 'casino.planary.ch' },
  tournament: { name: 'Tournament', host: 'tournament.planary.ch' },
  wishlist: { name: 'Wishlist', host: 'wishlist.planary.ch' },
};

interface Props {
  /** The dot whose preview is open, so it grows and the others dim. */
  active: PreviewKey | '';
}

/**
 * The drawing: a dial, four orbits, the account in the middle and three apps.
 * Orbits and apps are placed by CSS variables (--sy-*), which the opening
 * animation writes straight onto this <svg>; without them they sit at rest.
 */
export const SystemArt = memo(
  forwardRef<SVGSVGElement, Props>(function SystemArt({ active }, ref) {
    return (
      <svg ref={ref} className="hs-art" viewBox="0 0 600 860" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="sy-dial" fill="none" stroke="#0b0b0f">
          <circle cx={CX} cy={CY} r="286" strokeOpacity=".14" />
          {TICKS.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeOpacity={t.o} />
          ))}
        </g>
        <g fill="none" stroke="#0b0b0f" strokeOpacity=".12" strokeDasharray="2 6">
          <line x1="14" y1={CY} x2="586" y2={CY} />
          <line x1={CX} y1="144" x2={CX} y2="716" />
        </g>
        {ORBITS.map((r, i) => (
          <circle
            key={r}
            className={`sy-orb o${i}`}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="#0b0b0f"
            strokeOpacity={i === 3 ? '.18' : '.32'}
            strokeDasharray={i === 3 ? '2 6' : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <g className={`sy-core${active === 'account' ? ' is-on' : ''}`}>
          <circle cx={CX} cy={CY} r="36" fill="none" stroke="#0b0b0f" strokeOpacity=".28" />
          <circle className="sy-dot" cx={CX} cy={CY} r="22" fill="#0b0b0f" />
          <g className="sy-lab">
            <text x={CX} y="486" className="n" textAnchor="middle">{LABELS.account.name}</text>
            <text x={CX} y="501" className="s" textAnchor="middle">{LABELS.account.host}</text>
          </g>
        </g>
        {BODIES.map((b, i) => (
          <g key={b.key} className={`sy-body b${i}${active === b.key ? ' is-on' : ''}`}>
            <circle className="sy-dot" r={b.r} fill="#0b0b0f" />
            <circle r={b.r + 7} fill="none" stroke="#0b0b0f" strokeOpacity=".28" />
            <g className="sy-lab">
              <line x1={b.r + 10} y1="0" x2={b.r + 30} y2="0" stroke="#0b0b0f" strokeOpacity=".45" />
              <text x={b.r + 36} y="-3" className="n">{LABELS[b.key].name}</text>
              <text x={b.r + 36} y="12" className="s">{LABELS[b.key].host}</text>
            </g>
          </g>
        ))}
      </svg>
    );
  }),
);
