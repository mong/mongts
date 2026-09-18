import { Box } from "@mong/material-ui";
import {
  ChartsAxisHighlight,
  ChartsLegend,
  ChartsSurface,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  type LineSeriesType,
  MarkPlot,
} from "@mui/x-charts";
import { legendClasses } from "@mui/x-charts/ChartsLegend";
import {
  type ChartProApi,
  ChartsDataProviderPro,
  type LineChartProPluginSignatures,
} from "@mui/x-charts-pro";
import type { RefObject } from "react";
import type { DataPoint, IndicatorData } from "types";
import { CustomAnimatedLine } from "../../Charts/MuiLineChart/CustomAnimatedLine";
import { LineBackground } from "../../Charts/MuiLineChart/LineBackground";
import { ChartLogo } from "../ChartLogo";
import { CustomChartWrapper } from "../CustomChartWrapper";

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

  const numericValues = data.data
    .map((row: DataPoint) => row.var)
    .filter((value): value is number => value != null);

  const yMaxLimit =
    numericValues.length > 0 ? Math.max(...numericValues) : percentage ? 1 : 0;

  const yMinLimit = numericValues.length > 0 ? Math.min(...numericValues) : 0;

  const yDifference = yMaxLimit - yMinLimit;

  // The highest value can be over 100
  const yDefaultLimit = yMaxLimit <= 1 ? 1 : yMaxLimit;

  const formatSmallPercentage = (percentageValue: number): string => {
    const absValue = Math.abs(percentageValue);
    if (absValue === 0) return "0";

    // Determine decimals needed so we get at least 2 significant figures
    // for values under 1%
    if (absValue >= 1 || Number.isInteger(percentageValue)) {
      return percentageValue.toFixed(Number.isInteger(percentageValue) ? 0 : 1);
    }

    const magnitude = Math.floor(Math.log10(absValue));
    const decimals = Math.min(6, Math.max(1, -magnitude + 1));

    // Remove trailing zeros after the decimal point
    let formatted = percentageValue.toFixed(decimals);
    if (formatted.includes(".")) {
      formatted = formatted.replace(/\.?0+$/, "");
    }
    return formatted;
  };

  return (
    <Box padded={false}>
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
            max: percentage && !zoom ? yDefaultLimit : yMaxLimit,
            width: 65,
            position: "left",
            scaleType: "linear",
            valueFormatter: (value: number) =>
              percentage && zoom
                ? `${formatSmallPercentage(value * 100)}·%`
                : valueAxisFormatter(value),
            tickNumber: zoom && yDifference < 0.1 ? 5 : 10,
            tickLabelStyle: {
              fontSize: tickFontSize,
            },
          },
        ]}
      >
        <div>
          <CustomChartWrapper>
            <div className="pl-20">
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
            </div>
            <ChartsTooltip />
            <ChartsSurface
              sx={{ "& .line-after path": { strokeDasharray: "10 5" }, mb: -4 }}
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
                    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
                  } as any,
                }}
              />
              <MarkPlot />
              <ChartsAxisHighlight x="line" />
            </ChartsSurface>
            <ChartLogo />
          </CustomChartWrapper>
        </div>
      </ChartsDataProviderPro>
    </Box>
  );
};
