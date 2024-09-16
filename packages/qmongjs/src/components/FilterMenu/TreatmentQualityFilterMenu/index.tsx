import { PropsWithChildren, useEffect, useState } from "react";
import {
  ArrayParam,
  DelimitedArrayParam,
  StringParam,
  UrlUpdateType,
  useQueryParam,
  useQueryParams,
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
import {
  useUnitNamesQuery,
  useSelectionYearsQuery,
} from "../../../helpers/hooks";
import Alert from "@mui/material/Alert";
import { UseQueryResult } from "@tanstack/react-query";
import {
  TreeViewFilterSectionNode,
  TreeViewFilterSettingsValue,
  getFilterSettingsValuesMap,
} from "../TreeViewFilterSection";
import { useMediaQuery, useTheme } from "@mui/material";

// The keys used for the different filter sections
export const yearKey = "year";
export const levelKey = "level";
export const medicalFieldKey = "indicator";
export const treatmentUnitsKey = "selected_treatment_units";
const dataQualityKey = "dg";

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
  register?: string;
}>;

// Types used due to the use of useQueryParam
type SetSelectedType = (
  newValue: string | (string | undefined)[] | undefined,
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
  default: FilterSettingsValue | null;
  multiselect: boolean;
  selected: StringNullOrUndefined | UndefinedOrArrayOfStringOrNull;
  setSelected: (
    newValue: string | (string | undefined)[] | undefined,
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
  register: register,
}: TreatmentQualityFilterMenuProps) {
  const selectedRegister = register ?? "all";
  const queryContext = { context: context, type: "ind" }; // TODO: Variable for "ind"/"dg"?

  // Restrict max number of treatment units for small view sizes
  const theme = useTheme();
  const maxSelectedTreatmentUnits = useMediaQuery(theme.breakpoints.down("md"))
    ? 5
    : 10;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Map for filter options, defaults, and query parameter values and setters
  const optionsMap = new Map<string, OptionsMapEntry>();

  // All params
  const [, setAllQueries] = useQueryParams({
    year: StringParam,
    level: StringParam,
    indicator: ArrayParam,
    selected_treatment_units: DelimitedArrayParam,
    dg: StringParam,
  });

  // Get list of all years with data from given register
  let listOfYears: [number] | undefined = undefined;
  if (register) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectionYearQuery: UseQueryResult<any, unknown> =
      useSelectionYearsQuery(register as string, queryContext.context, "");

    listOfYears = selectionYearQuery.data as [number];
  }
  // Year selection
  const yearOptions = listOfYears
    ? getYearOptions(Math.min(...listOfYears), Math.max(...listOfYears))
    : getYearOptions();

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
      // withDefault(StringParam, achievementLevelOptions.default.value),
    );
  optionsMap.set(levelKey, {
    options: achievementLevelOptions.values,
    default: null, // achievementLevelOptions.default,
    multiselect: false,
    selected: selectedAchievementLevel,
    setSelected: setSelectedAchievementLevel as SetSelectedType,
  });

  // Medical fields
  const medicalFields = getMedicalFields(medicalFieldData, registryNameData);
  const medicalFieldsMap = getFilterSettingsValuesMap(medicalFields.treedata);

  const [selectedMedicalFields, setSelectedMedicalFields] = useQueryParam(
    medicalFieldKey,
    // withDefault(ArrayParam, [medicalFields.defaults[0].value]), "Alle fagområder" as default value
    ArrayParam,
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

  const [previouslyNotFetched, setPreviouslyNotFetched] = useState(
    !unitNamesQuery.isFetched,
  );

  // Refresh initial state if query is fetched and was previously not fetched
  const shouldRefreshInitialState =
    unitNamesQuery.isFetched && previouslyNotFetched;

  useEffect(() => {
    setPreviouslyNotFetched(!unitNamesQuery.isFetched);
  }, [unitNamesQuery.isFetched]);

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
        const selectedValue = newSelections?.[0]?.value ?? defaultOption?.value;
        setSelected(selectedValue);
      } else {
        const selectedValues = newSelections?.map(
          (filterSettingsValue) => filterSettingsValue.value,
        ) ?? [defaultOption?.value];
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
      case FilterSettingsActionType.RESET_SELECTIONS: {
        setAllQueries({
          year:
            newFilterSettings.map.get(yearKey)?.[0].value ??
            yearOptions.default.value,
          level: newFilterSettings.map.get(levelKey)?.[0]?.value, //??
          //achievementLevelOptions.default.value,
          indicator: [
            newFilterSettings.map.get(medicalFieldKey)?.[0].value ?? null,
            // medicalFields.defaults[0].value, "Alle fagområder" som default
          ],
          selected_treatment_units: [
            newFilterSettings.map.get(treatmentUnitsKey)?.[0].value ??
              treatmentUnits.defaults[0].value,
          ],
          dg:
            newFilterSettings.map.get(dataQualityKey)?.[0].value ??
            dataQualityEmptyValue.value,
        });
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
    medicalFieldsMap: Map<string, TreeViewFilterSettingsValue[]>,
  ): string | null => {
    if (value === null) {
      return null;
    }
    const filterSettingsValueArray = medicalFieldsMap.get(value);

    const valueLabel =
      Array.isArray(filterSettingsValueArray) &&
      filterSettingsValueArray.length > 0
        ? filterSettingsValueArray[0].valueLabel
        : null;

    return valueLabel;
  };

  if (!mounted) {
    return null;
  }

  if (register) {
    return (
      <>
        <FilterMenu
          refreshState={shouldRefreshInitialState}
          onSelectionChanged={handleFilterChanged}
          onFilterInitialized={onFilterInitialized}
        >
          <SelectedFiltersSection
            accordion={false}
            filterkey="selectedfilters"
            sectionid="selectedfilters"
            sectiontitle="Valgte filtre"
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
            maxselections={maxSelectedTreatmentUnits}
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
            defaultvalues={
              achievementLevelOptions.default
                ? [achievementLevelOptions.default]
                : []
            }
            initialselections={getFilterSettingsValue(
              levelKey,
              selectedAchievementLevel,
            )}
            sectiontitle={"Måloppnåelse"}
            sectionid={levelKey}
            filterkey={levelKey}
          />
        </FilterMenu>
      </>
    );
  }

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
          accordion={false}
          filterkey="selectedfilters"
          sectionid="selectedfilters"
          sectiontitle="Valgte filtre"
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
          maxselections={maxSelectedTreatmentUnits}
        />
        <TreeViewFilterSection
          refreshState={shouldRefreshInitialState}
          treedata={medicalFields.treedata}
          defaultvalues={medicalFields.defaults}
          // Automatic clearing selections when "Alle fagområder" is clicked
          // autouncheckid={medicalFields.defaults[0].value}
          initialselections={
            selectedMedicalFields?.map((value) => ({
              value: value,
              valueLabel: getValueLabel(value, medicalFieldsMap),
            })) as FilterSettingsValue[]
          }
          sectionid={medicalFieldKey}
          sectiontitle="Fagområder"
          filterkey={medicalFieldKey}
          searchbox={true}
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
          defaultvalues={
            achievementLevelOptions.default
              ? [achievementLevelOptions.default]
              : []
          }
          initialselections={getFilterSettingsValue(
            levelKey,
            selectedAchievementLevel,
          )}
          sectiontitle={"Måloppnåelse"}
          sectionid={levelKey}
          filterkey={levelKey}
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
