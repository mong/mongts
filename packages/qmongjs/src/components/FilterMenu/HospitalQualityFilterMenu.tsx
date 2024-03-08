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
import {
  mainQueryParamsConfig,
  maxYear,
  minYear,
  defaultYear,
} from "../../app_config";

// Maximum allowed number of selected treatment units
const maxTreatmentUnits = 5;

/**
 * Input properties for the HospitalQualityFilterMenu component.
 * The onSelectionChanged handler is called when the selection changes.
 */
export type HospitalQualityFilterMenuProps = {};

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
 * Extracts the query parameters from a path string
 *
 * @param path A path string
 * @returns A URLSearchParams object containing the query parameters in the path
 */
export const extractQueryParams = (path: string) => {
  const queryParamsStartIndex = path.lastIndexOf("?");
  let queryString: string;

  if (queryParamsStartIndex === -1) {
    queryString = "";
  } else {
    queryString = path.substring(queryParamsStartIndex);
  }

  return new URLSearchParams(queryString);
};

/**
 * Component for the hospital quality (sykehuskvalitet) filter menu.
 *
 * @returns The hospital quality filter menu component
 */
export function HospitalQualityFilterMenu(
  props: HospitalQualityFilterMenuProps,
) {
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

  const initialQueryParams = extractQueryParams(path);

  const yearOptions = getYearOptions();

  const [selectedYear, setSelectedYear] = useQueryParam<string>(
    "year",
    withDefault(StringParam, yearOptions.default.value),
  );

  /**
   * Handler function for setting section selections,
   * called by handleFilterChanged
   */
  const setSectionSelections = (
    action: FilterSettingsAction,
    newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
  ) => {
    switch (action.sectionSetting.key) {
      case "year": {
        const selectedYear =
          newFilterSettings.map.get("year")?.[0]?.value ??
          yearOptions.default.value;
        setSelectedYear(selectedYear);
        break;
      }
      default:
        break;
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
      case FilterSettingsActionType.SET_SECTION_SELECTIONS: {
        setSectionSelections(action, newFilterSettings);
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
        defaultvalues={[]}
        initialselections={[]}
      />
      <RadioGroupFilterSection
        radios={yearOptions.values}
        defaultvalues={[yearOptions.default]}
        sectiontitle={"År"}
        sectionid={"year"}
        filterkey={"year"}
      />
      <RadioGroupFilterSection
        radios={[]}
        defaultvalues={[]}
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
