import { minYear, maxYear } from "../app_config";
import { test, expect } from "vitest";

test("Number of selectable years are 5", () => {
  expect(maxYear - minYear + 1).toBe(5);
});
