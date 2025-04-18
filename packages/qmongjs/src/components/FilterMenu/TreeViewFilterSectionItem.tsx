import { PropsWithChildren } from "react";
import Checkbox from "@mui/material/Checkbox";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FilterSettingsValue } from "./FilterSettingsContext";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Box from "@mui/system/Box";
import { Typography } from "@mui/material";

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

  const uniqueItemId = parentKey
    ? `${parentKey}-${labeledValue.value}`
    : labeledValue.value;

  return (
    <TreeItem
      key={`tree-view-item-${filterKey}-${labeledValue.value}`}
      data-testid={`tree-view-item-${labeledValue.value}`}
      itemId={uniqueItemId}
      label={
        <Box display="flex" alignItems="center">
          <Box flexShrink={0}>
            <Checkbox
              id={`checkbox-${filterKey}-${uniqueItemId}`}
              key={`checkbox-${filterKey}-${uniqueItemId}`}
              data-testid={`checkbox-${filterKey}-${uniqueItemId}`}
              checked={isSelected}
              checkedIcon={
                singleselect ? (
                  <RadioButtonCheckedRoundedIcon />
                ) : (
                  <CheckBoxIcon />
                )
              }
              icon={
                singleselect ? (
                  <RadioButtonUncheckedRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )
              }
              onClick={(event) => {
                handleCheckboxChange(
                  singleselect || !isSelected,
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
          </Box>
          <Box flexGrow={1} ml={1}>
            <Typography variant="body2">{labeledValue.valueLabel}</Typography>
          </Box>
        </Box>
      }
    >
      {props.children}
    </TreeItem>
  );
};
