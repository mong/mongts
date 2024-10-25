import { useEffect, useState, useRef } from "react";
import {
  skdeTheme,
  FilterSettingsValue,
  FilterMenu,
  TreeViewFilterSection,
  FilterSettings,
  CustomAccordionExpandIcon,
  getTreatmentUnitsTree,
  useShouldReinitialize,
} from "qmongjs";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
  Typography,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import {
  useQueryParam,
  DelimitedArrayParam,
  withDefault,
} from "use-query-params";
import { UseQueryResult } from "@tanstack/react-query";

type UnitFilterMenuProps = {
  width: number;
  setUnitName: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unitNamesQuery: UseQueryResult<any, Error>;
  unitName: string;
};

const AccordionWrapper = styled(Box)(() => ({
  "& MuiAccordion-root:before": {
    backgroundColor: "white",
  },
}));

export const UnitFilterMenu = (props: UnitFilterMenuProps) => {
  const { width, setUnitName, unitNamesQuery, unitName } = props;
  const shouldRefreshInitialState = useShouldReinitialize([unitNamesQuery]);

  // States
  const [expanded, setExpanded] = useState(false);
  const [parentChangedUnit, setParentChangedUnit] = useState(false);
  const parentChangedUnitRef = useRef(false);

  // URL query parameter key
  const treatmentUnitsKey = "selected_treatment_units";

  // Current unit name and its setter function
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

  useEffect(() => {
    if (unitName && unitName !== selectedTreatmentUnits[0]) {
      setParentChangedUnit(true);
      parentChangedUnitRef.current = true;
    }
  }, [unitName, selectedTreatmentUnits]);

  // Get thre treatment unit structure and trim it
  const treatmentUnits = getTreatmentUnitsTree(unitNamesQuery);

  if (treatmentUnits.treedata.length > 1) {
    // Find the index of "Private" and remove the children. The sub units should not be shown.
    // TreetmentUnits.treedata starts with one element "Nasjonalt". Need to wait for it to build up the rest.
    const indPrivate = treatmentUnits.treedata.findIndex(
      (x) => x.nodeValue.value === "Private",
    );
    treatmentUnits.treedata[indPrivate].children = [];
  }

  // ###################################### //
  // Callback functions for the filter menu //
  // ###################################### //

  // Callback function for initialising the filter meny
  const initialiseFilter = (
    filterInput: Map<string, FilterSettingsValue[]>,
  ) => {
    const newUnit = filterInput.get(treatmentUnitsKey).map((el) => el.value);

    setUnitName(newUnit[0]);
  };

  // Callback function for updating the filter menu
  const handleChange = (filterInput: FilterSettings) => {
    // firstRender is a guard to ensure that handleChange does not trigger at the same time as initaliseFilter
    const newUnit = filterInput.map
      .get(treatmentUnitsKey)
      .map((el) => el.value);

    setExpanded(false);
    setSelectedTreatmentUnits(newUnit);
    setUnitName(newUnit[0]);

    if (parentChangedUnitRef.current) {
      setParentChangedUnit(false);
      parentChangedUnitRef.current = false;
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <AccordionWrapper>
        <Accordion
          square={true}
          sx={{
            width: width,
            borderRadius: 11,
            border: 1,
            borderColor: skdeTheme.palette.primary.main,
            backgroundColor: "white",
            color: skdeTheme.palette.primary.main,
          }}
          expanded={expanded}
          onChange={(e, expanded) => {
            setExpanded(expanded);
          }}
        >
          <AccordionSummary sx={{ padding: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {selectedTreatmentUnits[0] === "Nasjonalt"
                ? "Velg behandlingssted"
                : selectedTreatmentUnits[0]}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <CustomAccordionExpandIcon />
          </AccordionSummary>

          <AccordionDetails>
            <FilterMenu
              refreshState={shouldRefreshInitialState || parentChangedUnit}
              onSelectionChanged={handleChange}
              onFilterInitialized={initialiseFilter}
              // shouldResetFilter={shouldResetFilter}
            >
              <TreeViewFilterSection
                refreshState={shouldRefreshInitialState || parentChangedUnit}
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
          </AccordionDetails>
        </Accordion>
      </AccordionWrapper>
    </ClickAwayListener>
  );
};
