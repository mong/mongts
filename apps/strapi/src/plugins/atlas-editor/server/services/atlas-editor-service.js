"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::atlas-editor.health-atlas",
      query,
    );
  },
  async findOne(id) {
    return await strapi.entityService.findOne(
      "plugin::atlas-editor.health-atlas",
      id,
    );
  },
  async update(atlas) {
    return await strapi.entityService.update(
      "plugin::atlas-editor.health-atlas",
      atlas.id,
      { data: atlas },
    );
  },
});
