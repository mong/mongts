import React, { useContext } from "react";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";
import { getSelectedValue } from "./utils";

export type SwitchFilterSectionProps = FilterMenuSectionProps & {
  label: string;
  activatedswitchvalue: FilterSettingsValue;
  disabled?: boolean;
};

export function SwitchFilterSection(props: SwitchFilterSectionProps) {
  const disabled = props.disabled ?? false;
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
    <FormGroup aria-label={props.label} row>
      <FormControlLabel
        labelPlacement="start"
        label={labelText}
        control={
          <Switch
            checked={!disabled && isChecked}
            onChange={handleChange}
            color="primary"
            disabled={disabled}
          />
        }
      />
    </FormGroup>
  );
}

export default SwitchFilterSection;
