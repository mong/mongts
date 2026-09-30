export function stringifyDataObject(data: Record<string, any>): string {
  const stringData = JSON.stringify(
    { ...data },
    (key, value) => (key === "chart" ? "[React element omitted]" : value),
    2,
  );
  return stringData;
}
