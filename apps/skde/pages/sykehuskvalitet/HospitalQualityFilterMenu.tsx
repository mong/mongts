import { PropsWithChildren, useEffect, useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import {
  FilterMenu,
  SelectedFiltersSection,
  FilterSettingsValue,
  FilterSettingsAction,
} from "qmongjs";
import { useRouter } from "next/router";

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
 * Component for the hospital quality (sykehuskvalitet) filter menu
 *
 * @returns The hospital quality filter menu component
 */
export default function HospitalQualityFilterMenu() {
  const defaultYear = "2022";

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

  const [selectedYear, setSelectedYear] = useQueryParam<string | undefined>(
    "year",
    withDefault(StringParam, defaultYear),
  );

  /**
   * Handler function for filter selection changes
   */
  const handleFilterChanged = (
    newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    oldFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    action: FilterSettingsAction,
  ) => {
    setSelectedYear(newFilterSettings.map.get("selectedfilters")?.[0]?.value);
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
        defaultvalues={[{ value: defaultYear, valueLabel: defaultYear }]}
        initialselections={[{ value: selectedYear, valueLabel: selectedYear }]}
      />
    </FilterMenu>
  );
}
