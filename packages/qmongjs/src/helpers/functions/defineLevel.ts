import { Indicator } from "types";

const numWithValidDigits = (value: number, decimals: number) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const level = (indicatorData: Indicator) => {
  const { level, level_green, level_yellow, level_direction, sformat } =
    indicatorData;
  if (level !== undefined) {
    return level;
  }
  if (
    level_green === undefined ||
    level_green === null ||
    level_direction === null
  ) {
    return;
  }
  let decimalPoints = sformat ? Number(sformat.replace(/[^0-9]/g, "")) : 0;
  decimalPoints = sformat?.includes("%") ? decimalPoints + 2 : decimalPoints;
  const value = numWithValidDigits(indicatorData.var, decimalPoints);
  const green = numWithValidDigits(level_green, decimalPoints);
  // If level_yellow is NULL: set to level_green
  const yellow =
    level_yellow != null
      ? numWithValidDigits(level_yellow, decimalPoints)
      : green;

  if (
    (level_direction === 0 && value <= green) ||
    (level_direction != 0 && value >= green)
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
