import { company } from '@/lib/data';
import { WhatsApp } from './Icons';

export default function WhatsAppButton() {
  return (
    <a
      href={company.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Camuh on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-ink py-3 pl-3 pr-3 text-white shadow-card transition-all duration-300 hover:pr-5 sm:bottom-7 sm:right-7"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366] text-white">
        <WhatsApp width={18} height={18} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[160px]">
        Chat with us
      </span>
    </a>
  );
}
