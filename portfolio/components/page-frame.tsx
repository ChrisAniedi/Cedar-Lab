/**
 * The vertical side rails from the Figma frame (64px, #070707, 1px #212121 border).
 * Fixed so they frame every page; hidden on small screens where space is precious.
 */
export function PageFrame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 inset-x-0 z-40 hidden lg:block">
      <div className="absolute inset-y-0 left-0 w-16 border-r border-border bg-rail" />
      <div className="absolute inset-y-0 right-0 w-16 border-l border-border bg-rail" />
    </div>
  );
}

/** Content wrapper that sits between the rails with the design's 32px inner gutter. */
export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-24 ${className}`}>{children}</div>;
}
