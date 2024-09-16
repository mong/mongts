import React from "react";
import { MedfieldTable, createMedfieldTableData } from "..";
import { medfieldTableData } from "../../../../../../apps/skde/test/test_data/data";
import { vi, test, expect } from "vitest";
import * as hooks from "../../../helpers/hooks";
import { render } from "@testing-library/react";
import { vi } from "vitest";

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
    />,
  );

  expect(container).toMatchSnapshot();
});
