import { DataPoint, IndicatorData } from "types";
import { LinePlot } from "@mui/x-charts/LineChart";
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
import { Box } from "@mui/material";

type chartRowV2Props = {
  data: IndicatorData;
  unitNames: string[];
  context: string;
};

type Point = { x: number; y: number | null };

export const ChartRowV2 = (props: chartRowV2Props) => {
  const { data, unitNames, context } = props;

  if (data.data === undefined) {
    return <div>No data</div>;
  }

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
  const labelledData = paddedData.map((row, i) => {
    return {
      data: row.map((point) => point.y),
      label: unitNames[i],
      curve: "linear",
      type: "line",
    } as LineSeriesType;
  });

  type BackgroundProps = {
    data: IndicatorData;
  };

  const Background = (props: BackgroundProps) => {
    const { data } = props;

    const levelGreen = data.levelGreen;
    const levelYellow = data.levelYellow;
    const levelDirection = data.levelDirection;

    const yMin = 0;
    const yMax = 1;
    const xMin = Math.min(...years);
    const xMax = Math.max(...years);

    const xScale = useXScale();
    const yScale = useYScale();

    const xStart = xScale(xMin);
    const xStop = xScale(xMax);
    const yStart = yScale(yMax);
    const yStop = yScale(yMin);

    const greenStart = levelGreen && yScale(levelGreen);
    const yellowStart = levelYellow && yScale(levelYellow);

    const validGrid =
      xStart &&
      yStart &&
      xStop &&
      yStop &&
      greenStart &&
      yellowStart &&
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

  return (
    <Box
      sx={{
        width: "100%",
        height: 500,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ChartDataProvider
        series={labelledData}
        xAxis={[{ scaleType: "point", data: uniqueYears }]}
        yAxis={[{ min: 0, max: 1, position: "left" }]}
      >
        <ChartsLegend
          slotProps={{
            legend: { position: { vertical: "top", horizontal: "start" } },
          }}
        />
        <ChartsTooltip />
        <ChartsSurface>
          <Background data={data} />
          <ChartsXAxis />
          <ChartsYAxis />
          <LinePlot />
          <MarkPlot />
          <ChartsAxisHighlight x="line" />
        </ChartsSurface>
      </ChartDataProvider>
    </Box>
  );
};
