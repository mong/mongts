import {
  FilterSettingsValue,
  FilterMenu,
  TreeViewFilterSection,
  FilterSettings,
  getTreatmentUnitsTree,
} from "qmongjs";
import {
  useQueryParam,
  DelimitedArrayParam,
  withDefault,
} from "use-query-params";
import { UseQueryResult } from "@tanstack/react-query";

type HeatMapFilterMenuProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    unitNamesQuery: UseQueryResult<any, Error>;
}

export const HeatMapFilterMenu = (props: HeatMapFilterMenuProps) => {
  const { unitNamesQuery } = props;

    // URL query parameter key
    const treatmentUnitsKey = "selected_treatment_units";

    // Current unit name and its setter function
    const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
      treatmentUnitsKey,
      withDefault(DelimitedArrayParam, ["Nasjonalt"]),
    );

  // Get thre treatment unit structure and trim it
  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  // ###################################### //
  // Callback functions for the filter menu //
  // ###################################### //

  // Callback function for initialising the filter meny
  const initialiseFilter = (
    filterInput: Map<string, FilterSettingsValue[]>,
  ) => { };

  const handleChange = (filterInput: FilterSettings) => { };



  return(
    <FilterMenu
      refreshState={true}
      onSelectionChanged={handleChange}
      onFilterInitialized={initialiseFilter}
    >
      <TreeViewFilterSection
        refreshState={true}
        treedata={treatmentUnits.treedata}
        defaultvalues={treatmentUnits.defaults}
        initialselections={
          selectedTreatmentUnits.map((value) => ({
            value: value,
            valueLabel: value,
          })) as FilterSettingsValue[]
        }
        sectionid={treatmentUnitsKey}
        sectiontitle={"Behandlingsenheter"}
        filterkey={treatmentUnitsKey}
        searchbox={true}
        multiselect={false}
        accordion={false}
        noShadow={true}
      />
    </FilterMenu>
  )
}