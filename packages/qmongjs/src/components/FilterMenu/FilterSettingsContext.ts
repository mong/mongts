import React, { createContext } from 'react';

export type FilterSettingsValue = { valueId: string, value: string };

export type FilterSettings = Map<string, FilterSettingsValue[]>;
export type FilterSettingsAction = {
    type: FilterSettingsActionType;
    sectionSetting: { key: string, values: FilterSettingsValue[] };
};

export enum FilterSettingsActionType { NOT_SET, SET_SECTION_SELECTIONS };

export function filterSettingsReducer(filterSettings: FilterSettings, action: FilterSettingsAction) {
    switch (action.type) {
        case FilterSettingsActionType.SET_SECTION_SELECTIONS:
            const newFilterSettings = new Map<string, FilterSettingsValue[]>(filterSettings.entries());
            newFilterSettings.set(action.sectionSetting.key, action.sectionSetting.values);
            return newFilterSettings;

        default:
            return filterSettings;
    }
}

export const FilterSettingsContext = createContext<FilterSettings>(new Map<string, FilterSettingsValue[]>());
export const FilterSettingsDispatchContext = createContext<React.Dispatch<FilterSettingsAction>>(() => {});
