import { validate } from "../validate";

test("When invalidStates is empty, then validate should return true", () => {
  const invalidStates = {};
  expect(validate(invalidStates)).toBe(true);
});

test("When invalidStates has only false values, then validate should return true", () => {
  const invalidStates = { a: false, b: false };
  expect(validate(invalidStates)).toBe(true);
});

test("When invalidStates has a single value, which is false, then validate should return true", () => {
  const invalidStates = { a: false };
  expect(validate(invalidStates)).toBe(true);
});

test("When invalidStates has only true values, then validate should return false", () => {
  const invalidStates = { a: true, b: true, c: true };
  expect(validate(invalidStates)).toBe(false);
});

test("When invalidStates has one true value and several false, then validate should return false", () => {
  const invalidStates = { a: false, b: true, c: false };
  expect(validate(invalidStates)).toBe(false);
});
