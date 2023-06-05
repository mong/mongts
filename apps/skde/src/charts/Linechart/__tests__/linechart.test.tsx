/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";

import { Linechart } from "..";
import { atlasData2 } from "../../../../test/test_data/data";

const barchartinfo = {
  type: "barchart",
  data: "qwerty",
  x: "year",
  y: "rate",
  label: "bohf",
  xLabel: {
    nb: "Antall med epilepsi pr. 1 000 innbyggere",
    en: "Number of epilepsy patients per 1,000 inhabitants",
  },
  yLabel: { nb: "Opptaksområder", en: "Referral areas" },
};

test("Standard linechart render", async () => {
  const { container } = render(
    <Linechart {...barchartinfo} data={atlasData2} lang="nb" />
  );
  expect(container).toMatchSnapshot();
});
