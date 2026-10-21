import { useRef } from 'react';
import { HOME } from '../content/home.en';
import { usePun } from '../lib/usePun';

export function Studio() {
  const ref = useRef<HTMLElement>(null);
  usePun(ref);
  const [small, big] = HOME.studio.h2;
  return (
    <section id="studio" className="studio g" aria-labelledby="studio-h" ref={ref}>
      <h2 id="studio-h" className="pun" data-reveal="" aria-label={`${small} ${big}`}>
        <span className="d pun-s" aria-hidden="true"><i className="pun-bl" />{small}</span>
        <span className="d pun-b" aria-hidden="true"><i className="pun-bl" />{big}</span>
        <span className="pun-t" aria-hidden="true" />
      </h2>
      <p className="studio-p" data-reveal="">{HOME.studio.p}</p>
    </section>
  );
}
