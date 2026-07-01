import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/lib/icons';
import { Check, Arrow } from '@/components/Glyphs';
import BuildCard from '@/components/BuildCard';
import FinalCta from '@/components/FinalCta';
import { BUILDS, SERVICE_CATS, PROCESS, TIMELINES, PRICING, INDUSTRIES } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Services',
  description: 'What we build, how we work, and how we price — SaaS, MVPs, AI products, automation, websites and more.',
};

export default function Services() {
  return (
    <>
      <section className="phero"><div className="wrap">
        <div className="crumb reveal"><Link href="/">Home</Link> / Services</div>
        <span className="kicker reveal d1" style={{ marginTop: 18 }}>Services</span>
        <h1 className="reveal d1">Everything you need to <span className="em">design, build &amp; launch.</span></h1>
        <p className="lead reveal d2">One product partner covering strategy, design, development, AI, and ongoing support — so you ship faster without stitching together five vendors.</p>
        <div className="hcta reveal d3"><Link href="/contact" className="btn btn-primary">Book Free Strategy Call <Arrow /></Link><Link href="/work" className="btn btn-ghost">See the Work</Link></div>
      </div></section>

      <section className="sec tight"><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">What We Build</span><h2 className="title">A complete product toolbox.</h2>
          <p className="lead">From a single landing page to a full enterprise platform — designed, built, and shipped end-to-end.</p></div>
        <div className="build-grid">{BUILDS.map((b, i) => <BuildCard key={b.name} item={b} i={i} />)}</div>
      </div></section>

      <section className="sec" id="categories"><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Service Categories</span><h2 className="title">Four ways we move you forward.</h2></div>
        <div className="svc-detail">{SERVICE_CATS.map((s, i) => (
          <div className={`scat reveal d${i % 2}`} key={s.title}><div className="ic3"><Icon name={s.icon} sw="1.5" /></div><h3>{s.title}</h3><p className="sd">{s.desc}</p><ul>{s.items.map((it) => <li key={it}><Check />{it}</li>)}</ul></div>
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
            {TIMELINES.map((t) => <div className="vbar" key={t.label}><div className="vlab"><b>{t.label}</b><span>{t.range}</span></div><div className="track"><div className="fill" data-w={t.w} /></div></div>)}
          </div>
        </div>
      </div></section>

      <section className="sec" id="pricing"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Pricing</span><h2 className="title">Simple engagement models.</h2>
          <p className="lead">Pricing scales with scope. Pick the model that fits your stage — every engagement starts with a free estimate.</p></div>
        <div className="price-grid">{PRICING.map((p, i) => (
          <div className={`pricecard ${p.feat ? 'feat ' : ''}reveal d${i % 3}`} key={p.name}><div className="badge">{p.badge}</div><h3>{p.name}</h3>
            <p className="pp">A <b>{p.price}</b> engagement</p><p className="desc">{p.desc}</p>
            <ul>{p.items.map((it) => <li key={it}><Check />{it}</li>)}</ul>
            <Link href="/contact" className={`btn ${p.feat ? 'btn-primary' : 'btn-ghost'}`}>{p.cta}</Link></div>
        ))}</div>
      </div></section>

      <section className="sec" id="industries"><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Industries</span><h2 className="title">Built for the businesses we know.</h2></div>
        <div className="ind-grid">{INDUSTRIES.map((ind) => (
          <div className="indcard reveal" key={ind.name}><div className="ii"><Icon name={ind.icon} /></div><div><div className="it">{ind.name}</div><div className="ic-sub">{ind.sub}</div></div></div>
        ))}</div>
      </div></section>

      <FinalCta />
    </>
  );
}
