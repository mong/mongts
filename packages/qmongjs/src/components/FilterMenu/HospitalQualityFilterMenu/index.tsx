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
import { useMedicalFieldsQuery } from "../../../helpers/hooks";
import Alert from "@mui/material/Alert";

type StringNullOrUndefined = string | null | undefined;

/**
 * Type for holding values and setters per filter section, used by
 * setSectionSelections().
 */
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

  // Map for filter options, defaults, and query parameter values and setters
  const optionsMap = new Map<string, OptionsMapEntry>();

  // Year selection
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useQueryParam<string>(
    "year",
    withDefault(StringParam, yearOptions.default.value),
  );
  optionsMap.set("year", {
    options: yearOptions.values,
    default: yearOptions.default,
    selected: selectedYear,
    setSelected: setSelectedYear,
  });

  // Achievement level selection
  const achievementLevelOptions = getAchievementLevelOptions();
  const [selectedAchievementLevel, setSelectedAchievementLevel] =
    useQueryParam<string>(
      "level",
      withDefault(StringParam, achievementLevelOptions.default.value),
    );
  optionsMap.set("level", {
    options: achievementLevelOptions.values,
    default: achievementLevelOptions.default,
    selected: selectedAchievementLevel,
    setSelected: setSelectedAchievementLevel,
  });

  // Medical fields
  const medicalFieldsQuery = useMedicalFieldsQuery();

  let medicalFields: FilterSettingsValue[];
  if (!medicalFieldsQuery.isLoading && !medicalFieldsQuery.isError) {
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

  const [selectedMedicalField, setSelectedMedicalField] =
    useQueryParam<string>(
      "indicator",
      withDefault(StringParam, medicalFieldOptions.default.value),
    );

  optionsMap.set("indicator", {
    options: medicalFields,
    default: medicalFields[0],
    selected: selectedMedicalField,
    setSelected: setSelectedMedicalField,
  });

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
      default:
        break;
    }
  };

  const getFilterSettingsValue = (
    filterKey: string,
    value: string,
  ): FilterSettingsValue[] => {
    const result: FilterSettingsValue[] = [];

    const findAndAddValue =
    (value: string, filterSettingsValues: FilterSettingsValue[], result: FilterSettingsValue[]) => {
      const filterSettingsValue = filterSettingsValues.find(
        (settingsVal) => settingsVal.value === value,
      );
      if (filterSettingsValue) {
        result.push(filterSettingsValue);
      }
    }

    switch (filterKey) {
      case "level": {
        findAndAddValue(value, achievementLevelOptions.values, result);
        break;
      }
      case "indicator": {
        findAndAddValue(value, medicalFieldOptions.values, result);
        break;
      }
      default:
        break;
    }

    return result;
  };

  return (
    <>
      {medicalFieldsQuery.isError &&
        <Alert severity="error">Det oppstod en feil ved henting av fagområder</Alert>
      }
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
          initialselections={getFilterSettingsValue(
            "indicator",
            selectedMedicalField,
          )}
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
    </>
  );
}

export default HospitalQualityFilterMenu;
