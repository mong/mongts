import { useContext } from "react";
import { styled } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";
import { getSelectedValue } from "./utils";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 30,
  height: "2rem",
  fontSize: theme.typography.button.fontFamily,
  textTransform: "none",
}));

type ToggleButtonFilterSectionProps = FilterMenuSectionProps & {
  options: FilterSettingsValue[];
};

const getTestIdString = (
  sectionId: string,
  value: string,
  testIdPrefix?: string,
) => {
  const formattedPrefix = testIdPrefix ? `${testIdPrefix}-` : "";
  return `${formattedPrefix}${sectionId}-toggle-${value}`;
};

export function ToggleButtonFilterSection({
  options,
  filterkey,
  sectionid,
  sectiontitle,
  testIdPrefix,
}: ToggleButtonFilterSectionProps) {
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  const handleSelection = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: string,
  ) => {
    if (!newValue) {
      // Clicked on the already selected option
      return;
    }

    const newFilterSettingsValue = options.find(
      (option) => option.value === newValue,
    );
    if (filterSettings) {
      const newLabel = newFilterSettingsValue?.valueLabel;
      const newValueArray =
        newLabel && newValue ? [{ valueLabel: newLabel, value: newValue }] : [];
      filterSettingsDispatch({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: filterkey,
          values: newValueArray,
        },
      });
    }
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={getSelectedValue(filterkey, filterSettings) ?? null}
      onChange={handleSelection}
      aria-label={`${sectiontitle}-valg`}
      color="primary"
      size="small"
      fullWidth={true}
      sx={{
        ".MuiToggleButtonGroup-grouped": {
          borderRadius: 30,
          height: "2rem",
          fontSize: "theme.typography.button.fontFamily",
          textTransform: "none",
          mr: 1,
        },
      }}
    >
      {options.map((option) => (
        <StyledToggleButton
          key={`${sectionid}-toggle-${option.value}`}
          data-testid={getTestIdString(sectionid, option.value, testIdPrefix)}
          value={option.value}
          aria-label={option.valueLabel}
        >
          {option.valueLabel}
        </StyledToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
