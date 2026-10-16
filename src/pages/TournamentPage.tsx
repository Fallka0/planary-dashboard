import { AccountRow } from '../components/AccountRow';
import { HeroNav } from '../components/HeroNav';
import { SubpageShell } from '../components/SubpageShell';
import { BracketSculpture } from '../components/art/BracketSculpture';
import { ArrowRight } from '../components/icons';
import { TOURNAMENT_LIVE_URL } from '../lib/links';
import { useAnimOnView } from '../lib/useAnimOnView';

export function TournamentPage() {
  const artRef = useAnimOnView<HTMLDivElement>();
  return (
    <SubpageShell current="tournament">
      {(menu) => (
        <>
          <header className="thead">
            <HeroNav {...menu} anchorBase="/" signIn="ink" />
            <div className="wrap g thead-in">
              <div className="t-txt">
                <h1 className="d h-xl"><span className="ln"><span>Tournament</span></span></h1>
                <p className="sub t-sub">Brackets, scheduling and match flow for organisers, clubs and gaming communities.</p>
                <div className="acts">
                  <a className="btn btn-ink" href={TOURNAMENT_LIVE_URL}>Open Tournament</a>
                  <a className="alink" href="#handles">See what it handles <ArrowRight /></a>
                </div>
              </div>
            </div>
            <div className="thead-art" aria-hidden="true" data-anim="" ref={artRef}>
              <BracketSculpture />
            </div>
          </header>

          <main id="main" tabIndex={-1}>
            <section id="handles" className="sec wrap g" aria-labelledby="handles-h">
              <h2 id="handles-h" className="d h-m handles-h" data-reveal="">What it handles</h2>
              <ol className="steps" data-reveal="">
                <li className="step"><h3>Brackets</h3><p>The draw, every round, and who goes through.</p></li>
                <li className="step"><h3>Scheduling</h3><p>When each match is played, set out so everyone can see it.</p></li>
                <li className="step"><h3>Match flow</h3><p>What happens between one round and the next.</p></li>
              </ol>
            </section>

            <section className="sec wrap g" aria-label="Who it’s for">
              <p className="d stmt who" data-reveal="">Made for organisers, clubs and gaming communities who would rather run the event than the spreadsheet.</p>
            </section>

            <section className="sec wrap" aria-labelledby="acct-h">
              <AccountRow subpage={{ body: 'The same name and password you use for the casino and Wishlist.' }} />
            </section>

            <section className="cta wrap g" aria-labelledby="cta-h">
              <h2 id="cta-h" className="d h-m">Set up the first round.</h2>
              <div className="acts"><a className="btn btn-ink" href={TOURNAMENT_LIVE_URL}>Open Tournament</a></div>
            </section>
          </main>
        </>
      )}
    </SubpageShell>
  );
}
