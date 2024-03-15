import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  DelimitedArrayParam,
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
  FilterMenuSelectionChangedHandler,
  FilterMenuFilterInitializedHandler,
} from "qmongjs";
import {
  getAchievementLevelOptions,
  getTreatmentUnitsTree,
  getYearOptions,
} from "./filterMenuOptions";
import {
  useMedicalFieldsQuery,
  useUnitNamesQuery,
} from "../../../helpers/hooks";
import Alert from "@mui/material/Alert";
import { UseQueryResult } from "@tanstack/react-query";

// The keys used for the different filter sections
export const yearKey = "year";
export const levelKey = "level";
export const medicalFieldKey = "indicator";
export const treatmentUnitsKey = "selected_treatment_units";

/**
 * The properties for the TreatmentQualityFilterMenu component.
 * The onSelectionChanged handler is called when the selection changes.
 */
export type TreatmentQualityFilterMenuProps = PropsWithChildren<{
  onSelectionChanged?: FilterMenuSelectionChangedHandler;
  onFilterInitialized?: FilterMenuFilterInitializedHandler;
}>;

// Types used due to the use of useQueryParam
type SetSelectedType = (
  newVal: string | string[],
  updateType?: UrlUpdateType,
) => void;
type StringNullOrUndefined = string | null | undefined;
type UndefinedOrArrayOfStringOrNull = (string | null)[] | undefined;

/**
 * Type for holding values and setters per filter section, used by
 * setSectionSelections().
 */
type OptionsMapEntry = {
  options: FilterSettingsValue[];
  default: FilterSettingsValue;
  multiselect: boolean;
  selected: StringNullOrUndefined | UndefinedOrArrayOfStringOrNull;
  setSelected: (
    newValue: string | string[],
    updateType?: UrlUpdateType | undefined,
  ) => void;
};

/**
 * Component for the treatment quality (Behandlingskvalitet) filter menu.
 *
 * @returns The treatment quality filter menu component
 */
export function TreatmentQualityFilterMenu({
  onSelectionChanged,
  onFilterInitialized: onFilterInitialized,
}: TreatmentQualityFilterMenuProps) {
  const selectedRegister = "all";
  const queryContext = { context: "caregiver", type: "ind" };

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
    yearKey,
    withDefault(StringParam, yearOptions.default.value),
  );
  optionsMap.set(yearKey, {
    options: yearOptions.values,
    default: yearOptions.default,
    multiselect: false,
    selected: selectedYear,
    setSelected: setSelectedYear as SetSelectedType,
  });

  // Achievement level selection
  const achievementLevelOptions = getAchievementLevelOptions();
  const [selectedAchievementLevel, setSelectedAchievementLevel] =
    useQueryParam<string>(
      levelKey,
      withDefault(StringParam, achievementLevelOptions.default.value),
    );
  optionsMap.set(levelKey, {
    options: achievementLevelOptions.values,
    default: achievementLevelOptions.default,
    multiselect: false,
    selected: selectedAchievementLevel,
    setSelected: setSelectedAchievementLevel as SetSelectedType,
  });

  // Medical fields
  const medicalFieldsQuery = useMedicalFieldsQuery();

  let medicalFields: FilterSettingsValue[];
  if (!medicalFieldsQuery.isLoading && !medicalFieldsQuery.isError) {
    medicalFields = medicalFieldsQuery.data.map(
      (field: { shortName?: string; name?: string; registers?: string[] }) => ({
        value: field.shortName,
        valueLabel: field.name,
      }),
    );
  } else {
    medicalFields = [];
  }

  medicalFields.unshift({ value: "all", valueLabel: "Alle fagområder" });

  const medicalFieldOptions = {
    values: medicalFields,
    default: medicalFields[0],
  };

  const [selectedMedicalField, setSelectedMedicalField] = useQueryParam<string>(
    medicalFieldKey,
    withDefault(StringParam, medicalFieldOptions.default.value),
  );

  optionsMap.set(medicalFieldKey, {
    options: medicalFields,
    default: medicalFields[0],
    multiselect: false,
    selected: selectedMedicalField,
    setSelected: setSelectedMedicalField as SetSelectedType,
  });

  // Treatment units
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    selectedRegister,
    queryContext.context,
    queryContext.type,
  );

  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  optionsMap.set(treatmentUnitsKey, {
    options: treatmentUnits.treedata,
    default: treatmentUnits.defaults[0],
    multiselect: true,
    selected: selectedTreatmentUnits,
    setSelected: setSelectedTreatmentUnits as SetSelectedType,
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
      const multiselect = options.multiselect;

      if (!multiselect) {
        const selectedValue = newSelections?.[0].value ?? defaultOption.value;
        setSelected(selectedValue ?? null);
      } else {
        const selectedValues = newSelections?.map(
          (filterSettingsValue) => filterSettingsValue.value,
        ) ?? [defaultOption.value];
        setSelected(selectedValues ?? null);
      }
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

    onSelectionChanged?.(newFilterSettings, oldFilterSettings, action);
  };

  const getFilterSettingsValue = (
    filterKey: string,
    value: string,
  ): FilterSettingsValue[] => {
    const result: FilterSettingsValue[] = [];

    const findAndAddValue = (
      value: string,
      filterSettingsValues: FilterSettingsValue[],
      result: FilterSettingsValue[],
    ) => {
      const filterSettingsValue = filterSettingsValues.find(
        (settingsVal) => settingsVal.value === value,
      );
      if (filterSettingsValue) {
        result.push(filterSettingsValue);
      }
    };

    switch (filterKey) {
      case levelKey: {
        findAndAddValue(value, achievementLevelOptions.values, result);
        break;
      }
      case medicalFieldKey: {
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
      {medicalFieldsQuery.isError && (
        <Alert severity="error">
          Det oppstod en feil ved henting av fagområder!
        </Alert>
      )}
      <FilterMenu
        refreshState={shouldRefreshInititalState}
        onSelectionChanged={handleFilterChanged}
        onFilterInitialized={onFilterInitialized}
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
          initialselections={[
            { value: selectedYear, valueLabel: selectedYear },
          ]}
          sectiontitle={"År"}
          sectionid={yearKey}
          filterkey={yearKey}
        />
        <RadioGroupFilterSection
          radios={achievementLevelOptions.values}
          defaultvalues={[achievementLevelOptions.default]}
          initialselections={getFilterSettingsValue(
            levelKey,
            selectedAchievementLevel,
          )}
          sectiontitle={"Måloppnåelse"}
          sectionid={levelKey}
          filterkey={levelKey}
        />
        <RadioGroupFilterSection
          radios={medicalFieldOptions.values}
          defaultvalues={[medicalFieldOptions.default]}
          initialselections={getFilterSettingsValue(
            medicalFieldKey,
            selectedMedicalField,
          )}
          sectiontitle={"Fagområder"}
          sectionid={medicalFieldKey}
          filterkey={medicalFieldKey}
        />
        <TreeViewFilterSection
          refreshState={shouldRefreshInititalState}
          maxselections={25 /*maxSelectedTreatmentUnits()*/}
          treedata={treatmentUnits.treedata}
          defaultvalues={treatmentUnits.defaults}
          initialselections={
            selectedTreatmentUnits.map((value) => ({
              value: value,
              valueLabel: value,
            })) as FilterSettingsValue[]
          }
          sectionid={treatmentUnitsKey}
          sectiontitle="Behandlingsenheter"
          filterkey={treatmentUnitsKey}
        />
      </FilterMenu>
    </>
  );
}

export default TreatmentQualityFilterMenu;
