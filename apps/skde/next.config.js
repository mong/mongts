module.exports = {
  output: "export",
  images: {
    loader: "custom",
  },
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: [
    "qmongjs",
    "d3",
    "d3-scale",
    "@visx/scale",
    "@visx/xychart",
    "@visx/axis",
    "@visx",
  ],
  experimental: {
    esmExternals: "loose",
  },
};
