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
    method: "GET",
    path: "/",
    handler: "atlasEditor.find",
    config: {
      policies: [],
      auth: false,
    },
  },
];
