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
    ],
    qualities: [80, 100],
    formats: ["image/webp"],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
