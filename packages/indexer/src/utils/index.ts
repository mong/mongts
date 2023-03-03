export function tryParseJSON(str: string) {
  try {
    return { parsed: JSON.parse(str) };
  } catch (e) {
    return { error: true };
  }
}
