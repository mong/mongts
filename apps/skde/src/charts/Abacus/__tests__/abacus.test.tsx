/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";

import { Abacus } from "..";
import { atlasData } from "../../../../test/test_data/data";

jest.mock("next/router", () => require("next-router-mock"));

test("Standard render", async () => {
  const { container } = render(
    <Abacus data={atlasData} lang="nb" x="rateSnitt" national="Norge" />
  );
  expect(container).toMatchSnapshot();
});

test("Render with picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=UNN");
  const { container } = render(
    <Abacus data={atlasData} lang="nb" x="rateSnitt" national="Norge" />
  );
  expect(container).toMatchSnapshot();
});

test("Render with another national", async () => {
  mockRouter.push("/test_atlas");
  const { container } = render(
    <Abacus data={atlasData} lang="nb" x="rateSnitt" national="Finnmark" />
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
    />
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
    />
  );
  expect(container).toMatchSnapshot();
});
