import { axisClasses, LineChartPro, legendClasses } from "@mui/x-charts-pro";
import type { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import { level, minDG, useIndicatorQuery } from "qmongjs";
import type { Indicator } from "types";
import {
  levelGreenColours,
  levelRedColours,
  levelYellowColours,
} from "../../../app_config";

export type IndicatorLinechartParamsV2 = {
  registerShortName?: string;
  unitNames?: string[];
  unitLevel?: "nation" | "rhf" | "hf" | "hospital";
  context: "caregiver" | "resident";
  type: "ind" | "dg";
  width?: number;
  height: number;
  yAxisText: string;
  normalise: boolean;
  yMin?: number;
  yMax?: number;
  startYear: number;
  endYear: number;
  useToolTip?: boolean;
};

export type IndicatorLevelsV2 = {
  ind_id: string;
  year: number;
  level: 0 | 1 | 2;
};

type DataPoint = {
  year: number;
  number: number;
};

type GroupedLevels = {
  0: DataPoint[];
  1: DataPoint[];
  2: DataPoint[];
};

// Define high achievement as 0, medium as 1 and low as 2
// If the limits are not set the level is undefined
// Let -1 be undefined
const mapLevel = (indicatorLevel: string) => {
  let mappedLevel: number;
  switch (indicatorLevel) {
    case "H":
      mappedLevel = 0;
      break;
    case "M":
      mappedLevel = 1;
      break;
    case "L":
      mappedLevel = 2;
      break;
    default:
      mappedLevel = -1;
  }

  return mappedLevel;
};

export const countLevels = (levels: IndicatorLevelsV2[]) => {
  return _(levels)
    .countBy((row) => {
      return [row.level, row.year];
    })
    .reduce(
      (result, value, key) => {
        const [level, year] = key.split(",");

        if (level !== "-1") {
          // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
          result[level].push({ year: parseInt(year), number: value });
        }

        return result;
      },
      {
        0: [] as DataPoint[],
        1: [] as DataPoint[],
        2: [] as DataPoint[],
      } as GroupedLevels,
    );
};

// GroupedLevels only contains datapoint for the years where there is data.
// This function adds years without data in the range [minYear, maxYear] and sets the value to 0.
export const setMissingToZero = (
  groupedLevels: GroupedLevels,
  minYear?: number,
  maxYear?: number,
) => {
  if (minYear === undefined || maxYear === undefined) {
    return [[], [], []];
  }
  const dataAllLevels = [[], [], []] as { year: number; number: number }[][];

  // i is the index of the year.
  // i = 0 corresponds to minYear.
  let i = 0;

  for (let year = minYear; year <= maxYear; year++) {
    for (let level = 0; level < 3; level++) {
      // Initialise the array for the current level and year
      dataAllLevels[level][i] = { year: year, number: 0 };

      for (let j = 0; j < groupedLevels[level].length; j++) {
        // Iterate over groupedLevels and copy the value to the current level and year
        if (dataAllLevels[level][i].year === groupedLevels[level][j].year) {
          dataAllLevels[level][i].number = groupedLevels[level][j].number;
        }
      }
    }
    i++;
  }

  // Reassemble into array
  const chartData: { x: number; y: number }[][] = [0, 1, 2].map((i) => {
    return dataAllLevels[i].map((row) => {
      return { x: row.year, y: row.number } as { x: number; y: number };
    });
  });

  return chartData;
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
  // Fetch aggregated data
  const indicatorQuery: UseQueryResult<Indicator[], unknown> =
    useIndicatorQuery(indicatorParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  // Set indicator colour from value and colour limits
  const levels: IndicatorLevelsV2[] =
    indicatorQuery.data
      ?.map((row: Indicator) => {
        const rowLevel = level(row);
        const indicatorLevel =
          row.dg !== null && row.dg >= minDG && rowLevel != null
            ? mapLevel(rowLevel)
            : -1;
        return indicatorLevel !== -1
          ? {
              ind_id: row.ind_id,
              year: row.year,
              level: indicatorLevel as 0 | 1 | 2,
            }
          : null;
      })
      .filter((item): item is IndicatorLevelsV2 => item !== null) ?? [];

  // Remove duplicates due to registries under multiple medfields
  const uniqueLevels = levels.filter(
    (obj1, i, arr) =>
      arr.findIndex(
        (obj2) =>
          obj2.ind_id === obj1.ind_id &&
          obj2.year === obj1.year &&
          obj2.level === obj1.level,
      ) === i,
  );

  // Count indicators per level per year
  const groupedLevels = countLevels(uniqueLevels);

  // Fill missing years with zero
  let chartData = setMissingToZero(
    groupedLevels,
    indicatorParams.startYear,
    indicatorParams.endYear,
  );

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
        },
        {
          data: chartData[1].map((row) => row.y),
          curve: "linear",
          color: levelYellowColours[1],
          valueFormatter: legendValueFormatter,
          label: "Middels",
        },
        {
          data: chartData[2].map((row) => row.y),
          curve: "linear",
          color: levelRedColours[1],
          valueFormatter: legendValueFormatter,
          label: "Lav",
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
