/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Got to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */
import { render, screen } from "@testing-library/react";
import { useRef } from "react";
import BarChart, { Props, Bar } from "..";
import * as hooks from "../../../../helpers/hooks";
import { buildLevels } from "../../../../test/builders";
import { clockTick } from "../../../../test/clockTick";
import { buildDescription } from "../../../IndicatorTable/chartrow/__tests__/chart.test";
import { vi, test, expect } from "vitest";

vi.mock("../../../../helpers/hooks");

const descr = buildDescription({});

const testData1 = [
  { label: "a", value: 1, denominator: 10 },
  { label: "b", value: 0.15, denominator: 5 },
  { label: "c", value: 0.3, denominator: 11 },
  { label: "d", value: 0.1, denominator: 9 },
];

const testData2 = [
  { label: "a", value: 0.28965411, denominator: 1 },
  { label: "b", value: 0.111515, denominator: 5 },
  { label: "c", value: 0.3178612, denominator: 7 },
  { label: "d", value: 0.194212, denominator: 11 },
];

const testData3 = [
  { label: "a", value: 100, denominator: 20 },
  { label: "b", value: 150, denominator: 30 },
  { label: "c", value: 300, denominator: 15 },
  { label: "d", value: 100, denominator: 67 },
];

const testData4 = [
  { label: "a", value: 168, denominator: 10 },
  { label: "b", value: 155, denominator: 20 },
  { label: "c", value: 389, denominator: 30 },
  { label: "d", value: 561, denominator: 40 },
];

test("Bar have labels with value in %", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const data = testData1;

  render(
    <BarChartWithRef
      showLevel={true}
      data={data}
      levels={[
        { level: "high", start: 0.5, end: 0 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 1, end: 0.9 },
      ]}
      tickformat=".0%"
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  for (const dataPoint of data) {
    const bar = screen.getByTestId(`bar-label-${dataPoint.label}`);
    const valueInPct = Math.round((dataPoint.value * 100 * 100) / 100) + " %";
    expect(bar.textContent).toBe(valueInPct);
  }
});

test("Bar have labels with value as number", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const data = testData3;
  render(
    <BarChartWithRef
      showLevel={true}
      data={data}
      levels={[
        { level: "high", start: 500, end: 0 },
        { level: "mid", start: 900, end: 500 },
        { level: "low", start: 1000, end: 900 },
      ]}
      tickformat=".0f"
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  for (const dataPoint of data) {
    const bar = screen.getByTestId(`bar-label-${dataPoint.label}`);
    const valueInNum = dataPoint.value.toString();
    expect(bar.textContent).toBe(valueInNum);
  }
});

test("Level widths are correct", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const props = buildProps();

  render(
    <BarChartWithRef
      {...props}
      showLevel={true}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  for (const l of props.levels) {
    const level = screen.getByTestId(`level-${l.level}`);
    const levelX = level.getAttribute("x") ?? "";
    expect(parseFloat(levelX)).toBeCloseTo(l.end * WIDTH);
    const levelWidth = level.getAttribute("width") ?? "";
    expect(parseFloat(levelWidth)).toBeCloseTo(l.start * WIDTH - l.end * WIDTH);
  }
});

test("Can set color and opacity for bars", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const dataPoint1 = buildBar();
  const dataPoint2 = buildBar({ style: { color: "#00263D" } });
  const dataPoint3 = buildBar();
  const dataPoint4 = buildBar({
    style: { color: "#00263D", opacity: 0.5 },
  });

  const props = buildProps({
    data: [dataPoint1, dataPoint2, dataPoint3, dataPoint4],
  });

  render(
    <BarChartWithRef
      {...props}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  expect(
    screen.getByTestId(`bar-${dataPoint1.label}`).getAttribute("fill"),
  ).toEqual("#7EBEC7");

  expect(
    screen.getByTestId(`bar-${dataPoint2.label}`).getAttribute("fill"),
  ).toEqual(dataPoint2.style?.color);

  expect(
    screen.getByTestId(`bar-${dataPoint3.label}`).getAttribute("fill"),
  ).toEqual("#7EBEC7");

  expect(
    screen.getByTestId(`bar-${dataPoint4.label}`).getAttribute("fill"),
  ).toEqual(dataPoint4.style?.color);

  expect(
    screen.getByTestId(`bar-${dataPoint4.label}`).getAttribute("opacity"),
  ).toEqual(`${dataPoint4.style?.opacity}`);
});

test("Render without levels @250px", async () => {
  const WIDTH = 250;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChartWithRef
      showLevel={false}
      data={testData1}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat=".1%"
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render without zoom @750px", async () => {
  const WIDTH = 750;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChartWithRef
      showLevel={true}
      data={testData2}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat=".3%"
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with zoom @750px", async () => {
  const WIDTH = 750;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChartWithRef
      showLevel={true}
      data={testData2}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat=".2%"
      zoom={true}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with levels @250px", async () => {
  const WIDTH = 250;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChartWithRef
      showLevel={true}
      data={testData1}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat=".0%"
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render without levels @500px", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChartWithRef
      showLevel={false}
      data={testData1}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat=".2f"
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with levels @500px", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChartWithRef
      showLevel={true}
      data={testData1}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat={undefined} // test with default format
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with levels reversed @500px", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChartWithRef
      showLevel={true}
      data={testData1}
      levels={[
        { level: "high", start: 0.5, end: 0 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 1, end: 0.9 },
      ]}
      tickformat=".0%"
      zoom={true}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      description={descr}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render zoomed with levels @500px and gray overlay (not complete data)", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChartWithRef
      showLevel={true}
      data={testData4}
      levels={[
        { level: "high", start: 1000, end: 400 },
        { level: "mid", start: 400, end: 200 },
        { level: "low", start: 200, end: 0 },
      ]}
      tickformat="qwerty" // test with unsupported format
      zoom={true}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      lastCompleteYear={1979}
      description={descr}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

// Helpers
function BarChartWithRef(props: Omit<Props, "svgContainerRef">) {
  const ref = useRef<HTMLDivElement>(null);
  return <BarChart {...props} svgContainerRef={ref} description={descr} />;
}

// Builders
function buildBar(overrides?: Partial<Bar>): Bar {
  return {
    label: (Math.random() + 1)
      .toString(36)
      .substring(2) /* Convert random number to base 36 string */,
    value: Math.random(),
    ...overrides,
  };
}

function buildProps(
  overrides?: Partial<Props>,
): Omit<Props, "svgContainerRef"> {
  return {
    showLevel: Math.random() < 0.5 /* Random true or false */,
    data: Array.from({ length: Math.floor(Math.random() * 10 + 1) }, buildBar),
    levels: buildLevels(),
    tickformat: ",.0%",
    zoom: Math.random() < 0.5 /* Random true or false */,
    ...overrides,
  };
}
