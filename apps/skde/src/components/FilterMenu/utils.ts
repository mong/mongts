import { FilterSettings, FilterSettingsValue } from "./FilterSettingsContext";

export const getDefaultValue = (defaultValues?: FilterSettingsValue[]) => {
  if (defaultValues == null || defaultValues.length === 0) {
    return undefined;
  }
  return defaultValues[0]?.value;
};

export const getSelectedValue = (
  filterkey: string,
  filterSettings: FilterSettings,
) => {
  return (
    filterSettings.map.get(filterkey)?.[0]?.value ||
    getDefaultValue(filterSettings.defaults.get(filterkey))
  );
};
