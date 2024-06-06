import { Indicator } from "types";

/**
 * Calculates the last complete year based on the delivery_latest_affirm date in the indicatorData array.
 *
 * @param {Indicator[]} indicatorData - An array of Indicator objects containing the delivery_latest_affirm date.
 * @param {number} treatmentYear - The treatment year to compare against.
 * @param {boolean} [alwaysReturnYear=false] - If true, always returns the last complete year even if it is after the treatment year.
 * @returns {number | undefined} - The last complete year, or undefined if the delivery_latest_affirm date is not available or if the last complete year is after the treatment year and alwaysReturnYear is false.
 */
export function getLastCompleteYear(
  indicatorData: Indicator[],
  treatmentYear: number,
  alwaysReturnYear: boolean = false,
): number | undefined {
  // Add two day to the delivery_latest_affirm date, in case the date is set to late December.
  // Thus, if delivery_latest_affirm date is set to December 31 2020 then new date will be January 2 2021.
  // Then delivery_latest_affirm_year will be defined as 2021 - 1 = 2020.
  const delivery_latest_affirm_year = indicatorData[0].delivery_latest_affirm
    ? new Date(
        new Date(indicatorData[0].delivery_latest_affirm).setDate(
          new Date(indicatorData[0].delivery_latest_affirm).getDate() + 2,
        ),
      ).getFullYear() - 1
    : undefined;

  // Only define lastCompleteYear if it is before the year of the data.
  const lastCompleteYear =
    (delivery_latest_affirm_year &&
      treatmentYear > delivery_latest_affirm_year) ||
    alwaysReturnYear
      ? delivery_latest_affirm_year
      : undefined;

  return lastCompleteYear;
}
