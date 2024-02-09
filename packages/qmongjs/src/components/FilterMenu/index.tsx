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
  newFilterSettings: Map<string, FilterSettingsValue[]>,
  oldFilterSettings: Map<string, FilterSettingsValue[]>,
) => void;

export type FilterMenuProps = PropsWithChildren<{
  onSelectionChanged?: FilterMenuSelectionChangedHandler;
  initialSelections?: Map<string, FilterSettingsValue[]>;
  children:
    | ReactElement<FilterMenuSectionProps>
    | ReactElement<FilterMenuSectionProps>[];
}>;

export type FilterMenuSectionProps = PropsWithChildren<{
  sectionid: string;
  sectiontitle: string;
  filterkey?: string;
  accordion?: string;
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

const initialFilterSelections = (
  initialFilterSelections?: Map<string, FilterSettingsValue[]>,
) => {
  if (initialFilterSelections)
    return new Map<string, FilterSettingsValue[]>(
      initialFilterSelections.entries(),
    );
  else return new Map<string, FilterSettingsValue[]>();
};

const buildFilterMenuSection = (elmt: ReactElement<FilterMenuSectionProps>) => {
  const { sectionid, sectiontitle, accordion } = elmt.props;

  return (
    <FilterMenuSection
      sectionid={sectionid}
      sectiontitle={sectiontitle}
      accordion={accordion}
      key={`fms-${sectionid}`}
    >
      {elmt}
    </FilterMenuSection>
  );
};

export type FilterMenuReducerType = (
  state: FilterSettings,
  action: FilterSettingsAction,
) => FilterSettings;

const wrapReducer = (
  reducer: FilterMenuReducerType,
  onSelectionChanged?: FilterMenuSelectionChangedHandler,
) => {
  return (filterSettings: FilterSettings, action: FilterSettingsAction) => {
    const oldFilterSettings = filterSettings;
    const newFilterSettings = reducer(filterSettings, action);
    if (onSelectionChanged) {
      onSelectionChanged(newFilterSettings, oldFilterSettings);
    }
    return newFilterSettings;
  };
};

const FilterMenu = ({
  onSelectionChanged,
  initialSelections,
  children,
}: FilterMenuProps) => {
  const [filterSettings, dispatch] = useReducer(
    wrapReducer(filterSettingsReducer, onSelectionChanged),
    initialFilterSelections(initialSelections),
  );

  const sections = Array.isArray(children)
    ? children.map(buildFilterMenuSection)
    : buildFilterMenuSection(children);

  return (
    <FilterSettingsContext.Provider value={filterSettings}>
      <FilterSettingsDispatchContext.Provider value={dispatch}>
        <Stack>{sections}</Stack>
      </FilterSettingsDispatchContext.Provider>
    </FilterSettingsContext.Provider>
  );
};

export default FilterMenu;
