import type {} from "@mui/x-tree-view/themeAugmentation";
import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ExpandMoreRounded, ChevronRightRounded } from "@mui/icons-material";
import { SimpleTreeView } from "@mui/x-tree-view";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";
import { TreeViewFilterSectionItem } from "./TreeViewFilterSectionItem";
import Alert from "@mui/material/Alert";
import TreeViewSearchBox from "./TreeViewSearchBox";

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
type TreeViewSectionProps = FilterMenuSectionProps & {
  multiselect?: boolean;
  maxselections?: number;
  treedata: TreeViewFilterSectionNode[];
  autouncheckid?: string;
  searchbox?: boolean;
};

/**
 * Recursive function that builds the TreeView from the tree data one level at a time
 *
 * @param treeData The tree data with the TreeViewFilterSectionNode structure
 * @param selectedIds The ids (values) of the currently selected nodes
 * @param filterKey The key for the filter section
 * @param handleCheckboxChange The function to handle the checkbox click events
 * @returns A tree view item for the corrent node and its children
 */
const buildTreeLevel = (
  treeData: TreeViewFilterSectionNode[],
  selectedIds: string[],
  filterKey: string,
  handleCheckboxChange: (checked: boolean, value: string) => void,
  toggleExpand: (value: string) => void,
  autoUncheckId?: string,
  multiselect?: boolean,
  parent?: string,
) => {
  return treeData.map((node) => {
    return (
      <TreeViewFilterSectionItem
        key={`tree-view-item-${filterKey}-${node.nodeValue.value}`}
        filterKey={filterKey}
        labeledValue={node.nodeValue}
        selectedIds={selectedIds}
        autoUncheckId={autoUncheckId}
        handleCheckboxChange={handleCheckboxChange}
        toggleExpand={toggleExpand}
        multiselect={multiselect}
        parentKey={parent}
      >
        {node.children &&
          buildTreeLevel(
            node.children,
            selectedIds,
            filterKey,
            handleCheckboxChange,
            toggleExpand,
            autoUncheckId,
            multiselect,
            node.nodeValue.value,
          )}
      </TreeViewFilterSectionItem>
    );
  });
};

/**
 * Function for building a TreeView from tree data
 *
 * @param props TreeViewSectionProps with the treedata, etc.
 * @param selectedIds The ids (values) of the currently selected nodes
 * @param handleCheckboxChange The function to handle the checkbox click events
 * @returns The TreeItem components for the TreeView
 */
const buildTreeView = (
  props: TreeViewSectionProps,
  selectedIds: string[],
  handleCheckboxChange: (checked: boolean, value: string) => void,
  toggleExpand: (value: string) => void,
) => {
  return (
    <>
      {buildTreeLevel(
        props.treedata,
        selectedIds,
        props.filterkey,
        handleCheckboxChange,
        toggleExpand,
        props.autouncheckid,
        props.multiselect,
      )}
    </>
  );
};

/**
 * Function used to retrieve the selected values from the filter settings state
 *
 * @param values The FilterSettingsValue array for the section
 * @returns The selected values from the filter settings state or undefined
 */
const getSelectedNodeIds = (values: FilterSettingsValue[] | undefined) => {
  return values ? values.map((value) => value.value) : [];
};

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
export const initFilterSettingsValuesMap = (
  treeData: TreeViewFilterSectionNode[],
) => {
  const filterSettingsValuesMap = new Map<
    string,
    TreeViewFilterSettingsValue
  >();
  const treeValues = flattenTreeValues([], treeData);
  treeValues.forEach((value) => {
    filterSettingsValuesMap.set(value.value, value);
  });
  return filterSettingsValuesMap;
};

/**
 * Gets a list of the nodes to expand, including their anchestor ids, given the
 * selectedIds, which can be at various levels.
 *
 * @param selectedIds The selected node ids
 * @param filterSettingsValuesMap The map used for looking up FilterSettingValues by node ids
 * @returns A list of node ids that should be expanded
 */
const buildExpandedNodeList = (
  selectedIds: string[],
  filterSettingsValuesMap: Map<string, TreeViewFilterSettingsValue>,
) => {
  const expanded: string[] = [];

  selectedIds.forEach((id) => {
    const value = filterSettingsValuesMap.get(id);
    if (value && value.parentIds && value.parentIds.length > 0) {
      // A classic for-loop, which constructs an itemId by taking the
      // current ID and prepending it with its parent ID (if any). See
      // the variable uniqueItemId in the component TreeViewFilterSectionItem.
      // The IDs in values.parentIds has to be ordered from root toward
      // leaf item. The IDs are added to the list of items that should be
      // expanded in the tree. Leaf nodes are not included.
      for (let i = 0; i < value.parentIds.length; i++) {
        let itemId;

        if (i === 0) {
          itemId = value.parentIds[i];
        } else {
          itemId = `${value.parentIds[i - 1]}-${value.parentIds[i]}`;
        }

        // Add if not already present in the list
        if (!expanded.includes(itemId)) {
          expanded.push(itemId);
        }
      }
    }
  });

  return expanded;
};

/**
 * Component for use with the FilterMenu component, which uses a TreeView to
 * display filter options. The component can be used for either single or
 * multi-select filters.
 *
 * @param props The props for the TreeViewFilterSection
 * @returns The TreeViewFilterSection component
 */
export function TreeViewFilterSection(props: TreeViewSectionProps) {
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  const isMultiSelect = props.multiselect ?? true;
  const searchBox = props.searchbox ?? false;
  const maxSelections = props.maxselections;
  const autoUncheckId = props.autouncheckid;
  const filterKey = props.filterkey;
  const treeData = props.treedata;
  const selectedIds = getSelectedNodeIds(filterSettings.map.get(filterKey));
  const filterSettingsValuesMap = initFilterSettingsValuesMap(treeData);
  const [showMaxSelectionAlert, setMaxSelectionAlert] = useState(false);
  const [expanded, setExpanded] = useState(
    buildExpandedNodeList(selectedIds, filterSettingsValuesMap),
  );
  const [treeViewKey, setTreeViewKey] = useState(0);

  useEffect(() => {
    setExpanded(buildExpandedNodeList(selectedIds, filterSettingsValuesMap));
    setTreeViewKey(treeViewKey + 1);
  }, [props.refreshState]);

  /**
   * Handler for updating the selected nodes in the filter settings state
   */
  const handleCheckboxClick = (
    checked: boolean,
    nodeIds: string | string[],
    autoUncheckId?: string,
  ) => {
    let updatedSelectedIds = selectedIds;

    if (!Array.isArray(nodeIds)) {
      nodeIds = [nodeIds];
    }

    if (checked) {
      if (isMultiSelect) {
        if (maxSelections && selectedIds.length >= maxSelections) {
          setMaxSelectionAlert(true);
          return;
        } else {
          let selectedIdsFiltered = selectedIds;
          if (autoUncheckId && !nodeIds.includes(autoUncheckId)) {
            selectedIdsFiltered = selectedIds.filter(
              (id) => id !== autoUncheckId,
            );
            updatedSelectedIds = Array.from(
              new Set(selectedIdsFiltered.concat(nodeIds)),
            );
          } else if (autoUncheckId && nodeIds.includes(autoUncheckId)) {
            updatedSelectedIds = [autoUncheckId];
          } else {
            updatedSelectedIds = Array.from(
              new Set(selectedIdsFiltered.concat(nodeIds)),
            );
          }
        }
      } else {
        updatedSelectedIds = nodeIds;
      }

      const selectedFilterSettingValues = updatedSelectedIds
        .map((nodeId) => filterSettingsValuesMap.get(nodeId))
        .filter((value) => value !== undefined)
        .flat() as TreeViewFilterSettingsValue[];

      filterSettingsDispatch({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: filterKey,
          values: selectedFilterSettingValues.map((value) => {
            return {
              value: value.value,
              valueLabel: value.valueLabel,
            };
          }),
        },
      });
    } else {
      filterSettingsDispatch({
        type: FilterSettingsActionType.DEL_SECTION_SELECTIONS,
        sectionSetting: {
          key: filterKey,
          values: nodeIds.map((nodeId) => {
            return { value: nodeId, valueLabel: "" };
          }),
        },
      });
    }

    if (maxSelections !== undefined) {
      setMaxSelectionAlert(false);
    }
  };

  /**
   * Search handler for the search box. Selects and expands matching nodes
   *
   * @param searchText The text entered in the search box
   */
  const handleSearch = (itemId: string[]) => {
    handleCheckboxClick(true, itemId, autoUncheckId);
    const nodeAndAnchestorIds = buildExpandedNodeList(
      itemId,
      filterSettingsValuesMap,
    );
    const newExpanded = Array.from(
      new Set<string>(expanded.concat(nodeAndAnchestorIds)),
    );
    setExpanded(newExpanded);
  };

  /** Toggle expanded state for a node */
  const toggleExpanded = (value: string) => {
    if (expanded.includes(value)) {
      setExpanded(expanded.filter((id) => id !== value));
    } else {
      setExpanded([...expanded, value]);
    }
  };

  return (
    <Box>
      {showMaxSelectionAlert && (
        <Alert
          sx={{ marginBottom: 1 }}
          severity="info"
          variant="filled"
        >{`Du kan maksimalt huke av ${maxSelections} valg.`}</Alert>
      )}
      {searchBox && (
        <TreeViewSearchBox
          options={Array.from(filterSettingsValuesMap.values())}
          onSearch={handleSearch}
        />
      )}
      <SimpleTreeView
        key={treeViewKey}
        aria-label={`${props.sectiontitle} (TreeView)}`}
        data-testid={`tree-view-section-${props.sectionid}`}
        slots={{
          expandIcon: ChevronRightRounded,
          collapseIcon: ExpandMoreRounded,
        }}
        defaultExpandedItems={expanded}
        expandedItems={expanded}
        onItemFocus={(event, itemId) => {
          const checkbox = document.getElementById(
            `checkbox-${filterKey}-${itemId}`,
          );
          if (checkbox) {
            // Focus the checkbox if the node is not the first node in the tree.
            // The focus is set to the checkbox to allow for consitent Tab and Shift+Tab
            // navigation and disabling parallel navigation with the arrow keys.
            // Focus on the first node in the tree is allowed because of Shift+Tab
            // navigation, which otherwise gets stuck on the checkbox.
            if (itemId !== props.treedata[0].nodeValue.value) {
              checkbox.focus();
            }
          }
        }}
        onSelectedItemsChange={(event, itemId) => {
          if (typeof itemId == "string") {
            toggleExpanded(itemId);
          }
        }}
      >
        {buildTreeView(props, selectedIds, handleCheckboxClick, toggleExpanded)}
      </SimpleTreeView>
    </Box>
  );
}
