import { FilterSettingsValue } from "../FilterSettingsContext";
import { maxYear, minYear, defaultYear, app_text } from "../../../app_config";
import { UseQueryResult } from "@tanstack/react-query";
import { TreeViewFilterSectionNode } from "../TreeViewFilterSection";

/**
 * Gets the years available for selection
 *
 * @returns An object with year values and the default year
 */
export const getYearOptions = (
  min?: number,
  max?: number,
): {
  values: FilterSettingsValue[];
  default: FilterSettingsValue;
} => {
  const defaultYearString = max?.toString() ?? defaultYear.toString();
  const yearValues: FilterSettingsValue[] = [];
  let yearString: string;

  for (let year = min ?? minYear; year <= (max ?? maxYear); year++) {
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
 * @returns An object with values and the default value
 */
export const getAchievementLevelOptions = (): {
  values: FilterSettingsValue[];
  // default: FilterSettingsValue;
  default: FilterSettingsValue | null;
} => {
  const goalAchievementValues = [
    // { value: "", valueLabel: "Alle måloppnåelser" },
    { value: "H", valueLabel: app_text.indicators.high.text },
    { value: "M", valueLabel: app_text.indicators.moderate.text },
    { value: "L", valueLabel: app_text.indicators.low.text },
  ];
  return {
    values: goalAchievementValues,
    // default: goalAchievementValues[0],
    default: null,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...unitnames.map((unit: any) => {
        return {
          nodeValue: {
            value: unit.rhf,
            valueLabel: unit.rhf,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children: unit.hf.map((hf: any) => {
            return {
              nodeValue: {
                value: hf.hf,
                valueLabel: hf.hf_full,
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    ] as TreeViewFilterSectionNode[],
  };
};

/** The prefix used in the query params for the register names */
const registerQueryParamPrefix = "reg-";

/**
 * Formats a register name for use in query parameters, i.e., adding a prefix.
 *
 * @param register Plain register short name
 * @returns Register name formatted for use in query parameters
 */
export const encodeRegisterQueryParam = (register: string) => {
  return `${registerQueryParamPrefix}${register}`;
};

/**
 * Decode a register name formatted for query parameters, i.e., remove prefix.
 *
 * @param register Plain register short name
 * @returns Register name formatted for use in query parameters
 */
export const decodeRegisterQueryParam = (registerParam: string) => {
  if (registerParam && registerParam.startsWith(registerQueryParamPrefix)) {
    return registerParam.substring(registerQueryParamPrefix.length);
  } else {
    return registerParam;
  }
};

/**
 * Gets the medical field options available for selection
 *
 * @returns The tree structure with medical field options and the default value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMedicalFields = (medicalFieldData: any, registryData: any) => {
  let medicalFields: TreeViewFilterSectionNode[];
  if (medicalFieldData && registryData) {
    medicalFields = medicalFieldData.map(
      (field: { shortName?: string; name?: string; registers?: string[] }) => ({
        nodeValue: {
          value: field.shortName,
          valueLabel: field.name,
        },
        children: field.registers?.map((register: string) => {
          const prefixedRegister = encodeRegisterQueryParam(register);
          return {
            nodeValue: {
              value: prefixedRegister,
              valueLabel:
                registryData.find(
                  (reg: { rname: string }) => reg.rname === register,
                )?.short_name ?? register,
            },
          };
        }),
      }),
    );
  } else {
    medicalFields = [];
  }

  // Add the option "Alle fagområder" to the top of the selection tree
  // medicalFields.unshift({
  //   nodeValue: { value: "all", valueLabel: "Alle fagområder" },
  // });

  const medicalFieldOptions = {
    treedata: medicalFields,
    // defaults: [medicalFields[0].nodeValue], "Alle fagområder" as default value
    defaults: [],
  };

  return medicalFieldOptions;
};
