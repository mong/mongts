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
      { type: "map", x: "xValue", xLabel: { nb: "test" } },
      { type: "data", national: "Norge", data: atlasData },
    ];
    const lang = "nb";
    const { container } = render(<BeadLine boxData={boxData} lang={lang} />);
    expect(container).toMatchSnapshot();
  });

  it("throws error with invalid boxData (missing type property)", () => {
    const boxData = [{ x: "xValue", xLabel: { nb: "test" } }];
    const lang = "nb";
    expect(() =>
      render(<BeadLine boxData={boxData} lang={lang} />),
    ).toThrowError("Cannot read properties of undefined (reading 'x')");
  });

  it("throws error with invalid boxData (missing x property in map data)", () => {
    const boxData = [
      { type: "map", xLabel: { nb: "test" } },
      { type: "data", national: "nationalValue", data: [] },
    ];
    const lang = "nb";
    expect(() =>
      render(<BeadLine boxData={boxData} lang={lang} />),
    ).toThrowError("Cannot read properties of undefined (reading 'bohf')");
  });

  it("throws error with invalid boxData (missing national property in data)", () => {
    const boxData = [
      { type: "map", x: "xValue", xLabel: { nb: "test" } },
      { type: "data", data: [] },
    ];
    const lang = "nb";
    expect(() =>
      render(<BeadLine boxData={boxData} lang={lang} />),
    ).toThrowError("Cannot read properties of undefined (reading 'bohf')");
  });
});