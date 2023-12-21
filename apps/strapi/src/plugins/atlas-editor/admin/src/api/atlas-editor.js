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

export const updateAtlas = async (atlas) => {
  let res = { updateSuccess: false, err: null, updatedContent: null };

  const { post } = getFetchClient(); // Using POST because Strapi updates are partial

  try {
    const response = await post(`/${pluginId}/${atlas.id}`, atlas);
    if (response.status == 200) {
      res.updateSuccess = true;
      res.updatedContent = response.data;
    }
  } catch (err) {
    console.log(err);
    res.err = err;
  }

  return res;
};

const AtlasEditorRequests = {
  getAtlases,
  getAtlas,
  updateAtlas,
};

export default AtlasEditorRequests;
