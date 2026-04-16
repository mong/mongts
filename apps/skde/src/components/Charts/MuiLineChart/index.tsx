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
  LinePlot,
} from "@mui/x-charts";
import { DataPoint, IndicatorData } from "types";
import { Box } from "@mui/material";
import { RefObject } from "react";
import {
  ChartProApi,
  LineChartProPluginSignatures,
  ChartsDataProviderPro,
} from "@mui/x-charts-pro";
import { CustomChartWrapper } from "../utils";
import { legendClasses } from "@mui/x-charts/ChartsLegend";
import { ChartLogo } from "../ChartLogo";

type MuiLineChartProps = {
  data: IndicatorData;
  lineData: LineSeriesType[];
  uniqueYears: number[];
  percentage: boolean;
  valueAxisFormatter: (value: number) => string;
  lastAffirmYear: number;
  zoom: boolean;
  figureHeight: number;
  apiRef: RefObject<
    ChartProApi<"line", LineChartProPluginSignatures> | undefined
  >;
  tickFontSize: number;
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
    figureHeight,
    apiRef,
    tickFontSize,
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
    <Box width={"100%"}>
      <ChartsDataProviderPro
        apiRef={apiRef}
        series={lineData}
        height={figureHeight}
        xAxis={[
          {
            scaleType: "point",
            // The height must be set so that the axis ticks are not truncated.
            // If this occurs they will not be visible.
            // TODO: set automatically according to the axis tick font.
            height: 60,
            data: uniqueYears,
            valueFormatter: (value: number) => value.toString(),
            tickLabelStyle: {
              fontSize: tickFontSize,
            },
          },
        ]}
        yAxis={[
          {
            min: zoom ? yMinLimit : 0,
            max: percentage && !zoom ? 1 : yMaxLimit,
            width: 65,
            position: "left",
            scaleType: "linear",
            valueFormatter: valueAxisFormatter,
            tickNumber: zoom && yDifference < 0.1 ? 3 : 10,
            tickLabelStyle: {
              fontSize: tickFontSize,
            },
          },
        ]}
      >
        <Box sx={{ mt: -4 }}>
          <CustomChartWrapper>
            <Box sx={{
              display: "flex",
              width: "95%",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <ChartsLegend
                slotProps={{
                  legend: {
                    sx: {
                      leftmargin: 0,
                      fontSize: tickFontSize,
                      [`.${legendClasses.mark}`]: {
                        width: 40,
                      },
                    },
                    position: { vertical: "top", horizontal: "start" },
                  },
                }}
              />
              <ChartLogo width={100} marginRight={0} />
            </Box>
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
        </Box>
      </ChartsDataProviderPro>
    </Box>
  );
};
