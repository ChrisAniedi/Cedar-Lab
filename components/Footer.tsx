import Link from 'next/link';

export default function Footer() {
  return (
    <footer><div className="wrap">
      <div className="foot-top">
        <div className="foot-brand">
          <Link className="logo" href="/"><span className="mark"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2 4 13h6l-1 9 9-13h-6l1-7Z" fill="#0B1300" /></svg></span>BuildSprint</Link>
          <p>From idea to launch in weeks, not months. Your complete product partner — strategy, design, development, AI, and support.</p>
        </div>
        <div className="foot-col"><h5>Company</h5>
          <Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/services#industries">Industries</Link><Link href="/services#pricing">Pricing</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
        </div>
        <div className="foot-col"><h5>Build</h5>
          <Link href="/services">SaaS &amp; MVPs</Link><Link href="/services">AI Products</Link><Link href="/services">Automation</Link><Link href="/services">Websites</Link><Link href="/services">Mobile Apps</Link>
        </div>
        <div className="news">
          <label>Get product insights</label>
          <div className="field2"><input type="email" placeholder="you@company.com" aria-label="Email" /><button className="subb">Join</button></div>
          <div className="contact2"><a href="mailto:hello@buildsprint.io">hello@buildsprint.io</a><br />Remote-first · US / UK / EU / CA / Africa</div>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="stmt">Building products, platforms, and AI-powered solutions for ambitious companies worldwide. © 2026 BuildSprint.</div>
        <div className="socials">
          <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M18 2h3l-7 8 8 12h-6l-5-7-5 7H-1l8-9L0 2h6l4 6 4-6h4Z" transform="translate(2)" /></svg></a>
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h2v12H3V9Zm5 0h2v2c.6-1 2-2 4-2 3 0 4 2 4 5v7h-2v-6c0-2-.5-3-2-3s-2 1-2 3v6H8V9Z" /></svg></a>
          <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3 19.5c.5 0 .7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1 .4-1.9 1-2.5 0-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.6 1 1.5 1 2.5 0 3.9-2.4 4.8-4.6 5 .3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" /></svg></a>
        </div>
      </div>
    </div></footer>
  );
}
