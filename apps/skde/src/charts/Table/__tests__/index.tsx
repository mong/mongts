import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";

import { DataTable } from "..";
import { atlasData, tableHeaders } from "../../../../test/test_data/data";

jest.mock("next/router", () => require("next-router-mock"));

// To avoid type-check error. Have to find a better way
const testHeaders: any = tableHeaders;

test("Standard render", async () => {
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="rateSnitt"
      national="Norge"
      headers={testHeaders}
    />
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
      headers={testHeaders}
    />
  );
  expect(mockRouter.query).toEqual({});
  // Click national (in this case OUS) and nothing should happen
  fireEvent.click(getByTestId("tablerow_OUS"));
  expect(mockRouter.query).toEqual({});
  expect(container).toMatchSnapshot();
  // Click UNN
  fireEvent.click(getByTestId("tablerow_UNN"));
  expect(mockRouter.query).toEqual({ bohf: "UNN" });
  expect(container).toMatchSnapshot();
  // Ascending sort table by num of patients
  fireEvent.click(getByTestId("tablehead_pasienter"));
  expect(container).toMatchSnapshot();
  // Descending sort table by num of patients
  fireEvent.click(getByTestId("tablehead_pasienter"));
  expect(container).toMatchSnapshot();
  // Unclick UNN
  fireEvent.click(getByTestId("tablerow_UNN"));
  expect(mockRouter.query).toEqual({ bohf: [] });
  // Order by HF name
  fireEvent.click(getByTestId("tablehead_bohf"));
  expect(container).toMatchSnapshot();
});

test("Render with picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=UNN");
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="rateSnitt"
      national="Norge"
      headers={testHeaders}
    />
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
      headers={testHeaders}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Render with many picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=OUS&bohf=UNN&bohf=Fonna");
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="nb"
      caption="rateSnitt"
      national="Norge"
      headers={testHeaders}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Render english with many picked HF", async () => {
  mockRouter.push("/test_atlas/?bohf=OUS&bohf=UNN&bohf=Fonna");
  const { container } = render(
    <DataTable
      data={atlasData}
      lang="en"
      caption="rateSnitt"
      national="Norge"
      headers={testHeaders}
    />
  );
  expect(container).toMatchSnapshot();
});
