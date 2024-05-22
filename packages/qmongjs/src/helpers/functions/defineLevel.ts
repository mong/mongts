import { Indicator, IndicatorData, DataPoint } from "types";

const getLevel = (
  levelGreen: number | null,
  levelYellow: number | null,
  levelDirection: number | null,
  value: number,
) => {
  if (
    levelGreen === undefined ||
    levelGreen === null ||
    levelDirection === null ||
    value == null
  ) {
    return;
  }

  // If levelYellow is NULL: set to levelGreen
  const yellow = levelYellow != null ? levelYellow : levelGreen;

  if (
    (levelDirection === 0 && value <= levelGreen) ||
    (levelDirection != 0 && value >= levelGreen)
  ) {
    return "H";
  } else if (
    (levelDirection === 0 && value > yellow) ||
    (levelDirection != 0 && value < yellow)
  ) {
    return "L";
  } else {
    return "M";
  }
};

export const level = (indicatorData: Indicator) => {
  const { level_green, level_yellow, level_direction } = indicatorData;

  return getLevel(
    level_green,
    level_yellow,
    level_direction,
    indicatorData.var,
  );
};

export const level2 = (indicatorData: IndicatorData, dataPoint: DataPoint) => {
  const { levelGreen, levelYellow, levelDirection } = indicatorData;

  return getLevel(levelGreen, levelYellow, levelDirection, dataPoint.var);
};
