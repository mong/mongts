import { PropsWithChildren } from "react";
import Checkbox from "@mui/material/Checkbox";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FilterSettingsValue } from "./FilterSettingsContext";
import {
  RadioButtonCheckedRounded,
  RadioButtonUncheckedRounded,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";

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
  handleCheckboxChange: (
    checked: boolean,
    value: string,
    autoUncheckId?: string,
  ) => void;
  toggleExpand: (value: string) => void;
  autoUncheckId?: string;
  multiselect?: boolean;
  parentKey?: string;
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
    parentKey,
    labeledValue,
    selectedIds,
    handleCheckboxChange,
    toggleExpand,
    autoUncheckId,
    multiselect,
  } = props;
  const isSelected = selectedIds.includes(labeledValue.value);
  const singleselect = !(multiselect || multiselect === undefined);

  return (
    <TreeItem
      key={`tree-view-item-${filterKey}-${labeledValue.value}`}
      data-testid={`tree-view-item-${labeledValue.value}`}
      itemId={`${parentKey}-${labeledValue.value}`}
      label={
        <>
          <Checkbox
            id={`checkbox-${filterKey}-${labeledValue.value}`}
            key={`checkbox-${filterKey}-${labeledValue.value}`}
            data-testid={`checkbox-${filterKey}-${labeledValue.value}`}
            checked={isSelected}
            checkedIcon={
              singleselect ? <RadioButtonCheckedRounded /> : <CheckBox />
            }
            icon={
              singleselect ? (
                <RadioButtonUncheckedRounded />
              ) : (
                <CheckBoxOutlineBlank />
              )
            }
            onClick={(event) => {
              handleCheckboxChange(
                singleselect || !isSelected, // do not change back to default if singleselect
                labeledValue.value,
                autoUncheckId,
              );
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
