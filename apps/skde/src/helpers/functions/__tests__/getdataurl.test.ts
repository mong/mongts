import { describe, it, expect } from "vitest";
import getDataUrl from "../getDataUrl";

describe("getDataUrl", () => {
  it("returns URL when both params are valid", () => {
    const atlasParam = "test_atlas";
    const dataParam = "test_data";
    const expectedUrl = "/helseatlas/data/test_atlas/test_data.json";
    expect(getDataUrl(atlasParam, dataParam)).toBe(expectedUrl);
  });

  it("returns null when atlasParam is null", () => {
    const atlasParam = null;
    const dataParam = "test_data";
    expect(getDataUrl(atlasParam, dataParam)).toBeNull();
  });

  it("returns null when dataParam is null", () => {
    const atlasParam = "test_atlas";
    const dataParam = null;
    expect(getDataUrl(atlasParam, dataParam)).toBeNull();
  });

  it("returns null when both params are null", () => {
    const atlasParam = null;
    const dataParam = null;
    expect(getDataUrl(atlasParam, dataParam)).toBeNull();
  });
});
