import { CONTACT_MAILTO } from '../lib/links';

export function ContactCard() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-h">
      <div className="c-card" data-reveal="">
        <p className="c-lede" id="contact-h">For questions about a product, your account or the studio, write to us.</p>
        <a className="email" href={CONTACT_MAILTO}><span>info@</span><span>planary.ch</span></a>
      </div>
    </section>
  );
}
