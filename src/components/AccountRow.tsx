import { AUTH_URL } from '../lib/links';
import { KeyObject } from './art/KeyObject';
import { ArrowRight } from './icons';

export function AccountRow({ artSrc, heading: Heading = 'h3' }: { artSrc?: string; heading?: 'h1' | 'h3' }) {
  return (
    <article className="acct g" data-reveal="" aria-labelledby="acct-h">
      <KeyObject src={artSrc} />
      <Heading id="acct-h" className="d acct-title">One sign-in for every Planary app.</Heading>
      <p className="acct-body">Planary Account is where you change your name and password, once, for all of them.</p>
      <div className="acct-link">
        <a className="alink" href={AUTH_URL}>Go to auth.planary.ch <ArrowRight /></a>
      </div>
    </article>
  );
}
