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
  async findOne(ctx) {
    try {
      return await strapi
        .plugin("atlas-editor")
        .service("atlasEditorService")
        .findOne(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async update(ctx) {
    try {
      return await strapi
        .plugin("atlas-editor")
        .service("atlasEditorService")
        .update(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
