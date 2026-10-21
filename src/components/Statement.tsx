import { HOME } from '../content/home.en';

export function Statement() {
  return (
    <section id="statement" className="statement g" aria-label="What Planary is">
      <p className="d" data-reveal="">{HOME.lede}</p>
    </section>
  );
}
