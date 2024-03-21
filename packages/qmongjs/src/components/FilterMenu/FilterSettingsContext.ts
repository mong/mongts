import { createContext } from "react";

/**
 * The value of a filter setting. The valueLabel is the human readable label.
 */
export type FilterSettingsValue = { valueLabel: string; value: string };

/**
 * The filter settings has a map of section keys to arrays of selected values.
 * It also has a map of default values. Defaults are used to reset the filter
 * settings. Default values are optional
 */
export type FilterSettings = {
  map: Map<string, FilterSettingsValue[]>;
  defaults: Map<string, FilterSettingsValue[]>;
};

/**
 * Context for the filter settings. The map contains the selected values for each
 * section. The defaults map contains the default values for each section.
 */
export const FilterSettingsContext = createContext<FilterSettings>({
  map: new Map<string, FilterSettingsValue[]>(),
  defaults: new Map<string, FilterSettingsValue[]>(),
});
