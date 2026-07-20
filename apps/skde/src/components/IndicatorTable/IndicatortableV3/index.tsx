import {
  HeroBanner,
  RegisterAccordion,
  type RenderRegisterProps,
} from "@mong/material-ui";
import { Box, Typography } from "@mui/material";
import { customFormat, level2 } from "qmongjs";
import type { JSX } from "react";
import type { DataPoint, IndicatorData, RegisterData } from "types";

type IndicatorTableV3Props = {
  data: RegisterData[];
  medfields: string[];
  unitNames: string[];
  year: number;
  chartColours: string[];
};

const levelStringMap = new Map();
levelStringMap.set("L", "low");
levelStringMap.set("M", "medium");
levelStringMap.set("H", "high");
levelStringMap.set(undefined, "undefined");

const resultStringMap = new Map();
resultStringMap.set("L", "Lav");
resultStringMap.set("M", "Middels");
resultStringMap.set("H", "Høy");
resultStringMap.set(undefined, "");

const reshapeData = (
  data: RegisterData[],
  unitNames: string[],
  year: number,
) => {
  const reshapedData = data.map((registry: RegisterData) => {
    return {
      description: `Kvalitetsindikatorer fra ${registry.registerFullName}`,
      fullName: registry.registerFullName,
      indicators: registry.indicatorData
        .filter((indicator: IndicatorData) => indicator.indType !== "dg_andel")
        .map((indicator: IndicatorData) => {
          const mapDataPoints = (row: DataPoint, ind: number) => {
            const level = level2(indicator, row);

            const indicatorResult =
              indicator.format !== null && row.var !== null
                ? customFormat(indicator.format)(row.var)
                : row.var === null
                  ? `N < ${indicator.minDenominator}`
                  : "";

            const dataQualityResult =
              row.dg == null
                ? "Ingen dekning"
                : row.dg < 0.6
                  ? "Lav dekning"
                  : "";

            return ind === 0
              ? {
                  displayHeaderAs: "text",
                  result: `${resultStringMap.get(level)} ${indicatorResult}`,
                  resultLevel: levelStringMap.get(level),
                  resultSubtitle: dataQualityResult,
                  unitName: row.unitName,
                }
              : {
                  result: `${resultStringMap.get(level)} ${indicatorResult}`,
                  resultLevel: levelStringMap.get(level),
                  resultSubtitle: dataQualityResult,
                  unitName: row.unitName,
                };
          };

          const levelDirectionSign = indicator.levelDirection === 1 ? "≥" : "≤";
          const levelTarget =
            indicator.levelGreen !== null && indicator.format !== null
              ? customFormat(indicator.format)(indicator.levelGreen)
              : undefined;

          return {
            chart: (
              <HeroBanner title="Innhold kommer" image="/hero-bg-4.jpg" />
            ) as JSX.Element,
            indicatorTarget:
              levelTarget !== undefined ? levelDirectionSign + levelTarget : "",
            indicatorTitle: indicator.indicatorTitle,
            residentsAreaResults: indicator.data
              ?.filter((row: DataPoint) => {
                return (
                  row.context === "resident" &&
                  row.year === year &&
                  unitNames.includes(row.unitName)
                );
              })
              .sort(
                (a, b) =>
                  unitNames.indexOf(a.unitName) - unitNames.indexOf(b.unitName),
              )
              .map(mapDataPoints),
            treatmentUnitResults: indicator.data
              ?.filter((row: DataPoint) => {
                return (
                  row.context === "caregiver" &&
                  row.year === year &&
                  unitNames.includes(row.unitName)
                );
              })
              .sort(
                (a, b) =>
                  unitNames.indexOf(a.unitName) - unitNames.indexOf(b.unitName),
              )
              .map(mapDataPoints),
          };
        }),
      shortName: registry.registerShortName,
      targetValueHeader: "Ønsket målverdi",
    } as RenderRegisterProps;
  });

  return reshapedData;
};

const fillMissingUnitnames = (
  data: RenderRegisterProps[],
  unitNames: string[],
) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].indicators.length; j++) {
      const missingTreatmentUnits = unitNames.filter(
        (unitName) =>
          !data[i].indicators[j].treatmentUnitResults
            .map((row) => row.unitName)
            .includes(unitName),
      );
      const missingResidentAreas = unitNames.filter(
        (unitName) =>
          !data[i].indicators[j].residentsAreaResults
            ?.map((row) => row.unitName)
            .includes(unitName),
      );

      missingTreatmentUnits.forEach((unitName) => {
        if (unitName === "Nasjonalt") {
          data[i].indicators[j].treatmentUnitResults.push({
            displayHeaderAs: "text",
            result: "Ingen data",
            resultLevel: "undefined", // Placeholder value
            resultSubtitle: "",
            unitName: unitName,
          });
        } else {
          data[i].indicators[j].treatmentUnitResults.push({
            result: "Ingen data",
            resultLevel: "undefined", // Placeholder value
            resultSubtitle: "",
            unitName: unitName,
          });
        }
      });
      missingResidentAreas.forEach((residentArea) => {
        if (residentArea === "Nasjonalt") {
          data[i].indicators[j].residentsAreaResults?.push({
            displayHeaderAs: "text",
            result: "Ingen data",
            resultLevel: "low" as "low" | "medium" | "high", // Placeholder value
            resultSubtitle: "",
            unitName: residentArea,
          });
        } else {
          data[i].indicators[j].residentsAreaResults?.push({
            result: "Ingen data",
            resultLevel: "low" as "low" | "medium" | "high", // Placeholder value
            resultSubtitle: "",
            unitName: residentArea,
          });
        }
      });
    }
  }
};

export const IndicatorTableV3 = (props: IndicatorTableV3Props) => {
  const { data, medfields, unitNames, year } = props;

  const medfieldFilteredData = data.filter((row: RegisterData) =>
    medfields.includes(row.registerName),
  );

  const reshapedData = reshapeData(medfieldFilteredData, unitNames, year);
  // const filteredData = reshapedData.filter((row) =>
  //   row.indicators.filter((unit) => unit.residentsAreaResults?.length === 0),
  // );
  // console.log(filteredData);

  // fillMissingUnitnames(reshapedData, unitNames);
  console.log(reshapedData);
  return (
    <div className="w-full max-w-360">
      <RegisterAccordion
        registries={reshapedData}
        smallScreenMessage="Innholdet støttes kun på bredere skjermer. Prøv å snu enheten din."
      />
    </div>
  );
};
