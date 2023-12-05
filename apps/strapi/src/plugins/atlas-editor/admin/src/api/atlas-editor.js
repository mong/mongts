import { request } from "@strapi/helper-plugin";

export const atlasEditorRequests = {
  getAllAtlases: async () => {
    return await request("/atlas-editor/find", {
      method: "GET",
    });
  },
};

export default atlasEditorRequests;
