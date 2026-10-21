import { HOME } from '../content/home.en';
import { ACCOUNT_INFO_URL, AUTH_URL } from '../lib/links';
import { useAnimOnView } from '../lib/useAnimOnView';
import { AccountCard } from './art/AccountCard';
import { ArrowRight } from './icons';

interface AccountRowProps {
  /** Homepage: an `article` labelled by an h3. Subpages: a plain block with an h2 inside a labelled section. */
  subpage?: { body: string };
}

/** The account row: the Planary Account card, a line about the shared sign-in, a link. */
export function AccountRow({ subpage }: AccountRowProps) {
  const cardRef = useAnimOnView<SVGSVGElement>();
  if (subpage) {
    return (
      <div className="acct g" data-reveal="">
        <AccountCard animRef={cardRef} />
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
      <AccountCard animRef={cardRef} />
      <h3 id="acct-h" className="d acct-title">{HOME.account.h}</h3>
      <p className="acct-body">{HOME.account.p}</p>
      <div className="acct-link">
        <a className="alink" href={AUTH_URL}>{HOME.account.link} <ArrowRight /></a>
      </div>
    </article>
  );
}
