import {
  ChartDataProvider,
  ChartsSurface,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
} from "@mui/x-charts";
import { BarPlot } from "@mui/x-charts";
import { BarBackground } from "./BarBackground";
import { IndicatorData } from "types";

type MuiBarChartProps = {
  barData: (number | null)[];
  data: IndicatorData;
  figureHeight: number;
  backgroundMargin: number;
  unitNames: string[];
  percentage: boolean;
  barValueFormatter: (value: number | null) => string;
  valueAxisFormatter: (value: number) => string;
};

export const MuiBarChart = (props: MuiBarChartProps) => {
  const {
    barData,
    data,
    figureHeight,
    backgroundMargin,
    unitNames,
    percentage,
    barValueFormatter,
    valueAxisFormatter,
  } = props;

  return (
    <ChartDataProvider
      series={[
        {
          type: "bar",
          layout: "horizontal",
          data: barData,
          valueFormatter: barValueFormatter,
        },
      ]}
      height={figureHeight}
      yAxis={[{ scaleType: "band", data: unitNames, position: "left" }]}
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
