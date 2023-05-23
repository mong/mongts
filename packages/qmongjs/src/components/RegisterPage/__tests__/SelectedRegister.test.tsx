import { QueryParamProvider } from "use-query-params";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import opts from "../../../dev-tools/data/unitnames.json";
import { SelectedRegister } from "../SelectedRegister";
import { RegisterName } from "types";

import mockRouter from "next-router-mock";
import { NextAdapter } from "next-query-params";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import {
  useUnitNamesQuery,
  useSelectionYearsQuery,
  useIndicatorQuery,
} from "../../../helpers/hooks";
import { buildIndicator } from "../../../test/test_data/dataBuilder";
import { useRouter } from "next/router";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));
jest.mock("../../../helpers/hooks");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/hoftebrudd/[tab].js",
    "/[register]/[tab].js",
  ])
);
beforeEach(() => {
  mockRouter.setCurrentUrl("/hoftebrudd/sykehus");
});

const registerInfo: RegisterName[] = [
  {
    id: 1,
    rname: "hoftebrudd",
    full_name: "Nasjonalt hoftebruddregister",
    caregiver_data: 1,
    resident_data: 0,
    dg_data: 1,
    url: null,
    description: null,
  },
];
it("SelectedRegister renders correctly for a single registry", async () => {
  (useUnitNamesQuery as jest.Mock).mockReturnValue({
    data: {
      nestedUnitNames: [{ rhf: "Helse 1", hf: ["Helse 2"] }],
      opts_tu: [
        { label: "rhf", options: ["Helse 1"] },
        { label: "hf", options: ["Helse 2"] },
      ],
    },
    isLoading: false,
    error: false,
  });
  (useSelectionYearsQuery as jest.Mock).mockReturnValue({
    data: [2019, 2020, 2021, 2022],
    isLoading: false,
    error: false,
  });

  (useIndicatorQuery as jest.Mock).mockReturnValue({
    data: [buildIndicator({})],
    isLoading: false,
    error: false,
  });

  (useRouter as jest.Mock).mockReturnValue({
    query: { register: "hoftebrudd", tab: "sykehus" },
  });

  const queryClient = new QueryClient();

  const { container } = render(
    //    <QueryClientProvider client={queryClient}>
    <QueryParamProvider adapter={NextAdapter}>
      <SelectedRegister registerNames={registerInfo} />
    </QueryParamProvider>
    //    </QueryClientProvider>
  );

  //  expect(container).toMatchSnapshot();
});
