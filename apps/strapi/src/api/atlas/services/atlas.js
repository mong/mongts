"use strict";

/**
 * atlas service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::atlas.atlas");
