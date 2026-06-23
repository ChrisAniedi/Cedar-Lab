'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
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
        <Image src="/cedalab-logo.png" alt="Ceda Lab Logo" width={120} height={120} />
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
