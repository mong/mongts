import { render } from "@testing-library/react";
import { QualityAtlasFigure } from "..";
import { vi, describe, test, expect } from "vitest";
import { indicatorInfo } from "../../../data/indicators";
import { testdata } from "./testdata";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

vi.mock("qmongjs/useIndicatorQuery", () => {
  return new Promise(() => {
    return testdata;
  });
});

describe("QualityAtlasFigure", () => {
  test("renders", () => {
    const allIndIDs = indicatorInfo.map((row) => row.indId);
    const selectedTreatmentUnits = ["Bodø", "Harstad"];

    const indNameKey = indicatorInfo.map((row) => {
      return {
        indID: row.indId,
        indTitle: row.title,
        registryShortName: row.registry,
      };
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <QualityAtlasFigure
          width={1000}
          minBoxWidth={30}
          maxBoxWidth={75}
          gap={2}
          context={"caregiver"}
          year={2023}
          indIDs={allIndIDs}
          unitNames={selectedTreatmentUnits}
          indNameKey={indNameKey}
        />
        ,
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
