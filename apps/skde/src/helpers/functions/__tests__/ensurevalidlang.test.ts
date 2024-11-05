import ensureValidLang from "../ensureValidLang";
import { describe, it, expect } from "vitest";

describe("ensureValidLang", () => {
  it('returns "nn" for valid "nn" input', () => {
    expect(ensureValidLang("nn")).toBe("nn");
  });

  it('returns "en" for valid "en" input', () => {
    expect(ensureValidLang("en")).toBe("en");
  });

  it('returns "nb" for invalid language code input', () => {
    expect(ensureValidLang("fr")).toBe("nb");
  });

  it('returns "nb" for null input', () => {
    expect(ensureValidLang(null)).toBe("nb");
  });

  it('returns "nb" for undefined input', () => {
    expect(ensureValidLang(undefined)).toBe("nb");
  });

  it('returns "nb" for empty string input', () => {
    expect(ensureValidLang("")).toBe("nb");
  });
});
