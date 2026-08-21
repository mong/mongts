import { LineChartPro, legendClasses } from "@mui/x-charts-pro";
import type { IndicatorLineChartDataPoint } from "types";
import {
  levelGreenColours,
  levelRedColours,
  levelYellowColours,
} from "../../../app_config";

export type IndicatorLinechartParamsV2 = {
  chartData: IndicatorLineChartDataPoint[][];
  width?: number;
  height: number;
  yAxisText: string;
  normalise: boolean;
  yMin?: number;
  yMax?: number;
  useToolTip?: boolean;
};

const normaliseChartData = (data: { x: number; y: number }[][]) => {
  // Count instances per year
  const sum0 = data[0].map((point) => point.y);
  const sum1 = data[1].map((point) => point.y);
  const sum2 = data[2].map((point) => point.y);

  for (let i = 0; i < data[0].length; i++) {
    // Sum of the number of indicators or year at index i
    const sumAll = sum0[i] + sum1[i] + sum2[i];

    if (sumAll !== 0) {
      data[0][i].y = data[0][i].y / sumAll;
      data[1][i].y = data[1][i].y / sumAll;
      data[2][i].y = data[2][i].y / sumAll;
    } // Otherwise all the y values are zero
  }

  return data;
};

export const IndicatorLinechartV2 = (
  indicatorParams: IndicatorLinechartParamsV2,
) => {
  let chartData = indicatorParams.chartData;

  const normalise = indicatorParams.normalise ?? false;

  if (normalise) {
    chartData = normaliseChartData(chartData);
  }

  const legendValueFormatter = (value: number) => {
    const returnValue = normalise
      ? `${Math.round(100 * value).toString()} %`
      : value.toString();
    return returnValue;
  };

  return (
    <LineChartPro
      className="-ml-8"
      margin={{ top: 6, right: 30, bottom: 6, left: 6 }}
      // Add gridlines
      grid={{ horizontal: true }}
      sx={{
        "& .MuiChartsAxis-tickLabel": {
          fill: "var(--text-dark)",
        },
        "& .MuiChartsAxis-root .MuiChartsAxis-line": {
          stroke: "transparent",
        },
        "& .MuiChartsAxis-root .MuiChartsAxis-tick": {
          stroke: "transparent",
        },
        // Move Y-axis labels away from axis line
        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
          transform: "translateX(-8px)",
        },
        // Move X-axis labels away from axis line
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
          transform: "translateY(20px)",
        },
      }}
      slotProps={{
        legend: {
          position: { vertical: "top", horizontal: "start" },
          sx: {
            color: "var(--text-dark)",
            paddingBottom: "28px",
            marginLeft: "0px",
            marginRight: "0px",
            fontSize: 14,
            [`.${legendClasses.mark}`]: {
              width: 20,
            },
          },
        },
      }}
      series={[
        {
          data: chartData[0].map((row) => row.y),
          curve: "linear",
          color: levelGreenColours[1],
          valueFormatter: legendValueFormatter,
          label: "Høy",
          showMark: true,
        },
        {
          data: chartData[1].map((row) => row.y),
          curve: "linear",
          color: levelYellowColours[1],
          valueFormatter: legendValueFormatter,
          label: "Middels",
          showMark: true,
        },
        {
          data: chartData[2].map((row) => row.y),
          curve: "linear",
          color: levelRedColours[1],
          valueFormatter: legendValueFormatter,
          label: "Lav",
          showMark: true,
        },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: chartData[1].map((row) => row.x),
          tickLabelStyle: { fontSize: 14 },
          valueFormatter: (value: number) => value.toString(),
          height: 80,
        },
      ]}
      yAxis={[
        {
          width: 70,
          min: indicatorParams.yMin,
          max: indicatorParams.yMax,
          tickLabelStyle: { fontSize: 14 },
          valueFormatter: (value: number) => {
            const returnValue = normalise
              ? `${Math.round(100 * value).toString()} %`
              : value.toString();
            return returnValue;
          },
        },
      ]}
      height={indicatorParams.height}
    />
  );
};
