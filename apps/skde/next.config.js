module.exports = {
  output: "export",
  images: {
    loader: "custom",
  },
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ["qmongjs"],
  experimental: {
    largePageDataBytes: 1024 * 1000,
  },
};
