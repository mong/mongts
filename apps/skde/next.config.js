/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  // images: {
  //   loader: "custom",
  // },
  trailingSlash: true,
  reactStrictMode: true,

  // 1. Force Next.js to parse @mong component library
  transpilePackages: ["qmongjs", "@mong/material-ui"],

  experimental: {
    largePageDataBytes: 1024 * 1000,
  },

  // 2. Explicitly map next/image directly to app's local copy
  turbopack: {
    resolveAlias: {
      // '@tanstack/react-query': path.resolve(__dirname, './node_modules/@tanstack/react-query'),
      // 'next/image': path.resolve(__dirname, './node_modules/next/image.js')
    },
  },
};
