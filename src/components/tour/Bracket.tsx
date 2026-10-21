export type SideCls = '' | 'win' | 'lose' | 'tbd';
export interface BracketSide { name: string; seed: string; sc: string; cls: SideCls }
export interface BracketMatch { id: string; code: string; when: string; live: boolean; liveLabel: string; a: BracketSide; b: BracketSide }
export interface BracketRound { name: string; sub: string; ms: BracketMatch[] }

interface BracketProps {
  rounds: BracketRound[];
  /** Seed numbers in front of the team names (off in the small bracket on the features tile). */
  seeds?: boolean;
  /** Makes every match a toggle button; the selected one gets `.sel` and `aria-pressed`. */
  selected?: string;
  onPick?: (id: string) => void;
  /** Drops the minimum width so the bracket fits its box (the small bracket on the features tile). */
  fit?: boolean;
}

function pairs<T>(list: T[]) {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += 2) out.push(list.slice(i, i + 2));
  return out;
}

function Row({ side, seeds }: { side: BracketSide; seeds: boolean }) {
  return (
    <span className={`bm-r ${side.cls}`}>
      {seeds && <span className="sd">{side.seed}</span>}
      <span className="nm">{side.name}</span>
      <span className="sc">{side.sc}</span>
    </span>
  );
}

/**
 * The beamer bracket: a column per round, match boxes with a header row and two team
 * rows, 1 px connectors. Always dark, it is what hangs on the wall. Same markup on the
 * homepage card, the Tournament page and its beamer view.
 */
export function Bracket({ rounds, seeds = true, selected, onPick, fit = false }: BracketProps) {
  return (
    <div className="bk" style={fit ? { minWidth: 0 } : undefined}>
      {rounds.map((r) => (
        <div className="bk-r" key={r.name}>
          <div className="bk-rh"><b>{r.name}</b><span>{r.sub}</span></div>
          <div className="bk-b">
            {pairs(r.ms).map((p) => (
              <div className="bk-p" key={p[0].id}>
                {p.map((m) => {
                  const head = (
                    <span className="bm-h">
                      <span>{m.code}</span>
                      {m.live ? <span className="lv">{m.liveLabel}</span> : <span>{m.when}</span>}
                    </span>
                  );
                  const cls = `bm${m.live ? ' is-live' : ''}`;
                  return (
                    <div className="bk-s" key={m.id}>
                      {onPick ? (
                        <button className={`${cls}${selected === m.id ? ' sel' : ''}`} type="button" aria-pressed={selected === m.id} onClick={() => onPick(m.id)}>
                          {head}
                          <Row side={m.a} seeds={seeds} />
                          <Row side={m.b} seeds={seeds} />
                        </button>
                      ) : (
                        <div className={cls}>
                          {head}
                          <Row side={m.a} seeds={seeds} />
                          <Row side={m.b} seeds={seeds} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
