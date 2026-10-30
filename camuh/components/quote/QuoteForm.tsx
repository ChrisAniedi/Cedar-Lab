'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { company, divisions } from '@/lib/data';
import { Check, WhatsApp } from '../Icons';

type Initial = { service?: string; product?: string; qty?: string; location?: string };
type Errors = Partial<Record<'company' | 'name' | 'email' | 'phone' | 'service' | 'form', string>>;

const timelines = ['As soon as possible', 'Within 1 week', 'Within 2–4 weeks', 'Just planning / budgeting'];
const contactOptions = ['Email', 'Phone call', 'WhatsApp'];

export default function QuoteForm({ initial }: { initial: Initial }) {
  const validService = divisions.some((d) => d.slug === initial.service) ? initial.service! : '';
  const [service, setService] = useState(validService);
  const [products, setProducts] = useState<string[]>(initial.product ? [initial.product] : []);
  const [form, setForm] = useState({
    company: '', name: '', email: '', phone: '',
    quantity: initial.qty ?? '', location: initial.location ?? '', timeline: timelines[0], contactBy: contactOptions[0], notes: '', website: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [ref, setRef] = useState('');

  const division = useMemo(() => divisions.find((d) => d.slug === service), [service]);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggle = (slug: string) => setProducts((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.company.trim()) e.company = 'Please enter your company.';
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Please enter a valid phone number.';
    if (!service) e.service = 'Please choose a service.';
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service, products }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? { form: json.error ?? 'Something went wrong. Please try again.' });
        setStatus('idle');
        return;
      }
      setRef(json.ref);
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrors({ form: 'Network error. Please try again, or reach us on WhatsApp.' });
      setStatus('idle');
    }
  };

  const whatsappHref = useMemo(() => {
    const names = products.map((s) => division?.products.find((p) => p.slug === s)?.name ?? s);
    const msg = [
      'Hello Camuh, I would like a quote.',
      division && `Service: ${division.name}`,
      names.length ? `Products: ${names.join(', ')}` : '',
      form.quantity && `Quantity/specs: ${form.quantity}`,
      form.location && `Deliver to: ${form.location}`,
      form.company && `Company: ${form.company}`,
    ].filter(Boolean).join('\n');
    return `${company.whatsapp}&text=${encodeURIComponent(msg)}`;
  }, [products, division, form.quantity, form.location, form.company]);

  const input = 'w-full rounded-lg border border-black/10 bg-white px-4 py-3.5 text-[15px] outline-none transition placeholder:text-black/35 focus:border-ink focus:ring-2 focus:ring-ink/10';
  const label = 'mb-2 block text-[13px] font-semibold';
  const err = (k: keyof Errors) => errors[k] && <p className="mt-1.5 text-[13px] font-medium text-[#b42318]">{errors[k]}</p>;

  if (status === 'done') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white p-8 text-center sm:p-12" role="status">
        <span className="mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full bg-[#16a34a] text-white"><Check width={30} height={30} strokeWidth={2.6} /></span>
        <h2 className="mt-6 text-[28px] font-extrabold tracking-tight">Request received!</h2>
        <p className="mt-2 text-[15px] text-body">Your reference is <strong className="text-ink">{ref}</strong>.</p>
        <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-relaxed text-body">
          Our team will review your request and get back to you by {form.contactBy.toLowerCase()} — usually the same business day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/services" className="btn-black">Browse more products</Link>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn border border-black/15 hover:bg-cream"><WhatsApp /> Follow up on WhatsApp</a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl bg-white p-6 sm:p-10">
      <fieldset>
        <legend className="text-[22px] font-extrabold tracking-tight">1. What do you need?</legend>
        <p className="mt-1 text-[14px] text-body">Choose a service line, then pick any products you&rsquo;re interested in.</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Service" id="f-service" tabIndex={-1}>
          {divisions.map((d) => (
            <label
              key={d.slug}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition ${
                service === d.slug ? 'border-ink bg-ink text-white' : 'border-black/10 hover:border-black/30'
              }`}
            >
              <input type="radio" name="service" value={d.slug} checked={service === d.slug} onChange={() => { setService(d.slug); setProducts([]); }} className="sr-only" />
              <span className={`text-[12px] font-semibold ${service === d.slug ? 'text-white/60' : 'text-smoke'}`}>{d.index}</span>
              <span className="text-[14px] font-semibold leading-tight">{d.shortName}</span>
            </label>
          ))}
        </div>
        {err('service')}

        <AnimatePresence>
          {division && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <p className={`${label} mt-6`}>Products <span className="font-normal text-body">(optional, choose any)</span></p>
              <div className="flex flex-wrap gap-2">
                {division.products.map((p) => {
                  const on = products.includes(p.slug);
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(p.slug)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                        on ? 'border-ink bg-ink text-white' : 'border-black/15 hover:border-black/40'
                      }`}
                    >
                      {on && <Check width={14} height={14} strokeWidth={2.4} />}
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="f-quantity" className={label}>Quantities, specifications or part numbers</label>
            <textarea id="f-quantity" rows={3} value={form.quantity} onChange={set('quantity')} className={input} placeholder="e.g. 40 MT Baryte API grade, 200 bags KCl, 2× PT sensors 15 kPSI" />
          </div>
          <div>
            <label htmlFor="f-location" className={label}>Delivery location</label>
            <input id="f-location" value={form.location} onChange={set('location')} className={input} placeholder="e.g. Onne, Bonny, Trans Amadi base" />
          </div>
          <div>
            <label htmlFor="f-timeline" className={label}>Needed by</label>
            <select id="f-timeline" value={form.timeline} onChange={set('timeline')} className={`${input} cursor-pointer`}>
              {timelines.map((t) => (<option key={t}>{t}</option>))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-10 border-t border-black/10 pt-8">
        <legend className="text-[22px] font-extrabold tracking-tight">2. Your details</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="f-name" className={label}>Full name *</label>
            <input id="f-name" autoComplete="name" value={form.name} onChange={set('name')} className={input} aria-invalid={!!errors.name} />
            {err('name')}
          </div>
          <div>
            <label htmlFor="f-company" className={label}>Company *</label>
            <input id="f-company" autoComplete="organization" value={form.company} onChange={set('company')} className={input} aria-invalid={!!errors.company} />
            {err('company')}
          </div>
          <div>
            <label htmlFor="f-email" className={label}>Work email *</label>
            <input id="f-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} className={input} aria-invalid={!!errors.email} />
            {err('email')}
          </div>
          <div>
            <label htmlFor="f-phone" className={label}>Phone *</label>
            <input id="f-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={input} placeholder="+234" aria-invalid={!!errors.phone} />
            {err('phone')}
          </div>
          <div className="sm:col-span-2">
            <p className={label}>Best way to reach you</p>
            <div className="flex flex-wrap gap-2">
              {contactOptions.map((c) => (
                <label key={c} className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-medium transition ${form.contactBy === c ? 'border-ink bg-ink text-white' : 'border-black/15 hover:border-black/40'}`}>
                  <input type="radio" name="contactBy" value={c} checked={form.contactBy === c} onChange={set('contactBy')} className="sr-only" />
                  {c}
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="f-notes" className={label}>Anything else?</label>
            <textarea id="f-notes" rows={4} value={form.notes} onChange={set('notes')} className={input} placeholder="Well conditions, equipment make/model, certifications required…" />
          </div>
          {/* honeypot */}
          <div className="hidden" aria-hidden>
            <label htmlFor="f-website">Website</label>
            <input id="f-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
          </div>
        </div>
      </fieldset>

      {errors.form && <p className="mt-6 rounded-lg bg-[#fef3f2] px-4 py-3 text-[14px] font-medium text-[#b42318]" role="alert">{errors.form}</p>}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'sending'} className="btn-black btn-caps disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Submit request'}
        </button>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn border border-black/15 text-[14px] hover:bg-cream">
          <WhatsApp /> Send via WhatsApp instead
        </a>
      </div>
      <p className="mt-4 text-[12px] text-body">By submitting, you agree to be contacted about this request. We never share your details.</p>
    </form>
  );
}
