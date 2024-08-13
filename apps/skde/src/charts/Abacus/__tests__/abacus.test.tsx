/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";

import { Abacus } from "..";
import { atlasData } from "../../../../test/test_data/data";
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

test("Standard render", async () => {
  const { container } = render(
    <Abacus data={atlasData} lang="nb" x="rateSnitt" national="Norge" />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=UNN");
  const { container } = render(
    <Abacus data={atlasData} lang="nb" x="rateSnitt" national="Norge" />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with another national", async () => {
  mockRouter.push("/test_atlas");
  const { container } = render(
    <Abacus data={atlasData} lang="nb" x="rateSnitt" national="Finnmark" />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with many picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=OUS&bohf=UNN&bohf=Fonna");
  const { container } = render(
    <Abacus
      data={atlasData}
      lang="nb"
      x="rateSnitt"
      national="Norge"
      format=",.1f"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render english with many picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=OUS&bohf=UNN&bohf=Fonna");
  const { container } = render(
    <Abacus
      data={atlasData}
      lang="en"
      x="rateSnitt"
      national="Norge"
      format=",.1f"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Click on dots", async () => {
  mockRouter.push("/test_atlas/");
  const { container, getByTestId } = render(
    <Abacus
      data={atlasData}
      lang="nb"
      x="rateSnitt"
      national="Norge"
      format=",.1f"
    />,
  );
  fireEvent.click(getByTestId("circle_Finnmark_unselected"));
  expect(container).toMatchSnapshot();
  expect(mockRouter.query).toEqual({ bohf: ["Finnmark"] });
  fireEvent.click(getByTestId("circle_Finnmark_selected"));
  expect(mockRouter.query).toEqual({ bohf: [] });
  fireEvent.click(getByTestId("circle_OUS_unselected"));
  fireEvent.click(getByTestId("circle_UNN_unselected"));
  fireEvent.click(getByTestId("circle_Fonna_unselected"));
  expect(mockRouter.query).toEqual({ bohf: ["OUS", "UNN", "Fonna"] });
  expect(container).toMatchSnapshot();
});
