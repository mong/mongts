import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import {
  FilterMenu,
  SelectedFiltersSection,
  TreeViewFilterSection,
  RadioGroupFilterSection,
  FilterSettingsValue,
  FilterSettingsAction,
  FilterSettingsActionType,
} from "qmongjs";
import { maxYear, minYear, defaultYear } from "../../app_config";

// Maximum allowed number of selected treatment units
const maxTreatmentUnits = 5;

/**
 * Gets the years available for selection
 *
 * @returns The an object with year values and the default year
 */
export const getYearOptions = (): {
  values: FilterSettingsValue[];
  default: FilterSettingsValue;
} => {
  const defaultYearString = defaultYear.toString();
  const yearValues = [];
  let yearString: string;

  for (let year = minYear; year <= maxYear; year++) {
    yearString = year.toString();
    yearValues.push({ value: yearString, valueLabel: yearString });
  }

  return {
    values: yearValues,
    default: { value: defaultYearString, valueLabel: defaultYearString },
  };
};

/**
 * Gets the goal achievement options available for selection
 *
 * @returns The an object with values and the default value
 */
export const getAchievementLevelOptions = (): {
  values: FilterSettingsValue[];
  default: FilterSettingsValue;
} => {
  const goalAchievementValues = [
    { value: "", valueLabel: "Alle måloppnåelser" },
    { value: "H", valueLabel: "Høy måloppnåelse" },
    { value: "M", valueLabel: "Moderat måloppnåelse" },
    { value: "L", valueLabel: "Lav måloppnåelse" },
  ];
  return {
    values: goalAchievementValues,
    default: goalAchievementValues[0],
  };
};

/**
 * The function returns an array containing the valueString as a FilterSettingsValue,
 * or undefined if valueString is null or undefined.
 *
 * @param valueString A string, null, or undefined value
 * @returns An array with a single FilterSettingsValue, or undefined
 */
export const valueArrayOrUndefined = (
  valueString: string | null | undefined,
) => {
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
  const path = router.asPath;

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

  // Goal achievement selection
  const achievementLevelOptions = getAchievementLevelOptions();
  const [selectedAchievementLevel, setSelectedAchievementLevel] =
    useQueryParam<string>(
      "level",
      withDefault(StringParam, achievementLevelOptions.default.value),
    );

  // Map with filter options, defaults, and query parameter values and setters
  const optionsMap = new Map<
    string,
    {
      options: FilterSettingsValue[];
      default: FilterSettingsValue;
      selected: string | null | undefined;
      setSelected: (value: string | null | undefined) => void;
    }
  >([
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
    console.log(
      "Filter selection changed",
      newFilterSettings,
      oldFilterSettings,
      action,
    );
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
        initialselections={[
          achievementLevelOptions.values.find(
            (settingsVal) => settingsVal.value === selectedAchievementLevel,
          ),
        ]}
        sectiontitle={"Måloppnåelse"}
        sectionid={"goal-accomplishment"}
        filterkey={"level"}
      />
      <RadioGroupFilterSection
        radios={[]}
        defaultvalues={[]}
        sectiontitle={"Fagområder"}
        sectionid={"medical-field"}
        filterkey={"indicator"}
      />
      <TreeViewFilterSection
        sectionid="treatment-units"
        sectiontitle="Behandlingsenheter"
        filterkey="unit_name"
        maxselections={maxTreatmentUnits}
        treedata={[]}
        defaultvalues={[]}
      />
    </FilterMenu>
  );
}

export default HospitalQualityFilterMenu;
