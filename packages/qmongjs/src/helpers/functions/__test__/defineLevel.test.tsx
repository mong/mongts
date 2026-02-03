import { level } from "../.";
import { Indicator } from "types";
import { test, expect } from "vitest";

const indicator: Indicator = {
  id: 1,
  ind_id: "a",
  ind_title: "Title",
  unit_level: "a",
  unit_name: "a",
  year: 2,
  denominator: 2,
  min_denominator: null,
  var: 0.01,
  context: "caregiver",
  level_direction: 0,
  level_green: 0.05,
  level_yellow: 0.1,
  sformat: ",.0%",
  dg: null,
  include: 1,
  type: "a",
  delivery_latest_update: new Date("October 13, 2014 11:13:00"),
  delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
  registry_id: 1,
  registry_name: "Test registry",
  registry_full_name: "Test registry",
  registry_short_name: "Test registry",
  medfield_id: 1,
  medfield_name: "Test medical field",
  medfield_full_name: "Test medical field",
};

test("Returns correct level with direction 0", () => {
  expect(level(indicator)).toBe("H");
  indicator.var = 0.075;
  expect(level(indicator)).toBe("M");
  indicator.var = 0.11;
  expect(level(indicator)).toBe("L");
  indicator.var = 0.049;
  expect(level(indicator)).toBe("H");
});

test("Returns correct level with direction 1", () => {
  indicator.var = 0.01;
  indicator.level_direction = 1;
  indicator.level_green = 0.95;
  indicator.level_yellow = 0.8;
  expect(level(indicator)).toBe("L");
  indicator.var = 0.85;
  expect(level(indicator)).toBe("M");
  indicator.var = 0.79;
  expect(level(indicator)).toBe("L");
  indicator.var = 0.945;
  expect(level(indicator)).toBe("M");
});

test("Returns no level if direction is null", () => {
  indicator.var = 0.85;
  indicator.level_direction = null;
  indicator.level_green = 0.95;
  indicator.level_yellow = 0.8;
  expect(level(indicator)).toBe(undefined);
});

test("Returns no level if level_green is null", () => {
  indicator.var = 0.85;
  indicator.level_direction = 1;
  indicator.level_green = null;
  indicator.level_yellow = 0.8;
  expect(level(indicator)).toBe(undefined);
});

test("Use level_green for level_yellow if level_yellow is null", () => {
  indicator.var = 0.85;
  indicator.level_direction = 1;
  indicator.level_green = 0.95;
  indicator.level_yellow = null;
  expect(level(indicator)).toBe("L");
});
