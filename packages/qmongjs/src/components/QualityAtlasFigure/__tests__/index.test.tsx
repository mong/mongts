import { render } from "@testing-library/react";
import { QualityAtlasFigure } from "..";
import { describe, test, expect } from "vitest";
import { indicatorInfo } from "../../../data/indicators";

describe("QualityAtlasFigure", () => {
  test("renders", () => {
    const allIndIDs = indicatorInfo.map((row) => row.indId);
    const selectedTreatmentUnits = ["Bodø, Harstad"];

    const indNameKey = indicatorInfo.map((row) => {
      return {
        indID: row.indId,
        indTitle: row.title,
        registryShortName: row.registry,
      };
    });

    const { container } = render(
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
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
