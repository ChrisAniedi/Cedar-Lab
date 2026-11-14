/**
 * Single source of truth for portfolio content.
 * Edit copy, links and projects here — components read from this file.
 */

export const site = {
  name: "Christopher Aniedi",
  shortName: "Chris Aniedi",
  title: "Christopher Aniedi — Product Designer, PM & AI‑augmented Engineer",
  description:
    "Product designer and technical product manager who also ships code. I turn complex problems into simple, human‑centred products — from research and roadmap to production.",
  roles: ["Product Designer", "Product Manager", "AI‑augmented Engineer"],
  credential: "PMI (in view)",
  // NOTE: the Framer site shows aniedichris@gmail.com but its links mail chrisjames9209@gmail.com.
  // Confirm which inbox you want public and update this one value.
  email: "aniedichris@gmail.com",
  links: {
    upwork: "https://www.upwork.com/freelancers/~01d6e331770b522e69?mp_source=share",
    resume: "https://drive.google.com/file/d/1YuXXRr-lRefWlqgLiJN94vD-yf2e4_xc/view?usp=sharing",
  },
} as const;

export const nav = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/about" },
  { label: "Notes", href: "/notes" },
  { label: "Talks", href: "/talks" },
  { label: "Resume", href: site.links.resume, external: true },
] as const;

export type Logo = { name: string; src: string; width: number; height: number; label?: string };

export const clientLogos: Logo[] = [
  { name: "Velo CRM", src: "/images/logos/velo-icon.svg", width: 31, height: 31, label: "Velo CRM" },
  { name: "Solar Survey", src: "/images/logos/solar-survey.svg", width: 193, height: 30 },
  { name: "CoinCheckout", src: "/images/logos/coincheckout.svg", width: 193, height: 38 },
  { name: "Paybox360", src: "/images/logos/paybox360.svg", width: 175, height: 33 },
  { name: "getLinked", src: "/images/logos/getlinked.svg", width: 213, height: 36 },
  { name: "Seeds & Pennies", src: "/images/logos/seeds-and-pennies.svg", width: 127, height: 40 },
  { name: "Docial", src: "/images/logos/docial.svg", width: 142, height: 36 },
  { name: "Brilst", src: "/images/logos/brilst-icon.svg", width: 37, height: 37, label: "Brilst" },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  roles: string[];
  image: string;
  /** Tint shown behind the screenshot — taken from the Figma card fills. */
  tint: string;
  href: string;
};

// Summaries were placeholders in Figma/Framer (all read "AI Sales CRM…").
// These are first drafts based on each product — review and tighten with real outcomes.
export const projects: Project[] = [
  {
    slug: "velo-crm",
    name: "Velo CRM",
    category: "SaaS · AI",
    summary: "An AI sales CRM that automates lead capture, pipeline follow‑ups and deal closing for growing sales teams.",
    roles: ["Product design", "Product strategy"],
    image: "/images/projects/velo.webp",
    tint: "#ebfef6",
    href: "https://www.usevelo.co/",
  },
  {
    slug: "paybox360",
    name: "Paybox360",
    category: "SaaS · Fintech",
    summary: "A business finance suite bringing payments, spend and operations for African SMEs into one dashboard.",
    roles: ["Product design", "UX research"],
    image: "/images/projects/paybox.webp",
    tint: "#d6ddf2",
    href: "https://www.paybox360.com/",
  },
  {
    slug: "dive-africa",
    name: "Dive Africa — LMS",
    category: "SaaS · EdTech",
    summary: "A learning platform helping young African talent learn, build portfolios and break into tech careers.",
    roles: ["Product management", "Product design"],
    image: "/images/projects/dive-africa.webp",
    tint: "#d6ddf2",
    href: "https://www.divehq.org/",
  },
  {
    slug: "getlinked",
    name: "Getlinked.ai",
    category: "SaaS · Hiring",
    summary: "AI‑assisted hiring: requisitions, talent pipelines and candidate matching in one recruiter workspace.",
    roles: ["Product design", "Design system"],
    image: "/images/projects/getlinked.webp",
    tint: "#efedf7",
    href: "https://www.getlinked.ai/",
  },
  {
    slug: "docial",
    name: "Docial",
    category: "Web3 · Social",
    summary: "A Web3 social network where creators own their audience, content and earnings.",
    roles: ["Product design", "Interaction design"],
    image: "/images/projects/docial-feed.webp",
    tint: "#dfd9d9",
    href: "https://www.docial.io/",
  },
  {
    slug: "solar-survey-ai",
    name: "Solar Survey AI",
    category: "SaaS · Climate · AI",
    summary: "Drone imagery and AI turned into solar site surveys — orthomosaics, panel layouts and reports in minutes.",
    roles: ["Technical PM", "Product design"],
    image: "/images/projects/solar-survey.webp",
    tint: "#746c6c",
    href: "https://solarsurvey.ai/",
  },
];

export const disciplines = [
  {
    index: "01",
    title: "Design",
    blurb: "Research‑led UX, interface craft and design systems that make complex products feel obvious.",
    skills: ["User research", "UX / UI", "Prototyping", "Design systems"],
  },
  {
    index: "02",
    title: "Product",
    blurb: "Discovery, prioritisation and roadmaps that tie user value to measurable business outcomes.",
    skills: ["Discovery", "Roadmapping", "PRDs & specs", "Metrics"],
  },
  {
    index: "03",
    title: "AI‑augmented engineering",
    blurb: "I prototype and ship with code — using AI tooling to move from Figma to production React fast.",
    skills: ["React / Next.js", "TypeScript", "LLM workflows", "Rapid prototyping"],
  },
];

export const impact = [
  {
    title: "Expanding access to tech through Dive Africa",
    body: "Making it easier for young talent across Africa to learn, grow and find opportunities in technology.",
  },
  {
    title: "Training the next wave of product designers",
    body: "Bootcamps and mentorship that have helped students build portfolios and land remote roles.",
  },
  {
    title: "Sharing what I learn in public",
    body: "Talks and notes on product, design and building with AI — so others can move faster than I did.",
  },
  {
    title: "Building for emerging markets",
    body: "Fintech, edtech and climate products designed around the realities of African users and businesses.",
  },
];

export const testimonials = [
  {
    quote:
      "I enjoyed the quality of lectures and the depth of knowledge shared. The sessions were practical, engaging and well‑delivered — it landed me a remote job with a fintech startup, using the portfolio I built from what I learnt.",
    name: "Bello Ayomide Samuel",
    role: "Product Designer",
    avatar: "/images/people/avatar-testimonial.webp",
  },
];

// Order mirrors the Figma photo grid (row 1, then row 2).
export const gallery = [
  { src: "/images/gallery/g-1.webp", alt: "Chris at work in a studio office" },
  { src: "/images/gallery/g-2.webp", alt: "A full virtual class on a video call" },
  { src: "/images/gallery/g-3.webp", alt: "Chris on stage under stage lights" },
  { src: "/images/gallery/g-5.webp", alt: "Selfie with a cohort on a nature trail" },
  { src: "/images/gallery/g-6.webp", alt: "Home studio screen setup" },
  { src: "/images/gallery/g-7.webp", alt: "Late-night design session at a multi-monitor desk" },
  { src: "/images/gallery/g-4.webp", alt: "Group photo with organisers at a tech event" },
  { src: "/images/gallery/g-8.webp", alt: "Hands-on build session with laptops at a workshop" },
];
