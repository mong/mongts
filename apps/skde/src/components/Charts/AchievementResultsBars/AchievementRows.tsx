import { Box, Icon, type IconName } from "@mong/material-ui";
import type { JSX } from "react";
import { LEVEL_COLORS, LEVEL_ICONS } from "./constants";
import type { YearAchievement } from "./types";

type AchievementRowsProps = {
  achievements: YearAchievement[];
  years: number[];
  getBarWidth: (result: number) => string;
};

export const AchievementRows = ({
  achievements,
  years,
  getBarWidth,
}: AchievementRowsProps): JSX.Element[] => {
  const achievementByYear = new Map(
    achievements.map((achievement) => [achievement.year, achievement] as const),
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
      {index > 0 && <div className="border-y border-neutral-100 my-5.5" />}
      <Box
        padded={false}
        rounded={false}
        className="flex gap-6"
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
              <Icon
                symbol={LEVEL_ICONS[indicator.level] as IconName}
                size="small"
              />
              <div className="flex w-auto text-left items-center gap-2">
                <div
                  className="h-2 rounded-r-lg"
                  style={{
                    width: getBarWidth(indicator.result * 2),
                    backgroundColor: LEVEL_COLORS[indicator.level],
                  }}
                />
                <div className="flex whitespace-nowrap">
                  {indicator.label}
                  <span className="font-normal pl-1">{indicator.result} %</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  ));
};
