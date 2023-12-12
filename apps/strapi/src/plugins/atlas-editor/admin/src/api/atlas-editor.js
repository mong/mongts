import { request } from "@strapi/helper-plugin";

export const atlasEditorRequests = {
  getAtlases: async (query) => {
    return await request(`/atlas-editor/find?${query}`, {
      method: "GET",
    });
  },
};

export default atlasEditorRequests;
