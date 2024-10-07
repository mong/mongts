import { useContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FilterMenuSectionProps } from ".";
import { FilterSettingsContext, FilterSettingsValue } from './FilterSettingsContext';
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";
import { getSelectedValue } from './utils';

type ToggleButtonFilterSectionProps = FilterMenuSectionProps & {
  options: FilterSettingsValue[];
};

export const ToggleButtonFilterSection = (
  {
    options,
    filterkey,
    sectionid,
  }: ToggleButtonFilterSectionProps
) => {
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  const handleSelection = (newValue: string) => {
    const newFilterSettingsValue = options.find(
      (option) => option.value === newValue,
    );
    if (filterSettings) {
      filterSettingsDispatch({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: filterkey,
          values: [{ valueLabel: newFilterSettingsValue?.valueLabel ?? "", value: newValue ?? "" }],
        },
      });
    }
  };  

  return (
    <ToggleButtonGroup
      exclusive
      value={
        getSelectedValue(filterkey, filterSettings) ??
        null /* Allow nulls */
      }
      onChange={(_, newValue) => handleSelection(newValue) }
      aria-label="Valg av tabellkontekst"
    >
      {options.map((option) => (
        <ToggleButton key={`${sectionid}-toggle-${option.value}`} value={option.value} aria-label={option.valueLabel}>
          {option.valueLabel}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtonFilterSection;
