import getSiblingFrames from "../getSiblingFrames";
import { describe, it, expect } from "vitest";

describe("getSiblingFrames", () => {
  it("returns an empty array when no window is provided", () => {
    expect(getSiblingFrames(undefined)).toEqual([]);
  });

  it("returns an empty array when window has no parent", () => {
    const window = { parent: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getSiblingFrames(window as any)).toEqual([]);
  });

  it("returns an empty array when window.parent has no frames", () => {
    const window = { parent: { frames: null } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getSiblingFrames(window as any)).toEqual([]);
  });

  it("returns an empty array when window is the top window", () => {
    const window = { parent: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).top = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getSiblingFrames(window as any)).toEqual([]);
  });

  it("returns an array of sibling frames when window has siblings", () => {
    const window = {
      parent: {
        frames: [{ name: "frame1" }, { name: "frame2" }, { name: "frame3" }],
      },
    };
    const expectedSiblings = [
      { name: "frame1" },
      { name: "frame2" },
      { name: "frame3" },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getSiblingFrames(window as any)).toEqual(expectedSiblings);
  });

  it("returns an empty array when window has no sibling frames", () => {
    const window = {
      parent: {
        frames: [{ name: "frame1" }],
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getSiblingFrames(window as any)).toEqual([{ name: "frame1" }]);
  });
});
