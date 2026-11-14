import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Temporary placeholder for inner pages until they are built from Figma. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="grid min-h-dvh place-items-center px-6 pt-24 text-center lg:px-24">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">In progress</p>
        <h1 className="mt-4 text-5xl font-light tracking-[-0.05em] lg:text-7xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">This page is being rebuilt. Check back soon.</p>
        <Button asChild variant="secondary" className="mt-8">
          <Link href="/"><ArrowLeft /> Back home</Link>
        </Button>
      </div>
    </main>
  );
}
