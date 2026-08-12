import type { UseQueryResult } from "@tanstack/react-query";
import type { TreeViewFilterSectionNode } from "../TreeViewFilterSection";

/**
 * Builds tree data for the treatment units filter section from
 * unitNamesQuery.nestedUnitNames.
 *
 * @param unitNamesQuery
 * @returns
 */
export const getTreatmentUnitsTree = (
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
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
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      ...unitnames.map((unit: any) => {
        return {
          nodeValue: {
            value: unit.rhf,
            valueLabel: unit.rhf,
          },
          // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
          children: unit.hf.map((hf: any) => {
            return {
              nodeValue: {
                value: hf.hf,
                valueLabel: hf.hf_full,
              },
              // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
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
const encodeRegisterQueryParam = (register: string) => {
  return `${registerQueryParamPrefix}${register}`;
};

/**
 * Gets the medical field options available for selection
 *
 * @returns The tree structure with medical field options and the default value
 */
export const getMedicalFields = (
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  medicalFieldData: any,
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  registryData: any,
  noPrefix = false,
) => {
  let medicalFields: TreeViewFilterSectionNode[];
  if (medicalFieldData && registryData) {
    medicalFields = medicalFieldData.map(
      (field: { shortName?: string; name?: string; registers?: string[] }) => ({
        nodeValue: {
          value: field.shortName,
          valueLabel: field.name,
        },
        children: field.registers?.map((register: string) => {
          const prefixedRegister = noPrefix
            ? register
            : encodeRegisterQueryParam(register);
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
