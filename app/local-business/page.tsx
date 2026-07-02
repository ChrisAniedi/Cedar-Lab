import ContactForm from '@/components/ContactForm';
import { Arrow, Check } from '@/components/Glyphs';
import { Icon } from '@/lib/icons';
import { PROJECTS } from '@/lib/site-data';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Websites for Local Businesses',
  description:
    'Fast, affordable websites for plumbers, electricians, salons and local service businesses — live in days, fixed price, built to get you more calls.',
  robots: { index: false, follow: true },
};

const PACKAGES = [
  {
    name: 'Starter', badge: 'Starter', price: '$499', delivery: 'Live in 5 days', feat: false,
    desc: 'A sharp one-page site that turns visitors into phone calls.',
    items: ['One-page, mobile-friendly site', 'Big click-to-call button', 'Google Maps + directions', 'Customer reviews section', 'Simple contact form', 'Live in 5 days'],
  },
  {
    name: 'Growth', badge: 'Most popular', price: '$1,200', delivery: 'Live in 10 days', feat: true,
    desc: 'A multi-page site built to get found, show your work, and take bookings.',
    items: ['Everything in Starter', 'Multi-page website', 'Booking / quote request form', 'SEO basics — ready for Google', 'Photo gallery of your work', 'Live in 10 days'],
  },
];

const WHY = [
  { t: 'Fast turnaround', d: 'Most sites go live in 5–10 days — not three months.' },
  { t: 'Fixed price, no surprises', d: 'You know the full cost up front. No hourly billing, no scope games.' },
  { t: 'Built by a real team', d: 'Designed and built by people — not a drag-and-drop template generator.' },
];

type Example = {
  title: string; blurb: string; tags: string[]; big: string; rl: string; timeline: string; tech: string[];
  logo: { txt: string; bg: string }; tint: string; mockHtml: string;
};

// Rough "site preview" mock in the same style as the main-site cards.
function buildMock(title: string, kind: 'kv' | 'bars', kv?: { a: string; al: string; b: string; bl: string }) {
  const body = kind === 'bars'
    ? '<div class="barz"><i style="height:50%"></i><i style="height:72%"></i><i style="height:45%"></i><i style="height:90%"></i><i style="height:65%"></i><i style="height:82%"></i></div><div class="lines"><i></i><i></i></div>'
    : `<div class="grid2"><div class="box"><div class="bl">${kv!.al}</div><div class="bv">${kv!.a}</div></div><div class="box"><div class="bl">${kv!.bl}</div><div class="bv">${kv!.b}</div></div></div><div class="lines"><i></i><i></i><i></i></div>`;
  return `<div class="ms ms-dark"><div class="mhd"><span class="t">${title}</span><span class="b">Concept</span></div>${body}</div>`;
}

const tagsOf = (tag: string, industry: string) =>
  Array.from(new Set([tag, ...industry.split('·').map((t) => t.trim())].filter(Boolean))).slice(0, 3);

// Reuse the real Solara project so nothing is duplicated — details come straight
// from the shared case data. Fill the other two in as their details arrive.
const fromProject = (slug: string, txt: string, bg: string, tint: string): Example | null => {
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? {
    title: p.fullTitle ?? p.title, blurb: p.blurb ?? '', tags: tagsOf(p.tag, p.industry),
    big: p.big, rl: p.rl, timeline: p.timeline, tech: p.tech,
    logo: { txt, bg }, tint, mockHtml: p.mock,
  } : null;
};

const EXAMPLES: Example[] = [
  fromProject('solara', 'S', 'linear-gradient(135deg,#F5A623,#FF8C00)', 'linear-gradient(145deg,#33291a,#14100a)'),
  fromProject('grain-co', 'G', 'linear-gradient(135deg,#D89A4A,#C8873A)', 'linear-gradient(145deg,#2c231a,#141008)'),
  {
    title: 'City Salon & Spa', blurb: 'Booking-focused site that keeps the calendar full.',
    tags: ['Web', 'Hospitality'], big: '2×', rl: 'online bookings vs before', timeline: '7 Days',
    tech: ['Next.js', 'Stripe'], logo: { txt: 'C', bg: 'linear-gradient(135deg,#F472B6,#C026D3)' },
    tint: 'linear-gradient(145deg,#2e1f2e,#120b12)', mockHtml: buildMock('City Salon & Spa', 'bars'),
  },
].filter((e): e is Example => e !== null);

const FAQS: [string, string][] = [
  ['How fast can you really deliver?', 'Starter sites go live in about 5 days and Growth sites in around 10 — from the moment you approve your mockup and send over your details and photos.'],
  ['Do I need to know anything technical?', 'Not at all. You tell us about your business; we handle the domain, hosting, design and copy. You just review and approve.'],
  ['What if I need changes later?', 'Small tweaks are easy — either a quick one-off, or our optional $49/month plan that covers ongoing updates and hosting.'],
  ['What do you need from me to start?', 'Just your business details, a few photos, and what you want customers to do — call, book, or request a quote. We turn that into a free mockup first.'],
];

export default function LocalBusiness() {
  return (
    <>
      {/* minimal header — logo + single CTA, no nav */}
      <header className="lb-topbar"><div className="wrap">
        <a href="#top" className="logo"><Image src="/cedalab-logo.png" alt="Cedar Lab" width={153} height={24} /></a>
        <a href="#contact" className="btn btn-primary">Get a Free Mockup</a>
      </div></header>

      <span id="top" />

      {/* HERO */}
      <section className="lb-hero"><div className="wrap">
        <span className="kicker reveal">Websites for Local Businesses</span>
        <h1 className="reveal d1">A Website That Gets You <span className="em">More Calls</span> — Live in 5 Days</h1>
        <p className="lead reveal d2">We build fast, affordable websites for plumbers, electricians, salons, and local service businesses — no agency bloat, no 3-month waits.</p>
        <div className="lb-cta-row reveal d3">
          <a href="#contact" className="btn btn-primary">Get a Free Mockup <Arrow /></a>
          <a href="#packages" className="btn btn-ghost">See Packages &amp; Prices</a>
        </div>
        <div className="lb-trust reveal d4">
          <span><Check /> Fixed price</span>
          <span><Check /> Live in days</span>
          <span><Check /> No templates</span>
        </div>
      </div></section>

      {/* PROBLEM */}
      <section className="lb-problem"><div className="wrap">
        <p className="reveal">Most local businesses lose jobs <span className="em">before the phone even rings</span> — because people can&apos;t find you, or don&apos;t trust what they see when they do.</p>
      </div></section>

      {/* BEFORE / AFTER */}
      <section className="sec"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Before / After</span><h2 className="title">From invisible to booked.</h2>
          <p className="lead">The difference a proper site makes.<span className="lb-concept-note">Concept example — not a live client.</span></p></div>
        <div className="ba-grid">
          <div className="ba-card ba-before reveal">
            <div className="ba-tag">Before</div>
            <h3>No site, or a dated one</h3>
            <ul>
              <li>Buried on page 3 of Google</li>
              <li>Looks untrustworthy on a phone</li>
              <li>No easy way to call or book</li>
              <li>Customers click your competitor instead</li>
            </ul>
          </div>
          <div className="ba-card ba-after reveal d1">
            <div className="ba-tag">After</div>
            <h3>A fast, modern Cedar Lab site</h3>
            <ul>
              <li><Check /> Shows up when locals search</li>
              <li><Check /> Looks sharp on every phone</li>
              <li><Check /> One tap to call or book</li>
              <li><Check /> Turns visitors into paying jobs</li>
            </ul>
            <div className="ba-result">Concept result: <b>0 → 12 enquiries</b> in 3 weeks</div>
          </div>
        </div>
      </div></section>

      {/* WORK EXAMPLES */}
      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Recent Work</span><h2 className="title">Sites we&apos;ve designed.</h2>
          <p className="lead">Clean, fast, conversion-focused pages built for real businesses.</p></div>
        <div className="proj-grid">
          {EXAMPLES.map((ex, i) => (
            <div className={`pcard reveal d${i % 3}`} key={ex.title}>
              <div className="pshot" style={{ background: ex.tint }}>
                <div className="pshot-frame"><div className="pshot-mock" dangerouslySetInnerHTML={{ __html: ex.mockHtml }} /></div>
              </div>
              <div className="ptags">{ex.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="pfoot">
                <span className="plogo" style={{ background: ex.logo.bg }} aria-hidden>{ex.logo.txt}</span>
                <div className="pf-txt"><div className="ptitle">{ex.title}</div><div className="pdesc">{ex.blurb}</div></div>
              </div>
              <div className="pcard-meta">
                <div className="pcard-result"><span className="big">{ex.big}</span><span className="rl">{ex.rl}</span></div>
                <div className="pcard-sub">
                  <span className="pcard-time">⏱ {ex.timeline}</span>
                  <div className="pcard-tech">{ex.tech.slice(0, 3).map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div></section>

      {/* PACKAGES */}
      <section className="sec" id="packages"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Packages</span><h2 className="title">Pick a package. Know the price.</h2>
          <p className="lead">Fixed price, fixed timeline — and every project starts with a free mockup.</p></div>
        <div className="price-grid lb-pkg-grid">
          {PACKAGES.map((p, i) => (
            <div className={`pricecard ${p.feat ? 'feat ' : ''}reveal d${i}`} key={p.name}>
              <div className="badge">{p.badge}</div>
              <h3>{p.name}</h3>
              <p className="pp"><b>{p.price}</b> <span className="lb-delivery">· {p.delivery}</span></p>
              <p className="desc">{p.desc}</p>
              <ul>{p.items.map((it) => <li key={it}><Check />{it}</li>)}</ul>
              <a href="#contact" className={`btn ${p.feat ? 'btn-primary' : 'btn-ghost'}`}>Get a Free Mockup</a>
            </div>
          ))}
        </div>
        <p className="lb-retainer reveal">Ongoing updates &amp; hosting from <b>$49/month</b> — optional, cancel anytime.</p>
      </div></section>

      {/* WHY */}
      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Why Cedar Lab</span><h2 className="title">No agency games.</h2></div>
        <div className="lb-why">
          {WHY.map((w, i) => (
            <div className={`lb-why-item reveal d${i}`} key={w.t}><h3>{w.t}</h3><p>{w.d}</p></div>
          ))}
        </div>
      </div></section>

      {/* FAQ */}
      <section className="sec"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">FAQ</span><h2 className="title">Quick answers.</h2></div>
        <div className="faq" id="faq">
          {FAQS.map(([q, a]) => (
            <div className="fitem" key={q}>
              <button className="fq" type="button">{q}<span className="pm"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg></span></button>
              <div className="fa"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      {/* CONTACT / FORM */}
      <section className="sec lb-contact" id="contact"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Free Mockup</span><h2 className="title">See your new site before you pay.</h2>
          <p className="lead">Tell us about your business and we&apos;ll send a free mockup — no cost, no commitment. Usually back within one business day.</p></div>
        <div className="contact-grid">
          <div className="form-card"><ContactForm variant="local" /></div>
          <div className="side">
            <div className="sidecard">
              <h4>Prefer to just talk?</h4>
              <div className="item"><div className="si"><Icon name="mail" /></div><div><div className="st"><a href="mailto:hello@thecedarlab.com">hello@thecedarlab.com</a></div><div className="ss">Email us anytime</div></div></div>
              <div className="item"><div className="si"><Icon name="clock" /></div><div><div className="st">~1 business day</div><div className="ss">Typical reply time</div></div></div>
              <div className="item"><div className="si"><Icon name="globe" /></div><div><div className="st">Remote-first</div><div className="ss">Serving local businesses everywhere</div></div></div>
            </div>
            <div className="sidecard">
              <h4>What happens next</h4>
              <div className="steps-mini">
                <div className="item"><div className="si" /><div><div className="st">We review your details</div><div className="ss">And reply within a business day.</div></div></div>
                <div className="item"><div className="si" /><div><div className="st">Free mockup, no cost</div><div className="ss">See your new site before you decide.</div></div></div>
                <div className="item"><div className="si" /><div><div className="st">Fixed price &amp; go-live date</div><div className="ss">Approve it and we build — live in days.</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div></section>

      {/* minimal footer */}
      <footer className="lb-foot"><div className="wrap">
        <span>© 2026 Cedar Lab · Websites for local businesses</span>
        <a href="#contact">Get a free mockup →</a>
      </div></footer>
    </>
  );
}
