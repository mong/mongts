import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";

import { Abacus } from "..";
import atlasData from "../../../../test/test_data/data";

jest.mock("next/router", () => require("next-router-mock"));

test("Standard render", async () => {
  const { container } = render(
    <Abacus
      data={atlasData}
      margin={{ top: 30, right: 30, bottom: 5, left: 30 }}
      lang="nb"
      x="rateSnitt"
      national="Norge"
    />
  );
  expect(container).toMatchSnapshot();
});

test("Render with picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=UNN");
  const { container } = render(
    <Abacus
      data={atlasData}
      margin={{ top: 30, right: 30, bottom: 5, left: 30 }}
      lang="nb"
      x="rateSnitt"
      national="Norge"
    />
  );
  expect(container).toMatchSnapshot();
});
