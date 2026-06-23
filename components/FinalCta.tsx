import Link from 'next/link';
import { Arrow } from './Glyphs';

export default function FinalCta() {
  return (
    <section className="final"><div className="wrap"><div className="cta-panel reveal">
      <span className="kicker">Let&apos;s Build</span>
      <h2>Your next product doesn&apos;t need to take 12 months.</h2>
      <p>Whether you need a landing page, AI agent, MVP, SaaS platform, or enterprise tool — Ceda Lab can help you launch faster.</p>
      <div className="row">
        <Link href="/contact" className="btn btn-dark">Book Strategy Call <Arrow /></Link>
        <Link href="/contact" className="btn btn-line">Get Project Estimate</Link>
      </div>
    </div></div></section>
  );
}
