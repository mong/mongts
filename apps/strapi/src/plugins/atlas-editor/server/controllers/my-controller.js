"use strict";

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("atlas-editor")
      .service("myService")
      .getWelcomeMessage();
  },
});
