import { company } from '@/lib/data';
import Reveal from './Reveal';
import { Mail, Phone, Pin, WhatsApp } from './Icons';

export default function ContactStrip() {
  const cards = [
    { icon: <Pin />, label: 'Visit', lines: company.address as readonly string[], href: company.mapsUrl, cta: 'Open in Maps' },
    { icon: <Phone />, label: 'Call', lines: company.phones.map((p) => p.label), href: company.phones[0].href, cta: 'Call now' },
    { icon: <Mail />, label: 'Email', lines: company.emails as readonly string[], href: `mailto:${company.emails[0]}`, cta: 'Send an email' },
    { icon: <WhatsApp />, label: 'WhatsApp', lines: ['Chat with our sales team', 'Typically replies in minutes'], href: company.whatsapp, cta: 'Start a chat' },
  ];
  return (
    <section className="bg-cream py-24">
      <div className="container-x">
        <Reveal>
          <h2 className="h-two text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.12]">
            Let&rsquo;s get to work <span className="muted">on something great.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06} className="h-full">
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-card"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white">{c.icon}</span>
                <p className="mt-6 text-[13px] font-semibold uppercase tracking-wide text-smoke">{c.label}</p>
                <div className="mt-2 flex-1 space-y-0.5 text-[15px] font-medium">
                  {c.lines.map((l) => (<p key={l} className="break-words">{l}</p>))}
                </div>
                <span className="mt-6 text-[13px] font-semibold underline-offset-4 group-hover:underline">{c.cta} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
