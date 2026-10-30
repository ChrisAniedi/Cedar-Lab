import Image from 'next/image';
import { testimonial } from '@/lib/data';
import Reveal from '../Reveal';

export default function Testimonial() {
  return (
    <section className="bg-white py-24">
      <Reveal className="mx-auto max-w-[620px] px-5 text-center">
        <blockquote className="text-[clamp(1.05rem,1.6vw,1.2rem)] font-medium leading-[1.55]">&ldquo;{testimonial.quote}&rdquo;</blockquote>
        <p className="mt-7 text-[13px] leading-relaxed text-body">
          {testimonial.name},<br />{testimonial.role}
        </p>
        <Image src="/images/brand/camuh-logo.png" alt="Camuh Innovations Limited" width={500} height={219} className="mx-auto mt-8 h-auto w-[120px]" />
        <div className="mx-auto mt-10 h-px w-40 bg-black/15" />
        <p className="mt-10 text-[14px] text-body">Products sourced from trusted global manufacturers and delivered locally</p>
      </Reveal>
    </section>
  );
}
