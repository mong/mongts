import { areDifferent, findDiff } from "../differences";

test("When objects are equal, then areDifferent should return false", () => {
  const a = { a: "a", b: "b" };
  const b = { a: "a", b: "b" };

  expect(areDifferent(a, b)).toBe(false);
});

test("When objects are unequal, then areDifferent should return true", () => {
  const a = { a: "a", b: "b" };
  const b = { a: "a", b: "c" };

  expect(areDifferent(a, b)).toBe(true);
});

test("When objects are equal, then findDiff should return empty object", () => {
  const a = { a: "a", b: "b" };
  const b = { a: "a", b: "b" };

  expect(findDiff(a, b)).toEqual({});
});

test("When objects are unequal, then findDiff should return object with differences", () => {
  const a = { a: "a", b: "b" };
  const b = { a: "a", b: "c" };
  console.log(findDiff(a, b));

  expect(findDiff(a, b)).toEqual({ b: { obj1: "b", obj2: "c" } });
});
