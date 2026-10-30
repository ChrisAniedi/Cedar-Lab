import Link from 'next/link';
import Image from 'next/image';
import { company, divisions, scenes } from '@/lib/data';
import { Facebook, LinkedIn, WhatsApp } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      {/* Photo band with a single line, as on Vanity Pass ("Democratising access…") */}
      <div className="relative flex h-[300px] items-center justify-center overflow-hidden sm:h-[380px]">
        <Image src={scenes.rigSunset} alt="Offshore platform at sunset" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <p className="relative px-6 text-center text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold tracking-tight text-white">
          Powering the future of energy, from Port Harcourt
        </p>
      </div>

      <div className="bg-white">
        <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-3">
            <Link href="/" aria-label="Camuh home">
              <Image src="/images/brand/camuh-logo.png" alt="Camuh Innovations Limited" width={500} height={219} className="h-auto w-[200px]" />
            </Link>
          </div>

          <div className="space-y-5 md:col-span-3">
            <div className="flex items-center gap-4 text-ink">
              <a href={company.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition hover:text-brand"><Facebook /></a>
              <a href={company.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:text-brand"><LinkedIn /></a>
              <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition hover:text-brand"><WhatsApp /></a>
            </div>
            <p className="max-w-[260px] text-[13px] leading-relaxed text-body">
              Camuh Innovations Limited supplies oilfield chemicals, IoT &amp; smart sensors, marine consumables, spare parts and equipment
              leasing to the oil and gas industry.
            </p>
            <address className="not-italic text-[13px] leading-relaxed text-body">
              {company.address.map((l) => (<span key={l} className="block">{l}</span>))}
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-[0.9fr_1fr_1.5fr] md:col-span-6">
            <ul className="space-y-3 text-[15px]">
              <li><Link href="/" className="hover:text-body">Home</Link></li>
              <li><Link href="/services" className="hover:text-body">Services</Link></li>
              <li><Link href="/request-a-quote" className="hover:text-body">Request a Quote</Link></li>
              <li><Link href="/services#faqs" className="hover:text-body">FAQs</Link></li>
            </ul>
            <ul className="space-y-3 text-[15px]">
              {divisions.map((d) => (
                <li key={d.slug}><Link href={`/services#${d.slug}`} className="hover:text-body">{d.shortName}</Link></li>
              ))}
            </ul>
            <ul className="col-span-2 space-y-3 text-[15px] sm:col-span-1">
              {company.phones.map((p) => (<li key={p.href}><a href={p.href} className="whitespace-nowrap hover:text-body">{p.label}</a></li>))}
              {company.emails.map((e) => (<li key={e}><a href={`mailto:${e}`} className="hover:text-body">{e}</a></li>))}
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5">
          <div className="container-x flex flex-col gap-2 py-6 text-[13px] text-body sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright © {year} — {company.name}. All rights reserved.</p>
            <p>Smart chemicals · IoT · Marine supply · Spare parts</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
