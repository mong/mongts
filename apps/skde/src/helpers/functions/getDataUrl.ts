/**
 * Given an atlasParam and dataParam, returns the URL of the data file
 * for the given atlas and data, or null if either param is null.
 *
 * @param {string|null} atlasParam The param for the atlas, e.g. "test_atlas"
 * @param {string|null} dataParam The param for the data, e.g. "test_data"
 * @returns {string|null} The URL of the data file, or null
 */
export default function getDataUrl(
  atlasParam: string | null,
  dataParam: string | null,
) {
  return dataParam && atlasParam
    ? `/helseatlas/data/${atlasParam}/${dataParam}.json`
    : null;
}
