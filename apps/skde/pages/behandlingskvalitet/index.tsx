import { useState } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  ThemeProvider,
  Typography,
  useMediaQuery,
  Skeleton,
} from "@mui/material";

import { ChevronLeftRounded } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { useQueryParam, withDefault, StringParam } from "use-query-params";
import {
  FilterSettingsAction,
  FilterSettingsValue,
  TreatmentQualityFilterMenu,
  decodeRegisterQueryParam,
  useRegisterNamesQuery,
  defaultYear,
  levelKey,
  treatmentUnitsKey,
  yearKey,
  medicalFieldKey,
  useMedicalFieldsQuery,
  FilterSettingsActionType,
  IndicatorTable,
  IndicatorTableBodyV2,
  skdeTheme,
} from "qmongjs";
import { UseQueryResult } from "@tanstack/react-query";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSearchParams } from "next/navigation";
import TreatmentQualityAppBar from "../../src/components/TreatmentQuality/TreatmentQualityAppBar";
import {
  FilterDrawer,
  IndicatorTableWrapper,
  IndicatorTableV2Wrapper,
} from "../../src/components/TreatmentQuality";
import { Footer } from "../../src/components/Footer";
import { mainQueryParamsConfig } from "qmongjs";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import useOnElementAdded from "../../src/helpers/hooks/useOnElementAdded";

const dataQualityKey = "dg";

// Set to true to display the switch for activating the new table
const showNewTableSwitch = false;

const scrollToSelectedRow = (selectedRow: string): boolean => {
  const element = document.getElementById(selectedRow);
  const headerOffset = 160;

  if (element) {
    console.debug("Found element, attempting to scroll");
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    return true;
  } else {
    console.debug("Didn't find element");
    return false;
  }
};

export default function TreatmentQualityPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const [newIndicatorTableActivated, setNewIndicatorTableActivated] =
    useState(false);

  const searchParams = useSearchParams();
  const newTableOnly = searchParams.get("newtable") === "true";

  // Context (caregiver or resident)
  const [tableContext, setTableContext] = useQueryParam<string>(
    "context",
    withDefault(StringParam, "caregiver"),
  );

  // Used by indicator table
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(
    undefined,
  );
  const [selectedMedicalFields, setSelectedMedicalFields] = useState<string[]>(
    [],
  );
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useState([
    "Nasjonalt",
  ]);
  const [dataQualitySelected, setDataQualitySelected] =
    useState<boolean>(false);

  const selectedRow = useQueryParam(
    "selected_row",
    mainQueryParamsConfig.selected_row,
  )[0];

  // Load register names and medical fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  const queriesReady = !(
    registryNameQuery.isLoading || medicalFieldsQuery.isLoading
  );

  const registers = registryNameQuery?.data;
  const medicalFields = medicalFieldsQuery?.data;

  /**
   * Get the register names for the selected medical fields and registers
   *
   * @param medicalFieldFilter Array of medical field and register names
   * @returns Array of register names
   */
  const getMedicalFieldFilterRegisters = (medicalFieldFilter: string[]) => {
    let registerFilter: string[];

    if (!medicalFieldFilter || medicalFieldFilter[0] === "all") {
      registerFilter = registers.map((register) => register.rname);
    } else {
      const selectedMedicalFields = medicalFields.filter((field) =>
        medicalFieldFilter.includes(field.shortName),
      );
      const selectedMedicalFieldNames = selectedMedicalFields.map(
        (field) => field.shortName,
      );
      const selectedRegisters = medicalFieldFilter.filter(
        (name) => !selectedMedicalFieldNames.includes(name),
      );
      registerFilter = Array.from(
        new Set<string>([
          ...selectedMedicalFields.flatMap((field) => field.registers),
          ...selectedRegisters.map((register) =>
            decodeRegisterQueryParam(register),
          ),
        ]),
      );
    }

    return registerFilter;
  };

  /**
   * Handle that the initial filter settings are loaded, which can happen
   * more than once due to Next's pre-rendering and hydration behaviour combined
   * with reading of query params.
   *
   * @param filterSettings Initial values for the filter settings
   */
  const handleFilterInitialized = (
    filterSettings: Map<string, FilterSettingsValue[]>,
  ): void => {
    setSelectedYear(
      parseInt(filterSettings.get(yearKey)[0].value ?? defaultYear.toString()),
    );
    setSelectedLevel(filterSettings.get(levelKey)?.[0]?.value ?? undefined);

    const medicalFieldFilter = filterSettings
      .get(medicalFieldKey)
      ?.map((value) => value.value);
    const registerFilter = getMedicalFieldFilterRegisters(medicalFieldFilter);
    setSelectedMedicalFields(registerFilter);

    setSelectedTreatmentUnits(
      filterSettings.get(treatmentUnitsKey).map((value) => value.value),
    );

    setDataQualitySelected(
      filterSettings.get(dataQualityKey)?.[0].value === "true" ? true : false,
    );
  };

  const valueOrDefault = (
    key: string,
    filterSettings: { map: Map<string, FilterSettingsValue[]> },
  ) => {
    switch (key) {
      case yearKey: {
        return (
          filterSettings.map.get(yearKey)[0].value ?? defaultYear.toString()
        );
      }
      case levelKey: {
        return filterSettings.map.get(levelKey)?.[0]?.value ?? undefined;
      }
      case medicalFieldKey: {
        const medicalFieldFilter = filterSettings.map
          .get(medicalFieldKey)
          ?.map((value) => value.value);
        const registerFilter =
          getMedicalFieldFilterRegisters(medicalFieldFilter);
        return registerFilter;
      }
      case treatmentUnitsKey: {
        return filterSettings.map
          .get(treatmentUnitsKey)
          .map((value) => value.value);
      }
      case dataQualityKey: {
        return filterSettings.map.get(dataQualityKey)?.[0].value === "true"
          ? true
          : false;
      }
      default:
        break;
    }
  };

  const setAllSelected = (newFilterSettings: {
    map: Map<string, FilterSettingsValue[]>;
  }) => {
    setSelectedYear(
      parseInt(valueOrDefault(yearKey, newFilterSettings) as string),
    );
    setSelectedLevel(
      valueOrDefault(levelKey, newFilterSettings) as string | undefined,
    );
    setSelectedMedicalFields(
      valueOrDefault(medicalFieldKey, newFilterSettings) as string[],
    );
    setSelectedTreatmentUnits(
      valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
    );
    setDataQualitySelected(
      valueOrDefault(dataQualityKey, newFilterSettings) as boolean,
    );
  };

  /**
   * Handle filter changes
   */
  const handleFilterChanged = (
    newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    oldFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    action: FilterSettingsAction,
  ): void => {
    switch (action.sectionSetting.key) {
      case yearKey: {
        setSelectedYear(
          parseInt(valueOrDefault(yearKey, newFilterSettings) as string),
        );
        break;
      }
      case levelKey: {
        setSelectedLevel(
          valueOrDefault(levelKey, newFilterSettings) as string | undefined,
        );
        break;
      }
      case medicalFieldKey: {
        setSelectedMedicalFields(
          valueOrDefault(medicalFieldKey, newFilterSettings) as string[],
        );
        break;
      }
      case treatmentUnitsKey: {
        setSelectedTreatmentUnits(
          valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
        );
        break;
      }
      case dataQualityKey: {
        setDataQualitySelected(
          valueOrDefault(dataQualityKey, newFilterSettings) as boolean,
        );
        break;
      }
      default:
        break;
    }

    if (action.type === FilterSettingsActionType.RESET_SELECTIONS) {
      setAllSelected(newFilterSettings);
    }
  };

  // Use the custom hook to observe the addition of the selected row element, if
  // not already available.
  useOnElementAdded(selectedRow, queriesReady, scrollToSelectedRow);

  return (
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <PageWrapper>
        <TreatmentQualityAppBar
          openDrawer={() => toggleDrawer(true)}
          context={tableContext}
          onTabChanged={setTableContext}
        />
        <Grid container size={{ xs: 12 }}>
          {useMediaQuery(skdeTheme.breakpoints.up("xxl")) ? ( // Permanent menu on large screens
            <Grid size={{ xxl: 3, xxxl: 2 }} className="menu-wrapper">
              {queriesReady && (
                <Box
                  sx={{
                    mt: 4,
                    position: "sticky",
                    top: 100,
                    overflow: "auto",
                    maxHeight: window.innerHeight - 150,
                  }}
                >
                  <TreatmentQualityFilterMenu
                    onSelectionChanged={handleFilterChanged}
                    onFilterInitialized={handleFilterInitialized}
                    registryNameData={registers}
                    medicalFieldData={medicalFields}
                    context={tableContext}
                  />
                </Box>
              )}
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, xxl: 9, xxxl: 10 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                {queriesReady ? (
                  newIndicatorTableActivated || newTableOnly ? (
                    <IndicatorTableV2Wrapper className="table-wrapper">
                      <IndicatorTableBodyV2
                        key="indicator-table"
                        context={tableContext}
                        unitNames={selectedTreatmentUnits}
                        year={selectedYear}
                        type={dataQualitySelected ? "dg" : "ind"}
                        levels={selectedLevel}
                        medfields={selectedMedicalFields}
                      />
                    </IndicatorTableV2Wrapper>
                  ) : (
                    <IndicatorTableWrapper className="table-wrapper">
                      <IndicatorTable
                        key="indicator-table"
                        context={tableContext}
                        dataQuality={dataQualitySelected}
                        tableType="allRegistries"
                        registerNames={registers}
                        unitNames={selectedTreatmentUnits}
                        treatmentYear={selectedYear}
                        colspan={selectedTreatmentUnits.length + 1}
                        medicalFieldFilter={selectedMedicalFields}
                        showLevelFilter={selectedLevel}
                        selection_bar_height={0}
                        legend_height={0}
                        blockTitle={registers.map(
                          (register: { full_name: string }) =>
                            register.full_name,
                        )}
                        showTreatmentYear={true}
                      />
                    </IndicatorTableWrapper>
                  )
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={2000}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Footer page="behandlingskvalitet" />
      </PageWrapper>
      <FilterDrawer
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ display: "flex", m: 2, justifyContent: "space-between" }}>
          <Typography variant="h3">Filtermeny</Typography>
          <IconButton
            aria-label="Lukk sidemeny"
            onClick={() => toggleDrawer(false)}
          >
            <ChevronLeftRounded fontSize="large" />
          </IconButton>
        </Box>
        <Divider />
        {queriesReady && (
          <Box sx={{ mt: 4 }}>
            <TreatmentQualityFilterMenu
              onSelectionChanged={handleFilterChanged}
              onFilterInitialized={handleFilterInitialized}
              registryNameData={registers}
              medicalFieldData={medicalFields}
              context={tableContext}
            />
            {showNewTableSwitch && !newTableOnly && (
              <FormGroup sx={{ paddingRight: "1.5rem" }}>
                <FormControlLabel
                  label="Prøv ny tabellversjon"
                  labelPlacement="start"
                  control={
                    <Switch
                      checked={newIndicatorTableActivated}
                      onChange={(event) =>
                        setNewIndicatorTableActivated(event.target.checked)
                      }
                    />
                  }
                />
              </FormGroup>
            )}
          </Box>
        )}
      </FilterDrawer>
    </ThemeProvider>
  );
}
