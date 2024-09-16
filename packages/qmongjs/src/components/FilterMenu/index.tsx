import { ReactElement, PropsWithChildren, useReducer, useEffect } from "react";
import Stack from "@mui/material/Container";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Card, CardContent, Box } from "@mui/material";
import { CustomAccordionExpandIcon } from "./CustomAccordionExpandIcon";

import {
  FilterSettingsContext,
  FilterSettingsValue,
  FilterSettings,
} from "./FilterSettingsContext";
import {
  FilterSettingsActionType,
  FilterSettingsDispatchContext,
  FilterSettingsReducerType,
} from "./FilterSettingsReducer";
import { filterSettingsReducer } from "./FilterSettingsReducer";
import { FilterSettingsAction } from "./FilterSettingsReducer";

/**
 * The type/signature of the handler function to call when the selection changes. It is called with the new
 * filter settings, the old filter settings, and the action that caused the change.
 */
export type FilterMenuSelectionChangedHandler = (
  newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
  oldFilterSettings: { map: Map<string, FilterSettingsValue[]> },
  action: FilterSettingsAction,
) => void;

/**
 * The type/signature of the handler function to call when the filter settings are initialized. It is called
 * with the filter settings.
 */
export type FilterMenuFilterInitializedHandler = (
  filterSettings: Map<string, FilterSettingsValue[]>,
) => void;

/**
 * The properties for the FilterMenu component. The onSelectionChanged handler is called when the
 * selection changes. The initialSelections are used to initialize the filter settings. The
 * defaultValues are used to reset the filter settings. The children are the filter sections.
 */
type FilterMenuProps = PropsWithChildren<{
  onSelectionChanged?: FilterMenuSelectionChangedHandler;
  onFilterInitialized?: FilterMenuFilterInitializedHandler;
  initialSelections?: Map<string, FilterSettingsValue[]>;
  defaultValues?: Map<string, FilterSettingsValue[]>;
  refreshState?: boolean;
  children:
    | ReactElement<FilterMenuSectionProps>
    | ReactElement<FilterMenuSectionProps>[];
}>;

/**
 * The properties for a filter menu section. The sectionid is a unique identifier for the section.
 * The sectiontitle is the title of the section. The filterkey is the key for the filter settings. The
 * accordion property is used to indicate if the section should be an accordion. The defaultvalues are
 * the default values for the section.
 *
 * Note that the properties are all small caps for use as attribtues directly in JSX elements
 */
export type FilterMenuSectionProps = PropsWithChildren<{
  sectionid: string;
  sectiontitle: string;
  filterkey: string;
  accordion?: boolean;
  noShadow?: boolean;
  defaultvalues?: FilterSettingsValue[];
  initialselections?: FilterSettingsValue[];
  refreshState?: boolean;
}>;

/**
 * A section of the filter menu, wrapping a child component.
 * It can be a card or an accordion.
 */
const FilterMenuSection = ({
  sectionid,
  sectiontitle,
  accordion,
  noShadow,
  children,
}: FilterMenuSectionProps) => {
  if (accordion === false) {
    if (noShadow === true) {
      return (
        <Box key={`fms-box-${sectionid}`}>
          <CardContent>{children}</CardContent>
        </Box>
      );
    } else {
      return (
        <Card key={`fms-box-${sectionid}`}>
          <CardContent>{children}</CardContent>
        </Card>
      );
    }
  } else {
    return (
      <Accordion key={`fms-accordion-${sectionid}`}>
        <AccordionSummary
          expandIcon={<CustomAccordionExpandIcon />}
          sx={{ flexDirection: "row-reverse" }}
        >
          <Typography variant="body1" sx={{ margin: 1 }}>
            {sectiontitle}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    );
  }
};

/**
 * Used by the initialState function to merge default values from sections
 * into the overall default values map.
 *
 * @param sections Child elements that can have initial and default values
 * @param defaultValuesMap Default key-value pairs of filter settings
 * @returns The updated default values map
 */
const mergeWithSectionDefaults = (
  sections: ReactElement<FilterMenuSectionProps>[],
  defaultValuesMap: Map<string, FilterSettingsValue[]>,
) => {
  sections.forEach((section) => {
    const sectionFilterKey = section.props.filterkey;
    const sectionDefaults = section.props.defaultvalues;
    if (sectionFilterKey && sectionDefaults && sectionDefaults.length > 0) {
      defaultValuesMap.set(sectionFilterKey, sectionDefaults);
    }
  });

  return defaultValuesMap;
};

/**
 * Used by the initialState function to merge the initial filter settings
 * per section into the overall initial filter settings map.
 *
 * @param sections Child elements that can have initial and default values
 * @param initialSelectionsMap Initial key-value pairs of filter settings
 * @returns The updated initial settings values map
 */
const mergeWithSectionInitialSelections = (
  sections: ReactElement<FilterMenuSectionProps>[],
  initialSelectionsMap: Map<string, FilterSettingsValue[]>,
) => {
  sections.forEach((section) => {
    const sectionFilterKey = section.props.filterkey;
    const sectionInitialSelections = section.props.initialselections;
    if (
      sectionFilterKey &&
      sectionInitialSelections &&
      sectionInitialSelections.length > 0
    ) {
      initialSelectionsMap.set(sectionFilterKey, sectionInitialSelections);
    }
  });

  return initialSelectionsMap;
};

/**
 * Input arguments for the createInitialFilterSettingsWrapper function.
 *
 * @property initialFilterSelections Initial key-value pairs of filter settings
 * @property defaultValues Default key-value pairs of filter settings
 * @property sections Child elements that can have initial and default values
 */
type CreateInitialFilterSettingsArgs = {
  initialFilterSelections?: Map<string, FilterSettingsValue[]>;
  defaultValues?: Map<string, FilterSettingsValue[]>;
  sections?: ReactElement<FilterMenuSectionProps>[];
  onFilterInitialized?: FilterMenuFilterInitializedHandler;
};

/**
 * Function used by FilterMenu to merge initial and default filter settings.
 *
 * FilterMenu accepts both initial settings and default (fallback) settings that
 * can be set either at the top level or at the section level. The initial
 * settings are used to initialize the filter settings, whereas the default
 * settings are applied when resetting the filter settings, if present.
 *
 * @returns A FilterSettings instance with the merged initial and default values
 */
const createInitialFilterSettings = ({
  initialFilterSelections,
  defaultValues,
  sections,
  onFilterInitialized,
}: CreateInitialFilterSettingsArgs) => {
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

  if (sections)
    defaultValuesMap = mergeWithSectionDefaults(sections, defaultValuesMap);

  defaultValuesMap.forEach((value, key) => {
    if (!filterSettingsMap.has(key)) filterSettingsMap.set(key, value);
  });

  if (sections)
    filterSettingsMap = mergeWithSectionInitialSelections(
      sections,
      filterSettingsMap,
    );

  if (onFilterInitialized) {
    // Call after the current component has finished rendering, because an error
    // will be thrown if the other component's state is updated during the current
    // render phase.
    setTimeout(() => {
      onFilterInitialized(filterSettingsMap);
    }, 0);
  }

  return { map: filterSettingsMap, defaults: defaultValuesMap };
};

/**
 * Function to wrap a reducer with a handler that is called when the selection
 * changes.
 *
 * @param reducer The reducer to wrap
 * @param onSelectionChanged The handler to call when the selection changes
 * @returns The updated filter settings
 */
const wrapReducer = (
  reducer: FilterSettingsReducerType,
  onSelectionChanged?: FilterMenuSelectionChangedHandler,
) => {
  return (filterSettings: FilterSettings, action: FilterSettingsAction) => {
    const oldFilterSettings = filterSettings;
    const newFilterSettings = reducer(filterSettings, action);

    if (onSelectionChanged) {
      // Call after the current component has finished rendering, because an error
      // will be thrown if the other component's state is updated during the current
      // render phase.
      setTimeout(() => {
        onSelectionChanged(newFilterSettings, oldFilterSettings, action);
      }, 0);
    }

    return newFilterSettings;
  };
};

/**
 * Function to build a FilterMenuSection wrapping the input child element.
 * @param elmt The child ReactElement supporting FilterMenuSectionProps to wrap
 */
const buildFilterMenuSection = (elmt: ReactElement<FilterMenuSectionProps>) => {
  const {
    filterkey,
    sectionid,
    sectiontitle,
    accordion,
    noShadow,
    defaultvalues,
    initialselections,
  } = elmt.props;

  return (
    <FilterMenuSection
      filterkey={filterkey}
      sectionid={sectionid}
      sectiontitle={sectiontitle}
      accordion={accordion}
      noShadow={noShadow}
      key={`fms-${sectionid}`}
      defaultvalues={defaultvalues}
      initialselections={initialselections}
    >
      {elmt}
    </FilterMenuSection>
  );
};

/**
 * The FilterMenu component is a container for a set of filter sections. It
 * manages the state of the filter settings and provides a context for child
 * components to access the filter settings and dispatch actions to update them.
 * It also provides a handler to notify when the filter settings change.
 */
export const FilterMenu = ({
  onSelectionChanged,
  onFilterInitialized,
  initialSelections,
  defaultValues,
  refreshState,
  children,
}: FilterMenuProps) => {
  const sections = Array.isArray(children)
    ? children.map(buildFilterMenuSection)
    : [buildFilterMenuSection(children)];

  const [filterSettings, dispatch] = useReducer(
    wrapReducer(filterSettingsReducer, onSelectionChanged),
    {
      initialSelections,
      defaultValues,
      sections,
      onFilterInitialized,
    } as CreateInitialFilterSettingsArgs,
    createInitialFilterSettings,
  );

  // If the refreshState changes to true, reset the filter settings by re-initializing the state.
  useEffect(() => {
    if (refreshState) {
      dispatch({
        type: FilterSettingsActionType.SET_ALL_SELECTIONS,
        sectionSetting: { key: "", values: [] },
        filterSettings: createInitialFilterSettings({
          initialSelections,
          defaultValues,
          sections,
          onFilterInitialized,
        } as CreateInitialFilterSettingsArgs).map,
      });
    }
  }, [refreshState]);

  return (
    <FilterSettingsContext.Provider value={filterSettings}>
      <FilterSettingsDispatchContext.Provider value={dispatch}>
        <Stack disableGutters>{sections}</Stack>
      </FilterSettingsDispatchContext.Provider>
    </FilterSettingsContext.Provider>
  );
};
