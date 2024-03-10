import { FilterSettingsValue } from "../FilterSettingsContext";
import { maxYear, minYear, defaultYear, app_text } from "../../../app_config";

/** Maximum allowed number of selected treatment units */
export const maxSelectedTreatmentUnits = () => {
  return app_text.tu_list.max_nr_tu;
};

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
    { value: "", valueLabel: app_text.indicators.all.text },
    { value: "H", valueLabel: app_text.indicators.high.text },
    { value: "M", valueLabel: app_text.indicators.moderate.text },
    { value: "L", valueLabel: app_text.indicators.low.text },
  ];
  return {
    values: goalAchievementValues,
    default: goalAchievementValues[0],
  };
};

export const getQualityIndicatorOptions = (): {
  values: FilterSettingsValue[];
  default: FilterSettingsValue;
} => {
  const qualityIndicatorValues = [
    { value: "all", valueLabel: "Alle indikatorer" },
  ];
  return {
    values: qualityIndicatorValues,
    default: qualityIndicatorValues[0],
  };
}