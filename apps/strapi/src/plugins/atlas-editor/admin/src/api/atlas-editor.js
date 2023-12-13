import { getFetchClient } from "@strapi/helper-plugin";
import pluginId from "../pluginId";

export const getAtlases = async (query) => {
  const { get } = getFetchClient();
  const response = await get(`/${pluginId}?${query}`);
  return response.data;
};

export const getAtlas = async (id) => {
  const { get } = getFetchClient();
  const response = await get(`/${pluginId}/${id}`);
  return response.data;
};

const AtlasEditorRequests = {
  getAtlases,
  getAtlas,
};

export default AtlasEditorRequests;
