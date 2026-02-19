import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.fascinated.cc", port: "", pathname: "/**" },
      { protocol: "https", hostname: "mc.fascinated.cc", port: "", pathname: "/**" },
      { protocol: "https", hostname: "github.com", port: "", pathname: "/**" },
    ],
    qualities: [85, 100],
    formats: ["image/webp"],
    dangerouslyAllowLocalIP: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
