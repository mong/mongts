import { render } from "@testing-library/react";
import React from "react";
import { LinechartBase } from "..";
import { LineStyles } from "..";
import { vi, test, expect } from "vitest";

vi.mock("next/router", () => require("next-router-mock"));
vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    display: "swap",
  }),
}));

const linechartTestData = [
  [
    { x: new Date(2018, 0), y: 10 },
    { x: new Date(2019, 0), y: 15 },
    { x: new Date(2020, 0), y: 20 },
  ],
  [
    { x: new Date(2018, 0), y: 5 },
    { x: new Date(2019, 7), y: 15 },
    { x: new Date(2020, 0), y: 9 },
  ],
  [
    { x: new Date(2018, 0), y: 3 },
    { x: new Date(2019, 3), y: 15 },
    { x: new Date(2020, 0), y: 6 },
  ],
];

const lineStyles = new LineStyles(
  [
    { text: "Høy måloppnåelse", strokeDash: "0", colour: "#3BAA34" },
    { text: "Moderat måloppnåelse", strokeDash: "1 3", colour: "#FD9C00" },
    { text: "Lav måloppnåelse", strokeDash: "8 8", colour: "#E30713" },
  ],
  { fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 500 },
);

const font = {
  fontSize: 12,
  fontWeight: 700,
  fontFamily: "Plus Jakarta Sans",
};

test("Standard render", () => {
  const { container } = render(
    <LinechartBase
      data={linechartTestData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      yAxisText={"Andel"}
    />,
  );
  // container.children[0].children[0] is the legend
  // container.children[0].children[1].children[0] are the three line plots
  // It consists of 6 SVG elements: rect, path, path, path, g and g
  // These are the background, three lines, the x axis and the y axis.
  expect(
    container.children[0].children[1].children[0].children[0],
  ).toMatchSnapshot();
  expect(
    container.children[0].children[1].children[0].children[4],
  ).toMatchSnapshot();
  expect(
    container.children[0].children[1].children[0].children[5],
  ).toMatchSnapshot();

  expect(
    container.children[0].children[1].children[0].childElementCount,
  ).toEqual(6);
});

test("Render with format and lang = en", () => {
  const { container } = render(
    <LinechartBase
      data={linechartTestData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      lang="en"
      format_y=",.2%"
      yAxisText={"Andel"}
    />,
  );
  expect(
    container.children[0].children[1].children[0].children[5],
  ).toMatchSnapshot();

  expect(
    container.children[0].children[1].children[0].childElementCount,
  ).toEqual(6);
});

test("Render with format and lang = nb", () => {
  const { container } = render(
    <LinechartBase
      data={linechartTestData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      lang="nb"
      format_y=",.0%"
      yAxisText={"Andel"}
    />,
  );
  expect(
    container.children[0].children[1].children[0].children[5],
  ).toMatchSnapshot();
  expect(
    container.children[0].children[1].children[0].childElementCount,
  ).toEqual(6);
});

test("Render with other format", () => {
  const { container } = render(
    <LinechartBase
      data={linechartTestData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      format_y=",.4f"
      yAxisText={"Andel"}
    />,
  );
  expect(
    container.children[0].children[1].children[0].children[5],
  ).toMatchSnapshot();

  expect(
    container.children[0].children[1].children[0].childElementCount,
  ).toEqual(6);
});

// Children[0].children[1] should 3 rects and one Visx group
test("Render with background levelDirection one", () => {
  const { container } = render(
    <LinechartBase
      data={linechartTestData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      format_y=",.2f"
      levelGreen={15}
      levelYellow={10}
      levelDirection={1}
      yAxisText={"Andel"}
    />,
  );
  expect(container.children[0].children[1].children[0]).toMatchSnapshot();
  expect(container.children[0].children[1].children[1]).toMatchSnapshot();
  expect(container.children[0].children[1].children[2]).toMatchSnapshot();
  expect(container.children[0].children[1].childElementCount).toEqual(4);
});

test("Render with background levelDirection zero", () => {
  const { container } = render(
    <LinechartBase
      data={linechartTestData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      format_y=",.2f"
      levelGreen={10}
      levelYellow={15}
      levelDirection={0}
      yAxisText={"Andel"}
    />,
  );

  expect(container.children[0].children[1].children[0]).toMatchSnapshot();
  expect(container.children[0].children[1].children[1]).toMatchSnapshot();
  expect(container.children[0].children[1].children[2]).toMatchSnapshot();

  expect(container.children[0].children[1].childElementCount).toEqual(4);
});
