import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import fs from "fs";

import { Map } from "..";

import { atlasData } from "../../../../test/test_data/data";

jest.mock("next/router", () => require("next-router-mock"));

const mapDataPath = "public/helseatlas/data/kronikere.geojson";
const mapData = JSON.parse(fs.readFileSync(mapDataPath, "utf-8"));

test("Standard render", async () => {
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
