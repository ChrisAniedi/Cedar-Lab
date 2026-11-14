"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ease } from "@/components/motion";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  React.useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:px-16">
      <div
        className={cn(
          "relative mx-auto flex h-20 items-center justify-between border-b px-5 transition-[background-color,border-color,backdrop-filter] duration-500 sm:px-8 lg:h-24 lg:px-11",
          scrolled ? "border-border bg-background/70 backdrop-blur-xl" : "border-border/60 bg-transparent",
        )}
      >
        <div className="flex items-center gap-10 xl:gap-12">
          <Link href="/" aria-label={`${site.name} — home`} className="group shrink-0">
            <Image
              src="/images/logo-mark.svg"
              alt=""
              width={61}
              height={34}
              priority
              className="h-7 w-auto transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 lg:h-[34px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
            <ul className="flex items-center">
              {nav.map((item) => (
                <li key={item.label} className="relative">
                  <Link
                    href={item.href}
                    {...("external" in item ? { target: "_blank", rel: "noreferrer" } : {})}
                    onMouseEnter={() => setHovered(item.label)}
                    className="relative z-10 flex items-center gap-1 px-3.5 py-2 text-[17px] font-normal tracking-[0.02em] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                    {"external" in item && <ArrowUpRight className="size-3.5 opacity-60" />}
                  </Link>
                  {hovered === item.label && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm" className="hidden h-10 px-5 text-[15.75px] sm:inline-flex">
            <a href={`mailto:${site.email}`}>Contact me</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-20 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-5 pb-10 pt-6">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      {...("external" in item ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="flex items-baseline justify-between border-b border-border py-4 text-4xl font-light tracking-tight"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Button asChild size="lg">
                <a href={`mailto:${site.email}`}>Contact me</a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
