'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '@/lib/data';
import { Search } from '../Icons';

/** Pill-shaped quick-quote bar — the Camuh version of the Vanity Pass hotel search box. */
export default function QuoteBar({ products, division }: { products: Product[]; division: string }) {
  const router = useRouter();
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');
  const [location, setLocation] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ service: division });
    if (product) q.set('product', product);
    if (qty) q.set('qty', qty);
    if (location) q.set('location', location);
    router.push(`/request-a-quote?${q.toString()}`);
  };

  const field = 'min-w-0 bg-transparent text-[12px] text-ink placeholder:text-body focus:outline-none sm:text-[13px]';

  return (
    <form onSubmit={submit} className="flex w-full items-center gap-1 rounded-full bg-white p-1.5 pl-4 shadow-card" aria-label="Quick quote">
      <label className="sr-only" htmlFor={`qb-p-${division}`}>Product</label>
      <select id={`qb-p-${division}`} value={product} onChange={(e) => setProduct(e.target.value)} className={`${field} w-[34%] cursor-pointer appearance-none truncate`}>
        <option value="">Product or part</option>
        {products.map((p) => (<option key={p.slug} value={p.slug}>{p.name}</option>))}
      </select>
      <span className="h-5 w-px bg-black/15" />
      <label className="sr-only" htmlFor={`qb-q-${division}`}>Quantity</label>
      <input id={`qb-q-${division}`} value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Quantity" className={`${field} w-[22%] px-2`} />
      <span className="h-5 w-px bg-black/15" />
      <label className="sr-only" htmlFor={`qb-l-${division}`}>Delivery location</label>
      <input id={`qb-l-${division}`} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Deliver to…" className={`${field} w-[24%] px-2`} />
      <button type="submit" className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[12px] font-medium text-white transition hover:bg-[#222]">
        <Search width={15} height={15} /> Quote
      </button>
    </form>
  );
}
