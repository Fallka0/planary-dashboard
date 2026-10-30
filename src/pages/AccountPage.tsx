import { ProfileButton } from '../components/Profile';
import { HeroNav } from '../components/HeroNav';
import { SubpageShell } from '../components/SubpageShell';
import { AccountCard } from '../components/art/AccountCard';
import { ArrowUpRight } from '../components/icons';
import {
  AUTH_URL,
  CASINO_LIVE_URL,
  TOURNAMENT_LIVE_LABEL,
  TOURNAMENT_LIVE_URL,
  WISHLIST_LIVE_LABEL,
  WISHLIST_LIVE_URL,
} from '../lib/links';

const APPS = [
  { name: 'Planary Casino', href: CASINO_LIVE_URL, address: 'casino.planary.ch' },
  { name: 'Tournament', href: TOURNAMENT_LIVE_URL, address: TOURNAMENT_LIVE_LABEL },
  { name: 'Planary Wishlist', href: WISHLIST_LIVE_URL, address: WISHLIST_LIVE_LABEL },
];

export function AccountPage() {
  return (
    <SubpageShell current="account">
      {(menu) => (
        <>
          <header className="ahead">
            <div className="ahead-l">
              <HeroNav {...menu} anchorBase="/" />
              <div className="ahead-copy">
                <h1 className="d h-xl"><span className="ln"><span>Planary</span></span><span className="ln"><span>Account</span></span></h1>
                <p className="sub a-sub">One sign-in for every Planary app, with your name and password kept in one place.</p>
                <div className="acts"><a className="btn btn-paper" href={AUTH_URL}>Go to auth.planary.ch</a></div>
              </div>
            </div>
            <div className="ahead-r">
              <ProfileButton className="signin" signInClass="btn btn-ink" tone="ink" />
              <AccountCard className="a-key" play />
            </div>
          </header>

          <main id="main" tabIndex={-1}>
            <section id="what" className="sec wrap g" aria-labelledby="what-h">
              <h2 id="what-h" className="d h-m what-h" data-reveal="">What lives here</h2>
              <ul className="rows" data-reveal="">
                <li><h3 className="d">Your name</h3><p>Change it once and it’s changed in every Planary app.</p></li>
                <li><h3 className="d">Your password</h3><p>One password for all of them, changed in one place.</p></li>
              </ul>
            </section>

            <section id="apps" className="sec wrap g" aria-labelledby="apps-h">
              <h2 id="apps-h" className="d h-m apps-h" data-reveal="">Works with</h2>
              <ul className="apps" data-reveal="">
                {APPS.map((app) => (
                  <li className="app" key={app.name}>
                    <a href={app.href}>
                      <span className="n">{app.name}</span>
                      <span className="u">{app.address}</span>
                      <span className="rbtn" aria-hidden="true"><ArrowUpRight /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="cta wrap g" aria-labelledby="cta-h">
              <h2 id="cta-h" className="d h-m">Sign in once.</h2>
              <div className="acts"><a className="btn btn-ink" href={AUTH_URL}>Go to auth.planary.ch</a></div>
            </section>
          </main>
        </>
      )}
    </SubpageShell>
  );
}
