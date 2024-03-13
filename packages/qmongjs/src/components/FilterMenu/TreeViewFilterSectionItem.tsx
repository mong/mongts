import React, { PropsWithChildren } from "react";
import Checkbox from "@mui/material/Checkbox";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FilterSettingsValue } from "./FilterSettingsContext";

/**
 * Props for the TreeViewFilterSectionItem component, which extends the
 * PropsWithChildren type with the filter key, a label and value pair, the
 * tree's currently selected node ids (values), and the function to handle the
 * checkbox click events.
 */
type TreeViewFilterSectionItemProps = PropsWithChildren<{
  filterKey: string;
  labeledValue: FilterSettingsValue;
  selectedIds: string[];
  handleCheckboxChange: (checked: boolean, value: string) => void;
  toggleExpand: (value: string) => void;
}>;

/**
 * Component for a single tree view item within a TreeViewFilterSection
 * component. It includes a checkbox for selecting nodes, and fires the
 * handleCheckboxChange function when the checkbox is clicked.
 *
 * @param props TreeViewFilterSectionItemProps with the filter key, labeled value,
 * selected ids, and the function to handle the checkbox click events
 * @returns A single tree view item
 */
export const TreeViewFilterSectionItem = (
  props: TreeViewFilterSectionItemProps,
) => {
  const {
    filterKey,
    labeledValue,
    selectedIds,
    handleCheckboxChange,
    toggleExpand,
  } = props;
  const isSelected = selectedIds.includes(labeledValue.value);
  const treeItemRef = React.useRef<HTMLLIElement>(null);

  return (
    <TreeItem
      ref={treeItemRef}
      key={`tree-view-item-${filterKey}-${labeledValue.value}`}
      data-testid={`tree-view-item-${labeledValue.value}`}
      nodeId={labeledValue.value}
      label={
        <>
          <Checkbox
            id={`checkbox-${filterKey}-${labeledValue.value}`}
            key={`checkbox-${filterKey}-${labeledValue.value}`}
            data-testid={`checkbox-${filterKey}-${labeledValue.value}`}
            checked={isSelected}
            onClick={(event) => {
              handleCheckboxChange(!isSelected, labeledValue.value);
              event.stopPropagation();
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                toggleExpand(labeledValue.value);
              }
            }}
          />
          {labeledValue.valueLabel}
        </>
      }
    >
      {props.children}
    </TreeItem>
  );
};

export default TreeViewFilterSectionItem;
