import { Indicator } from "types";

const numWithValidDigits = (value: number, decimals: number) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const level = (indicatorData: Indicator) => {
  const { level_green, level_yellow, level_direction, sformat } = indicatorData;
  if (
    level_green === null ||
    level_yellow === null ||
    level_direction === null
  ) {
    return;
  }
  let decimalPoints = sformat ? Number(sformat.replace(/[^0-9]/g, "")) : 0;
  decimalPoints = sformat?.includes("%") ? decimalPoints + 2 : decimalPoints;
  const value = numWithValidDigits(indicatorData.var, decimalPoints);
  const green = numWithValidDigits(level_green, decimalPoints);
  const yellow = numWithValidDigits(level_yellow, decimalPoints);

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
