import { Indicator } from "types";

const numWithValidDigits = (value: number, decimals: number) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const level = (indicatorData: Indicator) => {
  if (
    indicatorData.level_green === null ||
    indicatorData.level_yellow === null ||
    indicatorData.level_direction === null
  ) {
    return "";
  }
  let decimalPoints = indicatorData.sformat
    ? Number(indicatorData.sformat.replace(/[^0-9]/g, ""))
    : 0;
  decimalPoints = indicatorData.sformat?.includes("%")
    ? decimalPoints + 2
    : decimalPoints;
  const value = numWithValidDigits(indicatorData.var, decimalPoints);
  const green = numWithValidDigits(indicatorData.level_green, decimalPoints);
  const yellow = numWithValidDigits(indicatorData.level_yellow, decimalPoints);

  if (
    (indicatorData.level_direction === 0 && value <= green) ||
    (indicatorData.level_direction != 0 && value >= green)
  ) {
    return "H";
  } else if (
    (indicatorData.level_direction === 0 && value > yellow) ||
    (indicatorData.level_direction != 0 && value < yellow)
  ) {
    return "L";
  } else {
    return "M";
  }
};
