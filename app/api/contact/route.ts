import { NextResponse } from 'next/server';

interface ContactPayload {
  name?: string; email?: string; company?: string;
  projectType?: string; budget?: string; message?: string;
}

const isEmail = (v: unknown) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.name || body.name.trim().length < 2 || !isEmail(body.email)) {
    return NextResponse.json({ ok: false, error: 'A valid name and email are required.' }, { status: 400 });
  }

  // TODO: integrate a real destination — email (nodemailer/Resend), CRM, or DB.
  // For now we validate and log the lead server-side.
  console.log(`New project enquiry from ${body.name} <${body.email}> (${body.projectType ?? 'n/a'})`);

  return NextResponse.json({
    ok: true,
    message: "Thanks — we've got it. We'll reply within one business day.",
  });
}
