import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  StringParam,
  UrlUpdateType,
  useQueryParam,
  withDefault,
} from "use-query-params";
import {
  FilterMenu,
  SelectedFiltersSection,
  TreeViewFilterSection,
  RadioGroupFilterSection,
  FilterSettingsValue,
  FilterSettingsAction,
  FilterSettingsActionType,
} from "qmongjs";
import {
  getAchievementLevelOptions,
  getYearOptions,
  maxSelectedTreatmentUnits,
} from "./filterMenuOptions";
import { UseQueryResult } from "@tanstack/react-query";
import { useMedicalFieldsQuery } from "../../../helpers/hooks";

type StringNullOrUndefined = string | null | undefined;

type OptionsMapEntry = {
  options: FilterSettingsValue[];
  default: FilterSettingsValue;
  selected: StringNullOrUndefined;
  setSelected: (
    newValue: string,
    updateType?: UrlUpdateType | undefined,
  ) => void;
};

/**
 * The function returns an array containing the valueString as a FilterSettingsValue,
 * or undefined if valueString is null or undefined.
 *
 * @param valueString A string, null, or undefined value
 * @returns An array with a single FilterSettingsValue, or undefined
 */
export const valueArrayOrUndefined = (valueString: StringNullOrUndefined) => {
  if (valueString) {
    return [{ value: valueString, valueLabel: valueString }];
  } else {
    return undefined;
  }
};

/**
 * Component for the hospital quality (sykehuskvalitet) filter menu.
 *
 * @returns The hospital quality filter menu component
 */
export function HospitalQualityFilterMenu() {
  // When the user navigates to the page, it may contain query parameters for
  // filtering indicators. Use NextRouter to get the current path containing the
  // initial query parameters.

  const router = useRouter();

  // Next's prerender stage causes problems for the initial values given to
  // useReducer, because they are only set once by the reducer and are missing
  // during Next's prerender stage. Tell FilterMenu to refresh its state during
  // the first call after the prerender is done.

  const [prevReady, setPrevReady] = useState(router.isReady);
  const shouldRefreshInititalState = prevReady !== router.isReady;

  useEffect(() => {
    setPrevReady(router.isReady);
  }, [router.isReady]);

  // Year selection
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useQueryParam<string>(
    "year",
    withDefault(StringParam, yearOptions.default.value),
  );

  // Achievement level selection
  const achievementLevelOptions = getAchievementLevelOptions();
  const [selectedAchievementLevel, setSelectedAchievementLevel] =
    useQueryParam<string>(
      "level",
      withDefault(StringParam, achievementLevelOptions.default.value),
    );

  // Medical fields
  const medicalFieldsQuery = useMedicalFieldsQuery();

  let medicalFields: FilterSettingsValue[];
  if (!medicalFieldsQuery.isLoading) {
    medicalFields = medicalFieldsQuery.data.map((field: {
      shortName?: string;
      name?: string;
      registers?: string[];
    }) => ({
      value: field.shortName,
      valueLabel: field.name,
    }));
  } else {
    medicalFields = [];
  }

  medicalFields.unshift({ value: "all", valueLabel: "Alle fagområder" });

  const medicalFieldOptions = {
    values: medicalFields,
    default: medicalFields[0],
  };

  // Map with filter options, defaults, and query parameter values and setters
  const optionsMap = new Map<string, OptionsMapEntry>([
    [
      "year",
      {
        options: yearOptions.values,
        default: yearOptions.default,
        selected: selectedYear,
        setSelected: setSelectedYear,
      },
    ],
    [
      "level",
      {
        options: achievementLevelOptions.values,
        default: achievementLevelOptions.default,
        selected: selectedAchievementLevel,
        setSelected: setSelectedAchievementLevel,
      },
    ],
    [
      "indicator",
      {
        options: medicalFieldOptions.values,
        default: medicalFieldOptions.default,
        selected: undefined,
        setSelected: () => {},
      },
    ],
  ]);

  /**
   * Handler function for setting section selections,
   * called by handleFilterChanged
   */
  const setSectionSelections = (
    filterKey: string,
    newSelections: FilterSettingsValue[] | undefined,
  ) => {
    const options = optionsMap.get(filterKey);
    if (options) {
      const setSelected = options.setSelected;
      const defaultOption = options.default;
      const selectedValue = newSelections?.[0].value ?? defaultOption.value;
      setSelected(selectedValue ?? null);
    }
  };

  /**
   * Handler function for filter selection changes
   */
  const handleFilterChanged = (
    newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    oldFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    action: FilterSettingsAction,
  ) => {
    switch (action.type) {
      case FilterSettingsActionType.DEL_SECTION_SELECTIONS:
      case FilterSettingsActionType.SET_SECTION_SELECTIONS: {
        const key = action.sectionSetting.key;
        setSectionSelections(key, newFilterSettings.map.get(key));
        break;
      }
      case FilterSettingsActionType.SET_ALL_SELECTIONS: {
        break;
      }
      default:
        break;
    }
  };

  const getFilterSettingsValue = (
    filterKey: string,
    value: string,
  ): FilterSettingsValue[] => {
    const result: FilterSettingsValue[] = [];

    switch (filterKey) {
      case "level": {
        const filterSettingsValue = achievementLevelOptions.values.find(
          (settingsVal) => settingsVal.value === value,
        );
        if (filterSettingsValue) {
          result.push(filterSettingsValue);
        }
        break;
      }
      default:
        break;
    }

    return result;
  };

  return (
    <FilterMenu
      refreshState={shouldRefreshInititalState}
      onSelectionChanged={handleFilterChanged}
    >
      <SelectedFiltersSection
        accordion="false"
        filterkey="selectedfilters"
        sectionid="selectedfilters"
        sectiontitle="Valgte filtre"
      />
      <RadioGroupFilterSection
        radios={yearOptions.values}
        defaultvalues={[yearOptions.default]}
        initialselections={[{ value: selectedYear, valueLabel: selectedYear }]}
        sectiontitle={"År"}
        sectionid={"year"}
        filterkey={"year"}
      />
      <RadioGroupFilterSection
        radios={achievementLevelOptions.values}
        defaultvalues={[achievementLevelOptions.default]}
        initialselections={getFilterSettingsValue(
          "level",
          selectedAchievementLevel,
        )}
        sectiontitle={"Måloppnåelse"}
        sectionid={"goal-accomplishment"}
        filterkey={"level"}
      />
      <RadioGroupFilterSection
        radios={medicalFieldOptions.values}
        defaultvalues={[medicalFieldOptions.default]}
        sectiontitle={"Fagområder"}
        sectionid={"medical-field"}
        filterkey={"indicator"}
      />
      <TreeViewFilterSection
        sectionid="treatment-units"
        sectiontitle="Behandlingsenheter"
        filterkey="unit_name"
        maxselections={maxSelectedTreatmentUnits()}
        treedata={[]}
        defaultvalues={[]}
      />
    </FilterMenu>
  );
}

export default HospitalQualityFilterMenu;
