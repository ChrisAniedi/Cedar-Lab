import ContactForm from '@/components/ContactForm';
import { Icon } from '@/lib/icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Book a free strategy call or get a project estimate. Tell us what you're building and we'll reply within one business day.",
};

const faqs = [
  ['How long does it take?', 'Landing pages in 3–7 days, websites in 1–2 weeks, MVPs in 3–6 weeks, and full custom platforms in 6–12 weeks. You\u2019ll get a firm timeline before any work begins.'],
  ['How much does it cost?', 'It scales with scope. We offer fixed-price projects, monthly sprints, and dedicated teams — every engagement starts with a transparent estimate and no hidden costs.'],
  ['Do you work with startups?', 'Yes — early-stage startups are a core focus. We help founders validate ideas and ship investor-ready MVPs fast, without burning runway.'],
  ['Can you build AI products?', 'Absolutely. From AI agents and copilots to automated workflows and intelligent features inside existing products — AI is built into how we work.'],
  ['Do you work internationally?', 'Yes — we partner with clients across the US, UK, Europe, Canada, and Africa, fully remote with overlapping working hours.'],
];

export default function Contact() {
  return (
    <>
      <section className="phero" style={{ paddingBottom: 40 }}><div className="wrap">
        <div className="crumb reveal"><a href="/">Home</a> / Contact</div>
        <span className="kicker reveal d1" style={{ marginTop: 18 }}>Let&apos;s Build</span>
        <h1 className="reveal d1">Tell us what you&apos;re <span className="em">building.</span></h1>
        <p className="lead reveal d2">Book a free strategy call or send a few details and we&apos;ll come back with a clear, honest estimate — usually within one business day.</p>
      </div></section>

      <section className="sec tight" style={{ paddingTop: 20 }}><div className="wrap"><div className="contact-grid">
        <div className="form-card reveal"><ContactForm /></div>
        <div className="side">
          <div className="sidecard reveal d1"><h4>Reach us directly</h4>
            <div className="item"><div className="si"><Icon name="mail" /></div><div><div className="st"><a href="mailto:hello@thecedarlab.com">hello@thecedarlab.com</a></div><div className="ss">For new projects &amp; partnerships</div></div></div>
            <div className="item"><div className="si"><Icon name="clock" /></div><div><div className="st">~1 business day</div><div className="ss">Typical response time</div></div></div>
            <div className="item"><div className="si"><Icon name="globe" /></div><div><div className="st">Remote-first</div><div className="ss">US · UK · EU · Canada · Africa</div></div></div>
          </div>
          <div className="sidecard reveal d2"><h4>What happens next</h4>
            <div className="steps-mini">
              <div className="item"><div className="si" /><div><div className="st">We review your details</div><div className="ss">And reply within a business day.</div></div></div>
              <div className="item"><div className="si" /><div><div className="st">Free 30-min strategy call</div><div className="ss">We scope the fastest path to launch.</div></div></div>
              <div className="item"><div className="si" /><div><div className="st">A clear estimate &amp; plan</div><div className="ss">Timeline, cost, and milestones — no surprises.</div></div></div>
            </div>
          </div>
        </div>
      </div></div></section>

      <section className="sec" style={{ paddingTop: 30 }}><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">FAQ</span><h2 className="title">Quick answers.</h2></div>
        <div className="faq" id="faq">
          {faqs.map(([q, a]) => (
            <div className="fitem" key={q}>
              <button className="fq">{q}<span className="pm"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg></span></button>
              <div className="fa"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}
