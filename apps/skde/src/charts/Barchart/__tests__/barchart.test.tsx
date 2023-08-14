/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";

import { Barchart } from "..";
import { atlasData } from "../../../../test/test_data/data";

jest.mock("next/router", () => require("next-router-mock"));

const barchartinfo = {
  type: "barchart",
  data: "qwerty",
  x: ["rateSnitt"],
  y: "bohf",
  xLabel: {
    nb: "Antall med epilepsi pr. 1 000 innbyggere",
    en: "Number of epilepsy patients per 1,000 inhabitants",
  },
  yLabel: { nb: "Opptaksområder", en: "Referral areas" },
  annualVar: ["rate2019", "rate2020", "rate2021"],
  annualVarLabels: {
    nb: ["2019", "2020", "2021"],
    en: ["2019", "2020", "2021"],
  },
};

test("Standard render", async () => {
  const { container } = render(
    <Barchart
      {...barchartinfo}
      data={atlasData}
      lang="nb"
      national="Norge"
      format=".1f"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("English render", async () => {
  const { container } = render(
    <Barchart
      {...barchartinfo}
      data={atlasData}
      lang="en"
      national="Norge"
      format=".1f"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Click in table", async () => {
  const { container, getByTestId } = render(
    <Barchart
      {...barchartinfo}
      data={atlasData}
      lang="nb"
      national="OUS"
      format=".1f"
    />,
  );
  expect(mockRouter.query).toEqual({});
  // Click national (in this case OUS) and nothing should happen
  fireEvent.click(getByTestId("rect_OUS_unselected"));
  expect(mockRouter.query).toEqual({});
  expect(container).toMatchSnapshot();
  // Click UNN
  fireEvent.click(getByTestId("rect_UNN_unselected"));
  expect(mockRouter.query).toEqual({ bohf: "UNN" });
  expect(container).toMatchSnapshot();
  // Unclick UNN
  fireEvent.click(getByTestId("rect_UNN_selected"));
  expect(mockRouter.query).toEqual({ bohf: [] });
  // Click more HF
  fireEvent.click(getByTestId("rect_UNN_unselected"));
  expect(mockRouter.query).toEqual({ bohf: "UNN" });
  fireEvent.click(getByTestId("rect_Fonna_unselected"));
  expect(mockRouter.query).toEqual({ bohf: ["UNN", "Fonna"] });
  fireEvent.click(getByTestId("rect_Norge_unselected"));
  expect(mockRouter.query).toEqual({ bohf: ["UNN", "Fonna", "Norge"] });
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("rect_Fonna_selected"));
  expect(mockRouter.query).toEqual({ bohf: ["UNN", "Norge"] });
  expect(container).toMatchSnapshot();
});

test("Render with picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=UNN");
  const { container } = render(
    <Barchart
      {...barchartinfo}
      data={atlasData}
      lang="nb"
      national="Norge"
      format=".1f"
    />,
  );
  expect(container).toMatchSnapshot();
});

const barchartinfo2 = {
  type: "barchart",
  data: "qwerty",
  x: ["spes_rate", "overlapp_rate", "prim_rate"],
  y: "bohf",
  xLegend: {
    nb: [
      "Kun spes.helsetj.",
      "Allmennlege og spes.helsetj.",
      "Kun allmennlegetj.",
    ],
    nn: ["Specialist only", "GP and specialist", "GP only"],
  },
  xLabel: {
    nb: "Antall med epilepsi pr. 1 000 innbyggere",
    nn: "Number of epilepsy patients per 1,000 inhabitants",
  },
  yLabel: { nb: "Opptaksområder", nn: "Referral areas" },
};

test("Render with split figure", async () => {
  mockRouter.push("");
  const { container } = render(
    <Barchart
      {...barchartinfo2}
      data={atlasData}
      lang="nn"
      national="Norge"
      format=".1f"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with language not in file, picked HF and split figure", async () => {
  mockRouter.push("/test_atlas/?bohf=UNN");
  const { container } = render(
    <Barchart
      {...barchartinfo2}
      data={atlasData}
      lang="en"
      national="Norge"
      format=".2f"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with figure split in two", async () => {
  const tmp_info = barchartinfo2;
  tmp_info["x"] = ["spes_rate", "prim_rate"];
  mockRouter.push("");
  const { container, getAllByTestId } = render(
    <Barchart
      {...tmp_info}
      data={atlasData}
      lang="nn"
      national="Norge"
      format=".1f"
    />,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getAllByTestId("rect_UNN_unselected")[1]);
  expect(mockRouter.query).toEqual({ bohf: "UNN" });
  fireEvent.click(getAllByTestId("rect_Fonna_unselected")[0]);
  expect(mockRouter.query).toEqual({ bohf: ["UNN", "Fonna"] });
  expect(container).toMatchSnapshot();
});

const barchartinfo3 = {
  type: "barchart",
  data: "qwerty",
  x: ["andel3_prim"],
  y: "bohf",
  yLabel: { nb: "qwerty", nn: "Referral areas" },
  xLabel: { nb: "qwerty", nn: "Referral areas" },
};

test("Render with very little info", async () => {
  mockRouter.push("");
  const { container } = render(
    <Barchart
      {...barchartinfo3}
      data={atlasData}
      lang="en"
      national="Norge"
      format=".0%"
    />,
  );
  expect(container).toMatchSnapshot();
});

const barchartinfo4 = {
  type: "barchart",
  data: "qwerty",
  x: ["spes_rate"],
  y: "bohf",
  yLabel: { en: "qwerty", nn: "Referral areas" },
  xLabel: { en: "qwerty", nn: "Referral areas" },
  annualVar: ["rate2019", "rate2020", "rate2021"],
  annualVarLabels: {
    nb: ["2019", "2020", "2021"],
  },
};

test("Render with very little info 2", async () => {
  mockRouter.push("");
  const { container } = render(
    <Barchart
      {...barchartinfo4}
      data={atlasData}
      lang="nb"
      national="Norge"
      format=",.0f"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Render with empty string on format", async () => {
  mockRouter.push("");
  const { container } = render(
    <Barchart
      {...barchartinfo4}
      data={atlasData}
      lang="nb"
      national="Norge"
      format=""
    />,
  );
  expect(container).toMatchSnapshot();
});

const barchartinfo5 = {
  type: "barchart",
  data: "qwerty",
  x: ["rate2020"],
  y: "rate2019",
  yLabel: { en: "qwerty", nn: "Referral areas" },
  xLabel: { en: "qwerty", nn: "Referral areas" },
};

test("Render with other y (will look bad)", async () => {
  mockRouter.push("");
  const { container } = render(
    <Barchart
      {...barchartinfo5}
      data={atlasData}
      lang="nb"
      national="Norge"
      format=""
    />,
  );
  expect(container).toMatchSnapshot();
});

const barchartinfo6 = {
  type: "barchart",
  data: "qwerty",
  x: ["rateSnitt"],
  y: "bohf",
  yLabel: { en: "qwerty", nn: "Referral areas" },
  xLabel: { en: "qwerty", nn: "Referral areas" },
  errorBars: ["rate2019", "rate2020", "rate2021", "rateSnitt"],
};

test("Render with error bars", async () => {
  mockRouter.push("");
  const { container } = render(
    <Barchart
      {...barchartinfo6}
      data={atlasData}
      lang="nb"
      national="Norge"
      format=",.0f"
    />,
  );
  expect(container).toMatchSnapshot();
});

const barchartinfo7 = {
  type: "barchart",
  data: "qwerty",
  x: ["spes_rate"],
  y: "bohf",
  yLabel: { en: "qwerty", nn: "Referral areas" },
  xLabel: { en: "qwerty", nn: "Referral areas" },
  errorBars: ["rate2019", "rate2020", "rate2021", "rateSnitt"],
};

test("Render with error bars outside bars", async () => {
  mockRouter.push("");
  const { container } = render(
    <Barchart
      {...barchartinfo7}
      data={atlasData}
      lang="nb"
      national="Norge"
      format=",.0f"
    />,
  );
  expect(container).toMatchSnapshot();
});
