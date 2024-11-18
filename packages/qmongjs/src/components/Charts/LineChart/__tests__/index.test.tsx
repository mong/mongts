/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Got to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Indicator } from "types";
import LineChart, { Props } from "..";
import { buildLevels } from "../../../../test/builders";
import { clockTick } from "../../../../test/clockTick";
import * as hooks from "../../../../helpers/hooks";
import { vi } from "vitest";
import { buildDescription } from "../../../IndicatorTable/chartrow/__tests__/chart.test";

vi.mock("../../../../helpers/hooks");

const descr = buildDescription({});

beforeEach(() => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  vi.spyOn(hooks, "useLegendItemPosition").mockReturnValue({ x: 0, y: 0 });
  vi.spyOn(hooks, "useTextWidth").mockReturnValue(15);
});

test("shows legend", async () => {
  const d1 = buildDataPoint({ unit_name: "Nasjonalt" });
  const d2 = buildDataPoint({ unit_name: "Ahus" });
  const props = buildProps({
    data: [d1, d2],
    description: descr,
    chartColours: ["#00263d", "#4F9A94"],
  });

  render(<LineChartWithRef {...props} />);

  //  await clockTick(1500);

  expect(screen.getByText("Nasjonalt")).toBeInTheDocument();
  expect(screen.getByText("Ahus")).toBeInTheDocument();
});

test("shows only one legend item per unit_name", async () => {
  const d1 = buildDataPoint({ unit_name: "Nasjonalt" });
  const d2 = buildDataPoint({ unit_name: "Nasjonalt" });
  const props = buildProps({
    data: [d1, d2],
    description: descr,
    chartColours: ["#00263d"],
  });

  render(<LineChartWithRef {...props} />);

  //  await clockTick(1500);

  expect(screen.getAllByText("Nasjonalt").length).toBe(1);
});

test("Render without levels @250px", async () => {
  const WIDTH = 250;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={false}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat={undefined}
      data={[
        buildDataPoint({
          unit_name: "a",
          var: 0.5,
          year: 2020,
        }),
        buildDataPoint({
          unit_name: "a",
          var: 0.15,
          year: 2019,
        }),
        buildDataPoint({
          unit_name: "a",
          var: 0.3,
          year: 2018,
        }),
        buildDataPoint({
          unit_name: "a",
          var: 0.1,
          year: 2017,
        }),
      ]}
      description={descr}
      chartColours={["#00263d"]}
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
    <LineChartWithRef
      showLevel={true}
      zoom={true}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat=",.0%"
      data={[
        buildDataPoint({
          unit_name: "test",
          var: 0.8513343,
          year: 2020,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.885,
          year: 2019,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.9532,
          year: 2018,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.724,
          year: 2017,
        }),
      ]}
      description={descr}
      chartColours={["#00263d"]}
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
    <LineChartWithRef
      showLevel={true}
      levels={[
        { level: "high", start: 0.2, end: 0 },
        { level: "mid", start: 0.4, end: 0.2 },
        { level: "low", start: 1, end: 0.4 },
      ]}
      tickformat=",.3f"
      lastCompleteYear={2019}
      data={[
        buildDataPoint({
          unit_name: "test",
          var: 0.513343,
          year: 2020,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.15,
          year: 2019,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.3532,
          year: 2018,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.124,
          year: 2017,
        }),
        buildDataPoint({
          unit_name: "test2",
          var: 0.13343,
          year: 2020,
        }),
        buildDataPoint({
          unit_name: "test2",
          var: 0.5,
          year: 2019,
        }),
        buildDataPoint({
          unit_name: "test2",
          var: 0.532,
          year: 2018,
        }),
        buildDataPoint({
          unit_name: "test2",
          var: 0.24,
          year: 2017,
        }),
      ]}
      description={descr}
      chartColours={["#00263d", "#4F9A94"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with nasjonalt", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={true}
      levels={[
        { level: "high", start: 0.2, end: 0 },
        { level: "mid", start: 0.4, end: 0.2 },
        { level: "low", start: 1, end: 0.4 },
      ]}
      tickformat=",.3f"
      lastCompleteYear={2019}
      data={[
        buildDataPoint({
          unit_name: "test",
          var: 0.513343,
          year: 2020,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.15,
          year: 2019,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.3532,
          year: 2018,
        }),
        buildDataPoint({
          unit_name: "test",
          var: 0.124,
          year: 2017,
        }),
        buildDataPoint({
          unit_name: "Nasjonalt",
          var: 0.13343,
          year: 2020,
        }),
        buildDataPoint({
          unit_name: "Nasjonalt",
          var: 0.5,
          year: 2019,
        }),
        buildDataPoint({
          unit_name: "Nasjonalt",
          var: 0.532,
          year: 2018,
        }),
        buildDataPoint({
          unit_name: "Nasjonalt",
          var: 0.24,
          year: 2017,
        }),
        buildDataPoint({
          unit_name: "atest2",
          var: 0.4143,
          year: 2020,
        }),
        buildDataPoint({
          unit_name: "atest2",
          var: 0.655,
          year: 2019,
        }),
        buildDataPoint({
          unit_name: "atest2",
          var: 0.4332,
          year: 2018,
        }),
        buildDataPoint({
          unit_name: "atest2",
          var: 0.1224,
          year: 2017,
        }),
      ]}
      description={descr}
      chartColours={["#00263d", "#4F9A94", "#90CAF9"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with many years", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={true}
      levels={[
        { level: "high", start: 0.2, end: 0 },
        { level: "mid", start: 0.4, end: 0.2 },
        { level: "low", start: 1, end: 0.4 },
      ]}
      tickformat=",.3f"
      lastCompleteYear={2019}
      data={[
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.31, year: 2015 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.32, year: 2016 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.33, year: 2017 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.34, year: 2018 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.35, year: 2019 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.36, year: 2020 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.37, year: 2021 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.38, year: 2022 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.39, year: 2023 }),
      ]}
      description={descr}
      chartColours={["#00263d"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with many years, ending with even", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={true}
      levels={[
        { level: "high", start: 0.2, end: 0 },
        { level: "mid", start: 0.4, end: 0.2 },
        { level: "low", start: 1, end: 0.4 },
      ]}
      tickformat=",.2f"
      lastCompleteYear={2019}
      data={[
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.31, year: 2013 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.31, year: 2014 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.31, year: 2015 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.32, year: 2016 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.33, year: 2017 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.34, year: 2018 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.35, year: 2019 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.36, year: 2020 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.37, year: 2021 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.38, year: 2022 }),
      ]}
      description={descr}
      chartColours={["#00263d"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with many years, including missing years", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={true}
      levels={[
        { level: "high", start: 0.2, end: 0 },
        { level: "mid", start: 0.4, end: 0.2 },
        { level: "low", start: 1, end: 0.4 },
      ]}
      tickformat=",.3f"
      lastCompleteYear={2019}
      data={[
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.31, year: 2015 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.32, year: 2016 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.33, year: 2018 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.34, year: 2020 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.35, year: 2021 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.36, year: 2022 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.37, year: 2023 }),
      ]}
      description={descr}
      chartColours={["#00263d"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with many years, including missing years", async () => {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={true}
      levels={[
        { level: "high", start: 0.2, end: 0 },
        { level: "mid", start: 0.4, end: 0.2 },
        { level: "low", start: 1, end: 0.4 },
      ]}
      tickformat=",.3f"
      lastCompleteYear={2022}
      data={[
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.31, year: 2015 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.32, year: 2016 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.33, year: 2018 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.34, year: 2020 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.35, year: 2021 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.36, year: 2022 }),
        buildDataPoint({ unit_name: "Nasjonalt", var: 0.37, year: 2023 }),
      ]}
      description={descr}
      chartColours={["#00263d"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

// Helpers
function LineChartWithRef(props: Omit<Props, "svgContainerRef">) {
  const ref = createRef<HTMLDivElement>();
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  vi.spyOn(hooks, "useLegendItemPosition").mockReturnValue({ x: 0, y: 0 });

  return <LineChart {...props} svgContainerRef={ref} />;
}

// Builders
function buildDataPoint(overrides: Partial<Indicator>): Indicator {
  return {
    year: Math.floor(
      Math.random() * 6 + 2015,
    ) /* Random year between 2015 and 2020 */,
    id: 1006,
    ind_id: "barnediabetes_hba1c_ge_9",
    unit_level: "nation",
    unit_name: "Nasjonalt",
    min_denominator: null,
    denominator: 2775,
    var: 0.1081,
    context: "caregiver",
    level_direction: 0,
    level_green: null,
    level_yellow: null,
    sformat: null,
    dg: null,
    include: 1,
    type: "andel",
    delivery_latest_update: new Date("October 13, 2014 11:13:00"),
    delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    ...overrides,
  };
}

function buildProps(overrides: Partial<Props>): Omit<Props, "svgContainerRef"> {
  return {
    data: [],
    levels: buildLevels(),
    showLevel: Math.random() < 0.5 /* Random true or false */,
    tickformat: undefined,
    ...overrides,
  };
}
