// Single source of truth for site content.
// Real details come from the Camuh brochure and camuh.com.ng.
// Anything marked `// DUMMY` is placeholder copy/data — replace it with real info before launch.

export const company = {
  name: 'Camuh Innovations Limited',
  short: 'Camuh',
  tagline: 'Powering oil and gas with smart chemicals, IoT innovations, marine consumables & spare part sourcing.',
  address: ['6 JC Street, Off Peter Odili Road', 'Trans Amadi, Port Harcourt', 'Rivers State, Nigeria'],
  phones: [
    { label: '+234 (0) 803 671 3099', href: 'tel:+2348036713099' },
    { label: '+234 (0) 701 147 1864', href: 'tel:+2347011471864' },
  ],
  emails: ['business@camuh.com.ng', 'camuhrenovations@gmail.com'],
  whatsapp: 'https://api.whatsapp.com/send?phone=2348036713099',
  socials: {
    facebook: 'https://www.facebook.com/share/16gNcLkjXd/',
    linkedin: 'https://www.linkedin.com/company/juggle-balance-innovations/',
  },
  mapsUrl: 'https://maps.google.com/?q=6+JC+Street+Off+Peter+Odili+Road+Trans+Amadi+Port+Harcourt',
} as const;

// Large atmosphere photos (Unsplash, free licence) — loaded from Unsplash's CDN.
const u = (id: string, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;
export const scenes = {
  rigSunset: u('photo-1633829131104-e2134f75c6e5'),
  rigSilhouette: u('photo-1791039624964-9f11e7c7cff1'),
  rigSupplyShip: u('photo-1749073668528-38ab64575f5d'),
  oilWorker: u('photo-1516216628859-9bccecab13ca'),
  refineryNight: u('photo-1726111262949-e22631a8c376'),
  refineryPipes: u('photo-1749484460743-654768ed67ba'),
  refineryDusk: u('photo-1573153178631-49e3aa9e018b'),
  cargoAerial: u('photo-1724597500306-a4cbb7d1324e'),
  workerPortraitA: u('photo-1622612023350-b15f063eabe6', 900),
  workerPortraitB: u('photo-1672748341520-6a839e6c05bb', 900),
  // Local photos from the Camuh brochure
  craneHero: '/images/scenes/crane-vessel-hero.webp',
  craneVessel: '/images/scenes/crane-vessel.webp',
  rigPipes: '/images/scenes/rig-pipes.webp',
  labBlue: '/images/scenes/lab-blue.webp',
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string; // chemical name / formula / type
  short: string;
  description: string;
  image: string;
  /** cutout = product shot on white/transparent, shown contained on a light tile */
  cutout?: boolean;
  specs?: string[];
};

export type Division = {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  verb: string; // used in "SOLUTIONS FOR HOW YOU ___"
  tagline: string;
  intro: string;
  image: string;
  highlights: string[];
  products: Product[];
};

export const divisions: Division[] = [
  {
    slug: 'chemicals',
    index: '01',
    name: 'Drilling, Completion & Production Chemicals',
    shortName: 'Oilfield Chemicals',
    verb: 'DRILL',
    tagline: 'Premium chemistry that keeps wells stable, fluids clean and production flowing.',
    intro:
      'Our drilling, completion and production chemicals are designed to optimise well performance, improve fluid stability and minimise operational risk. From high-performance drilling fluid additives to production-enhancing chemicals, every batch meets strict industry standards for smooth, cost-effective operations.',
    image: '/images/products/xylene.webp',
    highlights: ['High-purity, batch-tested supply', 'Bulk & sack quantities', 'Mud, completion & stimulation programs', 'Delivered to base or wellsite'],
    products: [
      {
        slug: 'xylene',
        name: 'Aromatic Solvents',
        subtitle: 'Xylene (C₈H₁₀)',
        short: 'Powerful solvent for degreasing, pipeline cleaning and crude flow efficiency.',
        description:
          'Boost your oil and gas operations with Xylene — a powerful solvent for degreasing, pipeline cleaning and improving crude oil flow. Maximise performance and minimise downtime with our high-purity Xylene solutions.',
        image: '/images/products/xylene.webp',
        specs: ['Paraffin & asphaltene removal', 'Pipeline & tank cleaning', 'Drums or ISO tanks'],
      },
      {
        slug: 'bentonite',
        name: 'Montmorillonite Clay',
        subtitle: 'Bentonite (Al₂O₃·4SiO₂·nH₂O)',
        short: 'A superior viscosifier for mud stability and fluid-loss control.',
        description:
          'Improve drilling efficiency with Bentonite — a superior viscosifier that improves mud stability, controls fluid loss and keeps drilling smooth. Trust our premium-grade Bentonite for reliable wellbore performance.',
        image: '/images/products/bentonite.webp',
        specs: ['API-grade viscosifier', 'Filter-cake & fluid-loss control', 'Jumbo bags or 50 kg sacks'],
      },
      {
        slug: 'baryte',
        name: 'Barium Sulphate',
        subtitle: 'Baryte (BaSO₄)',
        short: 'High-density weighting agent for well control and pressure management.',
        description:
          'Baryte is the industry-standard weighting agent for drilling fluids. It raises mud density to control formation pressures, prevent blowouts and stabilise the wellbore — supplied in consistent, high-specific-gravity grades.',
        image: '/images/products/baryte.webp',
        specs: ['Weighting agent (SG 4.1–4.2)', 'Pressure & well control', 'Bulk or 1 MT bags'],
      },
      {
        slug: 'salmiac',
        name: 'Salmiac',
        subtitle: 'Ammonium Chloride (NH₄Cl)',
        short: 'Key additive for well stimulation, scale removal and reservoir performance.',
        description:
          'Optimise well stimulation with Ammonium Chloride — a key additive for better drilling, scale removal and improved reservoir performance. Increase efficiency and maximise production with our high-purity solution.',
        image: '/images/products/salmiac.webp',
        specs: ['Clay stabilisation', 'Stimulation & workover fluids', '25 kg bags'],
      },
      {
        slug: 'soda-ash',
        name: 'Soda Ash',
        subtitle: 'Sodium Carbonate (Na₂CO₃)',
        short: 'Controls pH, reduces calcium build-up and improves mud stability.',
        description:
          'Improve drilling fluid performance with Soda Ash — essential for controlling pH, reducing calcium build-up and improving mud stability. Keep your operations efficient with our high-quality Soda Ash.',
        image: '/images/products/soda-ash.webp',
        specs: ['Calcium treatment', 'pH control', 'Dense & light grades'],
      },
      {
        slug: 'potassium-chloride',
        name: 'Potassium Chloride',
        subtitle: 'KCl',
        short: 'A vital shale stabiliser that prevents clay swelling.',
        description:
          'Improve your drilling operations with Potassium Chloride — a vital shale stabiliser that prevents clay swelling and protects wellbore integrity. Rely on our premium-grade KCl for efficient, trouble-free drilling.',
        image: '/images/products/potassium-chloride.webp',
        specs: ['Shale inhibition', 'Completion brines', 'Industrial & tech grades'],
      },
      {
        slug: 'degreaser',
        name: 'Grease Removers',
        subtitle: 'Industrial Degreasers',
        short: 'Cuts through tough oil and grease on equipment and pipelines.',
        description:
          'Cut through tough oil and grease with our industrial-strength degreaser — formulated for efficient equipment cleaning, pipeline maintenance and safer operations. Keep your assets running smoothly.',
        image: '/images/products/degreaser.webp',
        specs: ['Rig floor & deck cleaning', 'Equipment maintenance', 'IBC totes or drums'],
      },
    ],
  },
  {
    slug: 'iot-sensors',
    index: '02',
    name: 'IoT & Smart Sensors',
    shortName: 'IoT & Sensors',
    verb: 'MONITOR',
    tagline: 'Real-time data from the wellhead to the control room.',
    intro:
      'Our IoT and sensor technologies change how oilfields are monitored and automated. They provide real-time data on drilling conditions, equipment performance and environmental factors, so operators can make informed decisions that reduce downtime and improve safety — integrating seamlessly with your existing systems.',
    image: '/images/products/flow-meter.webp',
    highlights: ['Real-time telemetry', 'Hazardous-area rated hardware', 'Integrates with existing SCADA', 'Installation & calibration support'],
    products: [
      {
        slug: 'pressure-sensor',
        name: 'Pressure Sensors',
        subtitle: 'Oil & Fuel Pressure Sensor',
        short: 'Monitor wellhead, pipeline and tank pressure in real time.',
        description:
          'Improve safety and performance with advanced pressure sensors designed to monitor wellhead, pipeline and tank pressure. Real-time accuracy in harsh conditions helps reduce costs and prevent failures.',
        image: '/images/products/pressure-sensor.webp',
        cutout: true,
        specs: ['Wellhead, pipeline & tank', 'Harsh-environment housing', '4–20 mA / digital output'],
      },
      {
        slug: 'pt-sensor',
        name: 'Pressure & Temperature Sensor',
        subtitle: 'PT Sensor',
        short: '0.025% FS accuracy, −40°C to +180°C, rated to 15 kPSI.',
        description:
          'The PT Sensor delivers ultra-precise pressure and temperature monitoring with 0.025% FS accuracy, operating from −40°C to +180°C. Built for oil and gas, it withstands 15 kPSI and 3,000 m water depths for reliable, life-of-field performance.',
        image: '/images/products/pt-sensor.webp',
        cutout: true,
        specs: ['0.025% FS accuracy', '−40°C to +180°C', '15 kPSI · 3,000 m depth'],
      },
      {
        slug: 'flow-meter',
        name: 'Flow Meter Sensor',
        subtitle: 'Oil & Gas Flow Meter',
        short: 'Mass and volume flow for gas, liquid and multi-phase fluids.',
        description:
          'Our flow meters provide precise mass and volume measurement for gases, liquids and multi-phase fluids — optimising pipeline flow, refining and production monitoring while reducing losses and supporting compliance.',
        image: '/images/products/flow-meter.webp',
        cutout: true,
        specs: ['Gas, liquid & multi-phase', 'Custody-transfer accuracy', 'Local display + remote output'],
      },
      {
        slug: 'gas-sensor',
        name: 'Gas Sensor',
        subtitle: 'Oil Rig Gas Detectors',
        short: 'Bluetooth-enabled detectors for real-time hazardous-gas monitoring.',
        description:
          'Improve safety on oil rigs with Bluetooth-enabled gas detectors that let workers carry out maintenance from a smartphone. Smart connectivity reduces downtime and keeps hazardous environments monitored in real time.',
        image: '/images/products/gas-sensor.webp',
        cutout: true,
        specs: ['Bluetooth maintenance', 'Hazardous-area certified', 'Toxic & combustible gases'],
      },
      {
        slug: 'thermal-camera',
        name: 'Thermal Camera',
        subtitle: 'Infrared Thermography',
        short: 'Spot failures, leaks and hot spots before they escalate.',
        description:
          'Use infrared thermography to detect equipment failures, leaks and inefficiencies before they escalate. Non-invasive, real-time thermal imaging improves safety, asset integrity and operational efficiency.',
        image: '/images/products/thermal-camera.webp',
        cutout: true,
        specs: ['Non-contact inspection', 'Leak & hot-spot detection', 'Handheld, rugged'],
      },
      {
        slug: 'valve-sensor',
        name: 'Valve Sensor',
        subtitle: 'Emergency Shutdown Valve',
        short: 'Rapid-response ESD valves engineered for maximum safety.',
        description:
          'Protect your operations with high-performance Emergency Shutdown Valves — engineered for rapid response, maximum safety and reliability. Reduce risk, prevent hazards and meet industry standards.',
        image: '/images/products/valve-sensor.webp',
        cutout: true,
        specs: ['Fail-safe shutdown', 'Position feedback', 'SIL-ready configurations'],
      },
      {
        slug: 'vibration-sensor',
        name: 'Vibration Sensor',
        subtitle: 'Oil & Gas Vibration Sensor',
        short: 'Detect anomalies in rotating equipment before costly failures.',
        description:
          'Advanced vibration sensors detect anomalies before they become costly failures, with real-time monitoring and analytics that keep pumps, compressors and motors running smoothly.',
        image: '/images/products/vibration-sensor.webp',
        cutout: true,
        specs: ['Predictive maintenance', 'Pumps, compressors & motors', 'Continuous or wireless'],
      },
      {
        slug: 'corrosion-sensor',
        name: 'Corrosion Sensor',
        subtitle: 'Structural Health Monitoring',
        short: 'Identify corrosion early and extend asset life.',
        description:
          'Protect oil and gas infrastructure with corrosion sensors built for reliable structural health monitoring. Real-time data identifies corrosion early, improving safety and extending asset lifespan.',
        image: '/images/products/corrosion-sensor.webp',
        cutout: true,
        specs: ['Pipelines & vessels', 'Early-warning trends', 'Intrusive & non-intrusive'],
      },
      {
        slug: 'safety-monitor',
        name: 'Safety Monitor',
        subtitle: 'Wearable Safety Monitor',
        short: 'Wearables that detect gases, track vitals and send instant alerts.',
        description:
          'Wearable Safety Monitors built for demanding oil and gas conditions detect hazardous gases, track vital signs and send instant alerts to prevent accidents — keeping your workforce protected, compliant and connected.',
        image: '/images/products/safety-monitor.webp',
        specs: ['Gas + vital-sign tracking', 'Man-down & SOS alerts', 'Live crew dashboard'],
      },
      {
        slug: 'fire-suppression',
        name: 'Fire Suppression System',
        subtitle: 'Automatic Detection & Suppression',
        short: 'Detect, control and extinguish fires before they escalate.',
        description:
          'Cutting-edge fire suppression systems designed to detect, control and extinguish fires before they escalate. Engineered for extreme oil and gas conditions, they respond fast, reduce downtime and protect lives and assets.',
        image: '/images/products/fire-suppression.webp',
        specs: ['Engine rooms & skids', 'Automatic actuation', 'Supply, install & service'],
      },
    ],
  },
  {
    slug: 'marine',
    index: '03',
    name: 'Marine Consumables & Equipment Supply',
    shortName: 'Marine Supply',
    verb: 'SAIL',
    tagline: 'Everything your vessel needs for daily operations, on board when you need it.',
    intro:
      'We supply the essential operational items vessels rely on every day — PPE, hoses, valves, filters, lubricants, tools and other high-use consumables — so crews stay safe and vessels stay working.',
    image: '/images/products/marine-consumables.webp',
    highlights: ['PPE & safety gear', 'Hoses, valves & filters', 'Lubricants & paints', 'Hand & power tools'],
    products: [
      {
        slug: 'marine-consumables',
        name: 'Marine Consumables',
        subtitle: 'Lubricants, paints & deck stores',
        short: 'Oils, greases, paints, cleaning and deck stores for daily operations.',
        description:
          'Lubricants, greases, marine paints, cleaning chemicals and deck stores supplied in the quantities your vessel needs — consolidated into one delivery to the jetty or base.',
        image: '/images/products/marine-consumables.webp',
        cutout: true,
        specs: ['Engine & hydraulic oils', 'Paints & coatings', 'Deck & cabin stores'],
      },
      {
        slug: 'ppe',
        name: 'PPE & Safety Equipment',
        subtitle: 'Crew protection',
        short: 'Coveralls, boots, gloves, helmets, life jackets and more.',
        description:
          'Certified personal protective equipment for offshore and marine crews — from coveralls, boots and gloves to helmets, harnesses and life-saving appliances.',
        image: '/images/products/safety-monitor.webp',
        specs: ['Certified to standard', 'Sized crew kits', 'Fast replenishment'],
      },
      {
        slug: 'hoses-valves-filters',
        name: 'Hoses, Valves & Filters',
        subtitle: 'High-use mechanical consumables',
        short: 'Keep pumps, engines and pipework running.',
        description:
          'Hydraulic and transfer hoses, gate and ball valves, fuel, oil and air filters, gaskets and fittings — sourced to specification and delivered fast.',
        image: '/images/products/spare-parts-valves.webp',
        specs: ['OEM & equivalent', 'Made-to-spec hose assemblies', 'Gaskets & fittings'],
      },
    ],
  },
  {
    slug: 'spare-parts',
    index: '04',
    name: 'Maintenance Support & Spare Parts Sourcing',
    shortName: 'Spare Parts',
    verb: 'MAINTAIN',
    tagline: 'Critical parts, sourced fast — so vessels and plants spend less time down.',
    intro:
      'We help you source critical spare parts and coordinate maintenance requirements to minimise vessel and equipment downtime. Tell us the part number or send a photo — we find it, verify it and deliver it.',
    image: '/images/products/engine-parts.webp',
    highlights: ['Engine & pump spares', 'OEM part verification', 'Global sourcing network', 'Maintenance coordination'],
    products: [
      {
        slug: 'engine-parts',
        name: 'Engine Spare Parts',
        subtitle: 'Crankshafts, liners, bearings',
        short: 'Main and auxiliary engine spares for marine and industrial engines.',
        description:
          'Crankshafts, camshafts, cylinder liners, bearings, gaskets and overhaul kits for main and auxiliary engines — sourced from trusted manufacturers and verified against your part numbers.',
        image: '/images/products/engine-parts.webp',
        specs: ['Main & auxiliary engines', 'Overhaul kits', 'Part-number verified'],
      },
      {
        slug: 'pistons',
        name: 'Pistons & Rings',
        subtitle: 'Power-unit components',
        short: 'Pistons, rings, pins and liners for engine overhauls.',
        description:
          'Pistons, piston rings, gudgeon pins and liners for scheduled overhauls and emergency repairs, supplied as matched sets.',
        image: '/images/products/spare-parts-pistons.webp',
        specs: ['Matched sets', 'Emergency supply', 'Multiple engine makes'],
      },
      {
        slug: 'valve-spares',
        name: 'Valve & Pump Spares',
        subtitle: 'Fuel pumps, injectors, valve gear',
        short: 'Fuel-injection, valve gear and pump components.',
        description:
          'Fuel pumps, injectors, valve springs, seats and guides plus pump spares — keeping critical machinery on schedule.',
        image: '/images/products/spare-parts-valves.webp',
        specs: ['Fuel-injection parts', 'Valve gear', 'Pump overhaul kits'],
      },
    ],
  },
  {
    slug: 'equipment-leasing',
    index: '05',
    name: 'Oil & Gas Equipment Leasing',
    shortName: 'Equipment Leasing',
    verb: 'SCALE',
    tagline: 'Flexible access to the equipment you need — without the capital outlay.',
    intro:
      'Lease compressors, cryogenic tanks, vaporisers and high-pressure pumps on flexible terms. Scale up for a campaign, cover a breakdown or test a process without tying up capital.',
    image: '/images/scenes/rig-pipes.webp',
    highlights: ['Compressors', 'Cryogenic tanks', 'Vaporisers', 'High-pressure pumps'],
    products: [
      {
        slug: 'compressors',
        name: 'Compressors',
        subtitle: 'Air & gas compression',
        short: 'Portable and skid-mounted compressors for field operations.',
        description:
          'Portable and skid-mounted air and gas compressors for drilling, testing, pigging and utility service — available short or long term.',
        image: scenes.refineryPipes,
        specs: ['Short & long-term hire', 'Skid-mounted units', 'Maintenance included'],
      },
      {
        slug: 'cryogenic-tanks',
        name: 'Cryogenic Tanks & Vaporisers',
        subtitle: 'Liquid N₂ / CO₂ service',
        short: 'Storage and vaporisation for nitrogen and industrial gases.',
        description:
          'Cryogenic storage tanks and ambient or fired vaporisers for nitrogen purging, well services and industrial gas supply.',
        image: scenes.refineryNight,
        specs: ['Nitrogen & CO₂', 'Ambient & fired vaporisers', 'Delivered & commissioned'],
      },
      {
        slug: 'hp-pumps',
        name: 'High-Pressure Pumps',
        subtitle: 'Pressure testing & injection',
        short: 'For hydrotesting, chemical injection and well services.',
        description:
          'High-pressure pumps for hydrostatic testing, chemical injection and well-service operations, supplied with certified hoses and gauges.',
        image: scenes.rigSupplyShip,
        specs: ['Hydrotesting', 'Chemical injection', 'Certified hoses & gauges'],
      },
    ],
  },
];

export const allProducts = divisions.flatMap((d) => d.products.map((p) => ({ ...p, division: d.slug, divisionName: d.shortName })));

// Home: featured product carousel (mirrors the Vanity Pass perks slider)
export const featuredProducts = [
  'xylene', 'bentonite', 'pressure-sensor', 'gas-sensor', 'flow-meter', 'baryte', 'valve-sensor', 'engine-parts', 'thermal-camera', 'potassium-chloride',
].map((s) => allProducts.find((p) => p.slug === s)!);

// DUMMY — illustrative numbers, replace with real figures
export const stats = [
  { value: 25, suffix: '+', label: 'Products in stock or on call' },
  { value: 48, suffix: 'hr', label: 'Typical quote-to-dispatch for stocked items' },
  { value: 5, suffix: '', label: 'Service lines under one supplier' },
  { value: 24, suffix: '/7', label: 'WhatsApp & phone support' },
];

// DUMMY — fictional client names used as logo placeholders
export const clientLogos = [
  'Delta Offshore', 'Bonny Marine', 'Rivers Energy', 'Atlantic Drilling', 'Niger Basin Oil', 'Onne Logistics', 'Gulf Coast Services', 'Eko Petroleum',
  'Trans-Amadi Works', 'Coastline Vessels', 'Okrika Terminals', 'Forcados E&P',
];

export const audiences = [
  { word: 'drillers', image: scenes.oilWorker },
  { word: 'engineers', image: scenes.workerPortraitA },
  { word: 'vessel crews', image: scenes.craneVessel },
  { word: 'operators', image: scenes.workerPortraitB },
  { word: 'buyers', image: '/images/products/xylene.webp' },
];

// DUMMY testimonial
export const testimonial = {
  quote:
    'Camuh has become our one call for drilling chemicals and sensor spares. Quotes come back the same day, deliveries land at Onne on schedule, and their team actually understands the downhole problem we are trying to solve.',
  name: 'Operations Manager',
  role: 'Independent E&P operator, Rivers State',
};

export const reasons = [
  {
    title: 'Quality you can certify',
    body: 'Batch-tested chemicals, certified hardware and full documentation with every delivery — so your QA/QC and HSE teams can sign off quickly.',
    image: '/images/products/xylene.webp',
  },
  {
    title: 'Port Harcourt based, Delta-ready',
    body: 'Our Trans Amadi base puts us close to Onne, Bonny and the swamp and shallow-water fields — cutting lead times and logistics cost.',
    image: '/images/scenes/crane-vessel.webp',
  },
  {
    title: 'Engineers, not just suppliers',
    body: 'Technical support from selection to installation and calibration. We help you pick the right product the first time.',
    image: '/images/products/flow-meter.webp',
  },
];

export const steps = [
  { step: '01', title: 'Tell us what you need', body: 'Send a product list, part numbers, a photo or the problem — by form, email or WhatsApp.' },
  { step: '02', title: 'Get a clear quote', body: 'We confirm specs, availability and lead time, and send a priced quote — usually the same business day.' },
  { step: '03', title: 'We source & deliver', body: 'Approved orders are packed, documented and delivered to your base, jetty or wellsite.' },
  { step: '04', title: 'Ongoing support', body: 'Installation, calibration, re-orders and after-sales support from one dedicated contact.' },
];

export const faqs = [
  { q: 'Which areas do you deliver to?', a: 'We are based in Trans Amadi, Port Harcourt and deliver across Rivers, Bayelsa, Delta and Akwa Ibom — including Onne and Bonny — and can arrange delivery elsewhere in Nigeria on request.' },
  { q: 'How fast can I get a quote?', a: 'Most quotes go out the same business day. Complex or imported items may take 24–72 hours while we confirm specifications and lead time.' },
  { q: 'Do you supply small quantities?', a: 'Yes. We support everything from a single sensor or a few bags of chemical to full bulk and campaign supply.' },
  { q: 'Can you source a part if I only have a photo?', a: 'Often, yes. Send a photo of the part and its nameplate along with the equipment make and model, and our team will identify and verify it.' },
  { q: 'Do you provide installation and calibration for sensors?', a: 'Yes. Our technical team supports selection, installation, calibration and integration with your existing monitoring systems.' },
  { q: 'What documentation comes with deliveries?', a: 'Certificates of analysis or conformity, safety data sheets and delivery documentation are provided as applicable to each product.' },
];

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/request-a-quote', label: 'Request a Quote' },
];
