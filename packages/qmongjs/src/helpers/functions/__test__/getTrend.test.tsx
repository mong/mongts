import { DataPoint } from "types";
import { getTrend } from "../";

const point1: DataPoint = {
  id: 1,
  unitName: "Test unit",
  year: 2022,
  var: 0.5,
  denominator: 5,
  dg: 0.6,
  context: "caregiver",
  deliveryTime: new Date("1995-12-17T03:24:00"),
  affirmTime: new Date("1995-12-17T03:24:00"),
  indicatorID: "testind",
};

const point2: DataPoint = {
  id: 1,
  unitName: "Test unit",
  year: 2022,
  var: 0.6,
  denominator: 5,
  dg: 0.6,
  context: "caregiver",
  deliveryTime: new Date("1995-12-17T03:24:00"),
  affirmTime: new Date("1995-12-17T03:24:00"),
  indicatorID: "testind",
};

const point3 = null;

test("Unchanged trend with levelDirection 1", () => {
  const trend = getTrend(point1, point1, 1);
  expect(trend).to.equal(0);
});

test("Unchanged trend with levelDirection 0", () => {
  const trend = getTrend(point1, point1, 0);
  expect(trend).to.equal(0);
});

test("Increasing trend with levelDirection 1", () => {
  const trend = getTrend(point1, point2, 1);
  expect(trend).to.equal(1);
});

test("Decreasing trend with levelDirection 1", () => {
  const trend = getTrend(point2, point1, 1);
  expect(trend).to.equal(-1);
});

test("Increasing trend with levelDirection 0", () => {
  const trend = getTrend(point2, point1, 0);
  expect(trend).to.equal(1);
});

test("Decreasing trend with levelDirection 0", () => {
  const trend = getTrend(point1, point2, 0);
  expect(trend).to.equal(-1);
});

test("With null data point", () => {
  const trend = getTrend(point1, point3, 0);
  expect(trend).to.equal(null);
});

test("With null data point", () => {
  const trend = getTrend(point3, point1, 0);
  expect(trend).to.equal(null);
});

test("With null data point", () => {
  const trend = getTrend(point3, point3, 0);
  expect(trend).to.equal(null);
});
