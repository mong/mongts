import { Box } from "@mong/material-ui";
import {
  BarPlot,
  ChartsSurface,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  type HighlightScope,
} from "@mui/x-charts";
import {
  type BarChartProPluginSignatures,
  type ChartProApi,
  ChartsDataProviderPro,
} from "@mui/x-charts-pro";
import { customFormat } from "qmongjs/src/helpers/functions";
import type { RefObject } from "react";
import type { DataPoint, IndicatorData, OptsTu } from "types";
import {
  formatBarData,
  reshapeData,
} from "../../../helpers/functions/formatMuiChartData";
import { ChartLogo } from "../ChartLogo";
import { BarBackground } from "./BarBackground";

type MuiBarChartV2Props = {
  data: IndicatorData;
  figureSpacingFactor: number;
  figureSpacingConstant: number;
  backgroundMargin: number;
  unitNames: string[];
  percentage: boolean;
  barChartType: string;
  valueAxisFormatter: (value: number) => string;
  treatmentUnitsByLevel: OptsTu[];
  context: "caregiver" | "resident" | undefined;
  year: number;
  tickFontSize: number;
  yAxisWidth: number;
  zoom: boolean;
  dataFormat: string;
  apiRef: RefObject<
    ChartProApi<"bar", BarChartProPluginSignatures> | undefined
  >;
};

export const MuiBarChartV2 = (props: MuiBarChartV2Props) => {
  const {
    data,
    figureSpacingFactor,
    figureSpacingConstant,
    backgroundMargin,
    unitNames,
    percentage,
    barChartType,
    valueAxisFormatter,
    treatmentUnitsByLevel,
    context,
    year,
    tickFontSize,
    yAxisWidth,
    zoom,
    dataFormat,
    apiRef,
  } = props;

  if (!data.data) {
    return null;
  }

  let currentUnitNames: string[];
  let currentData: (number | null)[];
  let currentDenominator: number[];

  const unitsInData = [...new Set(data.data.map((row) => row.unitName))];

  const getDataByUnitLevel = (unitsInData: string[], level?: string) => {
    let newUnitNames = ["Nasjonalt"];

    if (!level) {
      newUnitNames = newUnitNames.concat(unitNames);
    } else {
      const newUnitBlock = treatmentUnitsByLevel.find(
        (row) => row.label === level,
      );

      if (!newUnitBlock) {
        return null;
      }

      newUnitNames = newUnitNames
        .concat(newUnitBlock.options.map((row) => row.value))
        .filter((row) => {
          return unitsInData.includes(row);
        });
    }

    const newDataSelection = data?.data?.filter((row: DataPoint) => {
      return (
        row.year === year &&
        row.context === context &&
        newUnitNames.includes(row.unitName)
      );
    });

    if (!newDataSelection) {
      return null;
    }

    // Sorter etter måloppnåelse
    newDataSelection.sort((a, b) =>
      a.var !== null && b.var !== null ? b.var - a.var : 0,
    );

    // Filterer vekk lav dekningsgrad
    newDataSelection.filter((row) => (row.dg !== null ? row.dg >= 0.6 : true));

    // Filterer vekk lav n
    newDataSelection.filter((row) =>
      data.minDenominator
        ? row.denominator >= data.minDenominator
        : row.denominator >= 5,
    );

    // Hent enhetsnavn i riktig rekkefølge
    const orderedUnitNames = newDataSelection.map((row) => row.unitName);

    const orderedDenominator = newDataSelection.map((row) => row.denominator);

    const reshapedData = reshapeData(
      { ...data, data: newDataSelection },
      orderedUnitNames,
      context,
    );

    const newData = formatBarData(reshapedData, year);

    return {
      newData: newData,
      newUnitNames: orderedUnitNames,
      newDenominator: orderedDenominator,
    };
  };

  if (barChartType === "rhf") {
    const returnData = getDataByUnitLevel(unitsInData, "RHF");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
    currentDenominator = returnData.newDenominator;
  } else if (barChartType === "hf") {
    const returnData = getDataByUnitLevel(unitsInData, "HF");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
    currentDenominator = returnData.newDenominator;
  } else if (barChartType === "hospital") {
    const returnData = getDataByUnitLevel(unitsInData, "Sykehus");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
    currentDenominator = returnData.newDenominator;
  } else {
    const returnData = getDataByUnitLevel(unitsInData);

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
    currentDenominator = returnData.newDenominator;
  }

  const xMaxLimit = Math.max(...currentData.map((el) => (el != null ? el : 0)));

  const figureHeight =
    (currentUnitNames.length + figureSpacingConstant) * figureSpacingFactor;

  const tickNumber = zoom && xMaxLimit < 0.1 ? 3 : 10;

  // Formatting functions
  const barValueFormatter = (
    value: number | null,
    { dataIndex }: { dataIndex: number },
  ) => {
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    return `${value && customFormat(dataFormat)(value) + " (N =  " + currentDenominator[dataIndex] + ")"}`;
  };

  return (
    <Box>
      <ChartsDataProviderPro
        apiRef={apiRef}
        series={[
          {
            type: "bar",
            layout: "horizontal",
            data: currentData,
            valueFormatter: barValueFormatter,
            barLabelPlacement: "center",
            highlightScope: {
              highlight: "item",
              fade: "series",
            } as HighlightScope,
          },
        ]}
        height={figureHeight}
        yAxis={[
          {
            scaleType: "band",
            data: currentUnitNames,
            position: "left",
            width: yAxisWidth,
            tickLabelStyle: { fontSize: tickFontSize },
          },
        ]}
        xAxis={[
          {
            min: 0,
            max: percentage && !zoom ? 1 : xMaxLimit,
            position: "bottom",
            valueFormatter: valueAxisFormatter,
            tickNumber: tickNumber,
          },
        ]}
      >
        {/* <CustomChartWrapper> */}
        <div className="pl-10 pt-2 flex flex-row">
          <h6 className="font-semibold text-main tracking-wider">Valgt år:</h6>
          <h6 className="pl-1 font-regular text-main tracking-wider">{year}</h6>
        </div>
        <ChartsTooltip />
        <ChartsSurface>
          <BarBackground
            data={data}
            percentage={percentage}
            figureHeight={figureHeight}
            backgroundMargin={backgroundMargin}
            lines={true}
            zoom={zoom}
            xMaxLimit={xMaxLimit}
          />
          <ChartsXAxis />
          <ChartsYAxis />
          <BarPlot />
        </ChartsSurface>
        <ChartLogo />
        {/* </CustomChartWrapper> */}
      </ChartsDataProviderPro>
    </Box>
  );
};
