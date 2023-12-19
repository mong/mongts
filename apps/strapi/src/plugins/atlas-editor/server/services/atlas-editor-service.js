"use strict";

const atlas = require("../../../../api/atlas/controllers/atlas");

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::atlas-editor.health-atlas",
      query,
    );
  },
  async findOne(id) {
    const atlas = await strapi.entityService.findOne(
      "plugin::atlas-editor.health-atlas",
      id,
      {
        populate: {
          id: true,
          isPublished: true,
          mainTitle: true,
          shortTitle: true,
          frontPageText: true,
          createdAt: true,
          updatedAt: true,
          locale: true,
          createdBy: true,
          updatedBy: true,
        },
      },
    );

    // Remove password hash, id, etc.
    if (atlas) {
      if (atlas?.createdBy)
        atlas.createdBy = {
          firstname: atlas.createdBy.firstname,
          lastname: atlas.createdBy.lastname,
        };

      if (atlas?.updatedBy)
        atlas.updatedBy = {
          firstname: atlas.updatedBy.firstname,
          lastname: atlas.updatedBy.lastname,
        };
    }

    return atlas;
  },
  async update(atlas) {
    const atlasCleaned = {
      id: atlas.id,
      isPublished: atlas.isPublished,
      mainTitle: atlas.mainTitle,
      shortTitle: atlas.shortTitle,
      frontPageText: atlas.frontPageText,
      updatedAt: new Date(),
    };

    return await strapi.entityService.update(
      "plugin::atlas-editor.health-atlas",
      atlas.id,
      { data: atlasCleaned },
    );
  },
});
