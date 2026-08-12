import _ from "lodash";
import { level, minDG } from "qmongjs";
import type { Indicator, IndicatorLineChartDataPoint } from "types";

export type IndicatorLevelsV2 = {
  ind_id: string;
  year: number;
  level: 0 | 1 | 2;
};

type GroupedLevels = {
  0: IndicatorLineChartDataPoint[];
  1: IndicatorLineChartDataPoint[];
  2: IndicatorLineChartDataPoint[];
};

// Define high achievement as 0, medium as 1 and low as 2
// If the limits are not set the level is undefined
// Let -1 be undefined
const mapLevel = (indicatorLevel: string | undefined) => {
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
        0: [] as IndicatorLineChartDataPoint[],
        1: [] as IndicatorLineChartDataPoint[],
        2: [] as IndicatorLineChartDataPoint[],
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

export const formatChartData = (
  data: Indicator[],
  startYear: number,
  endYear: number,
) => {
  // Set indicator colour from value and colour limits
  const levels: IndicatorLevelsV2[] =
    data
      ?.map((row: Indicator) => {
        const rowLevel = level(row);
        const indicatorLevel =
          row.dg === null || row.dg >= minDG ? mapLevel(rowLevel) : -1;
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
  const chartData = setMissingToZero(groupedLevels, startYear, endYear);

  return chartData;
};
