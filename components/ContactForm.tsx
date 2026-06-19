'use client';
import { useState } from 'react';
import { Arrow } from './Glyphs';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("We'll review your project and reply within one business day with next steps and an estimate.");
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
      alert('Something went wrong — please email hello@buildsprint.io');
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

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="frow">
        <div className="field" style={{ margin: 0 }}><label>Full name</label><input name="name" type="text" placeholder="Jane Doe" required /></div>
        <div className="field" style={{ margin: 0 }}><label>Work email</label>
          <input name="email" type="email" placeholder="jane@company.com" required style={emailErr ? { borderColor: '#ef5a5a' } : undefined} />
        </div>
      </div>
      <div className="frow">
        <div className="field" style={{ margin: 0 }}><label>Company</label><input name="company" type="text" placeholder="Company name" /></div>
        <div className="field" style={{ margin: 0 }}><label>Project type</label>
          <select name="projectType"><option>Landing page</option><option>Website</option><option>MVP</option><option>SaaS platform</option><option>AI product / agent</option><option>Automation</option><option>Mobile app</option><option>Other</option></select>
        </div>
      </div>
      <div className="field"><label>Budget range</label>
        <select name="budget"><option>Not sure yet</option><option>Under $5k</option><option>$5k – $15k</option><option>$15k – $50k</option><option>$50k+</option></select>
      </div>
      <div className="field"><label>What do you want to build?</label>
        <textarea name="message" placeholder="A few sentences about your product, goals, and timeline..." />
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? 'Sending…' : <>Send &amp; Book a Call <Arrow /></>}
      </button>
    </form>
  );
}
