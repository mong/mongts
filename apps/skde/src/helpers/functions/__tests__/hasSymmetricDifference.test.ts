import { hasSymmetricDifference } from "../hasSymmetricDifference";
import { describe, it, expect } from "vitest";

describe("hasSymmetricDifference", () => {
  it("should return false for identical sets", () => {
    const setA = new Set(["a", "b", "c"]);
    const setB = new Set(["a", "b", "c"]);
    expect(hasSymmetricDifference(setA, setB)).toBe(false);
  });

  it("should return false for empty sets", () => {
    const setA = new Set<string>();
    const setB = new Set<string>();
    expect(hasSymmetricDifference(setA, setB)).toBe(false);
  });

  it("should return true when setA has extra elements", () => {
    const setA = new Set(["a", "b", "c"]);
    const setB = new Set(["a", "b"]);
    expect(hasSymmetricDifference(setA, setB)).toBe(true);
  });

  it("should return true when setB has extra elements", () => {
    const setA = new Set(["a", "b"]);
    const setB = new Set(["a", "b", "c"]);
    expect(hasSymmetricDifference(setA, setB)).toBe(true);
  });

  it("should return true when sets have different elements", () => {
    const setA = new Set(["a", "b"]);
    const setB = new Set(["b", "c"]);
    expect(hasSymmetricDifference(setA, setB)).toBe(true);
  });

  it("should return true when one set is empty and the other is not", () => {
    const setA = new Set(["a", "b"]);
    const setB = new Set<string>();
    expect(hasSymmetricDifference(setA, setB)).toBe(true);
  });
});
