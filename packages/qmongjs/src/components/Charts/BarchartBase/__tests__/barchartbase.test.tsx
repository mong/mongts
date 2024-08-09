import React from "react";
import { render } from "@testing-library/react";
import { BarchartBase } from "..";
import { vi, test, expect } from "vitest";
import {
  IndicatorData,
  DataPoint,
} from "../../../IndicatorTable/IndicatortablebodyV2";

// eslint-disable-next-line @typescript-eslint/no-require-imports
vi.mock("next/router", () => require("next-router-mock"));
vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    display: "swap",
    style: {
      fontFamily: "Plus Jakarta Sans",
    },
  }),
}));

const barchartTestData = {
  indicatorID: "test",
  indicatorName: "Test",
  levelGreen: 0.8,
  levelYellow: 0.6,
  levelDirection: 1,
  minDenominator: 5,
  shortDescription: "Test",
  longDescription: "Test",
  sortingName: "test",
  data: [
    {
      unitName: "Tromsø",
      year: 2023,
      var: 0.65,
      denominator: 30,
      format: null,
      level_direction: 1,
      level_green: 0.8,
      level_yellow: 0.6,
      dg: null,
    },
    {
      unitName: "Bodø",
      year: 2023,
      var: 0.7,
      denominator: 30,
      format: null,
      level_direction: 1,
      level_green: 0.8,
      level_yellow: 0.6,
      dg: null,
    },
    {
      unitName: "Harstad",
      year: 2023,
      var: 0.8,
      denominator: 30,
      format: null,
      level_direction: 1,
      level_green: 0.8,
      level_yellow: 0.6,
      dg: null,
    },
  ] as DataPoint[],
} as IndicatorData;

test("Standard render", () => {
  const { container } = render(
    <BarchartBase
      indicatorData={barchartTestData}
      width={800}
      height={800}
      xTickFormat={",.0%"}
    />,
  );
  expect(container).toMatchSnapshot();
});
