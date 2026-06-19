'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header id="hdr"><div className="wrap"><nav className="nav">
      <Link className="logo" href="/">
        <span className="mark"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2 4 13h6l-1 9 9-13h-6l1-7Z" fill="#0B1300" /></svg></span>
        BuildSprint
      </Link>
      <div className="nav-links">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={path === l.href ? 'active' : undefined}>{l.label}</Link>
        ))}
      </div>
      <div className="nav-cta">
        <Link href="/work" className="btn btn-ghost">View Our Work</Link>
        <Link href="/contact" className="btn btn-primary">Book a Call</Link>
        <button className="menu-btn" aria-label="Menu"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
      </div>
    </nav></div></header>
  );
}
