import { render } from "@testing-library/react";
import { QueryParamProvider } from "use-query-params";

import { IndicatorRow } from "../";
import { NextAdapter } from "next-query-params";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import {
  buildIndicator,
  buildDescription,
} from "../../../../test/test_data/dataBuilder";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/alle/[tab].js",
    "/[register]/[tab].js",
  ])
);
beforeEach(() => {
  mockRouter.setCurrentUrl("/alle/sykehus");
});

it("renders with low achievement level and not complete year", () => {
  const data = buildIndicator({
    denominator: 2775,
    var: 0.1081,
    level_direction: 0,
    level_green: 0.05,
    level_yellow: 0.1,
  });
  const descr = buildDescription({
    id: "barnediabetes_hba1c_ge_9",
    title: "HbA1c ≥ 9,0 %",
    short_description: "Andel pasienter med HbA1c > 9,0",
    rname: "barnediabetes",
  });
  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <table>
        <tbody>
          <IndicatorRow
            context={{ context: "caregiver", type: "ind" }}
            description={descr}
            indicatorData={[data]}
            treatmantYear={2019}
          />
        </tbody>
      </table>
    </QueryParamProvider>
  );
  expect(container).toMatchSnapshot();
});

it("renders with no achievement level on indicator", () => {
  const data = buildIndicator({
    denominator: 2676,
    var: 0.1988,
    level_direction: null,
    level_green: null,
    level_yellow: null,
  });
  const descr = buildDescription({
    id: "barnediabetes_hba1c_lt_7",
    title: "HbA1c < 7,0 %",
    short_description: "Andel pasienter med HbA1c < 7,0 %",
    rname: "barnediabetes",
    level_green: 0.4,
    level_yellow: 0.2,
    level_direction: 1,
  });
  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <table>
        <tbody>
          <IndicatorRow
            context={{ context: "caregiver", type: "ind" }}
            description={descr}
            indicatorData={[data]}
            treatmantYear={2017}
          />
        </tbody>
      </table>
    </QueryParamProvider>
  );
  expect(container).toMatchSnapshot();
});

it("renders with low N", () => {
  const data = buildIndicator({
    unit_name: "UNN",
    denominator: 6,
  });
  const descr = buildDescription({
    title: "qwerty",
    short_description: "Andel pasienter med qwerty",
    min_denominator: 10,
  });
  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <table>
        <tbody>
          <IndicatorRow
            context={{ context: "caregiver", type: "ind" }}
            description={descr}
            indicatorData={[data]}
            treatmantYear={2017}
            unitNames={["UNN"]}
          />
        </tbody>
      </table>
    </QueryParamProvider>
  );
  expect(container).toMatchSnapshot();
});

it("renders with low dg", () => {
  const data = buildIndicator({
    unit_name: "UNN",
    dg: 0.5,
  });
  const descr = buildDescription({
    title: "qwerty",
    short_description: "Andel pasienter med qwerty",
  });
  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <table>
        <tbody>
          <IndicatorRow
            context={{ context: "caregiver", type: "ind" }}
            description={descr}
            indicatorData={[data]}
            treatmantYear={2017}
            unitNames={["UNN"]}
          />
        </tbody>
      </table>
    </QueryParamProvider>
  );
  expect(container).toMatchSnapshot();
});

it("renders with missing data", () => {
  const data = buildIndicator({
    unit_name: "qwerty",
  });
  const descr = buildDescription({
    title: "qwerty",
    short_description: "Andel pasienter med qwerty",
  });
  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <table>
        <tbody>
          <IndicatorRow
            context={{ context: "caregiver", type: "ind" }}
            description={descr}
            indicatorData={[data]}
            treatmantYear={2017}
            unitNames={["UNN"]}
          />
        </tbody>
      </table>
    </QueryParamProvider>
  );
  expect(container).toMatchSnapshot();
});
