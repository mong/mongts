"use strict";

/**
 * atlas router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::atlas.atlas");
