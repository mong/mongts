import React, { createContext } from "react";

export enum FilterSettingsActionType {
  NOT_SET,
  SET_SECTION_SELECTIONS,
  DEL_SECTION_SELECTIONS,
}
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
export type FilterSettingsAction = {
  type: FilterSettingsActionType;
  sectionSetting: { key: string; values: FilterSettingsValue[] };
};

/**
 * This is the reducer that FilterMenu uses by default and wraps in a context
 * available to child components. Reducers are functions that take the current
 * state and an action and return an updated state.
 *
 * @param filterSettings The current filter settings
 * @param action The action to perform
 * @returns The updated filter settings
 */
export function filterSettingsReducer(
  filterSettings: FilterSettings,
  action: FilterSettingsAction,
) {
  switch (action.type) {
    case FilterSettingsActionType.SET_SECTION_SELECTIONS: {
      const newFilterSettings = new Map<string, FilterSettingsValue[]>(
        filterSettings.map.entries(),
      );
      newFilterSettings.set(
        action.sectionSetting.key,
        action.sectionSetting.values,
      );
      return { map: newFilterSettings, defaults: filterSettings.defaults };
    }

    // Remove selections from give section. Not that only the value is used to identify the selection.
    case FilterSettingsActionType.DEL_SECTION_SELECTIONS: {
      const newFilterSettings = new Map<string, FilterSettingsValue[]>(
        filterSettings.map.entries(),
      );
      const sectionValues = newFilterSettings.get(action.sectionSetting.key);

      if (sectionValues !== undefined) {
        const newSectionValues = sectionValues.filter(
          (selection) =>
            !action.sectionSetting.values.some(
              (selectionToRemove) =>
                selectionToRemove.value === selection.value,
            ),
        );

        if (newSectionValues.length === 0) {
          const defaults = filterSettings.defaults.get(
            action.sectionSetting.key,
          );
          if (defaults !== undefined) {
            newFilterSettings.set(action.sectionSetting.key, defaults);
          } else {
            newFilterSettings.delete(action.sectionSetting.key);
          }
        } else {
          newFilterSettings.set(action.sectionSetting.key, newSectionValues);
        }
      }

      return { map: newFilterSettings, defaults: filterSettings.defaults };
    }

    default:
      return filterSettings;
  }
}

export const FilterSettingsContext = createContext<FilterSettings>({
  map: new Map<string, FilterSettingsValue[]>(),
  defaults: new Map<string, FilterSettingsValue[]>(),
});
export const FilterSettingsDispatchContext = createContext<
  React.Dispatch<FilterSettingsAction>
>(() => {});
