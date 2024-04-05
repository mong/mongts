import React from "react";
import { MedfieldTable, createMedfieldTableData } from "..";
import { medfieldTableData } from "../../../../test/test_data/data";
import { vi, test, expect } from "vitest";
import * as hooks from "../../../../../../packages/qmongjs/src/helpers/hooks";
import { clockTick } from "qmongjs/src/test/clockTick";
import { render } from "@testing-library/react";

Object.defineProperty(global, "performance", {
  writable: true,
});

const data = createMedfieldTableData(medfieldTableData);

test("Levels counts are correct", () => {
  expect(data).toMatchSnapshot();
});

test("Table renders correctly", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: medfieldTableData,
    isLoading: false,
    error: false,
  });

  const { container } = render(
    <MedfieldTable
      unitNames={["Tromsø"]}
      treatmentYear={2022}
      context={"caregiver"}
      type={"ind"}
      width={800}
    />,
  );

  expect(container).toMatchSnapshot();
});
