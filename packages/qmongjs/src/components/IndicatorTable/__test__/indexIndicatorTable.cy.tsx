import React from "react";
import IndicatorTable from "../index";

import { QueryParamProvider } from "use-query-params";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import opts from "../../../dev-tools/data/unitnames.json";
import { RegisterName } from "types";

import mockRouter from "next-router-mock";
import { NextAdapter } from "next-query-params";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import Router from "next/router";

describe("<MainRegister />", () => {
  context("stubbing out `useRouter` hook", () => {
    let router;

    beforeEach(() => {
      router = {
        back: cy.stub().as("routerBack"),
      };

      cy.stub(Router, "useRouter").returns(router);
    });

    //jest.mock("next/router", () => require("next-router-mock"));
    // This is needed for mocking 'next/link':
    //jest.mock("next/dist/client/router", () => require("next-router-mock"));

    mockRouter.useParser(
      createDynamicRouteParser([
        // These paths should match those found in the `/pages` folder:
        "/alle/[tab].js",
        "/[register]/[tab].js",
      ]),
    );
    beforeEach(() => {
      mockRouter.setCurrentUrl("/alle/sykehus");
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
    it("registry table renders correctly for a single registry", async () => {
      const props = {
        colspan: 2,
        selection_bar_height: 0,
        legend_height: 0,
        optstu: opts.opts_tu,
        unitNames: ["Nasjonalt"],
        registerNames: registerInfo,
        treatmentYear: 2019,
        medicalFieldFilter: ["hoftebrudd"],
      };
      const queryClient = new QueryClient();

      cy.mount(
        <QueryClientProvider client={queryClient}>
          <QueryParamProvider adapter={NextAdapter}>
            <IndicatorTable
              context={"sykehus"}
              tableType="singleRegister"
              {...props}
            />
          </QueryParamProvider>
        </QueryClientProvider>,
      );

      //  await waitFor(() => screen.findAllByText(props.unitNames[0]));
      //  expect(container).toMatchSnapshot();
    });
  });
});
