export default function ensureValidLang(
  langString: string | null | undefined,
): "nb" | "nn" | "en" {
  if (langString === "nn" || langString === "en") {
    return langString;
  }
  return "nb"; // Default to Norwegian Bokmål if not "nn" or "en"
}
