import React, { useContext } from "react";
import { Stack, Chip } from "@mui/material";
import { FilterMenuSectionProps } from ".";
import { FilterSettingsContext } from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsAction } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";

export type SelectedFiltersSectionProps = FilterMenuSectionProps;

/**
 * Utility function to handle the delete event for a chip
 *
 * @param chipId Element id for the chip to delete
 * @param filterSettingsDispatch The dispatch function for updating the filter settings
 */
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

/**
 * A component for displaying currently selected filter settings as a collection of chips.
 * The chips can be deleted individually to remove filter settings.
 */
export function SelectedFiltersSection(props: SelectedFiltersSectionProps) {
  const sep = "---";
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  return (
    <Stack
      direction="row"
      spacing={1}
      id={`selected-filters-section-id-${props.sectionid}`}
      data-testid={`selected-filters-section-id-${props.sectionid}`}
    >
      {Array.from(filterSettings.map.keys()).map((key) => {
        return filterSettings.map.get(key)?.map((filterSetting) => {
          const chipId = `${key}${sep}${filterSetting.value}`;
          return (
            <Chip
              key={chipId}
              data-testid={chipId}
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
