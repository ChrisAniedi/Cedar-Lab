import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import DivisionCards from '@/components/home/DivisionCards';
import BigStatement from '@/components/BigStatement';
import SourceShowcase from '@/components/home/SourceShowcase';
import SmartSense from '@/components/home/SmartSense';
import DeliveryCards from '@/components/home/DeliveryCards';
import ProductIndex from '@/components/home/ProductIndex';
import HowItWorks from '@/components/HowItWorks';
import Reasons from '@/components/home/Reasons';
import Clients from '@/components/home/Clients';
import Stats from '@/components/home/Stats';
import BuiltFor from '@/components/home/BuiltFor';
import Testimonial from '@/components/home/Testimonial';
import ContactStrip from '@/components/ContactStrip';
import CtaBand from '@/components/CtaBand';
import { scenes } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <Hero image={scenes.craneHero} />
      <Intro />
      <DivisionCards />

      <BigStatement
        top={['Solutions', 'For']}
        lead="Premium chemistry for every stage of"
        rotating={['Drilling', 'Completion', 'Production', 'Stimulation', 'Workover']}
        bottom={['How You', 'Drill']}
      />
      <SourceShowcase />

      <BigStatement
        top={['Solutions', 'For']}
        kicker="Introducing, Camuh SmartSense"
        bottom={['How You', 'Monitor']}
        image={scenes.refineryNight}
        imageAlt="Refinery lit up at night"
      />
      <SmartSense />

      <DeliveryCards />
      <ProductIndex />
      <HowItWorks tone="cream" />
      <Reasons />
      <Clients />

      <BigStatement
        top={['Solutions', 'For']}
        lead="Operators across the Niger Delta rely on Camuh to keep production flowing."
        bottom={['How You', 'Scale']}
      />
      <Stats />
      <BuiltFor />
      <Testimonial />
      <ContactStrip />
      <CtaBand />
    </>
  );
}
