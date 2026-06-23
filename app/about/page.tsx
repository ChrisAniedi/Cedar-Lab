import FinalCta from '@/components/FinalCta';
import { Check, Cross } from '@/components/Glyphs';
import { Icon } from '@/lib/icons';
import { ABOUT_STATS, MARKETS, STAGES, VALUES } from '@/lib/site-data';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why Ceda Lab exists: a product-first team that takes companies from idea to launch in weeks, not months.',
};

export default function About() {
  return (
    <>
      <section className="phero"><div className="wrap">
        <div className="crumb reveal"><Link href="/">Home</Link> / About</div>
        <span className="kicker reveal d1" style={{ marginTop: 18 }}>About Ceda Lab</span>
        <h1 className="reveal d1">From idea to launch in <span className="em">weeks, not months.</span></h1>
        <p className="lead reveal d2">Ceda Lab exists because great products shouldn&apos;t take a year and five vendors to ship. We&apos;re one product-first team handling strategy, design, development, AI, and support — built around speed without shortcuts.</p>
      </div></section>

      <section className="sec tight"><div className="wrap"><div className="stats">
        {ABOUT_STATS.map((s, i) => <div className={`statc reveal d${i}`} key={s.l}><div className="sn">{s.n}</div><div className="sl">{s.l}</div></div>)}
      </div></div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-head center reveal"><span className="kicker">Why Ceda Lab</span><h2 className="title">Built differently, on purpose.</h2>
          <p className="lead">Most agencies juggle vendors and stretch timelines. We&apos;re a single, senior team that ships.</p></div>
        <div className="cmp">
          <div className="col trad reveal"><div className="ch"><span className="tagx">Old Way</span><span className="b">Traditional Agency</span></div>
            <ul><li><Cross />Slow, drawn-out delivery</li><li><Cross />Multiple disconnected vendors</li><li><Cross />Limited support after launch</li><li><Cross />No real product strategy</li></ul></div>
          <div className="col bs reveal d1"><div className="ch"><span className="tagx">Ceda Lab</span><span className="b">The Sprint Way</span></div>
            <ul><li><Check />Fast, predictable execution</li><li><Check />End-to-end delivery, one team</li><li><Check />A dedicated, senior team</li><li><Check />Product-first thinking</li><li><Check />AI capabilities built in</li><li><Check />Long-term partnership &amp; support</li></ul></div>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Our Principles</span><h2 className="title">What we believe.</h2></div>
        <div className="val-grid">{VALUES.map((v, i) => (
          <div className={`valc reveal d${i % 2}`} key={v.title}><div className="vi"><Icon name={v.icon} sw="1.5" /></div><div><h3>{v.title}</h3><p>{v.desc}</p></div></div>
        ))}</div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Built For Every Stage</span><h2 className="title">Wherever you are, we move you forward.</h2></div>
        <div className="stage-grid">{STAGES.map((s, i) => (
          <div className={`scard reveal d${i}`} key={s.num}><span className="num">{s.num}</span><div className="ic2"><Icon name={s.icon} sw="1.5" /></div><h3>{s.title}</h3><p>{s.desc}</p><div className="ln">{s.items.map((it) => <span key={it}><Check />{it}</span>)}</div></div>
        ))}</div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }} id="markets"><div className="wrap">
        <div className="sec-head reveal"><span className="kicker">Global Reach</span><h2 className="title">Remote-first, working worldwide.</h2>
          <p className="lead">We partner with ambitious companies across five markets, with overlapping hours and clear async communication.</p></div>
        <div className="mkt-grid">{MARKETS.map((m, i) => <div className={`mktc reveal d${i}`} key={m.name}><div className="mf">{m.flag}</div><div className="mn">{m.name}</div></div>)}</div>
      </div></section>

      <FinalCta />
    </>
  );
}
