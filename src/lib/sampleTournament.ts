import type { BracketRound, BracketSide } from '../components/tour/Bracket';

/*
 * The example tournament, Gurten LAN: 16 teams, quarterfinals played, semifinal 2 live,
 * semifinal 1 next at 17:15, final at 19:00. The same data as the handoff boards
 * (W-Tournament ROUNDS/T, W-Home HB). Sample data only, no real tournament.
 */

/** id → [name, seed, group]. Seed 0 means the team went out in the groups. */
export const TEAMS: Record<string, [string, number, string]> = {
  no: ['Night Owls', 1, 'A'], lb: ['Lötschberg', 2, 'A'], bb: ['Bärner Bytes', 0, 'A'], tf: ['Team Fondue', 0, 'A'],
  ar: ['Aare Raiders', 5, 'B'], g5: ['Gurten Five', 6, 'B'], mh: ['Mattenhof', 0, 'B'], bz: ['Bümpliz Boyz', 0, 'B'],
  pk: ['Pixel Kollektiv', 9, 'C'], zg: ['Zytglogge', 10, 'C'], rg: ['Rosengarten', 0, 'C'], kf: ['Kirchenfeld', 0, 'C'],
  bp: ['Bundesplatz', 13, 'D'], ll: ['Länggasse Legends', 14, 'D'], ww: ['Wankdorf Wolves', 0, 'D'], ee: ['Eymatt Esports', 0, 'D'],
};

export type MatchState = 'done' | 'live' | 'next' | 'later';
export interface SampleMatch {
  id: string; code: string; a: string | null; b: string | null; sa: number | null; sb: number | null;
  state: MatchState; t: string; st: string; note?: string; la?: string; lb?: string;
}
interface SampleRound { name: string; sub: string; ms: SampleMatch[] }

export const ROUNDS_DE: SampleRound[] = [
  { name: 'Viertelfinal', sub: 'Gespielt', ms: [
    { id: 'q1', code: 'VF 1', a: 'no', b: 'g5', sa: 2, sb: 1, state: 'done', t: '14:30', st: 'Stream' },
    { id: 'q2', code: 'VF 2', a: 'pk', b: 'll', sa: 2, sb: 0, state: 'done', t: '14:30', st: 'Stage 2' },
    { id: 'q3', code: 'VF 3', a: 'ar', b: 'lb', sa: 2, sb: 0, state: 'done', t: '15:15', st: 'Stream' },
    { id: 'q4', code: 'VF 4', a: 'bp', b: 'zg', sa: 1, sb: 2, state: 'done', t: '15:15', st: 'Stage 2' }] },
  { name: 'Halbfinal', sub: 'Ab 16:00 · Best of 3', ms: [
    { id: 's1', code: 'HF 1', a: 'no', b: 'pk', sa: null, sb: null, state: 'next', t: '17:15', st: 'Stream' },
    { id: 's2', code: 'HF 2', a: 'ar', b: 'zg', sa: 1, sb: 0, state: 'live', t: '16:00', st: 'Stage 2', note: 'Map 2 von 3 · Inferno · 9–6' }] },
  { name: 'Final', sub: '19:00 · Best of 3', ms: [
    { id: 'f', code: 'Final', a: null, b: null, sa: null, sb: null, state: 'later', t: '19:00', st: 'Stream', la: 'Sieger HF 1', lb: 'Sieger HF 2' }] },
];

export const STATE_DE: Record<MatchState, string> = { done: 'Gespielt', live: 'Live seit 16:02', next: 'Als Nächstes', later: 'Später' };

export function side(m: SampleMatch, k: 'a' | 'b'): BracketSide & { tag: string } {
  const id = m[k];
  const sc = k === 'a' ? m.sa : m.sb;
  const other = k === 'a' ? m.sb : m.sa;
  if (!id) return { name: (k === 'a' ? m.la : m.lb) ?? '', seed: '', sc: '', cls: 'tbd', tag: '?' };
  const cls = m.state === 'done' && sc != null && other != null ? (sc > other ? 'win' : 'lose') : '';
  return { name: TEAMS[id][0], seed: TEAMS[id][1] ? String(TEAMS[id][1]) : '', sc: sc == null ? '' : String(sc), cls, tag: id.toUpperCase() };
}

/** The German bracket. `liveShort` labels the live match just "Live" (the small bracket on the features tile). */
export function roundsDe({ from = 0, liveShort = false } = {}): BracketRound[] {
  return ROUNDS_DE.slice(from).map((r) => ({
    name: r.name,
    sub: r.sub,
    ms: r.ms.map((m) => ({
      id: m.id, code: m.code, when: `${m.t} · ${m.st}`, live: m.state === 'live', liveLabel: liveShort ? 'Live' : `Live · ${m.st}`,
      a: side(m, 'a'), b: side(m, 'b'),
    })),
  }));
}

/** [time, team a, team b, state, where, live] */
export const SCHEDULE_DE: [string, string, string, string, string, boolean?][] = [
  ['14:30', 'no', 'g5', 'Gespielt · 2:1', 'VF 1 · Stream'], ['14:30', 'pk', 'll', 'Gespielt · 2:0', 'VF 2 · Stage 2'], ['15:15', 'ar', 'lb', 'Gespielt · 2:0', 'VF 3 · Stream'],
  ['15:15', 'bp', 'zg', 'Gespielt · 1:2', 'VF 4 · Stage 2'], ['16:00', 'ar', 'zg', 'Live · 1:0', 'HF 2 · Stage 2', true], ['17:15', 'no', 'pk', 'In 55 min', 'HF 1 · Stream'], ['19:00', '', '', 'Final', 'Stream'],
];

/* The homepage card shows the same bracket in English. */
const EN: [string, string, string, number | null, number | null, MatchState, string][][] = [
  [['QF 1', 'no', 'g5', 2, 1, 'done', '14:30 · Stream'], ['QF 2', 'pk', 'll', 2, 0, 'done', '14:30 · Stage 2'], ['QF 3', 'ar', 'lb', 2, 0, 'done', '15:15 · Stream'], ['QF 4', 'bp', 'zg', 1, 2, 'done', '15:15 · Stage 2']],
  [['SF 1', 'no', 'pk', null, null, 'next', '17:15 · Stream'], ['SF 2', 'ar', 'zg', 1, 0, 'live', 'Live · Stage 2']],
  [['Final', '', '', null, null, 'later', '19:00 · Stream']],
];
const EN_HEAD = [['Quarterfinals', 'Done'], ['Semifinals', 'From 16:00 · Best of 3'], ['Final', '19:00 · Best of 3']];

export function roundsEn(): BracketRound[] {
  return EN.map((ms, ri) => ({
    name: EN_HEAD[ri][0],
    sub: EN_HEAD[ri][1],
    ms: ms.map(([code, a, b, sa, sb, state, when]) => {
      const one = (id: string, sc: number | null, other: number | null, tbd: string): BracketSide =>
        id
          ? { name: TEAMS[id][0], seed: String(TEAMS[id][1]), sc: sc == null ? '' : String(sc), cls: state === 'done' && sc != null && other != null ? (sc > other ? 'win' : 'lose') : '' }
          : { name: tbd, seed: '', sc: '', cls: 'tbd' };
      return { id: code, code, when, live: state === 'live', liveLabel: when, a: one(a, sa, sb, 'Winner SF 1'), b: one(b, sb, sa, 'Winner SF 2') };
    }),
  }));
}
