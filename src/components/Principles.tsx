import { HOME } from '../content/home.en';

export function Principles() {
  return (
    <section id="how" className="how g" aria-labelledby="how-h">
      <h2 id="how-h" className="d sec-h how-h" data-reveal="">{HOME.how.h2}</h2>
      <ol className="prin" data-reveal="">
        {HOME.how.items.map(([title, body], i) => (
          <li key={title}>
            <span className="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="d">{title}</h3>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
