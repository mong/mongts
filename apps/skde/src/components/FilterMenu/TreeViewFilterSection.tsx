import type { FilterSettingsValue } from "./FilterSettingsContext";
/**
 * The structure of a node in the tree data used with the TreeViewFilterSection
 * component
 */
export type TreeViewFilterSectionNode = {
  nodeValue: FilterSettingsValue;
  children?: TreeViewFilterSectionNode[];
};

/**
 * Same as FilterSettingsValue with the addition of a property with the
 * parent ids as an array of strings.
 */
export type TreeViewFilterSettingsValue = FilterSettingsValue & {
  parentIds: string[];
};

/**
 * Props for the TreeViewFilterSection component, which extends the
 * FilterMenuSectionProps used with the FilterMenu component. Accepts the
 * treeData prop, which is an array of TreeViewFilterSectionNode objects
 * representing the tree structure of the filter options. Also accepts the
 * multiselect prop, which is a boolean that determines whether the filter
 * is single or multi-select. If an autoUncheckedId is provided, e.g., "all",
 * the component will automatically uncheck this node when another node is
 * checked.
 */

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
