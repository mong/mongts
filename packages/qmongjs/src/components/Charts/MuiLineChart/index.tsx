import { CustomAnimatedLine } from "../../Charts/MuiLineChart/CustomAnimatedLine";
import { LineBackground } from "../../Charts/MuiLineChart/LineBackground";
import {
  ChartsAxisHighlight,
  ChartsLegend,
  ChartsSurface,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LineSeriesType,
  MarkPlot,
  useChartRootRef,
  LinePlot,
} from "@mui/x-charts";
import { IndicatorData } from "types";
import { DataPoint } from "types";
import { useChartProApiRef, ChartsDataProviderPro } from "@mui/x-charts-pro";
import { Button, Stack } from "@mui/material";
type MuiLineChartProps = {
  data: IndicatorData;
  lineData: LineSeriesType[];
  uniqueYears: number[];
  percentage: boolean;
  valueAxisFormatter: (value: number) => string;
  lastAffirmYear: number;
  zoom: boolean;
  figureHeight: number;
};

function CustomChartWrapper({ children }: React.PropsWithChildren) {
  const chartRootRef = useChartRootRef();

  return (
    <div
      ref={chartRootRef}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {children}
    </div>
  );
}

export const MuiLineChart = (props: MuiLineChartProps) => {
  const {
    data,
    lineData,
    uniqueYears,
    percentage,
    valueAxisFormatter,
    lastAffirmYear,
    zoom,
    figureHeight,
  } = props;

  if (data.data === undefined) {
    return null;
  }

  const apiRef = useChartProApiRef<"composition">();

  const yMaxLimit = Math.max(
    ...data.data.map((row: DataPoint) => (row.var != null ? row.var : 0)),
  );

  const yMinLimit = Math.min(
    ...data.data.map((row: DataPoint) => (row.var != null ? row.var : 0)),
  );

  const yDifference = yMaxLimit - yMinLimit;

  return (
    <Stack width="100%" height={"100%"} sx={{ display: "block" }}>
      <Button
        onClick={() => apiRef.current!.exportAsImage()}
        variant="contained"
        sx={{ marginLeft: "90%" }}
      >
        Last ned
      </Button>
      <ChartsDataProviderPro
        apiRef={apiRef}
        series={lineData}
        height={figureHeight}
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
        <CustomChartWrapper>
          <ChartsLegend
            slotProps={{
              legend: { position: { vertical: "top", horizontal: "start" } },
            }}
          />
          <ChartsTooltip />
          <ChartsSurface
            sx={{ "& .line-after path": { strokeDasharray: "10 5" } }}
          >
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
        </CustomChartWrapper>
      </ChartsDataProviderPro>
    </Stack>
  );
};
