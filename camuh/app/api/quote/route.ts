import { NextResponse } from 'next/server';
import { allProducts, divisions } from '@/lib/data';

// Receives quote requests from /request-a-quote.
// To get them by email, set RESEND_API_KEY and QUOTE_TO_EMAIL (and optionally QUOTE_FROM_EMAIL)
// in your hosting environment. Without them, requests are logged to the server console.

type Body = Record<string, unknown>;
const str = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields
  if (str(body.website)) return NextResponse.json({ ok: true, ref: 'CMH-000000' });

  const data = {
    company: str(body.company, 200),
    name: str(body.name, 200),
    email: str(body.email, 200),
    phone: str(body.phone, 60),
    service: str(body.service, 60),
    products: Array.isArray(body.products) ? body.products.filter((p): p is string => typeof p === 'string').slice(0, 40) : [],
    quantity: str(body.quantity, 500),
    location: str(body.location, 200),
    timeline: str(body.timeline, 60),
    contactBy: str(body.contactBy, 30),
    notes: str(body.notes, 4000),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = 'Please enter your name.';
  if (!data.company) errors.company = 'Please enter your company.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email.';
  if (data.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a valid phone number.';
  if (!divisions.some((d) => d.slug === data.service)) errors.service = 'Please choose a service.';
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const ref = `CMH-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const serviceName = divisions.find((d) => d.slug === data.service)?.name ?? data.service;
  const productNames = data.products.map((s) => allProducts.find((p) => p.slug === s)?.name ?? s);

  const rows: [string, string][] = [
    ['Reference', ref],
    ['Company', data.company],
    ['Contact', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Preferred contact', data.contactBy || '—'],
    ['Service', serviceName],
    ['Products', productNames.join(', ') || '—'],
    ['Quantity / specs', data.quantity || '—'],
    ['Delivery location', data.location || '—'],
    ['Needed by', data.timeline || '—'],
    ['Notes', data.notes || '—'],
  ];

  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  if (key && to) {
    const html = `<h2>New quote request ${ref}</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
      .join('')}</table>`;
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL || 'Camuh Website <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()),
        reply_to: data.email,
        subject: `Quote request ${ref} — ${data.company}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error('[quote] email failed', res.status, await res.text());
      return NextResponse.json({ ok: false, error: 'We could not send your request. Please call or WhatsApp us.' }, { status: 502 });
    }
  } else {
    console.log('[quote] new request (email not configured)\n' + rows.map(([k, v]) => `  ${k}: ${v}`).join('\n'));
  }

  return NextResponse.json({ ok: true, ref });
}
