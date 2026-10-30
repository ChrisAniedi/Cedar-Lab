# Camuh Innovations Limited — website

The Camuh website rebuilt with the Vanity Pass (vanitypass.com) design: giant split hero type, black
"SOLUTIONS FOR … HOW YOU ___" scroll moments, two-tone headlines, cream/sand sections, card carousels,
inertia (smooth) scrolling, and the same style of footer.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · Lenis

## Pages
| Route | What's on it |
|---|---|
| `/` | Everything: hero, intro, 5 service divisions with a quick-quote bar, product carousel, SmartSense (IoT), delivery stories, full product index, how it works, reasons, clients, stats, testimonial, contact, CTA |
| `/services` | Every division and all 26 products, with specs and "Add to quote" links, plus process and FAQs |
| `/request-a-quote` | Quote form (pre-fills from links such as `?service=chemicals&product=baryte`), WhatsApp fallback, contact details |
| `/api/quote` | Receives the form, validates it, and emails it (see below) |

## Run it
```bash
cd camuh
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel)
Import the repo and set **Root Directory = `camuh`**. To get quote requests by email, add these environment variables:

- `RESEND_API_KEY`: from resend.com
- `QUOTE_TO_EMAIL`: e.g. `business@camuh.com.ng` (comma-separate several)
- `QUOTE_FROM_EMAIL`: optional, a sender on a domain verified in Resend

Without them, requests are only written to the server log.

## Editing content
All text, products, contacts and images live in **`lib/data.ts`**. Items marked `// DUMMY` are placeholders to replace:
- **Stats** (25+, 48hr, …)
- **Client names** in the logo strip (these are fictional)
- **Testimonial**

Copy written for the site (headlines, SmartSense, delivery stories, FAQs) is new and should be reviewed by Camuh.

## Images
- `public/images/products`, `public/images/scenes`: photos from the Camuh brochure.
- `public/images/brand`: logo cut from the brochure (colour, white and black versions). Replace with the original vector logo if available.
- Large atmosphere photos (rigs, refinery, vessel, workers) load from Unsplash (free licence). Download them into `public/` if you prefer self-hosting.
- **Hero video:** put an MP4 at `public/videos/hero.mp4` and change `<Hero image={…} />` to `<Hero image={…} video="/videos/hero.mp4" />` in `app/page.tsx`.

## Fonts
- **Cabinet Grotesk** (the Vanity Pass body/heading font) loads free from Fontshare.
- **Figtree** (Google) stands in for Vanity Pass's licensed display font, Uber Move.
