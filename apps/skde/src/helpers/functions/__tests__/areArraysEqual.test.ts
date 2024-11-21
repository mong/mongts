import { describe, it, expect } from "vitest";
import { areArraysEqual } from "../areArraysEqual";

describe("areArraysEqual", () => {
  it("returns true for two null arrays", () => {
    expect(areArraysEqual(null, null)).toBe(true);
  });

  it("returns true for two undefined arrays", () => {
    expect(areArraysEqual(undefined, undefined)).toBe(true);
  });

  it("returns false for null and undefined arrays", () => {
    expect(areArraysEqual(null, undefined)).toBe(false);
  });

  it("returns false if one array is null and the other is not", () => {
    expect(areArraysEqual(null, [1, 2, 3])).toBe(false);
  });

  it("returns false if one array is undefined and the other is not", () => {
    expect(areArraysEqual(undefined, [1, 2, 3])).toBe(false);
  });

  it("returns true for two empty arrays", () => {
    expect(areArraysEqual([], [])).toBe(true);
  });

  it("returns false for arrays of different lengths", () => {
    expect(areArraysEqual([1, 2, 3], [1, 2])).toBe(false);
  });

  it("returns true for arrays with the same elements in the same order", () => {
    expect(areArraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it("returns true for arrays with the same elements in a different order", () => {
    expect(areArraysEqual([3, 2, 1], [1, 2, 3])).toBe(true);
  });

  it("returns false for arrays with different elements", () => {
    expect(areArraysEqual([1, 2, 3], [4, 5, 6])).toBe(false);
  });

  it("works with string arrays", () => {
    expect(areArraysEqual(["a", "b", "c"], ["c", "b", "a"])).toBe(true);
  });

  it("works with boolean arrays", () => {
    expect(areArraysEqual([true, false], [false, true])).toBe(true);
  });

  it("returns false for mixed-type arrays with different types", () => {
    expect(areArraysEqual([1, "a", true], [1, "a", false])).toBe(false);
  });

  it("returns true for arrays with duplicate elements in different orders", () => {
    expect(areArraysEqual([1, 1, 2, 2], [2, 2, 1, 1])).toBe(true);
  });

  it("returns false if one array has duplicates but the other does not", () => {
    expect(areArraysEqual([1, 1, 2], [1, 2])).toBe(false);
  });
});
