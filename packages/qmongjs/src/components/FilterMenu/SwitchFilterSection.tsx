import React, { useContext } from "react";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  FormHelperText,
  FormControl,
  Typography,
} from "@mui/material";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";
import { getSelectedValue } from "./utils";

type SwitchFilterSectionProps = FilterMenuSectionProps & {
  label: string;
  activatedswitchvalue: FilterSettingsValue;
  helperText?: string;
};

export function SwitchFilterSection(props: SwitchFilterSectionProps) {
  const labelText = props.label;
  const filterKey = props.filterkey;
  const activatedSwitchValue = props.activatedswitchvalue;
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  const selectedValue = getSelectedValue(filterKey, filterSettings);
  const isChecked: boolean = selectedValue === "true";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (filterSettings) {
      filterSettingsDispatch({
        type: event.target.checked
          ? FilterSettingsActionType.SET_SECTION_SELECTIONS
          : FilterSettingsActionType.DEL_SECTION_SELECTIONS,
        sectionSetting: {
          key: filterKey,
          values: [activatedSwitchValue],
        },
      });
    }
  };

  return (
    <FormControl>
      {props.helperText && ( 
        <FormHelperText>
          <Typography variant="body2">
            {props.helperText}
          </Typography>
        </FormHelperText>
      )}
      <FormGroup aria-label={props.label} row>
        <FormControlLabel
          labelPlacement="start"
          label={labelText}
          control={
            <Switch
              checked={isChecked}
              onChange={handleChange}
              color="primary"
            />
          }
        />
      </FormGroup>
    </FormControl>
  );
}
