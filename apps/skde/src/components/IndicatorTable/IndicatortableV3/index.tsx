import {
  ContextCard,
  RegisterAccordion,
  type RenderRegisterProps,
  RotateDevice,
} from "@mong/material-ui";
import { Stack } from "@mui/material";
import { customFormat, level2 } from "qmongjs";
import { type JSX, useState } from "react";
import type { DataPoint, IndicatorData, OptsTu, RegisterData } from "types";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../../../app_config";
import { ChartRowV2 } from "../chartrowV2";

type IndicatorTableV3Props = {
  data: RegisterData[];
  medfields: string[];
  unitNames: string[];
  year: number;
  chartColours: string[];
  unitNamesByLevel: OptsTu[];
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
  context: "caregiver" | "resident" | undefined,
  unitNamesByLevel: OptsTu[],
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
                ? "Ukjent dekning"
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

          const dates = indicator?.data?.map((row) => {
            return new Date(row.deliveryTime);
          });

          const maxDate = (dates: Date[]) => {
            const numericDates = dates.map((row) => row.getTime());
            return new Date(Math.max(...numericDates));
          };

          const lastDeliveryText =
            dates &&
            "Siste levering av data: " +
              maxDate(dates).toLocaleString("no-NO", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "CET",
              });

          const dgIndicator = registry.indicatorData.find(
            (row) => row.indicatorID === indicator.dataQualityIndicatorID,
          );

          return {
            chart: (
              <Stack>
                <ChartRowV2
                  data={{ ...indicator }}
                  dgData={dgIndicator}
                  unitNames={unitNames}
                  medfield={registry.registerName}
                  context={context}
                  year={year}
                  treatmentUnitsByLevel={unitNamesByLevel}
                  registryName={registry.registerFullName}
                  showDGButton={true}
                />
                <ContextCard
                  title="Om indikatoren"
                  description={indicator.longDescription ?? "Ingen beskrivelse"}
                  updated={lastDeliveryText ?? "Ingen beskrivelse"}
                />
              </Stack>
            ) as JSX.Element,
            indicatorTarget:
              levelTarget !== undefined ? levelDirectionSign + levelTarget : "",
            indicatorTitle: indicator.indicatorTitle,
            indicatorId: indicator.indicatorID,
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
      const hasTreatmentUnitResults =
        (data[i].indicators[j].treatmentUnitResults?.length ?? 0) > 0;
      const hasResidentAreaResults =
        (data[i].indicators[j].residentsAreaResults?.length ?? 0) > 0;

      const missingTreatmentUnits = hasTreatmentUnitResults
        ? unitNames.filter(
            (unitName) =>
              !data[i].indicators[j].treatmentUnitResults
                .map((row) => row.unitName)
                .includes(unitName),
          )
        : [];
      const missingResidentAreas = hasResidentAreaResults
        ? unitNames.filter(
            (unitName) =>
              !data[i].indicators[j].residentsAreaResults
                ?.map((row) => row.unitName)
                .includes(unitName),
          )
        : [];
      // console.log("data[i]", data[i].indicators[j].treatmentUnitResults.length);
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
  const { data, medfields, unitNames, year, unitNamesByLevel } = props;

  const [clickedIndicatorContext, setClickedIndicatorContext] = useState<
    "caregiver" | "resident" | undefined
  >("caregiver");

  // Expanded indicator row is kept in the URL so views can be shared.
  const [selectedRow, setSelectedRow] = useQueryParam(
    "selected_row",
    mainQueryParamsConfig.selected_row,
  );

  const medfieldFilteredData = data.filter((row: RegisterData) =>
    medfields.includes(row.registerName),
  );

  const reshapedData = reshapeData(
    medfieldFilteredData,
    unitNames,
    year,
    clickedIndicatorContext,
    unitNamesByLevel,
  );
  fillMissingUnitnames(reshapedData, unitNames);
  return (
    <div className="w-full max-w-360">
      <div className="flex md:hidden flex-col gap-(--spacing-4) p-8 text-brand-primary-600">
        <RotateDevice message="Innholdet støttes kun på bredere skjermer. Prøv å snu enheten din." />
      </div>
      <div className="hidden md:flex flex-col w-full justify-between">
        <RegisterAccordion
          registries={reshapedData}
          smallScreenMessage="Innholdet støttes kun på bredere skjermer. Prøv å snu enheten din."
          setCurrentContext={setClickedIndicatorContext}
          expandedKey={selectedRow ?? null}
          onExpandedChange={(key) => setSelectedRow(key ?? undefined)}
        />
      </div>
    </div>
  );
};
