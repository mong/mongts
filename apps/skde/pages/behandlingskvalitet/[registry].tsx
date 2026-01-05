import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
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

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import Grid from "@mui/material/Grid";
import { useQueryParam } from "use-query-params";
import {
  FilterSettingsAction,
  FilterSettingsValue,
  TreatmentQualityFilterMenu,
  defaultYear,
  defaultReviewYear,
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
} from "../../src/components/TreatmentQuality";
import { Footer } from "../../src/components/Footer";
import { mainQueryParamsConfig } from "qmongjs";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import useOnElementAdded from "../../src/helpers/hooks/useOnElementAdded";
import scrollToSelectedRow from "../../src/utils/scrollToSelectedRow";
import { RegisterName, RegistryRank } from "types";
import { valueOrDefault } from "../../src/utils/valueOrDefault";
import { LayoutHead } from "../../src/components/LayoutHead";
import {
  ColourMap,
  updateColourMap,
  getSortedList,
} from "../../src/helpers/functions/chartColours";
import checkParamsReady from "../../src/utils/checkParamsReady";

export default function TreatmentQualityRegistryPage({ registryInfo }) {
  const isXxlScreen = useMediaQuery(skdeTheme.breakpoints.up("xxl"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [colourMap, setColourMap] = useState<ColourMap[]>([]);

  const registryName = registryInfo[0].rname;
  const skipTableContextSection =
    registryInfo[0].resident_data + registryInfo[0].caregiver_data !== 2;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const searchParams = useSearchParams();

  const displayV2Table = searchParams.get("newtable") === "true";

  const defaultTreatmentUnits = ["Nasjonalt"];

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
  const [selectedTreatmentUnits, setSelectedTreatmentUnits] = useState(
    defaultTreatmentUnits,
  );

  const selectedRow = useQueryParam(
    "selected_row",
    mainQueryParamsConfig.selected_row,
  )[0];

  let registryRank = "NA";
  if (!process.env.NEXT_PUBLIC_VERIFY) {
    // Fetch the registry's stage and level
    const registryRankQuery = useRegistryRankQuery(defaultReviewYear);

    if (registryRankQuery.isFetched) {
      // Fetch the registry's stage and level
      const registryRankData = registryRankQuery.data as RegistryRank[];

      const filteredRegistryRank = registryRankData.find(
        (row: RegistryRank) => row.name === registryName,
      );

      if (filteredRegistryRank) {
        registryRank = filteredRegistryRank.verdict;
      }
    }
  }

  const paramsReady = checkParamsReady({
    treatmentUnits: selectedTreatmentUnits,
    treatmentUnitsKey: treatmentUnitsKey,
    defaultTreatmentUnits: defaultTreatmentUnits,
    year: selectedYear,
    yearKey: yearKey,
    defaultYear: defaultYear,
    medicalFields: selectedMedicalFields,
  });

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

    updateColourMap(
      colourMap,
      setColourMap,
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

    updateColourMap(
      colourMap,
      setColourMap,
      valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
    );
  };

  // Use the custom hook to observe the addition of the selected row element, if
  // not already available.
  if (typeof document !== "undefined") {
    useOnElementAdded(selectedRow, true, scrollToSelectedRow);
  }

  if (!mounted) {
    return null;
  }

  const subtitle = (
    <>
      Resultater fra {registryInfo[0].full_name}.{" "}
      {!process.env.NEXT_PUBLIC_VERIFY && (
        <>
          Se{" "}
          <Link href={registryInfo[0].url} target="_blank" rel="noopener">
            kvalitetsregistre.no
          </Link>{" "}
          for mer informasjon.{" "}
          <Link
            href="https://www.kvalitetsregistre.no/registerdrift/stadieinndeling"
            target="_blank"
            rel="noopener"
          >
            Stadium og nivå
          </Link>{" "}
          for {defaultReviewYear}: <b>{registryRank}</b>
        </>
      )}
    </>
  );

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
        >
          {subtitle}
        </TreatmentQualityAppBar>
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
                  initialContext={
                    selectedTableContext as "caregiver" | "resident"
                  }
                  skipSections={{
                    context: skipTableContextSection,
                  }}
                />
                <Divider />
              </Box>
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, xxl: 8, xxml: 9, xxxl: 10 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                {paramsReady ? (
                  displayV2Table ? (
                    <>
                      <IndicatorTableBodyV2
                        key={`indicator-table2-${selectedTableContext}`}
                        context={selectedTableContext}
                        unitNames={getSortedList(
                          colourMap,
                          selectedTreatmentUnits,
                          "units",
                        )}
                        year={selectedYear}
                        type="ind"
                        levels={selectedLevel}
                        medfields={selectedMedicalFields}
                        chartColours={getSortedList(
                          colourMap,
                          selectedTreatmentUnits,
                          "colours",
                        )}
                      />
                      <IndicatorTableBodyV2
                        key={`dataquality-table2-${selectedTableContext}`}
                        context={selectedTableContext}
                        unitNames={getSortedList(
                          colourMap,
                          selectedTreatmentUnits,
                          "units",
                        )}
                        year={selectedYear}
                        type="dg"
                        levels={selectedLevel}
                        medfields={selectedMedicalFields}
                        chartColours={getSortedList(
                          colourMap,
                          selectedTreatmentUnits,
                          "colours",
                        )}
                      />
                    </>
                  ) : (
                    <IndicatorTableWrapper className="table-wrapper">
                      <IndicatorTable
                        key={`indicator-table-${selectedTableContext}`}
                        context={selectedTableContext}
                        dataQuality={false}
                        tableType="allRegistries"
                        registerNames={registryInfo}
                        unitNames={getSortedList(
                          colourMap,
                          selectedTreatmentUnits,
                          "units",
                        )}
                        treatmentYear={selectedYear}
                        colspan={selectedTreatmentUnits.length + 1}
                        medicalFieldFilter={selectedMedicalFields}
                        showLevelFilter={selectedLevel}
                        selection_bar_height={0}
                        legend_height={0}
                        showTreatmentYear={true}
                        chartColours={getSortedList(
                          colourMap,
                          selectedTreatmentUnits,
                          "colours",
                        )}
                      />
                      <IndicatorTable
                        key={`dataquality-table-${selectedTableContext}`}
                        context={selectedTableContext}
                        dataQuality={true}
                        tableType="allRegistries"
                        registerNames={registryInfo}
                        unitNames={getSortedList(
                          colourMap,
                          selectedTreatmentUnits,
                          "units",
                        )}
                        treatmentYear={selectedYear}
                        colspan={selectedTreatmentUnits.length + 1}
                        medicalFieldFilter={selectedMedicalFields}
                        showLevelFilter={selectedLevel}
                        selection_bar_height={0}
                        legend_height={0}
                        descriptionHeader="Datakvalitet"
                        showTreatmentYear={true}
                        chartColours={getSortedList(
                          colourMap,
                          selectedTreatmentUnits,
                          "colours",
                        )}
                      />
                    </IndicatorTableWrapper>
                  )
                ) : (
                  <></>
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
            <ChevronLeftRoundedIcon fontSize="large" />
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
            initialContext={selectedTableContext as "caregiver" | "resident"}
            skipSections={{
              context: skipTableContextSection,
            }}
          />
          <Divider />
        </Box>
      </FilterDrawer>
    </ThemeProvider>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const registries: RegisterName[] = await fetchRegisterNames();

  const registryInfo = registries.filter(
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
