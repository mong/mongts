import { getOrderComparator } from "../dataTransformation";
import { describe, it, expect } from "vitest";

describe("getOrderComparator", () => {
  it("should sort in ascending order by string key", () => {
    const data = [
      { name: "John", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Bob", age: 20 },
    ];
    const comparator = getOrderComparator("asc", "name", "string");
    const sortedData = data.sort(comparator);
    expect(sortedData).toEqual([
      { name: "Alice", age: 30 },
      { name: "Bob", age: 20 },
      { name: "John", age: 25 },
    ]);
  });

  it("should sort in descending order by string key", () => {
    const data = [
      { name: "John", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Bob", age: 20 },
    ];
    const comparator = getOrderComparator("desc", "name", "string");
    const sortedData = data.sort(comparator);
    expect(sortedData).toEqual([
      { name: "John", age: 25 },
      { name: "Bob", age: 20 },
      { name: "Alice", age: 30 },
    ]);
  });

  it("should sort in ascending order by number key", () => {
    const data = [
      { name: "John", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Bob", age: 20 },
    ];
    const comparator = getOrderComparator("asc", "age", "number");
    const sortedData = data.sort(comparator);
    expect(sortedData).toEqual([
      { name: "Bob", age: 20 },
      { name: "John", age: 25 },
      { name: "Alice", age: 30 },
    ]);
  });

  it("should sort in descending order by number key", () => {
    const data = [
      { name: "John", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Bob", age: 20 },
    ];
    const comparator = getOrderComparator("desc", "age", "number");
    const sortedData = data.sort(comparator);
    expect(sortedData).toEqual([
      { name: "Alice", age: 30 },
      { name: "John", age: 25 },
      { name: "Bob", age: 20 },
    ]);
  });
});
