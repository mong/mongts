import type { NextConfig } from "next";

export const output = "export";
export const images = {
  loader: "custom",
};
export const trailingSlash = true;
export const reactStrictMode = true;
export const transpilePackages = ["qmongjs"];
export const nextConfig: NextConfig = {
  experimental: {
    largePageDataBytes: 512 * 1000,
  },
};
