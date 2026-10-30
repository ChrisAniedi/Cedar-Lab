'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { company, divisions } from '@/lib/data';
import { ArrowRight, Close, Mail, Phone } from './Icons';

// Transparent over the dark hero, turns solid white after scrolling,
// tucks away while scrolling down and returns on scroll up.
export default function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.6);
      setHidden(y > 300 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) { lenis?.stop(); document.body.style.overflow = 'hidden'; }
    else { lenis?.start(); document.body.style.overflow = ''; }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const dark = solid; // dark text on white bar
  const linkCls = `relative text-[15px] font-medium transition-colors ${dark ? 'text-ink hover:text-body' : 'text-white/90 hover:text-white'}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'} ${
          solid ? 'bg-white/90 shadow-[0_1px_0_rgba(0,0,0,.06)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="flex h-[68px] items-center justify-between px-5 sm:px-8" aria-label="Main">
          <Link href="/" className="flex items-center" aria-label="Camuh Innovations — home">
            <Image
              src={dark ? '/images/brand/camuh-mark.png' : '/images/brand/camuh-mark-white.png'}
              alt="Camuh"
              width={500}
              height={169}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </Link>
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/services" className={`${linkCls} hidden sm:block`} aria-current={pathname === '/services' ? 'page' : undefined}>
              Services
            </Link>
            <Link href="/request-a-quote" className={`${linkCls} hidden sm:block`} aria-current={pathname === '/request-a-quote' ? 'page' : undefined}>
              Request a Quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`flex items-center gap-2.5 text-[15px] font-medium ${dark ? 'text-ink' : 'text-white'}`}
            >
              Menu
              <span className="flex w-6 flex-col gap-[5px]" aria-hidden>
                <span className="h-[1.5px] w-full bg-current" />
                <span className="ml-auto h-[1.5px] w-2/3 bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-white"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="flex h-[68px] items-center justify-between px-5 sm:px-8">
              <Image src="/images/brand/camuh-mark-white.png" alt="Camuh" width={500} height={169} className="h-7 w-auto sm:h-8" />
              <button type="button" onClick={() => setOpen(false)} className="flex items-center gap-2 text-[15px] font-medium" autoFocus>
                Close <Close />
              </button>
            </div>

            <div className="grid gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-12 lg:pt-14">
              <ul className="space-y-1 lg:col-span-5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/services', label: 'Services' },
                  { href: '/request-a-quote', label: 'Request a Quote' },
                ].map((l, i) => (
                  <motion.li key={l.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}>
                    <Link href={l.href} className="group flex items-center gap-4 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium uppercase leading-[1.02] tracking-tight">
                      <span className="transition-transform duration-300 group-hover:translate-x-2">{l.label}</span>
                      <ArrowRight className="h-8 w-8 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="lg:col-span-4">
                <p className="eyebrow mb-5 text-white/50">What we do</p>
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {divisions.map((d) => (
                    <li key={d.slug}>
                      <Link href={`/services#${d.slug}`} className="group flex items-center gap-4 py-3.5">
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white">
                          <Image src={d.image} alt="" fill sizes="48px" className="object-cover" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-[15px] font-semibold">{d.shortName}</span>
                          <span className="block text-[13px] text-white/50">{d.tagline}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 lg:col-span-3">
                <p className="eyebrow text-white/50">Talk to us</p>
                <div className="space-y-3 text-[15px]">
                  {company.phones.map((p) => (
                    <a key={p.href} href={p.href} className="flex items-center gap-3 text-white/80 hover:text-white"><Phone className="h-4 w-4" />{p.label}</a>
                  ))}
                  {company.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="flex items-center gap-3 break-all text-white/80 hover:text-white"><Mail className="h-4 w-4 shrink-0" />{e}</a>
                  ))}
                </div>
                <p className="text-[14px] leading-relaxed text-white/50">{company.address.join(', ')}</p>
                <Link href="/request-a-quote" className="btn-white btn-caps">Request a Quote</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
