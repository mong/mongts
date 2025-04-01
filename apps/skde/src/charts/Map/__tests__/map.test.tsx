/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import fs from "fs";

import { Map } from "..";

import { atlasData } from "../../../../test/test_data/data";

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

const mapDataPath = "public/helseatlas/kart/kart_2024.geojson";
const mapData = JSON.parse(fs.readFileSync(mapDataPath, "utf-8"));

test("Click on HF", async () => {
  const { container, getByTestId } = render(
    <Map
      data={atlasData}
      lang="nb"
      attrName="rateSnitt"
      mapData={mapData}
      jenks={[5.0, 5.2, 5.4]}
    />,
  );
  expect(container).toMatchSnapshot();
  expect(mockRouter.query).toEqual({});
  fireEvent.click(getByTestId("maparea_UNN"));
  expect(mockRouter.query).toEqual({ area: ["UNN"] });
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("maparea_UNN"));
  expect(mockRouter.query).toEqual({ area: [] });
  expect(container).toMatchSnapshot();
  // Click more HF
  fireEvent.click(getByTestId("maparea_UNN"));
  expect(mockRouter.query).toEqual({ area: ["UNN"] });
  fireEvent.click(getByTestId("maparea_Fonna"));
  expect(mockRouter.query).toEqual({ area: ["UNN", "Fonna"] });
  fireEvent.click(getByTestId("maparea_OUS"));
  expect(mockRouter.query).toEqual({ area: ["UNN", "Fonna", "OUS"] });
  fireEvent.click(getByTestId("maparea_Fonna"));
  expect(mockRouter.query).toEqual({ area: ["UNN", "OUS"] });
});

test("Standard render", async () => {
  mockRouter.push("");
  const { container } = render(
    <Map
      data={atlasData}
      lang="nb"
      attrName="rateSnitt"
      mapData={mapData}
      jenks={[5.0, 5.2, 5.4]}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with picked HF", async () => {
  mockRouter.push("/test_atlas/?area=UNN");
  const { container } = render(
    <Map
      data={atlasData}
      lang="en"
      attrName="rateSnitt"
      mapData={mapData}
      jenks={[5.0, 5.2, 5.4]}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with many picked HF", async () => {
  mockRouter.push("/test_atlas/?area=OUS&area=UNN&area=Fonna");
  const { container } = render(
    <Map
      data={atlasData}
      lang="nn"
      format=".2f"
      attrName="rateSnitt"
      mapData={mapData}
      jenks={[5.0, 5.2, 5.4]}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Format etc.", async () => {
  mockRouter.push("");
  const { container } = render(
    <Map
      data={atlasData}
      lang="nb"
      format=".0%"
      caption="Dette er en test"
      attrName="andel3_prim"
      mapData={mapData}
      jenks={[0.1, 0.13, 0.15]}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("With missing HF", async () => {
  mockRouter.push("");
  const newData = atlasData.filter((d) => d["area"] != "UNN");
  const { container, getByTestId } = render(
    <Map
      data={newData}
      lang="nb"
      format=".0%"
      caption="Dette er en test"
      attrName="andel3_prim"
      mapData={mapData}
      jenks={[0.1, 0.13, 0.15]}
    />,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("maparea_UNN"));
  expect(mockRouter.query).toEqual({ area: ["UNN"] });
  expect(container).toMatchSnapshot();
});
