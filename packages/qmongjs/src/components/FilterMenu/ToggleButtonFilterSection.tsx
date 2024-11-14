import { useContext } from "react";
import { Box, Stack, styled, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";
import { getSelectedValue } from "./utils";
import { useElementWidth } from "../../hooks/useElementWidth";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 30,
  height: "2rem",
  textTransform: "none",
  border: "0.0625rem solid #003087 !important",
  justifyContent: "flex-start",
  paddingLeft: theme.spacing(1),
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  boxShadow: "0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)",
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
  const selectedValue = getSelectedValue(filterkey, filterSettings) ?? null;
  const { ref, width } = useElementWidth();

  // Calculate the total width of all buttons
  const totalButtonWidth = options.reduce((total, option) => {
    // Estimate button width based on text length and average large sized chars (adjust multiplier as needed)
    return total + option.valueLabel.length * 10 + 56; // 56px for padding, margins, and icon
  }, 0);

  // Determine if vertical orientation is needed
  const useVerticalOrientation = width > 0 && totalButtonWidth > width;

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
    <Box ref={ref}>
      <ToggleButtonGroup
        exclusive
        value={selectedValue}
        onChange={handleSelection}
        aria-label={`${sectiontitle}-valg`}
        orientation={useVerticalOrientation ? "vertical" : "horizontal"}
        fullWidth={useVerticalOrientation}
        sx={{
          ".MuiToggleButtonGroup-grouped": {
            borderRadius: 30,
            height: "2rem",
            mr: useVerticalOrientation ? 0 : 1,
            mb: 1,
            pl: 1,
            pr: 3,
            color: "primary.main",
            justifyContent: "flex-start",
            width: useVerticalOrientation ? "100%" : "auto",
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            },
          },
        }}
      >
        {options.map((option) => (
          <StyledToggleButton
            key={`${sectionid}-toggle-${option.value}`}
            data-testid={getTestIdString(sectionid, option.value, testIdPrefix)}
            value={option.value}
            aria-label={option.valueLabel}
            color="primary"
            size="small"
            sx={{
              width: useVerticalOrientation ? "100%" : "auto",
              "&.Mui-selected svg": {
                color: "primary.contrastText",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="flex-start"
              sx={{ width: "100%" }}
            >
              {option.value === selectedValue ? (
                <RadioButtonCheckedIcon fontSize="small" />
              ) : (
                <RadioButtonUncheckedIcon fontSize="small" />
              )}
              <Typography variant="body2">{option.valueLabel}</Typography>
            </Stack>
          </StyledToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
