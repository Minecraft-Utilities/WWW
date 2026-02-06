import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mc.fascinated.cc", pathname: "/**" },
      { protocol: "https", hostname: "cdn.fascinated.cc", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/**" },
    ],
    // Allow images from hostnames that resolve to private IPs (e.g. mc.fascinated.cc -> 10.0.0.94).
    // Only enable if that upstream is trusted; it weakens SSRF protection.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
