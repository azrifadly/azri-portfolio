import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hero portrait renders at quality 90; declare it so Next.js 16 doesn't warn/error.
    qualities: [75, 90],
  },
};

export default nextConfig;
