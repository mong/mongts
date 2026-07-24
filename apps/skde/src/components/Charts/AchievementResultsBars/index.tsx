import { Box, Icon, type IconName } from "@mong/material-ui";
import type { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import { level, minDG, useIndicatorQuery } from "qmongjs";
import type { JSX } from "react";
import type { Indicator } from "types";
import {
  levelGreenColours,
  levelRedColours,
  levelYellowColours,
} from "../../../app_config";

export type AchievementResultsBarsProps = {
  registerShortName?: string;
  unitNames?: string[];
  unitLevel?: "nation" | "rhf" | "hf" | "hospital";
  startYear: number;
  endYear: number;
};

export type AchievementLevel = {
  ind_id: string;
  year: number;
  level: 0 | 1 | 2 | -1;
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
const mapLevel = (indicatorLevel: string): AchievementLevel["level"] => {
  let mappedLevel: AchievementLevel["level"];
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

export const countLevels = (levels: AchievementLevel[]) => {
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

const colors = {
  high: levelGreenColours[1],
  medium: levelYellowColours[1],
  low: levelRedColours[1],
};

const DISPLAY_LEVELS = ["high", "medium", "low"] as const;
const LEVEL_LABELS: Record<(typeof DISPLAY_LEVELS)[number], string> = {
  high: "Høy",
  medium: "Middels",
  low: "Lav",
};
const MAX_BAR_WIDTH_PX = 128;

type DisplayLevel = "high" | "medium" | "low";

type YearAchievement = {
  year: number;
  indicators: {
    level: DisplayLevel;
    label: string;
    result: number;
  }[];
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
      data[0][i].y = Math.round((data[0][i].y / sumAll) * 100);
      data[1][i].y = Math.round((data[1][i].y / sumAll) * 100);
      data[2][i].y = Math.round((data[2][i].y / sumAll) * 100);
    } // Otherwise all the y values are zero
  }

  return data;
};

export const AchievementResultsBars = (
  achievementParams: AchievementResultsBarsProps,
) => {
  // Fetch aggregated data
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(achievementParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const indicatorRows: Indicator[] = Array.isArray(indicatorQuery.data)
    ? indicatorQuery.data
    : [];

  // Set indicator colour from value and colour limits
  const levels: AchievementLevel[] = indicatorRows.map((row: Indicator) => {
    const hasValidDg =
      row.dg !== null && row.dg !== undefined && row.dg >= minDG;
    const indicatorLevel: AchievementLevel["level"] = hasValidDg
      ? mapLevel(level(row) ?? "")
      : -1;
    return { ind_id: row.ind_id, year: row.year, level: indicatorLevel };
  });

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
    achievementParams.startYear,
    achievementParams.endYear,
  );

  chartData = normaliseChartData(chartData);

  const iconByLevel: Record<DisplayLevel, IconName> = {
    high: "target_level_high" as IconName,
    medium: "target_level_medium" as IconName,
    low: "target_level_low" as IconName,
  };

  const getBarWidth = (result: number) => {
    if (result <= 0) {
      return "0px";
    }

    const clampedResult = Math.min(result, 100);
    const scaledWidthPx = Math.round((clampedResult / 100) * MAX_BAR_WIDTH_PX);

    // Ensure very small non-zero percentages are still visible.
    return `${Math.max(6, scaledWidthPx)}px`;
  };

  const yearlyAchievements: YearAchievement[] = chartData[0].map(
    (row, index) => ({
      year: row.x,
      indicators: DISPLAY_LEVELS.map((displayLevel, levelIndex) => ({
        level: displayLevel,
        label: LEVEL_LABELS[displayLevel],
        result: chartData[levelIndex][index].y,
      })),
    }),
  );

  const minYear = Math.min(
    achievementParams.startYear,
    achievementParams.endYear,
  );
  const maxYear = Math.max(
    achievementParams.startYear,
    achievementParams.endYear,
  );
  const yearsToShow = _.range(maxYear, minYear - 1, -1);

  const renderAchievementBars = (
    barData: YearAchievement[],
    years: number[],
  ): JSX.Element[] => {
    const achievementByYear = new Map(
      barData.map((achievement) => [achievement.year, achievement] as const),
    );
    const uniqueYears = [...new Set(years)];
    const filteredData = uniqueYears
      .map((year) => achievementByYear.get(year))
      .filter(
        (achievement): achievement is YearAchievement =>
          achievement !== undefined,
      );

    return filteredData.map(({ year, indicators }, index) => (
      <div key={year}>
        {index > 0 && <div className="border-y border-neutral-100" />}
        <Box
          padded={false}
          rounded={false}
          className="flex gap-6 py-3"
          color="transparent"
        >
          <div>
            <h6>{year}</h6>
          </div>
          <div className="flex flex-col gap-2 text-small font-semibold">
            {indicators.map((indicator) => (
              <div
                key={`${year}-${indicator.level}`}
                className="flex gap-2 items-center"
              >
                <Icon symbol={iconByLevel[indicator.level]} />
                <div className="flex w-auto text-left items-center gap-2">
                  <div
                    className="h-2 rounded-r-lg"
                    style={{
                      width: getBarWidth(indicator.result),
                      backgroundColor: colors[indicator.level],
                    }}
                  />
                  <div className="flex whitespace-nowrap">
                    {indicator.label}
                    <span className="font-normal pl-1">
                      {indicator.result} %
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </div>
    ));
  };

  return renderAchievementBars(yearlyAchievements, yearsToShow);
};
