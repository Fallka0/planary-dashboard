import { ACCOUNT_INFO_URL, AUTH_URL } from '../lib/links';
import { KeyObject } from './art/KeyObject';
import { ArrowRight } from './icons';

interface AccountRowProps {
  artSrc?: string;
  /** Homepage: an `article` labelled by an h3. Subpages: a plain block with an h2 inside a labelled section. */
  subpage?: { body: string };
}

export function AccountRow({ artSrc, subpage }: AccountRowProps) {
  if (subpage) {
    return (
      <div className="acct g" data-reveal="">
        <KeyObject src={artSrc} />
        <h2 id="acct-h" className="d acct-title">Signs in with your Planary account.</h2>
        <p className="acct-body">{subpage.body}</p>
        <div className="acct-link">
          <a className="alink" href={ACCOUNT_INFO_URL}>About the account <ArrowRight /></a>
        </div>
      </div>
    );
  }
  return (
    <article className="acct g" data-reveal="" aria-labelledby="acct-h">
      <KeyObject src={artSrc} />
      <h3 id="acct-h" className="d acct-title">One sign-in for every Planary app.</h3>
      <p className="acct-body">Planary Account is where you change your name and password, once, for all of them.</p>
      <div className="acct-link">
        <a className="alink" href={AUTH_URL}>Go to auth.planary.ch <ArrowRight /></a>
      </div>
    </article>
  );
}
