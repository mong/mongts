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

jest.mock("next/router", () => require("next-router-mock"));

const mapDataPath = "public/helseatlas/kart/kronikere.geojson";
const mapData = JSON.parse(fs.readFileSync(mapDataPath, "utf-8"));

test("Click on HF", async () => {
  const { container, getByTestId } = render(
    <Map
      mapAttr={atlasData}
      lang="nb"
      attrName="rateSnitt"
      mapData={mapData}
      classes={[5.0, 5.2, 5.4]}
    />
  );
  expect(container).toMatchSnapshot();
  expect(mockRouter.query).toEqual({});
  fireEvent.click(getByTestId("maphf_UNN"));
  expect(mockRouter.query).toEqual({ bohf: "UNN" });
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("maphf_UNN"));
  expect(mockRouter.query).toEqual({ bohf: [] });
  expect(container).toMatchSnapshot();
  // Click more HF
  fireEvent.click(getByTestId("maphf_UNN"));
  expect(mockRouter.query).toEqual({ bohf: "UNN" });
  fireEvent.click(getByTestId("maphf_Fonna"));
  expect(mockRouter.query).toEqual({ bohf: ["UNN", "Fonna"] });
  fireEvent.click(getByTestId("maphf_OUS"));
  expect(mockRouter.query).toEqual({ bohf: ["UNN", "Fonna", "OUS"] });
  fireEvent.click(getByTestId("maphf_Fonna"));
  expect(mockRouter.query).toEqual({ bohf: ["UNN", "OUS"] });
});

test("Standard render", async () => {
  mockRouter.push("");
  const { container } = render(
    <Map
      mapAttr={atlasData}
      lang="nb"
      attrName="rateSnitt"
      mapData={mapData}
      classes={[5.0, 5.2, 5.4]}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Render with picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=UNN");
  const { container } = render(
    <Map
      mapAttr={atlasData}
      lang="en"
      attrName="rateSnitt"
      mapData={mapData}
      classes={[5.0, 5.2, 5.4]}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Render with many picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=OUS&bohf=UNN&bohf=Fonna");
  const { container } = render(
    <Map
      mapAttr={atlasData}
      lang="nn"
      format=".2f"
      attrName="rateSnitt"
      mapData={mapData}
      classes={[5.0, 5.2, 5.4]}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Format etc.", async () => {
  mockRouter.push("");
  const { container } = render(
    <Map
      mapAttr={atlasData}
      lang="nb"
      format=".0%"
      caption="Dette er en test"
      attrName="andel3_prim"
      mapData={mapData}
      classes={[0.1, 0.13, 0.15]}
    />
  );
  expect(container).toMatchSnapshot();
});

test("With missing HF", async () => {
  mockRouter.push("");
  const newData = atlasData.filter((d) => d["bohf"] != "UNN");
  const { container, getByTestId } = render(
    <Map
      mapAttr={newData}
      lang="nb"
      format=".0%"
      caption="Dette er en test"
      attrName="andel3_prim"
      mapData={mapData}
      classes={[0.1, 0.13, 0.15]}
    />
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("maphf_UNN"));
  expect(mockRouter.query).toEqual({ bohf: "UNN" });
  expect(container).toMatchSnapshot();
});
