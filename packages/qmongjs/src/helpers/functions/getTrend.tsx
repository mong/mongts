import { DataPoint } from "types";

// Return 1 if the result is better, -1 if it is worse and 0 if it is unchanged.
export const getTrend = (
  point1: DataPoint | null,
  point2: DataPoint | null,
  levelDirection: number | null,
  numberOfDecimals: number | undefined,
) => {
  if (
    !point1 ||
    !point2 ||
    point1.var === null ||
    point2.var === null ||
    levelDirection === null
  ) {
    return null;
  }

  let tolerance = 1;

  if (numberOfDecimals !== undefined) {
    tolerance /= Math.pow(10, numberOfDecimals);
  }

  let difference = point2.var - point1.var;

  if (levelDirection === 0) {
    difference *= -1;
  }

  if (Math.abs(difference) * 100 >= tolerance) {
    return Math.sign(difference);
  } else {
    return 0;
  }
};
