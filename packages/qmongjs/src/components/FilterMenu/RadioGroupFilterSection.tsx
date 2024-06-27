import React, { useContext } from "react";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { getDefaultValue, getSelectedValue } from "./utils";

type RadioGroupFilterSectionProps = FilterMenuSectionProps & {
  radios: FilterSettingsValue[];
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
  const accordion = props.accordion;
  const filterSettings = useContext(FilterSettingsContext);
  const defaultValue = getDefaultValue(filterSettings.defaults.get(filterKey));
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  return (
    <FormControl>
      {accordion === false && (
        <FormLabel id={`filter-section-radio-group-label-${props.sectionid}`}>
          {props.sectiontitle}
        </FormLabel>
      )}
      <RadioGroup
        name={`radio-buttons-group-${props.sectionid}`}
        aria-labelledby={`filter-section-radio-group-label-${props.sectionid}`}
        value={getSelectedValue(props.filterkey, filterSettings)}
        onChange={handleChange}
      >
        {props.radios.map((radio) => (
          <FormControlLabel
            key={`${props.sectionid}-radio-${radio.value}`}
            value={radio.value}
            control={<Radio />}
            label={radio.valueLabel}
            sx={radio.value === defaultValue ? { color: "primary.main" } : {}}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
