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
import type { UseQueryResult } from "@tanstack/react-query";
import { customFormat } from "qmongjs/src/helpers/functions";
import {
  type FetchIndicatorParams,
  useIndicatorQuery,
} from "qmongjs/src/helpers/hooks";
import type { RefObject } from "react";
import type { IndicatorData, OptsTu, RegisterData } from "types";
import {
  formatBarData,
  reshapeData,
} from "../../../helpers/functions/formatMuiChartData";
import { ChartLogo } from "../ChartLogo";
import { CustomChartWrapper } from "../CustomChartWrapper";
import { BarBackground } from "./BarBackground";

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

    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    const nestedDataQuery: UseQueryResult<unknown, unknown> = useIndicatorQuery(
      {
        ...queryParams,
        nested: true,
      },
    );
    // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
    if (nestedDataQuery.isFetching || nestedDataQuery.data.length === 0) {
      return null;
    }
    // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
    const newDataBlock = nestedDataQuery.data[0] as RegisterData;

    const newDataSelection = newDataBlock.indicatorData.find(
      (row: IndicatorData) => row.indicatorID === indID,
    );

    if (!newDataSelection) {
      return null;
    }

    // Sorter etter måloppnåelse
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    newDataSelection.data!.sort((a, b) =>
      a.var !== null && b.var !== null ? b.var - a.var : 0,
    );

    // Filterer vekk lav dekningsgrad
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    newDataSelection.data = newDataSelection.data!.filter((row) =>
      row.dg !== null ? row.dg >= 0.6 : true,
    );

    // Filterer vekk lav n
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    newDataSelection.data = newDataSelection.data!.filter((row) =>
      data.minDenominator
        ? row.denominator >= data.minDenominator
        : row.denominator >= 5,
    );

    // Hent enhetsnavn i riktig rekkefølge
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    const orderedUnitNames = newDataSelection.data!.map((row) => row.unitName);

    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
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
            } as HighlightScope<"bar">,
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
          <div className="pl-10 pt-2 flex flex-row">
            <h6 className="font-semibold text-main tracking-wider">
              Valgt år:
            </h6>
            <h6 className="pl-1 font-regular text-main tracking-wider">
              {year}
            </h6>
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
        </CustomChartWrapper>
      </ChartsDataProviderPro>
    </Box>
  );
};
