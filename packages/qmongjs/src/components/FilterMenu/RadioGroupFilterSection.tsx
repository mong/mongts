import React, { useContext } from "react";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsActionType,
  FilterSettingsContext,
  FilterSettingsDispatchContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export type RadioGroupFilterSectionProps = FilterMenuSectionProps & {
  radios: FilterSettingsValue[];
  defaultValue: string;
};

const getSelectedValue = (
  filterkey: string,
  filterSettings: Map<string, FilterSettingsValue[]>,
  defaultValue: string,
) => {
  return filterSettings.get(filterkey)?.[0].value || defaultValue;
};

const findByValue = (
  value: string,
  filterSettingsValues: FilterSettingsValue[],
) => {
  return filterSettingsValues.find(
    (filterSettingsValue) => filterSettingsValue.value === value,
  );
};

export const RadioGroupFilterSection = (
  props: RadioGroupFilterSectionProps,
) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const selectedRadio = props.radios.find(
      (radio) => radio.value === selectedValue,
    );
    const selectedLabel = selectedRadio ? selectedRadio.valueLabel : "";

    if (filterSettings) {
      filterSettingsDispatch({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: filterKey,
          values: [{ valueLabel: selectedLabel, value: selectedValue }],
        },
      });
    }
  };

  const filterKey = props.filterkey;
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  // Initialize the filter settings if they don't exist
  if (!filterSettings.has(filterKey)) {
    const defaultSelection = findByValue(props.defaultValue, props.radios);
    filterSettingsDispatch({
      type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
      sectionSetting: {
        key: filterKey,
        values: defaultSelection ? [defaultSelection] : [],
      },
    });
  }

  return (
    <FormControl>
      <FormLabel id={`filter-section-radio-group-label-${props.sectionid}`}>
        {props.sectiontitle}
      </FormLabel>
      <RadioGroup
        name={`radio-buttons-group-${props.sectionid}`}
        aria-labelledby={`filter-section-radio-group-label-${props.sectionid}`}
        value={getSelectedValue(
          props.filterkey,
          filterSettings,
          props.defaultValue,
        )}
        onChange={handleChange}
      >
        {props.radios.map((radio) => (
          <FormControlLabel
            key={`${props.sectionid}-radio-${radio.value}`}
            value={radio.value}
            control={<Radio />}
            label={radio.valueLabel}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupFilterSection;
