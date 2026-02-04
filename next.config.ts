import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://mc.fascinated.cc/**")],
  },
};

export default nextConfig;
