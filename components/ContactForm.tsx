'use client';
import { useState } from 'react';
import { Arrow } from './Glyphs';

export default function ContactForm({ variant }: { variant?: 'local' }) {
  const local = variant === 'local';
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState(
    local
      ? "Thanks — we'll put together a free mockup and get back to you, usually within one business day."
      : "We'll review your project and reply within one business day with next steps and an estimate.",
  );
  const [busy, setBusy] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.email || String(data.email).indexOf('@') === -1) { setEmailErr(true); return; }
    setEmailErr(false); setBusy(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (json?.message) setMsg(json.message);
      setSent(true);
    } catch {
      setBusy(false);
      alert('Something went wrong — please email hello@thecedarlab.com');
    }
  }

  if (sent) {
    return (
      <div className="thanks show">
        <div className="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12l4 4 10-10" /></svg></div>
        <h3>Thanks — we&apos;ve got it.</h3>
        <p>{msg}</p>
      </div>
    );
  }

  const budgetOptions = local
    ? ['Not sure yet', 'Under $1k', '$1k – $2k', '$2k – $5k', '$5k+']
    : ['Not sure yet', 'Under $5k', '$5k – $15k', '$15k – $50k', '$50k+'];
  const projectOptions = local
    ? ['New website', 'Website redesign', 'One-page site', 'Booking / quote site', 'Not sure']
    : ['Landing page', 'Website', 'MVP', 'SaaS platform', 'AI product / agent', 'Automation', 'Mobile app', 'Other'];
  const messagePlaceholder = local
    ? 'A few sentences about your business, services, goals, timeline, etc.'
    : 'A few sentences about your product, goals, and timeline...';

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="frow">
        <div className="field" style={{ margin: 0 }}><label>Full name</label><input name="name" type="text" placeholder="Jane Doe" required /></div>
        <div className="field" style={{ margin: 0 }}><label>Email</label>
          <input name="email" type="email" placeholder={local ? 'jane@yourbusiness.co.uk' : 'jane@company.com'} required style={emailErr ? { borderColor: '#ef5a5a' } : undefined} />
        </div>
      </div>
      <div className="frow">
        <div className="field" style={{ margin: 0 }}><label>{local ? 'Business name' : 'Company'}</label><input name="company" type="text" placeholder={local ? 'Your business name' : 'Company name'} /></div>
        <div className="field" style={{ margin: 0 }}><label>{local ? 'What you need' : 'Project type'}</label>
          <select name="projectType">{projectOptions.map((o) => <option key={o}>{o}</option>)}</select>
        </div>
      </div>
      {local && (
        <div className="field"><label>Current website <span className="opt">(optional)</span></label>
          <input name="website" type="text" placeholder="yourbusiness.co.uk — leave blank if you don't have one yet" />
        </div>
      )}
      <div className="field"><label>Budget</label>
        <select name="budget">{budgetOptions.map((o) => <option key={o}>{o}</option>)}</select>
      </div>
      <div className="field"><label>{local ? 'Tell us about your business' : 'What do you want to build?'}</label>
        <textarea name="message" placeholder={messagePlaceholder} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? 'Sending…' : local ? <>Get My Free Mockup <Arrow /></> : <>Send &amp; Book a Call <Arrow /></>}
      </button>
    </form>
  );
}
