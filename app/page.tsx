import BuildCard from '@/components/BuildCard';
import FinalCta from '@/components/FinalCta';
import HeroVisual from '@/components/HeroVisual';
import { Arrow, Check, Cross } from '@/components/Glyphs';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { Icon } from '@/lib/icons';
import {
  BUILDS,
  PROCESS,
  PROJECTS, SERVICE_CATS,
  STAGES,
  TESTIMONIALS,
  TIMELINES,
  TRUST_LOGOS,
} from '@/lib/site-data';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="hero"><div className="wrap hero-grid">
        <div>
          <span className="kicker reveal">Product Studio · US / UK / EU / CA / Africa</span>
          <h1 className="reveal d1">Build Products <span className="em">Faster.</span> Launch <span className="em">Sooner.</span> Grow <span className="em">Quicker.</span></h1>
          <p className="lead reveal d2">We design, build, automate, and launch SaaS platforms, AI products, websites, MVPs, and internal tools for businesses worldwide.</p>
          <div className="hero-cta reveal d3">
            <Link href="/contact" className="btn btn-primary">Book Free Strategy Call <Arrow /></Link>
            <Link href="/work" className="btn btn-ghost">View Our Work</Link>
          </div>
          <div className="cap-row reveal d4">
            {['Strategy', 'Design', 'Development', 'AI', 'Launch', 'Maintenance'].map((c) => (
              <span className="cap" key={c}><Check />{c}</span>
            ))}
          </div>
        </div>
        <div className="stage reveal d2">
          <HeroVisual />
        </div>
      </div>
      <div className="wrap"><div className="trust reveal">
        <p>Trusted by startups, growing businesses, and enterprise teams worldwide</p>
        <div className="logos">{TRUST_LOGOS.map((l) => <span className="cl" key={l}>{/* <span className="g" /> placeholder logo shape — hidden until real company logos are available */}{l}</span>)}</div>
      </div></div>
      </section>

      <section className="sec" id="build"><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">What We Build</span><h2 className="title">One partner for every product you need to ship.</h2>
          <p className="lead">From a single landing page to a full enterprise platform — designed, built, and shipped end-to-end.</p></div>
        <div className="build-grid">{BUILDS.map((b, i) => <BuildCard key={b.name} item={b} i={i} />)}</div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }} id="stages"><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Built For Every Stage</span><h2 className="title">Wherever you are, we move you forward.</h2></div>
        <div className="stage-grid">{STAGES.map((s, i) => (
          <div className={`scard reveal d${i}`} key={s.num}>
            <span className="num">{s.num}</span><div className="ic2"><Icon name={s.icon} sw="1.5" /></div>
            <h3>{s.title}</h3><p>{s.desc}</p>
            <div className="ln">{s.items.map((it) => <span key={it}><Check />{it}</span>)}</div>
          </div>
        ))}</div>
      </div></section>

      <section className="sec" id="process"><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Our Process</span><h2 className="title">A proven path from idea to launch.</h2>
          <p className="lead">Seven focused stages. No bloated retainers, no mystery — you always know what&apos;s shipping and when.</p></div>
        <div className="proc-wrap">
          <div className="timeline reveal">{PROCESS.map((p, i) => (
            <div className="tstep" key={p.title}><div className="tn">{String(i + 1).padStart(2, '0')}</div><div className="tt"><h3>{p.title}</h3><p>{p.desc}</p></div></div>
          ))}</div>
          <div className="velo reveal d1"><h4>Realistic timelines</h4><p>Honest estimates — here&apos;s how fast we typically deliver.</p>
            {TIMELINES.map((t) => (
              <div className="vbar" key={t.label}><div className="vlab"><b>{t.label}</b><span>{t.range}</span></div><div className="track"><div className="fill" data-w={t.w} /></div></div>
            ))}
          </div>
        </div>
      </div></section>

      <section className="sec" id="work"><div className="wrap">
        <div className="work-head reveal">
          <div>
            <span className="kicker">Featured Work</span>
            <h2 className="title">Outcomes, not just outputs.</h2>
            <p className="lead">Real projects, real results. See how we&apos;ve helped clients across industries.</p>
          </div>
          <Link href="/work" className="btn btn-ghost">View more <Arrow /></Link>
        </div>
        <div className="proj-grid">{PROJECTS.slice(0, 6).map((p, i) => <ProjectCard key={p.id} p={p} className={`reveal d${i % 3}`} />)}</div>
      </div></section>

      <section className="sec" id="why"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Why Ceda Lab</span><h2 className="title">Built differently, on purpose.</h2>
          <p className="lead">Most agencies juggle vendors and stretch timelines. We&apos;re a single, product-first team that ships.</p></div>
        <div className="cmp">
          <div className="col trad reveal"><div className="ch"><span className="tagx">Old Way</span><span className="b">Traditional Agency</span></div>
            <ul><li><Cross />Slow, drawn-out delivery</li><li><Cross />Multiple disconnected vendors</li><li><Cross />Limited support after launch</li><li><Cross />No real product strategy</li></ul></div>
          <div className="col bs reveal d1"><div className="ch"><span className="tagx">Ceda Lab</span><span className="b">The Sprint Way</span></div>
            <ul><li><Check />Fast, predictable execution</li><li><Check />End-to-end delivery, one team</li><li><Check />A dedicated, senior team</li><li><Check />Product-first thinking</li><li><Check />AI capabilities built in</li><li><Check />Long-term partnership &amp; support</li></ul></div>
        </div>
      </div></section>

      <section className="sec" id="services"><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Services</span><h2 className="title">Everything you need under one roof.</h2></div>
        <div className="svc-detail">{SERVICE_CATS.map((s, i) => (
          <div className={`scat reveal d${i % 2}`} key={s.title}><div className="ic3"><Icon name={s.icon} sw="1.5" /></div><h3>{s.title}</h3>
            <p className="sd">{s.desc}</p><ul>{s.items.map((it) => <li key={it}><Check />{it}</li>)}</ul></div>
        ))}</div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Testimonials</span><h2 className="title">Loved by the people who ship with us.</h2></div>
        <TestimonialCarousel testimonials={TESTIMONIALS} />
      </div></section>

      <FinalCta />
    </>
  );
}
