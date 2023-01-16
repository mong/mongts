import { render } from "@testing-library/react";
import { QueryParamProvider } from "use-query-params";

import { IndicatorRow } from "../";
import national_data from "../../../../test/test_data/national_data";
import description from "../../../../test/test_data/description";
import { NextAdapter } from "next-query-params";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

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

it("renders", () => {
  const data = national_data[1];
  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <table>
        <tbody>
          <IndicatorRow
            context={{ context: "caregiver", type: "ind" }}
            description={description[0]}
            indicatorData={[data]}
            treatmantYear={2019}
          />
        </tbody>
      </table>
    </QueryParamProvider>
  );
  expect(container).toMatchSnapshot();
});

it("renders 2", () => {
  const data = national_data[3];
  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <table>
        <tbody>
          <IndicatorRow
            context={{ context: "caregiver", type: "ind" }}
            description={description[1]}
            indicatorData={[data]}
            treatmantYear={2017}
          />
        </tbody>
      </table>
    </QueryParamProvider>
  );
  expect(container).toMatchSnapshot();
});
