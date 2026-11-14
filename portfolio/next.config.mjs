import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This app lives in a subfolder of a repo with its own lockfile; pin the root.
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
