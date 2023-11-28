"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::atlas-editor.health-atlas",
      query,
    );
  },
});
