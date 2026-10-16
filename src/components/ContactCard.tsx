import { useEffect, useRef, useState } from 'react';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../lib/links';
import { CopyIcon } from './icons';

export function ContactCard() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function copy() {
    try {
      navigator.clipboard?.writeText(CONTACT_EMAIL).catch(() => {});
    } catch {
      // Clipboard blocked: the address is still on screen and in the mailto link.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-h">
      <div className="c-card" data-reveal="">
        <p className="c-lede" id="contact-h">For questions about a product, your account or the studio, write to us.</p>
        <div className="c-row">
          <a className="email" href={CONTACT_MAILTO}><span>info@</span><span>planary.ch</span></a>
          <div className="c-copy">
            <button className="rbtn rbtn-ink" type="button" aria-label="Copy email address" onClick={copy}><CopyIcon /></button>
            <span className="c-copied" aria-live="polite">{copied ? 'Copied' : ''}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
