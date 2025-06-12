/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";

import { DataTable } from "..";
import { atlasData, tableHeaders } from "../../../../test/test_data/data";

import { vi, test, expect } from "vitest";

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

// To avoid type-check error. Have to find a better way
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testHeaders: any = tableHeaders;

test("Standard render", async () => {
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="rateSnitt"
      national="Norge"
      areaType="area"
      headers={testHeaders}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Click in table", async () => {
  const { container, getByTestId } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="rateSnitt"
      national="OUS"
      areaType="area"
      headers={testHeaders}
    />,
  );
  expect(mockRouter.query).toEqual({});
  // Click national (in this case OUS) and nothing should happen
  fireEvent.click(getByTestId("tablerow_OUS"));
  expect(mockRouter.query).toEqual({});
  expect(container).toMatchSnapshot();
  // Click UNN
  fireEvent.click(getByTestId("tablerow_UNN"));
  expect(mockRouter.query).toEqual({ area: ["UNN"] });
  expect(container).toMatchSnapshot();
  // Ascending sort table by num of patients
  fireEvent.click(getByTestId("tablehead_pasienter"));
  expect(container).toMatchSnapshot();
  // Descending sort table by num of patients
  fireEvent.click(getByTestId("tablehead_pasienter"));
  expect(container).toMatchSnapshot();
  // Unclick UNN
  fireEvent.click(getByTestId("tablerow_UNN"));
  expect(mockRouter.query).toEqual({ area: [] });
  // Order by HF name
  fireEvent.click(getByTestId("tablehead_area"));
  expect(container).toMatchSnapshot();
  // Click more HF
  fireEvent.click(getByTestId("tablerow_UNN"));
  expect(mockRouter.query).toEqual({ area: ["UNN"] });
  fireEvent.click(getByTestId("tablerow_Fonna"));
  expect(mockRouter.query).toEqual({ area: ["UNN", "Fonna"] });
  fireEvent.click(getByTestId("tablerow_Norge"));
  expect(mockRouter.query).toEqual({
    area: ["UNN", "Fonna", "Norge"],
  });
  fireEvent.click(getByTestId("tablerow_Fonna"));
  expect(mockRouter.query).toEqual({ area: ["UNN", "Norge"] });
});

test("Render with picked HF", async () => {
  mockRouter.push("/test_atlas/?area=UNN");
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="rateSnitt"
      national="Norge"
      areaType="area"
      headers={testHeaders}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with another national", async () => {
  mockRouter.push("/test_atlas");
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="rateSnitt"
      national="Finnmark"
      areaType="area"
      headers={testHeaders}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with many picked HF", async () => {
  mockRouter.push(
    "/test_atlas/?area=OUS&area=UNN&area=Fonna",
  );
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="rateSnitt"
      national="Norge"
      areaType="area"
      headers={testHeaders}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render english with many picked HF", async () => {
  mockRouter.push(
    "/test_atlas/?area=OUS&area=UNN&area=Fonna",
  );
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="en"
      caption="rateSnitt"
      national="Norge"
      areaType="area"
      headers={testHeaders}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Markdown in caption", async () => {
  mockRouter.push(
    "/test_atlas/?area=OUS&area=UNN&area=Fonna",
  );
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="**Dette** er _litt_ tekst<br>og litt til, med en lenke til [Avisa](https://klassekampen.no/)."
      national="OUS"
      areaType="area"
      headers={testHeaders}
    />,
  );
  expect(container).toMatchSnapshot();
});
