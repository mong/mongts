/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@mong/material-ui"],

  experimental: {
    largePageDataBytes: 1024 * 1000,
  },
};
