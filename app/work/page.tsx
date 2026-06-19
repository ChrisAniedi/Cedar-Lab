import type { Metadata } from 'next';
import { Stars } from '@/components/Glyphs';
import WorkGrid from '@/components/WorkGrid';
import FinalCta from '@/components/FinalCta';
import { WORK_STATS, PROJECTS, TESTIMONIALS } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Work',
  description: "Products we've shipped: SaaS platforms, AI agents, dashboards, marketplaces and booking systems with measurable results.",
};

export default function Work() {
  return (
    <>
      <section className="phero"><div className="wrap">
        <div className="crumb reveal"><a href="/">Home</a> / Work</div>
        <span className="kicker reveal d1" style={{ marginTop: 18 }}>Selected Work</span>
        <h1 className="reveal d1">Real products. <span className="em">Measurable results.</span></h1>
        <p className="lead reveal d2">A look at platforms, AI products, and tools we&apos;ve shipped for startups, SMEs, and enterprise teams across five markets.</p>
      </div></section>

      <section className="sec tight"><div className="wrap"><div className="stats">
        {WORK_STATS.map((s, i) => <div className={`statc reveal d${i}`} key={s.l}><div className="sn">{s.n}</div><div className="sl">{s.l}</div></div>)}
      </div></div></section>

      <section className="sec" style={{ paddingTop: 20 }}><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Case Studies</span><h2 className="title">Outcomes, not just outputs.</h2>
          <p className="lead">Tap any project to read the full case study.</p></div>
        <WorkGrid projects={PROJECTS} />
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Testimonials</span><h2 className="title">What clients say.</h2></div>
        <div className="test-grid">{TESTIMONIALS.map((t, i) => (
          <div className={`tcard reveal d${i % 3}`} key={t.name}><Stars />
            <p className="q">&ldquo;{t.quote}&rdquo;</p>
            <div className="who"><span className="av" style={{ background: t.color }}>{t.initials}</span><div><div className="nm">{t.name}</div><div className="rl">{t.role}</div></div></div>
          </div>
        ))}</div>
      </div></section>

      <FinalCta />
    </>
  );
}
