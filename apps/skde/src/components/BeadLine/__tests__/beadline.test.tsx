import React from "react";
import { render } from "@testing-library/react";
import BeadLine from "../.";
import { vi, describe, it, expect } from "vitest";
import { atlasData } from "../../../../test/test_data/data";
//import mockRouter from "next-router-mock";

// eslint-disable-next-line @typescript-eslint/no-require-imports
vi.mock("next/router", () => require("next-router-mock"));

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

describe("BeadLine component", () => {
  it("renders with valid boxData and lang", () => {
    const boxData = [
      { type: "barchart", xLabel: { nb: "test" }, yLabel: { nb: "Opptaksområder" }  },
      { type: "map", x: "xValue" },
      { type: "data", national: "Norge", data: atlasData },
    ];
    const lang = "nb";
    const { container } = render(<BeadLine boxData={boxData} lang={lang} />);
    expect(container).toMatchSnapshot();
  });

  it("throws error with invalid boxData (missing type property)", () => {
    const boxData = [{ x: "xValue", xLabel: { nb: "test" }, yLabel: { nb: "Opptaksområder" } }];
    const lang = "nb";
    expect(() =>
      render(<BeadLine boxData={boxData} lang={lang} />),
    ).toThrowError("Cannot read properties of undefined (reading 'x')");
  });

  it("throws error with invalid boxData (missing x property in map data)", () => {
    const boxData = [
      { type: "barchart", xLabel: { nb: "test" }, yLabel: { nb: "Opptaksområder" }  },
      { type: "map" },
      { type: "data", national: "nationalValue", data: [] },
    ];
    const lang = "nb";
    expect(() =>
      render(<BeadLine boxData={boxData} lang={lang} />),
    ).toThrowError("Cannot read properties of undefined (reading 'undefined')");
  });

  it("throws error with invalid boxData (missing national property in data)", () => {
    const boxData = [
      { type: "barchart", xLabel: { nb: "test" }, yLabel: { nb: "Opptaksområder" }  },
      { type: "map", x: "xValue" },
      { type: "data", data: [] },
    ];
    const lang = "nb";
    expect(() =>
      render(<BeadLine boxData={boxData} lang={lang} />),
    ).toThrowError("Cannot read properties of undefined (reading 'xValue')");
  });
});
