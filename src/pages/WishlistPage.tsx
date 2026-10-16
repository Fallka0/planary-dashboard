import { AccountRow } from '../components/AccountRow';
import { HeroNav } from '../components/HeroNav';
import { SubpageShell } from '../components/SubpageShell';
import { GiftStack } from '../components/art/GiftStack';
import { ArrowRight } from '../components/icons';
import { WISHLIST_LIVE_URL } from '../lib/links';
import { useAnimOnView } from '../lib/useAnimOnView';

export function WishlistPage() {
  const artRef = useAnimOnView<HTMLDivElement>();
  return (
    <SubpageShell current="wishlist">
      {(menu) => (
        <>
          <header className="whead">
            <HeroNav {...menu} anchorBase="/" signIn="ink" />
            <div className="wrap">
              <div className="g whead-in">
                <h1 className="d h-xl w-h1"><span className="ln"><span>Planary</span></span><span className="ln"><span>Wishlist</span></span></h1>
                <div className="w-side">
                  <p className="sub">Gift planning with structure: save gift ideas, organise them into lists and share them with the people who ask.</p>
                  <div className="acts">
                    <a className="btn btn-ink" href={WISHLIST_LIVE_URL}>Open Wishlist</a>
                    <a className="alink" href="#how">How it works <ArrowRight /></a>
                  </div>
                </div>
              </div>
              <div className="w-scene" aria-hidden="true" data-anim="" ref={artRef}>
                <GiftStack />
              </div>
            </div>
          </header>

          <main id="main" tabIndex={-1}>
            <section id="how" className="sec wrap g verbs" aria-labelledby="verbs-h">
              <h2 id="verbs-h" className="d h-m verbs-h" data-reveal="">It goes like this.</h2>
              <div className="v v1" data-reveal=""><h3>Save</h3><p>Note a gift idea the moment you have it, before it slips away again.</p></div>
              <div className="v v2" data-reveal=""><h3>Organise</h3><p>Sort ideas into lists, one for each person you buy for.</p></div>
              <div className="v v3" data-reveal=""><h3>Share</h3><p>Share a list with family or friends when they ask what to get.</p></div>
            </section>

            <section className="sec wrap g" aria-label="Who it’s for">
              <p className="d stmt who" data-reveal="">For individuals, families and friends, and anyone who has stood in a shop the day before a birthday with no idea what to buy.</p>
            </section>

            <section className="sec wrap" aria-labelledby="acct-h">
              <AccountRow subpage={{ body: 'The same name and password you use for the casino and Tournament.' }} />
            </section>

            <section className="cta wrap g" aria-labelledby="cta-h">
              <h2 id="cta-h" className="d h-m">Start a list.</h2>
              <div className="acts"><a className="btn btn-ink" href={WISHLIST_LIVE_URL}>Open Wishlist</a></div>
            </section>
          </main>
        </>
      )}
    </SubpageShell>
  );
}
