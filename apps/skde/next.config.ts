import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ["qmongjs"],
  images: {
    loader: "custom",
  },
  output: "export",
  experimental: {
    largePageDataBytes: 1024 * 1000,
  },
};

export default nextConfig;
