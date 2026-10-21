import { ICONS } from '../design/icons';
import type { IconName } from '../design/icons';

/** One icon from the handoff set (24 × 24, stroke 1.6). `small` is the 15 px size used next to text. */
export function Ic({ name, small = false }: { name: IconName; small?: boolean }) {
  return <svg className={small ? 'ic ic-s' : 'ic'} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />;
}
