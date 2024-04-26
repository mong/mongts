import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ArrayParam,
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
  SwitchFilterSection,
} from "qmongjs";
import {
  getAchievementLevelOptions,
  getMedicalFields,
  getTreatmentUnitsTree,
  getYearOptions,
} from "./filterMenuOptions";
import { useUnitNamesQuery } from "../../../helpers/hooks";
import Alert from "@mui/material/Alert";
import { UseQueryResult } from "@tanstack/react-query";
import {
  TreeViewFilterSectionNode,
  TreeViewFilterSettingsValue,
  initFilterSettingsValuesMap as getFilterSettingsValuesMap,
} from "../TreeViewFilterSection";

// The keys used for the different filter sections
export const yearKey = "year";
export const levelKey = "level";
export const medicalFieldKey = "indicator";
export const treatmentUnitsKey = "selected_treatment_units";
export const dataQualityKey = "dg";

/**
 * The properties for the TreatmentQualityFilterMenu component.
 * The onSelectionChanged handler is called when the selection changes.
 */
export type TreatmentQualityFilterMenuProps = PropsWithChildren<{
  onSelectionChanged?: FilterMenuSelectionChangedHandler;
  onFilterInitialized?: FilterMenuFilterInitializedHandler;
  context: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registryNameData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  medicalFieldData: any;
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
  options: FilterSettingsValue[] | TreeViewFilterSectionNode[];
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
  registryNameData: registryNameData,
  medicalFieldData: medicalFieldData,
  context: context,
}: TreatmentQualityFilterMenuProps) {
  const selectedRegister = "all";
  const queryContext = { context: context, type: "ind" }; // TODO: Variable for "ind"/"dg"?

  // When the user navigates to the page, it may contain query parameters for
  // filtering indicators. Use NextRouter to get the current path containing the
  // initial query parameters.

  const router = useRouter();

  // Next's prerender stage causes problems for the initial values given to
  // useReducer, because they are only set once by the reducer and are missing
  // during Next's prerender stage. Tell FilterMenu to refresh its state during
  // the first call after the prerender is done.

  const [prevReady, setPrevReady] = useState(router.isReady);
  const prerenderFinished = prevReady !== router.isReady;

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
  const medicalFields = getMedicalFields(medicalFieldData, registryNameData);
  const medicalFieldsMap = getFilterSettingsValuesMap(medicalFields.treedata);

  const [selectedMedicalFields, setSelectedMedicalFields] = useQueryParam(
    medicalFieldKey,
    withDefault(ArrayParam, [medicalFields.defaults[0].value]),
  );

  optionsMap.set(medicalFieldKey, {
    options: medicalFields.treedata,
    default: medicalFields.defaults[0],
    multiselect: true,
    selected: selectedMedicalFields,
    setSelected: setSelectedMedicalFields as SetSelectedType,
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

  const [prevApiQueryLoading, setPrevApiQueryLoading] = useState(
    unitNamesQuery.isLoading,
  );
  const apiQueriesCompleted = prevApiQueryLoading && !unitNamesQuery.isLoading;

  useEffect(() => {
    setPrevApiQueryLoading(unitNamesQuery.isLoading);
  }, [unitNamesQuery.isLoading]);

  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  optionsMap.set(treatmentUnitsKey, {
    options: treatmentUnits.treedata,
    default: treatmentUnits.defaults[0],
    multiselect: true,
    selected: selectedTreatmentUnits,
    setSelected: setSelectedTreatmentUnits as SetSelectedType,
  });

  // Data quality selection
  const [dataQualitySelected, setDataQualitySelected] = useQueryParam<string>(
    dataQualityKey,
    withDefault(StringParam, "false"),
  );
  const dataQualitySelectedValue = {
    value: "true",
    valueLabel: "Vis datakvalitet",
  };
  const dataQualityEmptyValue = { value: "", valueLabel: "" };
  optionsMap.set(dataQualityKey, {
    options: [dataQualityEmptyValue, dataQualitySelectedValue],
    default: dataQualityEmptyValue,
    multiselect: false,
    selected: dataQualitySelected,
    setSelected: setDataQualitySelected as SetSelectedType,
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
        setSelected(selectedValue);
      } else {
        const selectedValues = newSelections?.map(
          (filterSettingsValue) => filterSettingsValue.value,
        ) ?? [defaultOption.value];
        setSelected(selectedValues);
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
      default:
        break;
    }

    return result;
  };

  const getValueLabel = (
    value: string | null,
    medicalFieldsMap: Map<string, TreeViewFilterSettingsValue>,
  ): string | null => {
    if (value === null) {
      return null;
    }
    const filterSettingsValue = medicalFieldsMap.get(value);
    return filterSettingsValue?.valueLabel ?? null;
  };

  const shouldRefreshInitialState = prerenderFinished || apiQueriesCompleted;

  return (
    <>
      {!(medicalFieldData || registryNameData) && (
        <Alert severity="error">
          Det oppstod en feil ved henting av fagområder og registre!
        </Alert>
      )}
      <FilterMenu
        refreshState={shouldRefreshInitialState}
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
        <TreeViewFilterSection
          refreshState={shouldRefreshInitialState}
          treedata={medicalFields.treedata}
          defaultvalues={medicalFields.defaults}
          autouncheckid={medicalFields.defaults[0].value}
          initialselections={
            selectedMedicalFields.map((value) => ({
              value: value,
              valueLabel: getValueLabel(value, medicalFieldsMap),
            })) as FilterSettingsValue[]
          }
          sectionid={medicalFieldKey}
          sectiontitle="Fagområder"
          filterkey={medicalFieldKey}
          searchbox={true}
        />
        <TreeViewFilterSection
          refreshState={shouldRefreshInitialState}
          treedata={treatmentUnits.treedata}
          defaultvalues={treatmentUnits.defaults}
          initialselections={
            selectedTreatmentUnits.map((value) => ({
              value: value,
              valueLabel: value,
            })) as FilterSettingsValue[]
          }
          sectionid={treatmentUnitsKey}
          sectiontitle={
            context === "resident" ? "Opptaksområder" : "Behandlingsenheter"
          }
          filterkey={treatmentUnitsKey}
          searchbox={true}
        />
        <SwitchFilterSection
          sectionid={dataQualityKey}
          filterkey={dataQualityKey}
          sectiontitle={"Datakvalitet"}
          label={dataQualitySelectedValue.valueLabel}
          initialselections={
            dataQualitySelected === "true"
              ? [dataQualitySelectedValue]
              : undefined
          }
          activatedswitchvalue={dataQualitySelectedValue}
        />
      </FilterMenu>
    </>
  );
}

export default TreatmentQualityFilterMenu;
