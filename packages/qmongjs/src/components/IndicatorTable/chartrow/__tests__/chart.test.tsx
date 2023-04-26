import Chart, { ChartProps } from "../Chart";
import { render } from "@testing-library/react";
import { useRef } from "react";
import {
  useIndicatorQuery,
  useLegendItemPosition,
  useResizeObserver,
} from "../../../../helpers/hooks";
import { clockTick } from "../../../../test/clockTick";
import { Description, Indicator } from "types";

jest.mock("../../../../helpers/hooks");

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
    unit_name: "Nasjonalt",
    var: 0.3381,
  }),
];

const descr = buildDescription({});

test("Bar", async () => {
  (useIndicatorQuery as jest.Mock).mockReturnValue({
    data: bardata,
    isLoading: false,
    error: false,
  });
  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="bar"
      zoom={true}
      showLevel={true}
      selectedTreatmentUnits={[]}
      indicatorData={bardata}
    />
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Bar select treatment unit", async () => {
  (useIndicatorQuery as jest.Mock).mockReturnValue({
    data: bardata,
    isLoading: false,
    error: false,
  });
  const descr = buildDescription({ sformat: ".0%" });
  const { container } = render(
    <ChartWithRef
      description={descr}
      chartType="bar"
      zoom={false}
      showLevel={false}
      selectedTreatmentUnits={["Sykehus 1"]}
      indicatorData={bardata}
      tickformat=".%"
    />
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Line", async () => {
  (useIndicatorQuery as jest.Mock).mockReturnValue({
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
      indicatorData={bardata}
    />
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

// Helpers
function ChartWithRef(
  props: Omit<
    ChartProps,
    "svgContainerRef" | "context" | "levels" | "treatmentYear"
  >
) {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
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
  (useLegendItemPosition as jest.Mock).mockReturnValue({ x: 0, y: 0 });
  return (
    <Chart
      {...props}
      svgContainerRef={ref}
      context={context}
      levels={levels}
      treatmentYear={1999}
    />
  );
}

// Builders
function buildDataPoint(overrides: Partial<Indicator>): Indicator {
  return {
    year: Math.floor(
      Math.random() * 6 + 2015
    ) /* Random year between 2015 and 2020 */,
    id: 1006,
    ind_id: "testdata",
    unit_level: "nation",
    unit_name: "Nasjonalt",
    min_denominator: 10,
    denominator: 2775,
    var: 0.1081,
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

function buildDescription(overrides: Partial<Description>): Description {
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
