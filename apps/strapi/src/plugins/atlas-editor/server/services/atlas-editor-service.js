"use strict";

const atlas = require("../../../../api/atlas/controllers/atlas");

const populateParams = {
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
};

const removeSensitiveData = (atlas) => {
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
};

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::atlas-editor.health-atlas",
      query,
    );
  },
  async findOne(id) {
    let atlas = await strapi.entityService.findOne(
      "plugin::atlas-editor.health-atlas",
      id,
      {
        populate: populateParams,
      },
    );

    atlas = removeSensitiveData(atlas);

    return atlas;
  },
  async update(ctx) {
    const atlas = ctx.request.body;
    const userInfo = ctx.state.user;
    const atlasCleaned = {
      id: atlas.id,
      isPublished: atlas.isPublished,
      mainTitle: atlas.mainTitle,
      shortTitle: atlas.shortTitle,
      frontPageText: atlas.frontPageText,
      updatedBy: userInfo.id,
    };

    let updateResult = await strapi.entityService.update(
      "plugin::atlas-editor.health-atlas",
      atlas.id,
      {
        populate: populateParams,
        data: atlasCleaned,
      },
    );

    updateResult = removeSensitiveData(updateResult);

    return updateResult;
  },
});
