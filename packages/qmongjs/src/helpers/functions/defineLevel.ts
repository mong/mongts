import { Indicator, IndicatorData, DataPoint } from "types";

export const level = (indicatorData: Indicator) => {
  const { level_green, level_yellow, level_direction } = indicatorData;
  if (
    level_green === undefined ||
    level_green === null ||
    level_direction === null
  ) {
    return;
  }
  const value = indicatorData.var;
  // If level_yellow is NULL: set to level_green
  const yellow = level_yellow != null ? level_yellow : level_green;

  if (
    (level_direction === 0 && value <= level_green) ||
    (level_direction != 0 && value >= level_green)
  ) {
    return "H";
  } else if (
    (level_direction === 0 && value > yellow) ||
    (level_direction != 0 && value < yellow)
  ) {
    return "L";
  } else {
    return "M";
  }
};

export const level2 = (indicatorData: IndicatorData, dataPoint: DataPoint) => {
  const { levelGreen, levelYellow, levelDirection } = indicatorData;
  if (
    levelGreen === undefined ||
    levelGreen === null ||
    levelDirection === null ||
    dataPoint.var == null
  ) {
    return;
  }
  const value = dataPoint.var;
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
