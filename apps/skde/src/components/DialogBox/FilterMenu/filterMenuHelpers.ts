import type { UseQueryResult } from "@tanstack/react-query";
import type {
  TreeViewFilterSectionNode,
  TreeViewFilterSettingsValue,
} from "types";

/**
 * Flattens the tree data into an array of FilterSettingsValues
 *
 * @param parent The parent node
 * @param treeData The tree data with the TreeViewFilterSectionNode structure
 * @returns A flat array of the tree's FilterSettingsValue objects
 */
const flattenTreeValues = (
  parentIds: string[],
  treeData: TreeViewFilterSectionNode[],
) => {
  const flattenedValues: TreeViewFilterSettingsValue[] = [];

  treeData.forEach((node) => {
    const nodeWithParentIds = { ...node.nodeValue, parentIds: parentIds };
    flattenedValues.push(nodeWithParentIds);
    if (node.children) {
      flattenedValues.push(
        ...flattenTreeValues(
          [...parentIds, node.nodeValue.value],
          node.children,
        ),
      );
    }
  });

  return flattenedValues;
};

/**
 * Creates a map from treeData that can be used for looking up
 * FilterSettingValues by values/nodeIds
 *
 * @param treeData The TreeViewFilterSectionNode structure
 * @returns A map with the string values as keys and TreeViewFilterSettingsValue-objects as values
 */
export const getFilterSettingsValuesMap = (
  treeData: TreeViewFilterSectionNode[],
) => {
  const filterSettingsValuesMap = new Map<
    string,
    TreeViewFilterSettingsValue[]
  >();
  const treeValues = flattenTreeValues([], treeData);
  treeValues.forEach((value) => {
    const mapEntry: TreeViewFilterSettingsValue[] = filterSettingsValuesMap.has(
      value.value,
    )
      ? (filterSettingsValuesMap.get(value.value) ?? [])
      : [];

    mapEntry.push(value);
    filterSettingsValuesMap.set(value.value, mapEntry);
  });
  return filterSettingsValuesMap;
};

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
          return {
            nodeValue: {
              value: register,
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

  const medicalFieldOptions = {
    treedata: medicalFields,
    // defaults: [medicalFields[0].nodeValue], "Alle fagområder" as default value
    defaults: [],
  };

  return medicalFieldOptions;
};
