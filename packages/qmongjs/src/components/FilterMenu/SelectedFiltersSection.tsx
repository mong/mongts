import React, { useContext } from "react";
import { Stack, Chip } from "@mui/material";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsActionType,
  FilterSettingsContext,
  FilterSettingsDispatchContext,
} from "./FilterSettingsContext";

export type SelectedFiltersSectionProps = FilterMenuSectionProps;

export function SelectedFiltersSection(/*props: SelectedFiltersSectionProps*/) {
  const sep = "---";
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  const handleDelete = (chipId: string) => {
    const idParts = chipId.split("---");
    const filterKey = idParts[0];
    const filterValue = idParts[1];
    const filterLabel = idParts[2];

    filterSettingsDispatch({
      type: FilterSettingsActionType.DEL_SECTION_SELECTIONS,
      sectionSetting: {
        key: filterKey,
        values: [{ value: filterValue, valueLabel: filterLabel }],
      },
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      {Array.from(filterSettings.keys()).map((key) => {
        return filterSettings.get(key)?.map((filterSetting) => {
          const chipId = `${key}${sep}${filterSetting.value}${sep}${filterSetting.valueLabel}`;
          return (
            <Chip
              key={chipId}
              label={filterSetting.valueLabel}
              onDelete={() => handleDelete(chipId)}
            />
          );
        });
      })}
    </Stack>
  );
}

export default SelectedFiltersSection;
