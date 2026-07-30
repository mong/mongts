import type { UseQueryResult } from "@tanstack/react-query";
import { level, minDG, useIndicatorQuery } from "qmongjs";
import type { Indicator } from "types";
import { AchievementRows } from "./AchievementRows";
import type { AchievementLevel, AchievementResultsBarsProps } from "./types";
import {
  buildYearlyAchievements,
  countLevels,
  dedupeAchievementLevels,
  getBarWidth,
  getDisplayYears,
  mapIndicatorLevel,
  normaliseChartData,
  setMissingToZero,
} from "./utils";

export type { AchievementResultsBarsProps } from "./types";

// Denne eksporten blir ikke importert av noe annet. Kommentert ut for å tilfredstille knip
// export { countLevels, setMissingToZero } from "./utils";

export const AchievementResultsBars = (
  achievementParams: AchievementResultsBarsProps,
) => {
  // Fetch aggregated data
  const indicatorQuery: UseQueryResult<Indicator[], unknown> =
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
      // TODO: do no show data if row.dg is not defined
      row.dg ? row.dg >= minDG : true;
    const indicatorLevel: AchievementLevel["level"] = hasValidDg
      ? mapIndicatorLevel(level(row) ?? "")
      : -1;

    return { ind_id: row.ind_id, year: row.year, level: indicatorLevel };
  });

  const uniqueLevels = dedupeAchievementLevels(levels);
  const groupedLevels = countLevels(uniqueLevels);
  const chartDataWithGapsFilled = setMissingToZero(
    groupedLevels,
    achievementParams.startYear,
    achievementParams.endYear,
  );
  const chartData = normaliseChartData(chartDataWithGapsFilled);

  const yearlyAchievements = buildYearlyAchievements(chartData);
  const yearsToShow = getDisplayYears(
    achievementParams.startYear,
    achievementParams.endYear,
  );

  return (
    <AchievementRows
      achievements={yearlyAchievements}
      years={yearsToShow}
      getBarWidth={getBarWidth}
    />
  );
};
