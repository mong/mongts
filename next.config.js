module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/kvalitetsregistre",
        destination: "/kvalitetsregistre/alle/sykehus",
        permanent: true,
      },
    ];
  },
};
