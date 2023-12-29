module.exports = {
  kind: "collectionType",
  collectionName: "health_atlases",
  info: {
    singularName: "health-atlas",
    pluralName: "health-atlases",
    displayName: "Helseatlas",
  },
  options: {
    draftAndPublish: false,
    comment: "",
  },
  pluginOptions: {
    i18n: {
      localized: true,
    },
    "content-manager": {
      visible: true,
    },
    "content-type-builder": {
      visible: true,
    },
    timestamps: true,
    softDelete: false,
  },
  attributes: {
    isPublished: {
      type: "boolean",
      default: false,
    },
    publishedAt: {
      type: "datetime",
      default: null,
    },
    publishedBy: {
      type: "string",
      required: false,
    },
    mainTitle: {
      type: "string",
      required: true,
    },
    shortTitle: {
      type: "string",
      required: true,
    },
    frontPageText: {
      type: "text",
      required: true,
    },
  },
};
