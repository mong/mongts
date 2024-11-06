import { useState } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Link,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeftRounded } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { useQueryParam } from "use-query-params";
import {
  FilterSettingsAction,
  FilterSettingsValue,
  TreatmentQualityFilterMenu,
  useRegisterNamesQuery,
  defaultYear,
  levelKey,
  tableContextKey,
  treatmentUnitsKey,
  yearKey,
  medicalFieldKey,
  useMedicalFieldsQuery,
  dataQualityKey,
  FilterSettingsActionType,
  IndicatorTable,
  IndicatorTableBodyV2,
  skdeTheme,
  useUnitNamesQuery,
} from "qmongjs";
import { UseQueryResult } from "@tanstack/react-query";
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
import scrollToSelectedRow from "./utils/scrollToSelectedRow";
import getMedicalFieldFilterRegisters from "./utils/getMedicalFieldFilterRegisters";
import { IndicatorTableSkeleton } from "qmongjs";
import { LayoutHead } from "../../src/components/LayoutHead";
import { valueOrDefault, defaultTableContext } from "./utils/valueOrDefault";

const chartColours = [
  "#00263d",
  "#4F9A94",
  "#90CAF9",
  "#B0BEC5",
  "#FFE082",
  "#2962FF",
  "#CE93D8",
  "#9C786C",
  "#BCAAA4",
  "#F8BBD0",
  "#9FA8DA",
  "#80DEEA",
  "#A5D6A7",
  "#E6EE9C",
  "#FFAB91",
  "#78909C",
];

export default function TreatmentQualityPage() {
  const isXxlScreen = useMediaQuery(skdeTheme.breakpoints.up("xxl"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const searchParams = useSearchParams();
  const displayV2Table = searchParams.get("newtable") === "true";

  // Used by indicator table
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedTableContext, setSelectedTableContext] =
    useState(defaultTableContext);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    selectedTableContext,
    dataQualitySelected ? "dg" : "ind",
  );

  // Load register names and medical fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  const queriesReady =
    unitNamesQuery.isFetched &&
    registryNameQuery.isFetched &&
    medicalFieldsQuery.isFetched;

  const registers = registryNameQuery?.data;
  const medicalFields = medicalFieldsQuery?.data;
  const nestedUnitNames = unitNamesQuery?.data?.nestedUnitNames;

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
    setSelectedTableContext(
      filterSettings.get(tableContextKey)?.[0].value ?? defaultTableContext,
    );

    setSelectedYear(
      parseInt(filterSettings.get(yearKey)[0].value ?? defaultYear.toString()),
    );

    setSelectedLevel(filterSettings.get(levelKey)?.[0]?.value ?? undefined);

    const medicalFieldFilter = filterSettings
      .get(medicalFieldKey)
      ?.map((value) => value.value);
    const registerFilter = getMedicalFieldFilterRegisters(
      medicalFieldFilter,
      registers,
      medicalFields,
    );
    setSelectedMedicalFields(registerFilter);

    setSelectedTreatmentUnits(
      filterSettings.get(treatmentUnitsKey).map((value) => value.value),
    );

    setDataQualitySelected(
      filterSettings.get(dataQualityKey)?.[0].value === "true" ? true : false,
    );
  };

  const setAllSelected = (newFilterSettings: {
    map: Map<string, FilterSettingsValue[]>;
  }) => {
    setSelectedTableContext(
      valueOrDefault(tableContextKey, newFilterSettings) as string,
    );
    setSelectedYear(
      parseInt(valueOrDefault(yearKey, newFilterSettings) as string),
    );
    setSelectedLevel(
      valueOrDefault(levelKey, newFilterSettings) as string | undefined,
    );
    setSelectedMedicalFields(
      valueOrDefault(
        medicalFieldKey,
        newFilterSettings,
        registers,
        medicalFields,
      ) as string[],
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
      case tableContextKey: {
        setSelectedTableContext(
          valueOrDefault(tableContextKey, newFilterSettings) as string,
        );
        break;
      }
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
          valueOrDefault(
            medicalFieldKey,
            newFilterSettings,
            registers,
            medicalFields,
          ) as string[],
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
  if (typeof document !== "undefined") {
    useOnElementAdded(selectedRow, queriesReady, scrollToSelectedRow);
  }

  return (
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <PageWrapper>
        <LayoutHead
          title="Behandlingskvalitet"
          content="This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service."
          href="/favicon.ico"
        />
        <TreatmentQualityAppBar openDrawer={() => toggleDrawer(true)}>
          Resultater fra nasjonale medisinske kvalitetsregistre. Se{" "}
          <Link
            href="https://www.kvalitetsregistre.no/"
            target="_blank"
            rel="noopener"
          >
            kvalitetsregistre.no
          </Link>{" "}
          for mer informasjon.
        </TreatmentQualityAppBar>
        <Grid container size={{ xs: 12 }}>
          {isXxlScreen ? ( // Permanent menu on large screens
            <Grid size={{ xxl: 4, xxml: 3, xxxl: 2 }} className="menu-wrapper">
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
                    testIdPrefix="permanentFilterMenu"
                  />
                  <Divider />
                </Box>
              )}
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, xxl: 8, xxml: 9, xxxl: 10 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                {queriesReady ? (
                  displayV2Table ? (
                    <IndicatorTableV2Wrapper className="table-wrapper">
                      <IndicatorTableBodyV2
                        key={"indicator-table2"}
                        context={selectedTableContext}
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
                        key={"indicator-table"}
                        context={selectedTableContext}
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
                        nestedUnitNames={nestedUnitNames}
                        chartColours={chartColours}
                      />
                    </IndicatorTableWrapper>
                  )
                ) : (
                  <IndicatorTableSkeleton nRows={10} />
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
              testIdPrefix="drawerFilterMenu"
            />
            <Divider />
          </Box>
        )}
      </FilterDrawer>
    </ThemeProvider>
  );
}
