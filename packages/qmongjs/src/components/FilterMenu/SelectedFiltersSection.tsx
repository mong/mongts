import React, { useContext } from "react";
import { Stack, Chip, Link, Box, styled, Typography } from "@mui/material";
import { ClearRounded } from "@mui/icons-material";
import _ from "lodash";
import { FilterMenuSectionProps } from ".";
import { FilterSettingsContext } from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsAction } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";

type SelectedFiltersSectionProps = FilterMenuSectionProps;

const StyledChip = styled(Chip)(({ theme }) => ({
  fontFamily: theme.typography.button.fontFamily,
  padding: "1rem",
}));

/**
 * Function for handling the delete event for a chip
 *
 * @param chipId Element id for the chip to delete
 * @param filterSettingsDispatch The dispatch function for updating the filter settings
 */
const handleDelete = (
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
const handleReset = (
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
      <Box sx={{ display: "flex", marginBottom: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ width: "100%", marginBottom: 2 }}
        >
          <Typography variant="subtitle2" color="primary">
            Valgte filtre
          </Typography>
          <Link
            type="button"
            variant="body2"
            onClick={() => handleReset(filterSettingsDispatch)}
            sx={{ cursor: "pointer", fontWeight: "600" }}
          >
            Tilbakestill
          </Link>
        </Stack>
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
          const defaultSet = new Set(filterSettings.defaults.get(key));
          const selectedSet = new Set(filterSettings.map.get(key));
          const enableDelete = !_.isEqual(selectedSet, defaultSet);

          return filterSettings.map
            .get(key)
            ?.filter((filterSetting) => !!filterSetting)
            .map((filterSetting) => {
              const chipId = `${key}${sep}${filterSetting.value}`;
              return (
                <StyledChip
                  key={chipId}
                  data-testid={chipId}
                  label={filterSetting.valueLabel}
                  size={"small"}
                  color="primary"
                  deleteIcon={<ClearRounded />}
                  onDelete={
                    enableDelete
                      ? () => handleDelete(chipId, filterSettingsDispatch)
                      : undefined
                  }
                />
              );
            });
        })}
      </Stack>
    </>
  );
}
