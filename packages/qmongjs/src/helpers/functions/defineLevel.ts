import { Indicator } from "types";

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
