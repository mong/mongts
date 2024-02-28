"use strict";

module.exports = [
  {
    method: "GET",
    path: "/:id",
    handler: "atlasEditor.findOne",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/:id",
    handler: "atlasEditor.update",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/",
    handler: "atlasEditor.find",
    config: {
      policies: [],
      auth: false,
    },
  },
];
