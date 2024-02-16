import React, { useContext } from "react";
import { Stack, Chip } from "@mui/material";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsAction,
  FilterSettingsActionType,
  FilterSettingsContext,
  FilterSettingsDispatchContext,
} from "./FilterSettingsContext";

export type SelectedFiltersSectionProps = FilterMenuSectionProps;

export const handleDelete = (
  chipId: string,
  filterSettingsDispatch: React.Dispatch<FilterSettingsAction>,
) => {
  const idParts = chipId.split("---");
  const filterKey = idParts[0];
  const filterValue = idParts[1];

  filterSettingsDispatch({
    type: FilterSettingsActionType.DEL_SECTION_SELECTIONS,
    sectionSetting: {
      key: filterKey,
      values: [
        { value: filterValue, valueLabel: "" /* not used for deletion*/ },
      ],
    },
  });
};

export function SelectedFiltersSection(props: SelectedFiltersSectionProps) {
  const sep = "---";
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  return (
    <Stack
      direction="row"
      spacing={1}
      id={`selected-filter-section-id-${props.sectionid}`}
    >
      {Array.from(filterSettings.map.keys()).map((key) => {
        return filterSettings.map.get(key)?.map((filterSetting) => {
          const chipId = `${key}${sep}${filterSetting.value}`;
          return (
            <Chip
              key={chipId}
              label={filterSetting.valueLabel}
              onDelete={() => handleDelete(chipId, filterSettingsDispatch)}
            />
          );
        });
      })}
    </Stack>
  );
}

export default SelectedFiltersSection;
