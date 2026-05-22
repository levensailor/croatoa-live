import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // process.cwd() is the Vercel Root Directory; import.meta.url can be undefined in compiled config
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
