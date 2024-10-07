import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FilterMenuSectionProps } from ".";
import { FilterSettingsValue } from './FilterSettingsContext';

type ToggleButtonFilterSectionProps = FilterMenuSectionProps & {
  options: FilterSettingsValue[];
};

export const ToggleButtonFilterSection = (
  {
    options
  }: ToggleButtonFilterSectionProps
) => {
  const [selectedOption, setSelectedOption] = React.useState<FilterSettingsValue | null>();

  return (
    <ToggleButtonGroup
      value={selectedOption}
      exclusive
      onChange={(_, newOption) => setSelectedOption(newOption as FilterSettingsValue | null)}
      aria-label="text alignment"
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value} aria-label={option.valueLabel}>
          {option.valueLabel}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtonFilterSection;
