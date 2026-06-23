# Ceda Lab — Next.js + TypeScript + Tailwind

Marketing site for **Ceda Lab**, built with the **Next.js App Router**, **TypeScript**,
and **Tailwind CSS**. Pages are server-rendered from typed data (`lib/site-data.ts`), the
case-study modal and contact form are client components, and the contact form posts to a
real **Route Handler** at `/api/contact`.

## Stack
- **Next.js 14** (App Router, React Server Components) + **TypeScript**
- **Tailwind CSS 3** — design tokens in `tailwind.config.ts`, design system in `app/globals.css`
- Server components for content; client components for interactivity

## Structure
```
app/
  layout.tsx            # root layout: fonts, <Nav>, <Footer>, <ClientEffects>, metadata
  page.tsx              # home (/)
  services/page.tsx     # /services
  work/page.tsx         # /work   (renders <WorkGrid> — clickable cards + case modal)
  about/page.tsx        # /about
  contact/page.tsx      # /contact
  api/contact/route.ts  # POST /api/contact  (validates + logs the lead)
  globals.css           # Tailwind entry + ported design-system layer
components/
  Nav.tsx               # 'use client' — active link via usePathname
  Footer.tsx FinalCta.tsx BuildCard.tsx ProjectCard.tsx Glyphs.tsx
  WorkGrid.tsx          # 'use client' — project grid + accessible modal (state-driven)
  ContactForm.tsx       # 'use client' — posts to /api/contact, success state
  ClientEffects.tsx     # 'use client' — scroll-reveal, sticky nav, FAQ accordion
lib/
  site-data.ts          # typed content: builds, projects, cases, testimonials, ...
  cases.json            # 8 case studies
  icons.tsx             # inline SVG icon set + <Icon/>
```

## Run it
Requires **Node 18.17+**.

```bash
npm install
npm run dev            # http://localhost:3000
```

Production:
```bash
npm run build
npm start
```

## Notes
- **Tailwind:** tokens (colours, fonts, radii) live in `tailwind.config.ts` so utilities like
  `text-acc`, `bg-bg1`, `font-serif` are available; the bespoke component system (cards,
  product mockups, the case-study modal, gradients/animations) lives in `app/globals.css`.
- **Fonts** load via `<link>` in the root layout (Google Fonts) to keep builds offline-friendly.
  Swap to `next/font/google` if you prefer self-hosted, build-time fonts.
- **Contact endpoint** validates name + email and logs the lead. Wire it to email
  (nodemailer/Resend), a CRM, or a DB in `app/api/contact/route.ts` to go live.
- Copy, logos, stats and testimonials are realistic placeholders.
