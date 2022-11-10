const withTM = require("next-transpile-modules")(["qmongjs"]);

module.exports = withTM({
  images: {
    loader: "custom",
  },
  trailingSlash: true,
  reactStrictMode: true,
});
