import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://mc.fascinated.cc/**"),
      new URL("https://cdn.fascinated.cc/**"),
    ],
  },
};

export default nextConfig;
