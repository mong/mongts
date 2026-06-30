import { RegisterAccordion, type RenderRegisterProps } from "@mong/material-ui";
import { Box } from "@mui/material";
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
levelStringMap.set(undefined, "low");

const resultStringMap = new Map();
resultStringMap.set("L", "Lav");
resultStringMap.set("M", "Middels");
resultStringMap.set("H", "Høy");

const reshapeData = (
  data: RegisterData[],
  medfields: string[],
  unitNames: string[],
  year: number,
) => {
  const medfieldFilteredData = data.filter((row: RegisterData) =>
    medfields.includes(row.registerName),
  );

  const reshapedData = medfieldFilteredData.map((registry: RegisterData) => {
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
                : "NA";

            return ind === 0
              ? {
                  displayHeaderAs: "text",
                  result: `${resultStringMap.get(level)} ${indicatorResult}`,
                  resultLevel: levelStringMap.get(level),
                  resultSubtitle: "test",
                  unitName: row.unitName,
                }
              : {
                  result: `${resultStringMap.get(level)} ${indicatorResult}`,
                  resultLevel: levelStringMap.get(level),
                  resultSubtitle: "test",
                  unitName: row.unitName,
                };
          };

          const levelDirectionSign =
            indicator.levelDirection === 1 ? ">=" : "<=";
          const levelTarget =
            indicator.levelGreen !== null && indicator.format !== null
              ? customFormat(indicator.format)(indicator.levelGreen)
              : undefined;

          return {
            chart: (
              <Box key={`testbox-${registry.registerName}`}>test</Box>
            ) as JSX.Element,
            indicatorTarget:
              levelTarget !== undefined
                ? levelDirectionSign + levelTarget
                : "NA",
            indicatorTitle: indicator.indicatorTitle,
            residentAreaResults: indicator.data
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

export const IndicatorTableV3 = (props: IndicatorTableV3Props) => {
  const { data, medfields, unitNames, year, chartColours } = props;

  const reshapedData = reshapeData(data, medfields, unitNames, year);

  return <RegisterAccordion registries={reshapedData} />;
};
