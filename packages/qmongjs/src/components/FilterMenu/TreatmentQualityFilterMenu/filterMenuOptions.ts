import { FilterSettingsValue } from "../FilterSettingsContext";
import { maxYear, minYear, defaultYear, app_text } from "../../../app_config";
import { UseQueryResult } from "@tanstack/react-query";

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

/**
 * Builds tree data for the treatment units filter section from
 * unitNamesQuery.nestedUnitNames.
 *
 * @param unitNamesQuery
 * @returns
 */
export const getTreatmentUnitsTree = (
  unitNamesQuery: UseQueryResult<any, unknown>,
) => {
  const unitnames = unitNamesQuery.data?.nestedUnitNames;
  if (unitnames === undefined)
    return {
      defaults: [{ value: "Nasjonalt", valueLabel: "Nasjonalt" }],
      treedata: [
        { nodeValue: { value: "Nasjonalt", valueLabel: "Nasjonalt" } },
      ],
    };

  return {
    defaults: [{ value: "Nasjonalt", valueLabel: "Nasjonalt" }],
    treedata: [
      { nodeValue: { value: "Nasjonalt", valueLabel: "Nasjonalt" } },
      ...unitnames.map((unit: any) => {
        return {
          nodeValue: {
            value: unit.rhf,
            valueLabel: unit.rhf,
          },
          children: unit.hf.map((hf: any) => {
            return {
              nodeValue: {
                value: hf.hf,
                valueLabel: hf.hf_full,
              },
              children: hf.hospital.map((hospital: any) => {
                return {
                  nodeValue: {
                    value: hospital,
                    valueLabel: hospital,
                  },
                };
              }),
            };
          }),
        };
      }),
    ],
  };
};
