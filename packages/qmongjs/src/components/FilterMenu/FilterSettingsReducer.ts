import React, { createContext } from "react";
import { FilterSettings } from "./FilterSettingsContext";
import { FilterSettingsValue } from "./FilterSettingsContext";

/**
 * The types of actions that can be performed on the filter settings
 */
export enum FilterSettingsActionType {
  SET_SECTION_SELECTIONS,
  DEL_SECTION_SELECTIONS,
  SET_ALL_SELECTIONS,
  RESET_SELECTIONS,
}

/**
 * The action to perform on the filter settings, given as a
 * parameter to the reducer.
 */
export type FilterSettingsAction = {
  type: FilterSettingsActionType;
  sectionSetting: { key: string; values: FilterSettingsValue[] };
  filterSettings?: Map<string, FilterSettingsValue[]>;
};

/**
 * The type/signature of the reducer function that handles the filter settings.
 */
export type FilterSettingsReducerType = (
  state: FilterSettings,
  action: FilterSettingsAction,
) => FilterSettings;

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
    case FilterSettingsActionType.SET_ALL_SELECTIONS: {
      if (action.filterSettings === undefined) {
        return {
          map: new Map<string, FilterSettingsValue[]>(),
          defaults: filterSettings.defaults,
        };
      }

      return { map: action.filterSettings, defaults: filterSettings.defaults };
    }
    case FilterSettingsActionType.RESET_SELECTIONS: {
      const newFilterSettings = new Map<string, FilterSettingsValue[]>(
        filterSettings.defaults.entries(),
      );
      return { map: newFilterSettings, defaults: filterSettings.defaults };
    }
    default:
      return filterSettings;
  }
}

/**
 * The context for the filter settings reducer. This context is used to provide
 * the reducer to child components.
 */
export const FilterSettingsDispatchContext = createContext<
  React.Dispatch<FilterSettingsAction>
>(() => {});
