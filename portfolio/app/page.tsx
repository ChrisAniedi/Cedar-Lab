import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { Projects } from "@/components/sections/projects";
import { Disciplines } from "@/components/sections/disciplines";
import { Impact } from "@/components/sections/impact";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LogoMarquee />
        <Projects />
        <Disciplines />
        <Impact />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
