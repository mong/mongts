import {
  ChartsSurface,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  HighlightScope,
} from "@mui/x-charts";
import { BarPlot } from "@mui/x-charts";
import { BarBackground } from "./BarBackground";
import { IndicatorData, OptsTu, RegisterData } from "types";
import { useIndicatorQuery } from "../../../helpers/hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "../../../helpers/hooks";
import {
  reshapeData,
  formatBarData,
} from "../../../helpers/functions/formatMuiChartData";
import { customFormat } from "../../../helpers/functions";
import { CustomChartWrapper } from "../utils";
import { RefObject } from "react";
import {
  ChartProApi,
  BarChartProPluginSignatures,
  ChartsDataProviderPro,
} from "@mui/x-charts-pro";
import { ChartLogo } from "../ChartLogo";
import { Box } from "@mui/material";

type MuiBarChartProps = {
  data: IndicatorData;
  figureSpacingFactor: number;
  figureSpacingConstant: number;
  backgroundMargin: number;
  unitNames: string[];
  percentage: boolean;
  barChartType: string;
  valueAxisFormatter: (value: number) => string;
  treatmentUnitsByLevel: OptsTu[];
  context: string;
  type: string;
  medfield: string;
  year: number;
  indID: string;
  tickFontSize: number;
  yAxisWidth: number;
  zoom: boolean;
  dataFormat: string;
  apiRef: RefObject<
    ChartProApi<"bar", BarChartProPluginSignatures> | undefined
  >;
};

export const MuiBarChart = (props: MuiBarChartProps) => {
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
    type,
    medfield,
    year,
    indID,
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

  const getDataByUnitLevel = (level?: string) => {
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

      newUnitNames = newUnitNames.concat(
        newUnitBlock.options.map((row) => row.value),
      );
    }

    const queryParams: FetchIndicatorParams = {
      context: context,
      registerShortName: medfield, // Not the same as the short_name column in the database
      unitNames: newUnitNames,
      type: type,
      treatmentYear: year,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nestedDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
      ...queryParams,
      nested: true,
    });

    if (nestedDataQuery.isFetching) {
      return null;
    }

    const newDataBlock = nestedDataQuery.data[0] as RegisterData;

    const newDataSelection = newDataBlock.indicatorData.find(
      (row: IndicatorData) => row.indicatorID === indID,
    );

    if (!newDataSelection) {
      return null;
    }

    // Sorter etter måloppnåelse
    newDataSelection.data!.sort((a, b) =>
      a.var !== null && b.var !== null ? b.var - a.var : 0,
    );

    // Filterer vekk lav dekningsgrad
    newDataSelection.data = newDataSelection.data!.filter((row) =>
      row.dg !== null ? row.dg >= 0.6 : true,
    );

    // Filterer vekk lav n
    newDataSelection.data = newDataSelection.data!.filter((row) =>
      data.minDenominator
        ? row.denominator >= data.minDenominator
        : row.denominator >= 5,
    );

    // Hent enhetsnavn i riktig rekkefølge
    const orderedUnitNames = newDataSelection.data!.map((row) => row.unitName);

    const orderedDenominator = newDataSelection.data!.map(
      (row) => row.denominator,
    );

    const reshapedData = reshapeData(
      newDataSelection,
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
    const returnData = getDataByUnitLevel("RHF");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
    currentDenominator = returnData.newDenominator;
  } else if (barChartType === "hf") {
    const returnData = getDataByUnitLevel("HF");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
    currentDenominator = returnData.newDenominator;
  } else if (barChartType === "hospital") {
    const returnData = getDataByUnitLevel("Sykehus");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
    currentDenominator = returnData.newDenominator;
  } else {
    const returnData = getDataByUnitLevel();

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
    return `${value && customFormat(dataFormat)(value) + " (N =  " + currentDenominator[dataIndex] + ")"}`;
  };

  return (
    <Box width={"100%"}>
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
        <CustomChartWrapper>
          <ChartLogo width={100} marginRight={6} />
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
        </CustomChartWrapper>
      </ChartsDataProviderPro>
    </Box>
  );
};
