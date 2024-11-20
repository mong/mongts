import { describe, it, expect } from "vitest";
import {
  compareValues,
  removeMatchingDefaultValues,
} from "../useSearchParamsEquals";

describe("compareValues", () => {
  // Helper function to create URLSearchParams for testing
  const createSearchParams = (params: Record<string, string>) => {
    return new URLSearchParams(params);
  };

  it("should compare string values correctly", () => {
    const searchParams = createSearchParams({ name: "John" });
    const result = compareValues(["name"], { name: "John" }, searchParams);
    expect(result).toBe(true);

    const failResult = compareValues(["name"], { name: "Jane" }, searchParams);
    expect(failResult).toBe(false);
  });

  it("should compare number values correctly", () => {
    const searchParams = createSearchParams({ age: "25" });
    const result = compareValues(["age"], { age: 25 }, searchParams);
    expect(result).toBe(true);

    const failResult = compareValues(["age"], { age: 26 }, searchParams);
    expect(failResult).toBe(false);
  });

  it("should compare boolean values correctly", () => {
    const searchParams = createSearchParams({ isActive: "true" });
    const result = compareValues(
      ["isActive"],
      { isActive: true },
      searchParams,
    );
    expect(result).toBe(true);

    const failResult = compareValues(
      ["isActive"],
      { isActive: false },
      searchParams,
    );
    expect(failResult).toBe(false);
  });

  it("should compare string array values correctly", () => {
    const searchParams = createSearchParams({ tags: "red_blue_green" });
    const result = compareValues(
      ["tags"],
      { tags: ["red", "blue", "green"] },
      searchParams,
    );
    expect(result).toBe(true);

    const failResult = compareValues(
      ["tags"],
      { tags: ["red", "blue"] },
      searchParams,
    );
    expect(failResult).toBe(false);
  });

  it("should compare multiple keys correctly", () => {
    const searchParams = createSearchParams({
      name: "John",
      age: "25",
      isActive: "true",
      tags: "red_blue",
    });

    const result = compareValues(
      ["name", "age", "isActive", "tags"],
      {
        name: "John",
        age: 25,
        isActive: true,
        tags: ["red", "blue"],
      },
      searchParams,
    );
    expect(result).toBe(true);
  });

  it("should throw error for unsupported types", () => {
    const searchParams = createSearchParams({ data: "something" });
    expect(() =>
      compareValues(["data"], { data: { key: "value" } as any }, searchParams),
    ).toThrow("Unsupported type of parameter");
  });
});

describe("removeMatchingDefaultValues", () => {
  it("should remove keys with null or undefined values when not in queryParams", () => {
    const inputValues = { a: null, b: undefined, c: "keep" };
    const defaultValues = { a: "default", b: "default", c: "default" };
    const queryParamKeys = new Set(["c"]);

    removeMatchingDefaultValues(inputValues, defaultValues, queryParamKeys);

    expect(inputValues).toEqual({ c: "keep" });
  });

  it("should remove keys that match default values when not in queryParams", () => {
    const inputValues = { a: "test", b: "match", c: "keep" };
    const defaultValues = { a: "different", b: "match", c: "keep" };
    const queryParamKeys = new Set(["a", "c"]);

    removeMatchingDefaultValues(inputValues, defaultValues, queryParamKeys);

    expect(inputValues).toEqual({ a: "test", c: "keep" });
  });

  it("should handle array values correctly", () => {
    const inputValues = {
      arr1: ["a", "b"],
      arr2: ["x", "y"],
      arr3: ["1", "2"],
    };
    const defaultValues = {
      arr1: ["a", "b"],
      arr2: ["x", "z"],
      arr3: ["1", "2"],
    };
    const queryParamKeys = new Set(["arr2"]);

    removeMatchingDefaultValues(inputValues, defaultValues, queryParamKeys);

    expect(inputValues).toEqual({
      arr2: ["x", "y"],
    });
  });

  it("should not remove values that are present in queryParamKeys", () => {
    const inputValues = { a: "test", b: "match", c: ["1", "2"] };
    const defaultValues = { a: "test", b: "match", c: ["1", "2"] };
    const queryParamKeys = new Set(["a", "b", "c"]);

    removeMatchingDefaultValues(inputValues, defaultValues, queryParamKeys);

    expect(inputValues).toEqual({
      a: "test",
      b: "match",
      c: ["1", "2"],
    });
  });

  it("should handle mixed types correctly", () => {
    const inputValues = {
      str: "hello",
      num: 42,
      bool: true,
      arr: ["1", "2"],
      nullVal: null,
    };
    const defaultValues = {
      str: "hello",
      num: 42,
      bool: false,
      arr: ["1", "2"],
      nullVal: "default",
    };
    const queryParamKeys = new Set(["bool"]);

    removeMatchingDefaultValues(inputValues, defaultValues, queryParamKeys);

    expect(inputValues).toEqual({
      bool: true,
    });
  });
});
