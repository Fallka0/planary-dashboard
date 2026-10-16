const PRINCIPLES = [
  {
    num: '01',
    title: 'One account everywhere',
    body: 'You sign in once at auth.planary.ch, and the same name and password work in every app we make.',
  },
  {
    num: '02',
    title: 'Clear, focused products',
    body: 'Each app does one job, whether that’s running a bracket or keeping a gift list, and leaves out what that job doesn’t need.',
  },
  {
    num: '03',
    title: 'Fair by design',
    body: 'Every draw in the casino is provably fair, so a shuffle or a spin can be checked after the fact.',
  },
];

export function Principles() {
  return (
    <section id="how" className="how g" aria-labelledby="how-h">
      <h2 id="how-h" className="d sec-h how-h" data-reveal="">How we build</h2>
      <ol className="prin" data-reveal="">
        {PRINCIPLES.map(({ num, title, body }) => (
          <li key={num}>
            <span className="num" aria-hidden="true">{num}</span>
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
