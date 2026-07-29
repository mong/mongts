import _ from "lodash";
import { DISPLAY_LEVELS, LEVEL_LABELS, MAX_BAR_WIDTH_PX } from "./constants";
import type {
  AchievementLevel,
  ChartData,
  ChartPoint,
  GroupedLevels,
  YearAchievement,
} from "./types";

export const mapIndicatorLevel = (
  indicatorLevel: string,
): AchievementLevel["level"] => {
  switch (indicatorLevel) {
    case "H":
      return 0;
    case "M":
      return 1;
    case "L":
      return 2;
    default:
      return -1;
  }
};

export const dedupeAchievementLevels = (
  levels: AchievementLevel[],
): AchievementLevel[] => {
  const seen = new Set<string>();

  return levels.filter((level) => {
    const key = `${level.ind_id}:${level.year}:${level.level}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const countLevels = (levels: AchievementLevel[]): GroupedLevels => {
  const grouped: GroupedLevels = { 0: [], 1: [], 2: [] };

  _(levels)
    .countBy((row) => [row.level, row.year].toString())
    .forEach((count, key) => {
      const [level, year] = key.split(",");
      if (level === "-1") {
        return;
      }

      grouped[level as "0" | "1" | "2"].push({
        year: Number.parseInt(year, 10),
        number: count,
      });
    });

  return grouped;
};

export const setMissingToZero = (
  groupedLevels: GroupedLevels,
  minYear?: number,
  maxYear?: number,
): ChartData => {
  if (minYear === undefined || maxYear === undefined) {
    return [[], [], []];
  }

  const dataByLevel: { year: number; number: number }[][] = [[], [], []];
  let yearIndex = 0;

  for (let year = minYear; year <= maxYear; year++) {
    for (let level = 0; level < 3; level++) {
      dataByLevel[level][yearIndex] = { year, number: 0 };

      for (const row of groupedLevels[level]) {
        if (row.year === year) {
          dataByLevel[level][yearIndex].number = row.number;
          break;
        }
      }
    }

    yearIndex++;
  }

  return [0, 1, 2].map((level) =>
    dataByLevel[level].map(
      (row) => ({ x: row.year, y: row.number }) as ChartPoint,
    ),
  ) as ChartData;
};

export const normaliseChartData = (data: ChartData): ChartData => {
  for (let i = 0; i < data[0].length; i++) {
    const sumAll = data[0][i].y + data[1][i].y + data[2][i].y;

    if (sumAll === 0) {
      continue;
    }

    data[0][i].y = Math.round((data[0][i].y / sumAll) * 100);
    data[1][i].y = Math.round((data[1][i].y / sumAll) * 100);
    data[2][i].y = Math.round((data[2][i].y / sumAll) * 100);
  }

  return data;
};

export const buildYearlyAchievements = (
  chartData: ChartData,
): YearAchievement[] => {
  return chartData[0].map((row, index) => ({
    year: row.x,
    indicators: DISPLAY_LEVELS.map((displayLevel, levelIndex) => ({
      level: displayLevel,
      label: LEVEL_LABELS[displayLevel],
      result: chartData[levelIndex][index].y,
    })),
  }));
};

export const getDisplayYears = (
  startYear: number,
  endYear: number,
): number[] => {
  const minYear = Math.min(startYear, endYear);
  const maxYear = Math.max(startYear, endYear);
  return _.range(maxYear, minYear - 1, -1);
};

export const getBarWidth = (result: number): string => {
  if (result <= 0) {
    return "0px";
  }

  const clampedResult = Math.min(result, 100);
  const scaledWidthPx = Math.round((clampedResult / 100) * MAX_BAR_WIDTH_PX);
  return `${Math.max(6, scaledWidthPx)}px`;
};
