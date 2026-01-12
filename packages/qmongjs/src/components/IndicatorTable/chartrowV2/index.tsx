import React from "react";
import { DataPoint, IndicatorData } from "types";
import {
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import {
  LinePlot,
  AnimatedLine,
  AnimatedLineProps,
} from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts";
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
  useXScale,
  useYScale,
} from "@mui/x-charts";
import { LinechartGrid } from "../../Charts/LinechartGrid";
import { BarchartGrid } from "../../Charts/LinechartGrid";
import { Box } from "@mui/material";
import { useDrawingArea, useChartId } from "@mui/x-charts";
import { getLastCompleteYear } from "../../../helpers/functions";
import { customFormat } from "../../../helpers/functions";

type chartRowV2Props = {
  data: IndicatorData;
  unitNames: string[];
  context: string;
  year: number;
};

type Point = { x: number; y: number | null };

// Hentet fra https://mui.com/x/react-charts/line-demo/#line-with-forecast
interface CustomAnimatedLineProps extends AnimatedLineProps {
  limit?: number;
}

function CustomAnimatedLine(props: CustomAnimatedLineProps) {
  const { limit, ...other } = props;
  const { top, bottom, height, left, width } = useDrawingArea();
  const scale = useXScale();
  const chartId = useChartId();

  if (limit === undefined) {
    return <AnimatedLine {...other} />;
  }

  const limitPosition = scale(limit); // Convert value to x coordinate.

  if (limitPosition === undefined) {
    return <AnimatedLine {...other} />;
  }

  const clipIdleft = `${chartId}-${props.ownerState.id}-line-limit-${limit}-1`;
  const clipIdRight = `${chartId}-${props.ownerState.id}-line-limit-${limit}-2`;

  return (
    <React.Fragment>
      {/* Clip to show the line before the limit */}
      <clipPath id={clipIdleft}>
        <rect
          x={left}
          y={0}
          width={limitPosition - left}
          height={top + height + bottom}
        />
      </clipPath>
      {/* Clip to show the line after the limit */}
      <clipPath id={clipIdRight}>
        <rect
          x={limitPosition}
          y={0}
          width={left + width - limitPosition}
          height={top + height + bottom}
        />
      </clipPath>
      <g clipPath={`url(#${clipIdleft})`} className="line-before">
        <AnimatedLine {...other} />
      </g>
      <g clipPath={`url(#${clipIdRight})`} className="line-after">
        <AnimatedLine {...other} />
      </g>
    </React.Fragment>
  );
}

export const ChartRowV2 = (props: chartRowV2Props) => {
  const { data, unitNames, context, year } = props;

  const figureHeight = 500;
  const backgroundMargin = 20;

  const dataFormat = data.format ? data.format : ",.0%";
  const percentage = dataFormat.includes("%");

  if (data.data === undefined) {
    return <div>No data</div>;
  }

  const [figureType, setFigureType] = useState("line");

  const handleChange = (event: SelectChangeEvent) => {
    setFigureType(event.target.value as string);
  };

  // Format to {x, y}
  const reshapedData = unitNames.map((unitName: string) => {
    return data
      .data!.filter((row: DataPoint) => {
        return row.unitName === unitName && row.context === context;
      })
      .map((row: DataPoint) => {
        return { x: row.year, y: row.var } as Point;
      });
  });

  // Get the years from the data
  const years = reshapedData
    .map((row: Point[]) => {
      return row.map((point) => point.x);
    })
    .flat();

  // Unique years
  const uniqueYears = [...new Set(years)];

  // missing years from each series
  const missingYears = reshapedData.map((row: Point[]) => {
    return uniqueYears.filter(
      (year: number) => !row.map((point: Point) => point.x).includes(year),
    );
  });

  // Make datapoints for the missing years with value null
  const missingData = missingYears.map((row) => {
    return row.map((element) => {
      return { x: element, y: null } as Point;
    });
  });

  // Combine and sort by year
  const paddedData = reshapedData
    .map((row, i) => {
      return row.concat(missingData[i]);
    })
    .map((row) => {
      return row.sort((a: Point, b: Point) => {
        if (a.x < b.x) {
          return -1;
        }

        if (a.x > b.x) {
          return 1;
        }

        return 0;
      });
    });

  // Add unit name label
  const lineData = paddedData.map((row, i) => {
    return {
      data: row.map((point) => point.y),
      label: unitNames[i],
      curve: "linear",
      type: "line",
      connectNulls: true,
      valueFormatter: (value: number) => customFormat(dataFormat)(value),
    } as LineSeriesType;
  });

  const barData = paddedData
    .map((row) => {
      return row
        .filter((point) => {
          return point.x === year;
        })
        .map((row) => row.y);
    })
    .flat();

  const valueFormatter = (value: number | null) => {
    return `${value && Math.round(value * 100)} %`;
  };

  type BackgroundProps = {
    data: IndicatorData;
  };

  const LineBackground = (props: BackgroundProps) => {
    const { data } = props;

    const levelGreen = data.levelGreen;
    const levelYellow = data.levelYellow;
    const levelDirection = data.levelDirection;

    const yMin = 0;
    const yMax = figureHeight;
    const xMin = Math.min(...years);
    const xMax = Math.max(...years);

    const xScale = useXScale();
    const yScale = useYScale();

    const xStart = xScale(xMin);
    const xStop = xScale(xMax);
    const yStart = yScale(yMax);
    const yStop = yScale(yMin);

    const greenStart = levelGreen !== null ? yScale(levelGreen) : undefined;
    const yellowStart = levelYellow !== null ? yScale(levelYellow) : undefined;

    const validGrid =
      xStart !== undefined &&
      yStart !== undefined &&
      xStop !== undefined &&
      yStop !== undefined &&
      greenStart !== undefined &&
      yellowStart !== undefined &&
      (levelDirection === 0 || levelDirection === 1);

    return (
      validGrid &&
      LinechartGrid({
        xStart: xStart,
        xStop: xStop,
        yStart: yStart,
        yStop: yStop,
        levelGreen: greenStart,
        levelYellow: yellowStart,
        levelDirection: levelDirection,
      })
    );
  };

  const BarBackground = (props: BackgroundProps) => {
    const { data } = props;

    const levelGreen = data.levelGreen;
    const levelYellow = data.levelYellow;
    const levelDirection = data.levelDirection;

    const xMin = 0;
    const xMax = 1;

    const xScale = useXScale();

    const xStart = xScale(xMin);
    const xStop = xScale(xMax);
    const yStart = figureHeight - backgroundMargin - 27; // Hardkodet, må fikses
    const yStop = 0 + backgroundMargin;

    const greenStart = levelGreen && xScale(levelGreen);
    const yellowStart = levelYellow && xScale(levelYellow);

    const validGrid =
      xStart &&
      xStop &&
      greenStart &&
      yellowStart &&
      (levelDirection === 0 || levelDirection === 1);

    return (
      validGrid &&
      BarchartGrid({
        xStart: xStart,
        xStop: xStop,
        yStart: yStart,
        yStop: yStop,
        levelGreen: greenStart,
        levelYellow: yellowStart,
        levelDirection: levelDirection,
      })
    );
  };

  // The delivery_latest_affirm date can be different depending on the year.
  // Find the latest year and use that.
  const affirmYears = data.data.map((row) => {
    return getLastCompleteYear(row.affirmTime, 0, true);
  }) as number[];

  const lastAffirmYear = Math.max(...affirmYears);

  const yAxisFormatter = (value: number) => {
    return percentage ? `${value * 100} %` : `${value * 100}`;
  };

  return (
    <Box>
      <Box sx={{ width: "10rem", paddingLeft: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Figurtype</InputLabel>
          <Select value={figureType} label="Figurtype" onChange={handleChange}>
            <MenuItem value={"line"}>Linje</MenuItem>
            <MenuItem value={"bar"}>Søyle</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: figureHeight,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {figureType == "line" ? (
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
                min: 0,
                max: percentage ? 1 : undefined,
                position: "left",
                scaleType: "linear",
                valueFormatter: yAxisFormatter,
              },
            ]}
          >
            <ChartsLegend
              slotProps={{
                legend: { position: { vertical: "top", horizontal: "start" } },
              }}
            />
            <ChartsTooltip />
            <ChartsSurface
              sx={{ "& .line-after path": { strokeDasharray: "10 5" } }}
            >
              <LineBackground data={data} />
              <ChartsXAxis />
              <ChartsYAxis />
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
        ) : figureType === "bar" ? (
          <Box width={"100%"}>
            <ChartDataProvider
              series={[
                {
                  type: "bar",
                  layout: "horizontal",
                  data: barData,
                  valueFormatter,
                },
              ]}
              height={figureHeight}
              yAxis={[{ scaleType: "band", data: unitNames, position: "left" }]}
              xAxis={[{ min: 0, max: 1, position: "bottom" }]}
            >
              <ChartsTooltip />
              <ChartsSurface>
                <BarBackground data={data} />
                <ChartsXAxis />
                <ChartsYAxis />
                <BarPlot />
              </ChartsSurface>
            </ChartDataProvider>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
