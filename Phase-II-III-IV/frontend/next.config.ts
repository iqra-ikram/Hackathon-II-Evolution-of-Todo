import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// standalone output is only needed for Docker production builds.
// It conflicts with Turbopack's module resolution in dev mode.
if (!process.env.VERCEL && process.env.NODE_ENV === "production") {
  nextConfig.output = "standalone";
}

export default nextConfig;
