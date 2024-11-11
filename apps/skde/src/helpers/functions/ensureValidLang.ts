/**
 * Returns a valid language code ("nb", "nn", or "en") based on the given string.
 * If the given string is not "nn" or "en", "nb" is returned as the default.
 * @param langString - The string to be validated
 * @returns A valid language code as a string
 */
export default function ensureValidLang(
  langString: string | null | undefined,
): "nb" | "nn" | "en" {
  if (langString === "nn" || langString === "en") {
    return langString;
  }
  return "nb"; // Default to Norwegian Bokmål if not "nn" or "en"
}
