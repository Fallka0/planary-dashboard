import { ArrowUpRight } from './icons';

/** Round ↗ button plus label, for opening a live product. */
export function OpenLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="open" href={href}>
      <span className="rbtn"><ArrowUpRight /></span>
      {children}
    </a>
  );
}
