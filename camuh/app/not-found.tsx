import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col justify-between bg-ink pb-8 pt-[90px] text-white">
      <p aria-hidden className="pl-3 font-display text-mega font-medium uppercase sm:pl-5">Off</p>
      <div className="mx-auto max-w-[420px] px-6 text-center">
        <h1 className="text-[28px] font-extrabold">This page has drifted off course.</h1>
        <p className="mt-3 text-white/70">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
        <Link href="/" className="btn-white btn-caps mt-8">Back to home</Link>
      </div>
      <p aria-hidden className="pr-3 text-right font-display text-mega font-medium uppercase sm:pr-5">Course</p>
    </section>
  );
}
