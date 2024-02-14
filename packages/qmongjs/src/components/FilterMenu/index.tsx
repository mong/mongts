import { ReactElement, PropsWithChildren, useReducer } from "react";
import Stack from "@mui/material/Container";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FilterSettingsContext,
  FilterSettingsDispatchContext,
  filterSettingsReducer,
  FilterSettingsValue,
  FilterSettings,
  FilterSettingsAction,
} from "./FilterSettingsContext";

export type FilterMenuSelectionChangedHandler = (
  newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
  oldFilterSettings: { map: Map<string, FilterSettingsValue[]> },
  action: FilterSettingsAction,
) => void;

export type FilterMenuProps = PropsWithChildren<{
  onSelectionChanged?: FilterMenuSelectionChangedHandler;
  initialSelections?: Map<string, FilterSettingsValue[]>;
  defaultValues?: Map<string, FilterSettingsValue[]>;
  children:
    | ReactElement<FilterMenuSectionProps>
    | ReactElement<FilterMenuSectionProps>[];
}>;

// The properties are all small caps for use as attribtues directly in JSX elements
export type FilterMenuSectionProps = PropsWithChildren<{
  sectionid: string;
  sectiontitle: string;
  filterkey: string;
  accordion?: string;
  defaultvalues?: FilterSettingsValue[];
}>;

const FilterMenuSection = ({
  sectionid,
  sectiontitle,
  accordion,
  children,
}: FilterMenuSectionProps) => {
  if (accordion === "false") {
    return (
      <Card key={`fms-box-${sectionid}`}>
        <CardContent>{children}</CardContent>
      </Card>
    );
  } else {
    return (
      <Accordion key={`fms-accordion-${sectionid}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {sectiontitle}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    );
  }
};

export const initialState = (
  initialFilterSelections?: Map<string, FilterSettingsValue[]>,
  defaultValues?: Map<string, FilterSettingsValue[]>,
  sections?: ReactElement<FilterMenuSectionProps>[],
) => {
  let filterSettingsMap: Map<string, FilterSettingsValue[]>;
  if (initialFilterSelections)
    filterSettingsMap = new Map<string, FilterSettingsValue[]>(
      initialFilterSelections.entries(),
    );
  else filterSettingsMap = new Map<string, FilterSettingsValue[]>();

  let defaultValuesMap: Map<string, FilterSettingsValue[]>;
  if (defaultValues)
    defaultValuesMap = new Map<string, FilterSettingsValue[]>(
      defaultValues.entries(),
    );
  else defaultValuesMap = new Map<string, FilterSettingsValue[]>();

  sections?.forEach((section) => {
    const sectionFilterKey = section.props.filterkey;
    const sectionDefaults = section.props.defaultvalues;
    if (sectionFilterKey && sectionDefaults && sectionDefaults.length > 0) {
      if (!defaultValuesMap.has(sectionFilterKey))
        defaultValuesMap.set(sectionFilterKey, sectionDefaults);
    }
  });

  defaultValuesMap.forEach((value, key) => {
    if (!filterSettingsMap.has(key)) filterSettingsMap.set(key, value);
  });

  return { map: filterSettingsMap, defaults: defaultValuesMap };
};

export type FilterMenuReducerType = (
  state: FilterSettings,
  action: FilterSettingsAction,
) => FilterSettings;

export const wrapReducer = (
  reducer: FilterMenuReducerType,
  onSelectionChanged?: FilterMenuSelectionChangedHandler,
) => {
  return (filterSettings: FilterSettings, action: FilterSettingsAction) => {
    const oldFilterSettings = filterSettings;
    const newFilterSettings = reducer(filterSettings, action);
    if (onSelectionChanged) {
      onSelectionChanged(newFilterSettings, oldFilterSettings, action);
    }
    return newFilterSettings;
  };
};

const buildFilterMenuSection = (elmt: ReactElement<FilterMenuSectionProps>) => {
  const { filterkey, sectionid, sectiontitle, accordion, defaultvalues } =
    elmt.props;

  return (
    <FilterMenuSection
      filterkey={filterkey}
      sectionid={sectionid}
      sectiontitle={sectiontitle}
      accordion={accordion}
      key={`fms-${sectionid}`}
      defaultvalues={defaultvalues}
    >
      {elmt}
    </FilterMenuSection>
  );
};

export const FilterMenu = ({
  onSelectionChanged,
  initialSelections,
  defaultValues,
  children,
}: FilterMenuProps) => {
  const sections = Array.isArray(children)
    ? children.map(buildFilterMenuSection)
    : [buildFilterMenuSection(children)];

  const [filterSettings, dispatch] = useReducer(
    wrapReducer(filterSettingsReducer, onSelectionChanged),
    initialState(initialSelections, defaultValues, sections),
  );

  return (
    <FilterSettingsContext.Provider value={filterSettings}>
      <FilterSettingsDispatchContext.Provider value={dispatch}>
        <Stack>{sections}</Stack>
      </FilterSettingsDispatchContext.Provider>
    </FilterSettingsContext.Provider>
  );
};

export default FilterMenu;
