import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'products', label: 'Products' },
  { id: 'how', label: 'How we build' },
  { id: 'studio', label: 'Studio' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Sticky index beside the body. The progress line and active dot follow scroll
 * directly, one rAF per frame. Active = the last section whose top has passed
 * 35% of the viewport.
 */
export function SectionIndex() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    const body = list?.closest('.body');
    if (!list) return;
    let raf = 0;
    const track = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let next = -1;
      SECTIONS.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      if (body) {
        const r = body.getBoundingClientRect();
        list.style.setProperty('--p', Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height))).toFixed(4));
      }
      setActive(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(track);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    track();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <aside className="rail">
      <nav aria-label="Sections on this page">
        <ol className="idx" ref={listRef}>
          {SECTIONS.map(({ id, label }, i) => (
            <li key={id} className={i === active ? 'is-on' : undefined}>
              <a href={`#${id}`} aria-current={i === active ? 'location' : undefined}>{label}</a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
