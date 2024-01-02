"use strict";

const atlas = require("../../../../api/atlas/controllers/atlas");

const populateParams = {
  id: true,
  mainTitle: true,
  shortTitle: true,
  frontPageText: true,
  frontPageImage: true,
  locale: true,
  isPublished: true,
  publishedAt: true,
  publishedBy: true,
  createdAt: true,
  createdBy: true,
  updatedAt: true,
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
    const atlasUpdate = ctx.request.body;
    const atlas = atlasUpdate.atlas;
    const userInfo = ctx.state.user;

    let atlasCleaned = {
      id: atlas.id,
      isPublished: atlas.isPublished,
      publishedAt: atlas.publishedAt,
      mainTitle: atlas.mainTitle,
      shortTitle: atlas.shortTitle,
      frontPageText: atlas.frontPageText,
      frontPageImage: atlas.frontPageImage,
      updatedBy: userInfo.id,
    };

    if (atlasUpdate.updatePublishedInfo) {
      atlasCleaned.publishedBy = `${userInfo.firstname} ${userInfo.lastname}`;
      atlasCleaned.publishedAt = new Date();
    }

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
