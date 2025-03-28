import { Chart, ChartProps } from "../Chart";
import { render } from "@testing-library/react";
import { useRef } from "react";
import * as hooks from "../../../../helpers/hooks";
import { clockTick } from "../../../../test/clockTick";
import { Description, Indicator } from "types";
import { vi, test } from "vitest";

vi.mock("../../../../helpers/hooks");

const linedata = [
  buildDataPoint({
    year: 2019,
    var: 0.1081,
  }),
  buildDataPoint({
    year: 2018,
    var: 0.2081,
  }),
  buildDataPoint({
    year: 2017,
    var: 0.4081,
  }),
  buildDataPoint({
    year: 2016,
    var: 0.081,
  }),
  buildDataPoint({
    year: 2015,
    var: 0.981,
    ind_id: "something_else",
  }),
];

const bardata = [
  buildDataPoint({
    unit_name: "Sykehus 1",
    unit_level: "hospital",
    var: 0.2081,
  }),
  buildDataPoint({
    unit_name: "Sykehus 2",
    unit_level: "hospital",
    var: 0.4081,
  }),
  buildDataPoint({
    unit_name: "Sykehus 3",
    unit_level: "hospital",
    var: 0.1081,
  }),
  buildDataPoint({
    unit_name: "Sykehus 4",
    unit_level: "hospital",
    var: 0.3081,
  }),
  buildDataPoint({
    unit_name: "Sykehus 5",
    unit_level: "hospital",
    var: 0.5081,
  }),
  buildDataPoint({
    unit_name: "HF 1",
    unit_level: "hf",
    var: 0.999,
  }),
  buildDataPoint({
    unit_name: "RHF 1",
    unit_level: "rhf",
    var: 0.666,
  }),
  buildDataPoint({
    unit_name: "Nasjonalt",
    var: 0.3381,
  }),
];

const descr = buildDescription({});

test("Bar", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: bardata,
    isLoading: false,
    error: false,
  });
  const inddata = bardata.filter((data) => data.unit_name === "Nasjonalt");
  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="bar"
      zoom={true}
      showLevel={true}
      selectedTreatmentUnits={["Nasjonalt"]}
      indicatorData={inddata}
      chartColours={["#00263d"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Bar with level_direction eq 0", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: bardata,
    isLoading: false,
    error: false,
  });
  const descr = buildDescription({ level_direction: 0 });
  const inddata = bardata.filter((data) => data.unit_name === "Nasjonalt");
  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="bar"
      zoom={true}
      showLevel={true}
      selectedTreatmentUnits={["Nasjonalt"]}
      indicatorData={inddata}
      chartColours={["#00263d"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Bar select treatment unit", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: bardata,
    isLoading: false,
    error: false,
  });

  const inddata = bardata.filter((data) =>
    ["Nasjonalt", "Sykehus 1", "RHF 1"].includes(data.unit_name),
  );
  const descr = buildDescription({ sformat: ".0%" });
  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="bar"
      zoom={false}
      showLevel={false}
      selectedTreatmentUnits={["Nasjonalt", "Sykehus 1", "RHF 1"]}
      indicatorData={inddata}
      tickformat=".%"
      chartColours={["#00263d", "#4F9A94", "#90CAF9"]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Line", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: linedata,
    isLoading: false,
    error: false,
  });

  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="line"
      zoom={true}
      showLevel={true}
      selectedTreatmentUnits={[]}
      indicatorData={[]}
      chartColours={[]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Line, fetch with error", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: [],
    isLoading: false,
    error: true,
  });

  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="line"
      zoom={true}
      showLevel={true}
      selectedTreatmentUnits={[]}
      indicatorData={[]}
      chartColours={[]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Bar, fetch with error", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: [],
    isLoading: false,
    error: true,
  });

  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="bar"
      zoom={true}
      showLevel={true}
      selectedTreatmentUnits={[]}
      indicatorData={[]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Line, fetch is loading", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: [],
    isLoading: true,
    error: false,
  });

  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="line"
      zoom={true}
      showLevel={true}
      selectedTreatmentUnits={[]}
      indicatorData={[]}
      chartColours={[]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Bar, fetch is loading", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: [],
    isLoading: true,
    error: false,
  });

  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="bar"
      zoom={true}
      showLevel={true}
      selectedTreatmentUnits={[]}
      indicatorData={[]}
      chartColours={[]}
    />,
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

// Helpers
function ChartWithRef(
  props: Omit<
    ChartProps,
    "svgContainerRef" | "context" | "levels" | "treatmentYear"
  >,
) {
  const WIDTH = 500;
  vi.spyOn(hooks, "useResizeObserver").mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const context = { context: "test", type: "test2" };
  const levels = [
    { level: "high", start: 0.2, end: 0 },
    { level: "mid", start: 0.3, end: 0.2 },
    { level: "low", start: 1, end: 0.3 },
  ];

  const ref = useRef<HTMLDivElement>(null);
  vi.spyOn(hooks, "useLegendItemPosition").mockReturnValue({ x: 0, y: 0 });
  return (
    <Chart
      {...props}
      svgContainerRef={ref}
      context={context}
      levels={levels}
      treatmentYear={1999}
      description={descr}
    />
  );
}

// Builders
function buildDataPoint(overrides: Partial<Indicator>): Indicator {
  return {
    year: Math.floor(
      Math.random() * 6 + 2015,
    ) /* Random year between 2015 and 2020 */,
    id: 1006,
    ind_id: "testdata",
    unit_level: "nation",
    unit_name: "Nasjonalt",
    min_denominator: 10,
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

export function buildDescription(overrides: Partial<Description>): Description {
  return {
    id: "testdata",
    dg_id: null,
    include: 1,
    title: null,
    name: null,
    type: null,
    sformat: "",
    measure_unit: null,
    min_denominator: 5,
    min_value: null,
    max_value: null,
    level_green: null,
    level_yellow: null,
    level_direction: null,
    short_description: null,
    long_description: null,
    registry_id: 99,
    rname: null,
    full_name: "Norsk medisinsk kvalitetsregister for test",
    ...overrides,
  };
}
