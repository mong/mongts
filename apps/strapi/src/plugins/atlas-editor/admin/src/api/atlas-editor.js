import { request } from "@strapi/helper-plugin";

const atlasEditorRequest = {
  getAllAtlase: async () => {
    return await request("/atlas-editor/find", {
      method: "GET",
    });
  },
};
