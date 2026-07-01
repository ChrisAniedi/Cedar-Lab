import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Serve the /local-business landing page at the ROOT of a dedicated subdomain,
// so ads/outreach can point to e.g. https://sites.yourdomain.com instead of
// https://yourdomain.com/local-business.
//
// Setup (no code change needed):
//   1. In Vercel → Project → Settings → Domains, add your subdomain
//      (e.g. sites.thecedarlab.com) and follow the DNS instructions.
//   2. In Vercel → Settings → Environment Variables, add:
//        LANDING_HOST = sites.thecedarlab.com
//   3. Redeploy. The subdomain's homepage now shows the landing page,
//      while the main domain is completely unaffected.
//
// Until LANDING_HOST is set, this middleware is a no-op.
const LANDING_HOST = process.env.LANDING_HOST?.toLowerCase();

export function middleware(req: NextRequest) {
  if (!LANDING_HOST) return NextResponse.next();

  const hostname = (req.headers.get('host') || '').split(':')[0].toLowerCase();
  if (hostname === LANDING_HOST && req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/local-business', req.url));
  }
  return NextResponse.next();
}

// Only run on the homepage — keeps assets, /api, and every other route untouched.
export const config = { matcher: '/' };
