import React, { useContext } from "react";
import { Stack, Chip, Button, Box, styled } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { FilterMenuSectionProps } from ".";
import { FilterSettingsContext } from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsAction } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";

export type SelectedFiltersSectionProps = FilterMenuSectionProps;

export const StyledChip = styled(Chip)(({ theme }) => ({
  fontFamily: theme.typography.button.fontFamily,
}));

/**
 * Function for handling the delete event for a chip
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
 * Function for handling the reset event for restoring selected chips to default
 *
 * @param filterSettingsDispatch The dispatch function for updating the filter settings
 */
export const handleReset = (
  filterSettingsDispatch: React.Dispatch<FilterSettingsAction>,
) => {
  filterSettingsDispatch({
    type: FilterSettingsActionType.RESET_SELECTIONS,
    sectionSetting: {
      key: "",
      values: [],
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
    <>
      <Box
        sx={{ display: "flex", flexDirection: "row-reverse", marginBottom: 1 }}
      >
        <Button
          variant="outlined"
          size="small"
          endIcon={<ClearAllIcon />}
          onClick={() => handleReset(filterSettingsDispatch)}
        >
          Nullstill
        </Button>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        id={`selected-filters-section-id-${props.sectionid}`}
        data-testid={`selected-filters-section-id-${props.sectionid}`}
        useFlexGap
        flexWrap="wrap"
      >
        {Array.from(filterSettings.map.keys()).map((key) => {
          return filterSettings.map.get(key)?.map((filterSetting) => {
            const chipId = `${key}${sep}${filterSetting.value}`;
            return (
              <StyledChip
                key={chipId}
                data-testid={chipId}
                label={filterSetting.valueLabel}
                size={"small"}
                onDelete={() => handleDelete(chipId, filterSettingsDispatch)}
              />
            );
          });
        })}
      </Stack>
    </>
  );
}

export default SelectedFiltersSection;
