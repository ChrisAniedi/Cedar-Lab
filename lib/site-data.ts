import casesJson from './cases.json';

export interface BuildItem { name: string; desc: string; icon: string }
export interface ProcessStep { title: string; desc: string }
export interface Timeline { label: string; range: string; w: number }
export interface ServiceCat { title: string; icon: string; desc: string; items: string[] }
export interface PricingTier { badge: string; name: string; price: string; priceHi: string; desc: string; items: string[]; cta: string; feat: boolean }
export interface Industry { name: string; icon: string; sub: string }
export interface Stat { n: string; l: string }
export interface Testimonial { quote: string; name: string; role: string; initials: string; color: string }
export interface ValueItem { icon: string; title: string; desc: string }
export interface Market { flag: string; name: string }
export interface CaseStudy {
  tag: string; industry: string; title: string; timeline: string; big: string; rl: string;
  tech: string[]; mockKind: 'kv' | 'bars'; light: boolean; badge: string; mockTitle: string;
  a?: string; b?: string; al?: string; bl?: string;
  metrics: [string, string][]; overview: string; challenge: string; built: string[]; quote: string; quoteBy: string;
}

export const CASES = casesJson as CaseStudy[];

// Build the small mock "screenshot" markup for a project card from its case data.
function mockHtml(c: CaseStudy): string {
  const cls = c.light ? 'ms-light' : 'ms-dark';
  const body = c.mockKind === 'bars'
    ? '<div class="barz"><i style="height:50%"></i><i style="height:72%"></i><i style="height:45%"></i><i style="height:90%"></i><i style="height:65%"></i><i style="height:82%"></i></div><div class="lines"><i></i><i></i></div>'
    : `<div class="grid2"><div class="box"><div class="bl">${c.al}</div><div class="bv">${c.a}</div></div><div class="box"><div class="bl">${c.bl}</div><div class="bv">${c.b}</div></div></div><div class="lines"><i></i><i></i><i></i></div>`;
  return `<div class="ms ${cls}"><div class="mhd"><span class="t">${c.mockTitle}</span><span class="b">${c.badge}</span></div>${body}</div>`;
}

// Projects = cases enriched with rendered mock markup + a stable id (index-based).
export const PROJECTS = CASES.map((c, i) => ({ ...c, id: i, mock: mockHtml(c) }));

export const BUILDS: BuildItem[] = [
  { name: 'MVP Development', desc: 'Validate fast with a lean, real product.', icon: 'mvp' },
  { name: 'SaaS Platforms', desc: 'Scalable, multi-tenant products.', icon: 'saas' },
  { name: 'AI Agents', desc: 'Autonomous agents that do real work.', icon: 'agent' },
  { name: 'AI Products', desc: 'Intelligence built into your product.', icon: 'ai' },
  { name: 'Business Automation', desc: 'Kill manual, repetitive work.', icon: 'auto' },
  { name: 'Internal Tools', desc: 'Custom dashboards for your team.', icon: 'tools' },
  { name: 'CRM Systems', desc: 'Manage customers and pipeline.', icon: 'crm' },
  { name: 'Customer Portals', desc: 'Self-serve experiences for clients.', icon: 'portal' },
  { name: 'Marketplaces', desc: 'Two-sided platforms that scale.', icon: 'market' },
  { name: 'Web Applications', desc: 'Robust, modern web apps.', icon: 'web' },
  { name: 'Mobile Apps', desc: 'iOS & Android, cross-platform.', icon: 'mobile' },
  { name: 'Landing Pages', desc: 'High-converting pages, fast.', icon: 'landing' },
  { name: 'Corporate Websites', desc: 'Credible sites for serious brands.', icon: 'corp' },
];

export const PROCESS: ProcessStep[] = [
  { title: 'Discovery & Strategy', desc: 'Goals, users, scope, and the fastest path to value.' },
  { title: 'Product Planning', desc: 'Architecture, roadmap, and a clear build plan.' },
  { title: 'UX/UI Design', desc: 'High-fidelity, on-brand interfaces your users love.' },
  { title: 'Development', desc: 'Clean, scalable code shipped in fast iterations.' },
  { title: 'Testing', desc: 'QA, performance, and security checks before launch.' },
  { title: 'Deployment', desc: 'Production launch with monitoring and rollback ready.' },
  { title: 'Ongoing Support', desc: 'Maintenance, optimization, and growth as a partner.' },
];

export const TIMELINES: Timeline[] = [
  { label: 'Landing Pages', range: '3–7 Days', w: 18 },
  { label: 'Websites', range: '1–2 Weeks', w: 34 },
  { label: 'MVPs', range: '3–6 Weeks', w: 62 },
  { label: 'Custom Platforms', range: '6–12 Weeks', w: 100 },
];

export const SERVICE_CATS: ServiceCat[] = [
  { title: 'Product Development', icon: 'saas', desc: 'From validated MVP to production-grade platform — built to scale with you.', items: ['SaaS products', 'MVPs', 'Custom platforms', 'Mobile apps', 'Web applications', 'Marketplaces'] },
  { title: 'Business Automation', icon: 'auto', desc: 'Turn manual, repetitive work into reliable automated systems.', items: ['Workflow automation', 'System integrations', 'AI agents', 'Data pipelines', 'Internal tools', 'CRM systems'] },
  { title: 'Web Presence', icon: 'globe', desc: 'Credible, high-converting web experiences that win trust fast.', items: ['Corporate websites', 'Landing pages', 'Booking systems', 'Customer portals', 'SEO foundations', 'Analytics setup'] },
  { title: 'Growth & Support', icon: 'spark', desc: "We don't disappear at launch — we keep your product fast and growing.", items: ['Maintenance', 'Optimization', 'Analytics', 'Feature builds', 'Monitoring', 'Scaling support'] },
];

export const PRICING: PricingTier[] = [
  { badge: 'Best for defined builds', name: 'Fixed-Price Project', price: 'set', priceHi: 'set', desc: 'A clear quote for a clearly-defined product. You know the cost and the deadline before we start.', items: ['Landing pages & websites', 'MVPs with fixed scope', 'One transparent price', 'Fixed delivery date'], cta: 'Get a Quote', feat: false },
  { badge: 'Most popular', name: 'Product Sprint', price: 'retainer', priceHi: 'retainer', desc: 'A dedicated build cadence for evolving products. Continuous shipping, flexible priorities.', items: ['Ongoing design & dev', 'Flexible monthly scope', 'Weekly demos', 'Pause or scale anytime'], cta: 'Start a Sprint', feat: true },
  { badge: 'For scale & enterprise', name: 'Dedicated Team', price: 'embedded', priceHi: 'embedded', desc: 'A full product team operating as an extension of yours for complex, long-running platforms.', items: ['Senior, cross-functional team', 'Custom platforms', 'SLAs & security reviews', 'Long-term partnership'], cta: 'Talk to Us', feat: false },
];

export const INDUSTRIES: Industry[] = [
  { name: 'SaaS Companies', icon: 'saas', sub: 'Product & growth' },
  { name: 'Real Estate', icon: 'home', sub: 'PropTech platforms' },
  { name: 'Healthcare', icon: 'heart', sub: 'Dentists & clinics' },
  { name: 'Logistics', icon: 'truck', sub: 'Ops dashboards' },
  { name: 'Consultants & Coaches', icon: 'brief', sub: 'Booking & portals' },
  { name: 'Trades & Local', icon: 'wrench', sub: 'Plumbers, electricians' },
  { name: 'Marketplaces', icon: 'shop', sub: 'Two-sided platforms' },
  { name: 'Agencies', icon: 'layers', sub: 'White-label builds' },
];

export const WORK_STATS: Stat[] = [
  { n: '200+', l: 'Products shipped' }, { n: '5', l: 'Global markets' },
  { n: '4.9', l: 'Avg client rating' }, { n: 'Weeks', l: 'Not months, to launch' },
];
export const ABOUT_STATS: Stat[] = [
  { n: '200+', l: 'Products shipped' }, { n: '5', l: 'Markets served' },
  { n: '90%', l: 'Clients who return' }, { n: '4.9', l: 'Avg client rating' },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: "We went from a Figma file to a live, paying-user MVP in five weeks. The launch speed was unlike any agency we'd worked with.", name: 'Adaeze Mbaka', role: 'Founder, FlowPay', initials: 'AM', color: '#C7F750' },
  { quote: 'The product quality is genuinely high-end. Our investors thought we had a 10-person engineering team behind it.', name: 'James Reyes', role: 'CEO, ScaleWorks', initials: 'JR', color: '#8FB3FF' },
  { quote: 'Every milestone hit on time. Reliable delivery is rare — BuildSprint made it feel normal.', name: 'Sofia Kowalski', role: 'COO, Atlas Logistics', initials: 'SK', color: '#F7C25A' },
  { quote: 'Communication was effortless. Daily updates, clear demos, zero guesswork. I always knew where things stood.', name: 'Daniel Okafor', role: 'Founder, HomeFix Pro', initials: 'DO', color: '#C7F750' },
  { quote: "Two years in, they still maintain and improve our platform. It's a real partnership, not a one-off build.", name: 'Elena Voss', role: 'Director, Bridge Capital', initials: 'EV', color: '#B79CFF' },
];

export const VALUES: ValueItem[] = [
  { icon: 'bolt', title: 'Speed without shortcuts', desc: 'We move in weeks, not months — but never by skipping quality, testing, or security. Fast and solid.' },
  { icon: 'layers', title: 'One team, end-to-end', desc: 'Strategy, design, engineering, and AI under one roof. No handoffs, no finger-pointing, no lost context.' },
  { icon: 'spark', title: 'Product-first thinking', desc: "We don't just take orders — we pressure-test ideas so what we ship actually moves your business." },
  { icon: 'shield', title: 'Built to last', desc: 'We stay after launch — maintaining, optimizing, and growing the products we build as long-term partners.' },
];

export const MARKETS: Market[] = [
  { flag: '🇺🇸', name: 'United States' }, { flag: '🇬🇧', name: 'United Kingdom' },
  { flag: '🇪🇺', name: 'Europe' }, { flag: '🇨🇦', name: 'Canada' }, { flag: '🌍', name: 'Africa' },
];

export const TRUST_LOGOS = ['Nova Health', 'FlowPay', 'Atlas Logistics', 'Bridge Capital', 'HomeFix Pro', 'ScaleWorks'];

export interface Stage { num: string; icon: string; title: string; desc: string; items: string[] }
export const STAGES: Stage[] = [
  { num: '01', icon: 'bolt', title: 'Startup Founders', desc: 'Validate ideas quickly with MVPs that reach real users in weeks.', items: ['Investor-ready MVPs', 'Rapid prototyping', 'Launch in weeks'] },
  { num: '02', icon: 'auto', title: 'Growing Businesses', desc: 'Automate operations, connect your tools, and scale without the chaos.', items: ['Workflow automation', 'System integrations', 'AI-powered ops'] },
  { num: '03', icon: 'shield', title: 'Enterprise Teams', desc: 'Build custom platforms and internal systems with security and scale built in.', items: ['Custom platforms', 'Internal tooling', 'Dedicated team'] },
];
