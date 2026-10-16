import { HeroNav } from '../components/HeroNav';
import { SubpageShell } from '../components/SubpageShell';
import { HeroLogo } from '../components/art/HeroLogo';
import { Starfield } from '../components/art/Starfield';
import { ArrowRight } from '../components/icons';
import { HOME_URL } from '../lib/links';

export function NotFoundPage() {
  return (
    <SubpageShell>
      {(menu) => (
        <>
          <header>
            <HeroNav {...menu} anchorBase="/" signIn="ink" />
          </header>

          <main id="main" tabIndex={-1}>
            <section className="wrap g nf" aria-labelledby="nf-h">
              <div className="nf-txt">
                <h1 id="nf-h" className="d h-xl"><span className="ln"><span>Lost</span></span><span className="ln"><span>in orbit.</span></span></h1>
                <p className="sub nf-sub">That page doesn’t exist, or it has moved. The homepage is a safe place to land.</p>
                <div className="acts">
                  <a className="btn btn-ink" href={HOME_URL}>Back to planary.ch</a>
                  <a className="alink" href="/#products">See the products <ArrowRight /></a>
                </div>
                <p className="nf-code">Error 404</p>
              </div>
              <div className="nf-art" aria-hidden="true">
                <Starfield />
                <div className="nf-obj">
                  <HeroLogo />
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </SubpageShell>
  );
}
