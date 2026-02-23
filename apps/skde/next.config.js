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
  async redirects() {
    return [
      {
        source: "/helseatlas-test/",
        destination: "https://analyser.skde.no/no/rapporter",
        permanent: false,
      },
      {
        source: "/helseatlas-test/en/",
        destination: "https://analyser.skde.no/en/rapporter",
        permanent: false,
      },
      {
        source: "/helseatlas-test/v2/:slug",
        destination: "https://analyser.skde.no/no/rapporter/:slug",
        permanent: false,
      },
      {
        source: "/helseatlas-test/en/v2/:slug",
        destination: "https://analyser.skde.no/en/rapporter/:slug",
        permanent: false,
      },
    ];
  }
};
