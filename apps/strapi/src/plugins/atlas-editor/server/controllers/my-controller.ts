import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("atlas-editor")
      .service("myService")
      .getWelcomeMessage();
  },
});
