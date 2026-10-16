export function Studio() {
  return (
    <section id="studio" className="studio g" aria-labelledby="studio-h">
      <div className="studio-txt" data-reveal="">
        <h2 id="studio-h" className="d sec-h">Small on purpose.</h2>
        <p className="studio-p">Planary is an independent product studio based in Switzerland. We design, build and look after every app ourselves, which is why there are only a few of them.</p>
      </div>
      <div className="studio-aside" data-reveal="">
        <div className="place" aria-hidden="true">
          <span className="tk" />
          <span className="ln" />
          <span className="pt" />
          <span className="ln" style={{ flex: '0 0 22%' }} />
          <span className="tk" />
        </div>
        <strong>Planary</strong>
        <span>Switzerland</span>
      </div>
    </section>
  );
}
