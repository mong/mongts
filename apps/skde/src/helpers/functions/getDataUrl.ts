export default function getDataUrl(
  atlasParam: string | null,
  dataParam: string | null,
) {
  return dataParam && atlasParam
    ? `/helseatlas/data/${atlasParam}/${dataParam}.json`
    : null;
}
