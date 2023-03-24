/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";

import { Barchart } from "..";

import { atlasData, barchartinfo } from "../../../../test/test_data/data";

jest.mock("next/router", () => require("next-router-mock"));

const testData: any = atlasData;

test("Standard render", async () => {
  const { container } = render(
    <Barchart
      {...barchartinfo}
      data={testData}
      lang="nb"
      national="Norge"
      format=".1f"
    />
  );
  expect(container).toMatchSnapshot();
});
