'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const CAPS = ['Strategy', 'Design', 'Development', 'AI', 'Launch', 'Maintenance'];

export default function HeroContent() {
  return (
    <motion.div className="hero-center" variants={container} initial="hidden" animate="show">
      <motion.span className="kicker" variants={item}>Product Studio · US / UK / EU / CA / Africa</motion.span>
      <motion.h1 variants={item}>
        Build Products <span className="em">Faster.</span> Launch <span className="em">Sooner.</span> Grow <span className="em">Quicker.</span>
      </motion.h1>
      <motion.p className="lead" variants={item}>
        We design, build, automate, and launch SaaS platforms, AI products, websites, MVPs, and internal tools for businesses worldwide.
      </motion.p>
      <motion.div className="hero-cta" variants={item}>
        <Link href="/contact" className="btn btn-primary">Book Free Strategy Call</Link>
        <Link href="/work" className="btn btn-ghost">View Our Work</Link>
      </motion.div>
      <motion.div className="cap-row" variants={item}>
        {CAPS.map((c) => <span className="cap" key={c}>{c}</span>)}
      </motion.div>
    </motion.div>
  );
}
