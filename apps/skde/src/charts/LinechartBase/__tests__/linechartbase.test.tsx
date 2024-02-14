import { render } from "@testing-library/react";

import LinechartBase from "..";
import { LineStyles } from "..";
import { linechartData } from "../../../../test/test_data/data";
import { vi, test, expect } from "vitest";

vi.mock("next/router", () => require("next-router-mock"));

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
      data={linechartData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
    />,
  );
  // container.children[0].children[0] is the legend
  // container.children[0].children[1] is the plot
  // It consists of 6 SVG elements: rect, path, path, path, g and g
  // These are the background, three lines, the x axis and the y axis.
  expect(container.children[0].children[1].childElementCount).toEqual(6);
});

test("Render with format and lang = en", () => {
  const { container } = render(
    <LinechartBase
      data={linechartData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      lang="en"
      format_y=",.2%"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with format and lang = nb", () => {
  const { container } = render(
    <LinechartBase
      data={linechartData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      lang="nb"
      format_y=",.0%"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with other format", () => {
  const { container } = render(
    <LinechartBase
      data={linechartData}
      width={800}
      height={400}
      lineStyles={lineStyles}
      font={font}
      yMin={0}
      yMax={25}
      format_y=",.2f"
    />,
  );
  expect(container).toMatchSnapshot();
});
