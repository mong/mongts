import { useState, useEffect } from "react";
import {
  skdeTheme,
  FilterSettingsValue,
  FilterMenu,
  TreeViewFilterSection,
  FilterSettings,
  CustomAccordionExpandIcon,
  useUnitUrlsQuery,
  getTreatmentUnitsTree,
} from "qmongjs";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import {
  useQueryParam,
  DelimitedArrayParam,
  withDefault,
} from "use-query-params";
import { URLs } from "types";
import { UseQueryResult } from "@tanstack/react-query";

type UnitFilterMenuProps = {
  width: number;
  setUnitName: React.Dispatch<React.SetStateAction<string>>;
  setUnitUrl: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unitNamesQuery: UseQueryResult<any, unknown>;
};

const AccordionWrapper = styled(Box)(() => ({
  "& MuiAccordion-root:before": {
    backgroundColor: "white",
  },
}));

export const UnitFilterMenu = (props: UnitFilterMenuProps) => {
  const { width, setUnitName, setUnitUrl, unitNamesQuery } = props;

  // States
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  // URL query parameter key
  const treatmentUnitsKey = "selected_treatment_units";

  // Current unit name and its setter function
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useQueryParam(
    treatmentUnitsKey,
    withDefault(DelimitedArrayParam, ["Nasjonalt"]),
  );

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

  // URLs for the web pages to the different treatment units
  const unitUrlsQuery = useUnitUrlsQuery();

  // Condition for regreshing the filter menu
  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldRefreshInitialState = mounted && unitUrlsQuery.isFetched;

  // ###################################### //
  // Callback functions for the filter menu //
  // ###################################### //

  // Callback function for initialising the filter meny
  const initialiseFilter = (
    filterInput: Map<string, FilterSettingsValue[]>,
  ) => {
    const newUnit = filterInput.get(treatmentUnitsKey).map((el) => el.value);

    let unitUrl: URLs | undefined;
    if (unitUrlsQuery.data) {
      unitUrl = unitUrlsQuery.data.filter((row: URLs) => {
        return row.shortName === selectedTreatmentUnits[0];
      });
    }

    if (unitUrl && unitUrl[0]) {
      setUnitUrl(unitUrl[0].url);
    } else {
      setUnitUrl(null);
    }

    setUnitName(newUnit[0]);
  };

  // Callback function for updating the filter menu
  const handleChange = (filterInput: FilterSettings) => {
    // firstRender is a guard to ensure that handleChange does not trigger at the same time as initaliseFilter
    if (!firstRender) {
      const newUnit = filterInput.map
        .get(treatmentUnitsKey)
        .map((el) => el.value);

      setExpanded(false);
      setSelectedTreatmentUnits(newUnit);

      setUnitName(selectedTreatmentUnits[0]);

      let unitUrl: URLs | undefined;
      if (unitUrlsQuery.data) {
        unitUrl = unitUrlsQuery.data.filter((row: URLs) => {
          return row.shortName === selectedTreatmentUnits[0];
        });
      }

      if (unitUrl && unitUrl[0]) {
        setUnitUrl(unitUrl[0].url);
      } else {
        setUnitUrl(null);
      }
    } else {
      setFirstRender(false);
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
          <AccordionSummary expandIcon={<CustomAccordionExpandIcon />}>
            <h3>
              {selectedTreatmentUnits[0] === "Nasjonalt"
                ? "Velg behandlingssted"
                : selectedTreatmentUnits[0]}
            </h3>
          </AccordionSummary>

          <AccordionDetails>
            <FilterMenu
              refreshState={shouldRefreshInitialState}
              onSelectionChanged={handleChange}
              onFilterInitialized={initialiseFilter}
            >
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
