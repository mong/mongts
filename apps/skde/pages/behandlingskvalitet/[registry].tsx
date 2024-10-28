import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
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
  defaultYear,
  levelKey,
  tableContextKey,
  treatmentUnitsKey,
  yearKey,
  FilterSettingsActionType,
  IndicatorTable,
  IndicatorTableBodyV2,
  skdeTheme,
  fetchRegisterNames,
  useRegistryRankQuery,
} from "qmongjs";
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
import { RegisterName, RegistryRank } from "types";
import valueOrDefault from "./utils/valueOrDefault";
import { LayoutHead } from "../../src/components/LayoutHead";

export default function TreatmentQualityRegistryPage({ registryInfo }) {
  const isXxlScreen = useMediaQuery(skdeTheme.breakpoints.up("xxl"));
  const registryName = registryInfo[0].rname;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const searchParams = useSearchParams();
  const displayV2Table = searchParams.get("newtable") === "true";

  // Context (caregiver or resident)
  const defaultTableContext =
    registryInfo[0].caregiver_data === 0 ? "resident" : "caregiver";
  const [selectedTableContext, setSelectedTableContext] =
    useState(defaultTableContext);

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

  const selectedRow = useQueryParam(
    "selected_row",
    mainQueryParamsConfig.selected_row,
  )[0];

  const registryRankQuery = useRegistryRankQuery(defaultYear);

  let registryRank = "NA";

  if (registryRankQuery.isFetched) {
    // Fetch the registry's stage and level
    const registryRankData = registryRankQuery.data as RegistryRank[];

    const filteredRegistryRank = registryRankData.filter(
      (row: RegistryRank) => row.name === registryName,
    );

    if (filteredRegistryRank[0]) {
      registryRank = filteredRegistryRank[0].verdict;
    }
  }

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

    setSelectedMedicalFields([registryName]);

    setSelectedTreatmentUnits(
      filterSettings.get(treatmentUnitsKey).map((value) => value.value),
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
    setSelectedTreatmentUnits(
      valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
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
      case treatmentUnitsKey: {
        setSelectedTreatmentUnits(
          valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
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
    useOnElementAdded(selectedRow, true, scrollToSelectedRow);
  }

  if (!mounted) {
    return null;
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
        <TreatmentQualityAppBar
          openDrawer={() => toggleDrawer(true)}
          extraBreadcrumbs={[
            { link: registryName, text: registryInfo[0].short_name },
          ]}
          subtitle={
            "Resultater fra " +
            registryInfo[0].full_name +
            "<br/>" +
            `<a href="https://www.kvalitetsregistre.no/stadieinndeling">Stadium og nivå </a> for ` +
            defaultYear +
            ": " +
            "<b>" +
            registryRank +
            "</b>"
          }
        />
        <Grid container size={{ xs: 12 }}>
          {isXxlScreen ? ( // Permanent menu on large screens
            <Grid size={{ xxl: 4, xxml: 3, xxxl: 2 }} className="menu-wrapper">
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
                  testIdPrefix="permanentFilterMenu"
                  registryNameData={registryInfo}
                  medicalFieldData={[]}
                  register={registryName}
                  enableTableContextSection={
                    registryInfo[0].resident_data +
                      registryInfo[0].caregiver_data ==
                    2
                  }
                />
                <Divider />
              </Box>
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, xxl: 8, xxml: 9, xxxl: 10 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                {displayV2Table ? (
                  <IndicatorTableV2Wrapper className="table-wrapper">
                    <IndicatorTableBodyV2
                      key={`indicator-table2-${selectedTableContext}`}
                      context={selectedTableContext}
                      unitNames={selectedTreatmentUnits}
                      year={selectedYear}
                      type="ind"
                      levels={selectedLevel}
                      medfields={selectedMedicalFields}
                    />
                    <IndicatorTableBodyV2
                      key={`dataquality-table2-${selectedTableContext}`}
                      context={selectedTableContext}
                      unitNames={selectedTreatmentUnits}
                      year={selectedYear}
                      type="dg"
                      levels={selectedLevel}
                      medfields={selectedMedicalFields}
                    />
                  </IndicatorTableV2Wrapper>
                ) : (
                  <IndicatorTableWrapper className="table-wrapper">
                    <IndicatorTable
                      key={`indicator-table-${selectedTableContext}`}
                      context={selectedTableContext}
                      dataQuality={false}
                      tableType="allRegistries"
                      registerNames={registryInfo}
                      unitNames={selectedTreatmentUnits}
                      treatmentYear={selectedYear}
                      colspan={selectedTreatmentUnits.length + 1}
                      medicalFieldFilter={selectedMedicalFields}
                      showLevelFilter={selectedLevel}
                      selection_bar_height={0}
                      legend_height={0}
                      showTreatmentYear={true}
                    />
                    <IndicatorTable
                      key={`dataquality-table-${selectedTableContext}`}
                      context={selectedTableContext}
                      dataQuality={true}
                      tableType="allRegistries"
                      registerNames={registryInfo}
                      unitNames={selectedTreatmentUnits}
                      treatmentYear={selectedYear}
                      colspan={selectedTreatmentUnits.length + 1}
                      medicalFieldFilter={selectedMedicalFields}
                      showLevelFilter={selectedLevel}
                      selection_bar_height={0}
                      legend_height={0}
                      descriptionHeader="Datakvalitet"
                      showTreatmentYear={true}
                    />
                  </IndicatorTableWrapper>
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
        <Box sx={{ mt: 4 }}>
          <TreatmentQualityFilterMenu
            onSelectionChanged={handleFilterChanged}
            onFilterInitialized={handleFilterInitialized}
            testIdPrefix="drawerFilterMenu"
            registryNameData={registryInfo}
            medicalFieldData={[]}
            register={registryName}
          />
          <Divider />
        </Box>
      </FilterDrawer>
    </ThemeProvider>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const registries = await fetchRegisterNames();

  const registryInfo: RegisterName = registries.filter(
    (register) => register.rname === context.params?.registry,
  );

  return {
    props: { registryInfo: registryInfo },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const registries = await fetchRegisterNames();
  const paths = registries.flatMap((registry: RegisterName) => {
    return [{ params: { registry: registry.rname } }];
  });
  return { paths, fallback: false };
};
