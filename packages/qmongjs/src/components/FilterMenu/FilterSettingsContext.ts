import React, { createContext } from "react";

export enum FilterSettingsActionType {
  NOT_SET,
  SET_SECTION_SELECTIONS,
  DEL_SECTION_SELECTIONS,
}
export type FilterSettingsValue = { valueLabel: string; value: string };
export type FilterSettings = Map<string, FilterSettingsValue[]>;
export type FilterSettingsAction = {
  type: FilterSettingsActionType;
  sectionSetting: { key: string; values: FilterSettingsValue[] };
};

export function filterSettingsReducer(
  filterSettings: FilterSettings,
  action: FilterSettingsAction,
) {
  switch (action.type) {
    case FilterSettingsActionType.SET_SECTION_SELECTIONS: {
      const newFilterSettings = new Map<string, FilterSettingsValue[]>(
        filterSettings.entries(),
      );
      newFilterSettings.set(
        action.sectionSetting.key,
        action.sectionSetting.values,
      );
      return newFilterSettings;
    }

    // Remove selections from give section. Not that only the value is used to identify the selection.
    case FilterSettingsActionType.DEL_SECTION_SELECTIONS: {
      const newFilterSettings = new Map<string, FilterSettingsValue[]>(
        filterSettings.entries(),
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
          newFilterSettings.delete(action.sectionSetting.key);
        } else {
          newFilterSettings.set(action.sectionSetting.key, newSectionValues);
        }
      }

      return newFilterSettings;
    }

    default:
      return filterSettings;
  }
}

export const FilterSettingsContext = createContext<FilterSettings>(
  new Map<string, FilterSettingsValue[]>(),
);
export const FilterSettingsDispatchContext = createContext<
  React.Dispatch<FilterSettingsAction>
>(() => {});
