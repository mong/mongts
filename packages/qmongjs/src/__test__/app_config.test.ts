import { minYear, maxYear, mainHospitals } from "../app_config";
import { test, expect } from "vitest";

test("Number of selectable years are 5", () => {
  expect(maxYear - minYear + 1).toBe(5);
});

test("mainHospitals is an array", () => {
  expect(Array.isArray(mainHospitals)).toBe(true);
});

test("mainHospitals is not empty", () => {
  expect(mainHospitals.length).toBeGreaterThan(0);
});

test("mainHospitals does not contain rubish", () => {
  expect(mainHospitals.includes("Porsgrunn")).toBe(false);
});
