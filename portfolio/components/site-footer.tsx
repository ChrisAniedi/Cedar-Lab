import Link from "next/link";

import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="lg:mx-16">
      <div className="flex flex-col items-center justify-between gap-4 px-5 py-8 text-[15px] tracking-[0.02em] text-stone sm:flex-row sm:px-8 lg:px-[66px]">
        <p>
          © {site.name} {new Date().getFullYear()} · All rights reserved
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {nav.map((n) => (
            <li key={n.label}>
              <Link
                href={n.href}
                {...("external" in n ? { target: "_blank", rel: "noreferrer" } : {})}
                className="transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
