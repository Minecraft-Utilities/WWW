import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://mc.fascinated.cc/**"),
      new URL("https://cdn.fascinated.cc/**"),
    ],
    // Allow images from hostnames that resolve to private IPs (e.g. mc.fascinated.cc -> 10.0.0.94).
    // Only enable if that upstream is trusted; it weakens SSRF protection.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
