"use strict";

module.exports = {
  async find(ctx) {
    try {
      return await strapi
        .plugin("atlas-editor")
        .service("atlasEditorService")
        .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
