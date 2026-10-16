import { HeroNav } from '../components/HeroNav';
import { SubpageShell } from '../components/SubpageShell';
import { ArrowRight } from '../components/icons';
import { CONTACT_EMAIL, CONTACT_MAILTO, GITHUB_URL, INSTAGRAM_URL, TEAM_PERSON_LINK, TIKTOK_URL } from '../lib/links';

// TODO(planary): real names, roles and one-line bios. Placeholders until then; never invent people.
const PEOPLE = [
  {
    name: '[Name]',
    role: '[Role, for example design and front end]',
    bio: '[One plain sentence on what this person works on at Planary.]',
    link: { href: TEAM_PERSON_LINK, label: '[GitHub or email]' },
  },
  {
    name: '[Name]',
    role: '[Role, for example back end and the casino]',
    bio: '[One plain sentence on what this person works on at Planary.]',
    link: { href: TEAM_PERSON_LINK, label: '[GitHub or email]' },
  },
];

export function TeamPage() {
  return (
    <SubpageShell current="team">
      {(menu) => (
        <>
          <header className="thero">
            <HeroNav {...menu} anchorBase="/" current="team" signIn="ink" />
            <div className="wrap g thero-in">
              <h1 className="d h-xl t-h1">A small team<br />in Switzerland.</h1>
              <p className="sub t-sub">We design, build and look after every Planary app ourselves, from the casino’s card tables to the gift lists.</p>
            </div>
          </header>

          <main>
            <section className="sec wrap g" aria-labelledby="people-h">
              <h2 id="people-h" className="d h-m people-h" data-reveal="">People</h2>
              <ul className="people" data-reveal="">
                {PEOPLE.map((p, i) => (
                  <li className="person" key={i}>
                    <div><h3 className="d p-n">{p.name}</h3><p className="p-r">{p.role}</p></div>
                    <div><p className="lede">{p.bio}</p><a className="alink" href={p.link.href}>{p.link.label} <ArrowRight /></a></div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="sec wrap g" aria-label="How we think about it">
              <p className="d stmt t-stmt" data-reveal="">We’d rather make a few apps well than a lot of apps quickly.</p>
            </section>

            <section className="sec wrap" aria-labelledby="where-h">
              <div className="band g" data-reveal="">
                <div className="b1"><h2 id="where-h" className="k">Based in</h2><p className="d b-big">Switzerland</p></div>
                <div className="b2"><h2 className="k">Write to</h2><a className="d b-mail ul" href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a></div>
                <div className="b3"><h2 className="k">Elsewhere</h2>
                  <ul className="b-links">
                    <li><a className="ul" href={INSTAGRAM_URL}>Instagram</a></li>
                    <li><a className="ul" href={TIKTOK_URL}>TikTok</a><span>@planaryofficial</span></li>
                    <li><a className="ul" href={GITHUB_URL}>GitHub</a></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="cta wrap g" aria-labelledby="cta-h">
              <h2 id="cta-h" className="d h-m">See what we make.</h2>
              <div className="acts"><a className="btn btn-ink" href="/#products">See the products</a></div>
            </section>
          </main>
        </>
      )}
    </SubpageShell>
  );
}
