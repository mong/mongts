import { FilterSettingsValue } from "../FilterSettingsContext";
import { maxYear, minYear, defaultYear } from "../../../app_config";

/**
 * Gets the years available for selection
 *
 * @returns The an object with year values and the default year
 */
export const getYearOptions = (): {
  values: FilterSettingsValue[];
  default: FilterSettingsValue;
} => {
  const defaultYearString = defaultYear.toString();
  const yearValues: FilterSettingsValue[] = [];
  let yearString: string;

  for (let year = minYear; year <= maxYear; year++) {
    yearString = year.toString();
    yearValues.push({ value: yearString, valueLabel: yearString });
  }

  return {
    values: yearValues,
    default: { value: defaultYearString, valueLabel: defaultYearString },
  };
};

/**
 * Gets the goal achievement options available for selection
 *
 * @returns The an object with values and the default value
 */
export const getAchievementLevelOptions = (): {
  values: FilterSettingsValue[];
  default: FilterSettingsValue;
} => {
  const goalAchievementValues = [
    { value: "", valueLabel: "Alle måloppnåelser" },
    { value: "H", valueLabel: "Høy måloppnåelse" },
    { value: "M", valueLabel: "Moderat måloppnåelse" },
    { value: "L", valueLabel: "Lav måloppnåelse" },
  ];
  return {
    values: goalAchievementValues,
    default: goalAchievementValues[0],
  };
};
