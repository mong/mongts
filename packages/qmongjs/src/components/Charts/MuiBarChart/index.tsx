import {
  ChartDataProvider,
  ChartsSurface,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
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

type MuiBarChartProps = {
  barData: (number | null)[];
  data: IndicatorData;
  figureSpacing: number;
  backgroundMargin: number;
  unitNames: string[];
  percentage: boolean;
  barChartType: string;
  barValueFormatter: (value: number | null) => string;
  valueAxisFormatter: (value: number) => string;
  treatmentUnitsByLevel: OptsTu[];
  context: string;
  type: string;
  medfield: string;
  year: number;
  indID: string;
  tickFontSize: number;
};

export const MuiBarChart = (props: MuiBarChartProps) => {
  const {
    barData,
    data,
    figureSpacing,
    backgroundMargin,
    unitNames,
    percentage,
    barChartType,
    barValueFormatter,
    valueAxisFormatter,
    treatmentUnitsByLevel,
    context,
    type,
    medfield,
    year,
    indID,
    tickFontSize,
  } = props;

  let currentData = barData;
  let currentUnitNames = unitNames;

  const getDataByUnitLevel = (level: string) => {
    const newUnitBlock = treatmentUnitsByLevel.find(
      (row) => row.label === level,
    );

    if (!newUnitBlock) {
      return null;
    }

    const newUnitNames = newUnitBlock.options.map((row) => row.value);

    newUnitNames.push("Nasjonalt");

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

    // Hent enhetsnavn i riktig rekkefølge
    const orderedUnitNames = newDataSelection.data!.map((row) => row.unitName);

    const reshapedData = reshapeData(
      newDataSelection,
      orderedUnitNames,
      context,
    );

    const newData = formatBarData(reshapedData, year);

    return {
      newData: newData,
      newUnitNames: orderedUnitNames,
    };
  };

  if (barChartType === "rhf") {
    const returnData = getDataByUnitLevel("RHF");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
  } else if (barChartType === "hf") {
    const returnData = getDataByUnitLevel("HF");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
  } else if (barChartType === "hospital") {
    const returnData = getDataByUnitLevel("Sykehus");

    if (!returnData) {
      return null;
    }

    currentData = returnData.newData;
    currentUnitNames = returnData.newUnitNames;
  }

  const figureHeight = (currentUnitNames.length + 1.5) * figureSpacing;

  return (
    <ChartDataProvider
      series={[
        {
          type: "bar",
          layout: "horizontal",
          data: currentData,
          valueFormatter: barValueFormatter,
        },
      ]}
      height={figureHeight}
      yAxis={[
        {
          scaleType: "band",
          data: currentUnitNames,
          position: "left",
          width: 140,
          tickLabelStyle: { fontSize: tickFontSize },
        },
      ]}
      xAxis={[
        {
          min: 0,
          max: percentage ? 1 : undefined,
          position: "bottom",
          valueFormatter: valueAxisFormatter,
        },
      ]}
    >
      <ChartsTooltip />
      <ChartsSurface>
        <BarBackground
          data={data}
          percentage={percentage}
          figureHeight={figureHeight}
          backgroundMargin={backgroundMargin}
        />
        <ChartsXAxis />
        <ChartsYAxis />
        <BarPlot />
      </ChartsSurface>
    </ChartDataProvider>
  );
};
