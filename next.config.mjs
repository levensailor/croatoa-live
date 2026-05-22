import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

/** Monorepo checkouts include a parent lockfile; trace from repo root when present. */
function resolveOutputFileTracingRoot() {
  const parentLock = path.join(appDir, "../../package-lock.json");
  if (fs.existsSync(parentLock)) {
    return path.resolve(appDir, "../..");
  }
  return appDir;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: resolveOutputFileTracingRoot(),
};

export default nextConfig;
