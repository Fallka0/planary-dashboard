import { HeroNav } from '../components/HeroNav';
import { SubpageShell } from '../components/SubpageShell';
import { ChipStack } from '../components/art/ChipStack';
import { ArrowRight, PlusIcon } from '../components/icons';
import { ACCOUNT_INFO_URL, CASINO_LIVE_URL } from '../lib/links';
import { useAnimOnView } from '../lib/useAnimOnView';

const FAQ = [
  { q: 'Can I buy chips?', a: 'No. Chips can’t be bought, sold or exchanged, and they have no cash value.' },
  { q: 'Can I win real money?', a: 'No. Planary Casino is play money only.' },
  { q: 'Do I need a separate account?', a: 'No. You sign in with your Planary account at auth.planary.ch, and the same chip balance works in every game.' },
  { q: 'What is Grimoire?', a: 'A solo card game in the same lobby, played on the same chip balance as everything else.' },
];

export function CasinoPage() {
  const artRef = useAnimOnView<HTMLDivElement>();
  return (
    <SubpageShell current="casino">
      {(menu) => (
        <>
          <header className="chead">
            <HeroNav {...menu} anchorBase="/" signIn="paper" />
            <div className="wrap g chead-in">
              <div className="c-txt">
                <h1 className="d h-xl"><span className="ln"><span>Planary</span></span><span className="ln"><span>Casino</span></span></h1>
                <p className="sub c-sub">A play-money game lobby where one chip balance follows your account to every table.</p>
                <div className="acts">
                  <a className="btn btn-paper" href={CASINO_LIVE_URL}>Open the casino</a>
                  <a className="alink" href="#chips">How the chips work <ArrowRight /></a>
                </div>
                <p className="c-dom">casino.planary.ch</p>
              </div>
            </div>
            <div className="chead-art" aria-hidden="true" data-anim="" ref={artRef}>
              <ChipStack />
            </div>
          </header>

          <main id="main" tabIndex={-1}>
            <section id="tables" className="sec wrap g" aria-labelledby="tables-h">
              <div className="tables-h" data-reveal="">
                <h2 id="tables-h" className="d h-m">Six tables, one lobby.</h2>
                <p className="lede">Every game draws on the same chip balance, so you can leave Roulette and sit down at Hold’em with the same stack.</p>
              </div>
              <ul className="tlist" data-reveal="" aria-label="Games in the lobby">
                <li>Blackjack</li>
                <li>Roulette</li>
                <li>Slots</li>
                <li>Hold’em poker</li>
                <li>Grimoire <small>a solo card game</small></li>
                <li>Nerve</li>
              </ul>
            </section>

            <section id="account" className="sec wrap" aria-labelledby="band-h">
              <div className="band g" data-reveal="">
                <h2 id="band-h" className="d h-m band-h">Your stack goes where you go.</h2>
                <div className="band-b">
                  <p className="lede">Chips, friends, achievements and your place on the weekly leaderboard all sit on your Planary account, so they follow you from Blackjack to Nerve and back.</p>
                  <ul className="pairs">
                    <li>Friends</li>
                    <li>Weekly leaderboard</li>
                    <li>Achievements</li>
                    <li>Cosmetics market</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="chips" className="sec wrap" aria-labelledby="money-h">
              <div className="money g" data-reveal="">
                <h2 id="money-h" className="d money-h">Chips are for playing. That’s all they’re for.</h2>
                <p className="money-p">Everything in Planary Casino runs on play money. Chips have no cash value and can’t be bought, sold or exchanged, so there’s nothing to win or lose except your place on the leaderboard.</p>
              </div>
            </section>

            <section id="fair" className="sec wrap g" aria-labelledby="fair-h">
              <h2 id="fair-h" className="d h-m fair-h" data-reveal="">Provably fair.</h2>
              <p className="fair-p" data-reveal="">Every shuffle, spin and draw in the casino is provably fair: the outcome of each round can be checked after it’s played.</p>
            </section>

            <section id="faq" className="sec wrap g" aria-labelledby="faq-h">
              <h2 id="faq-h" className="d h-m faq-h" data-reveal="">Questions people ask</h2>
              <div className="faq" data-reveal="">
                {FAQ.map(({ q, a }) => (
                  <details key={q}><summary>{q}<PlusIcon /></summary><p>{a}</p></details>
                ))}
              </div>
            </section>

            <section className="cta wrap g" aria-labelledby="cta-h">
              <h2 id="cta-h" className="d h-m">Pull up a chair.</h2>
              <div className="acts">
                <a className="btn btn-ink" href={CASINO_LIVE_URL}>Open the casino</a>
                <a className="alink" href={ACCOUNT_INFO_URL}>About your account <ArrowRight /></a>
              </div>
            </section>
          </main>
        </>
      )}
    </SubpageShell>
  );
}
