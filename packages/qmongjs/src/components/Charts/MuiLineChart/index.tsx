import { CustomAnimatedLine } from "../../Charts/MuiLineChart/CustomAnimatedLine";
import { LineBackground } from "../../Charts/MuiLineChart/LineBackground";
import {
  ChartDataProvider,
  ChartsAxisHighlight,
  ChartsLegend,
  ChartsSurface,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LineSeriesType,
  MarkPlot,
} from "@mui/x-charts";
import { LinePlot } from "@mui/x-charts/LineChart";
import { IndicatorData } from "types";
import { DataPoint } from "types";

type MuiLineChartProps = {
  data: IndicatorData;
  lineData: LineSeriesType[];
  uniqueYears: number[];
  percentage: boolean;
  valueAxisFormatter: (value: number) => string;
  lastAffirmYear: number;
  zoom: boolean;
};

export const MuiLineChart = (props: MuiLineChartProps) => {
  const {
    data,
    lineData,
    uniqueYears,
    percentage,
    valueAxisFormatter,
    lastAffirmYear,
    zoom,
  } = props;

  if (data.data === undefined) {
    return null;
  }

  const yMaxLimit = Math.max(
    ...data.data.map((row: DataPoint) => (row.var != null ? row.var : 0)),
  );

  const yMinLimit = Math.min(
    ...data.data.map((row: DataPoint) => (row.var != null ? row.var : 0)),
  );

  const yDifference = yMaxLimit - yMinLimit;

  return (
    <ChartDataProvider
      series={lineData}
      xAxis={[
        {
          scaleType: "point",
          data: uniqueYears,
          valueFormatter: (value: number) => value.toString(),
        },
      ]}
      yAxis={[
        {
          min: zoom ? yMinLimit : 0,
          max: percentage && !zoom ? 1 : yMaxLimit,
          position: "left",
          scaleType: "linear",
          valueFormatter: valueAxisFormatter,
          tickNumber: zoom && yDifference < 0.1 ? 3 : 10,
        },
      ]}
    >
      <ChartsLegend
        slotProps={{
          legend: { position: { vertical: "top", horizontal: "start" } },
        }}
      />
      <ChartsTooltip />
      <ChartsSurface sx={{ "& .line-after path": { strokeDasharray: "10 5" } }}>
        <LineBackground
          data={data}
          years={uniqueYears}
          lines={true}
          percentage={percentage}
          zoom={zoom}
          yMaxLimit={yMaxLimit}
          yMinLimit={yMinLimit}
        />
        <ChartsXAxis />
        <ChartsYAxis />
        <ChartsAxisHighlight y="line" />
        <LinePlot
          slots={{ line: CustomAnimatedLine }}
          slotProps={{
            line: {
              limit: lastAffirmYear,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          }}
        />
        <MarkPlot />
        <ChartsAxisHighlight x="line" />
      </ChartsSurface>
    </ChartDataProvider>
  );
};
