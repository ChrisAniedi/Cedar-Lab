/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Browsers auto-request /favicon.ico; serve our SVG favicon for it so it doesn't 404.
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/favicon.svg' }];
  },
};
export default nextConfig;
