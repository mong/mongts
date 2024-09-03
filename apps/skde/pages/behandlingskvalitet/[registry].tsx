import { useState } from "react";
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
import Grid from "@mui/material/Unstable_Grid2";
import { useQueryParam, withDefault, StringParam } from "use-query-params";
import {
  FilterSettingsAction,
  FilterSettingsValue,
  TreatmentQualityFilterMenu,
  defaultYear,
  levelKey,
  treatmentUnitsKey,
  yearKey,
  FilterSettingsActionType,
  IndicatorTable,
  IndicatorTableBodyV2,
  skdeTheme,
  fetchRegisterNames,
} from "qmongjs";
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
import { RegisterName } from "types";

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

export default function TreatmentQualityPage({ registry_info }) {
  const registry_name = registry_info[0].rname;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const [newIndicatorTableActivated, setNewIndicatorTableActivated] =
    useState(false);

  const searchParams = useSearchParams();
  const newTableOnly = searchParams.get("newtable") === "true";

  // Context (caregiver or resident)
  const default_context =
    registry_info[0].caregiver_data === 0 ? "resident" : "caregiver";
  const [tableContext, setTableContext] = useQueryParam<string>(
    "context",
    withDefault(StringParam, default_context),
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

    setSelectedMedicalFields([registry_name]);

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
  useOnElementAdded(selectedRow, true, scrollToSelectedRow);

  return (
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <PageWrapper>
        <TreatmentQualityAppBar
          openDrawer={() => toggleDrawer(true)}
          context={tableContext}
          onTabChanged={setTableContext}
          tabs={
            registry_info[0].resident_data + registry_info[0].caregiver_data ==
            2
          }
        />
        <Grid container xs={12}>
          {useMediaQuery(skdeTheme.breakpoints.up("xxl")) ? ( // Permanent menu on large screens
            <Grid xxl={3} xxxl={2} className="menu-wrapper">
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
                  registryNameData={registry_info}
                  medicalFieldData={[]}
                  context={tableContext}
                  register={registry_name}
                />
              </Box>
            </Grid>
          ) : null}
          <Grid xs={12} xxl={9} xxxl={10}>
            <Grid container spacing={2} disableEqualOverflow>
              <Grid xs={12}>
                {newIndicatorTableActivated || newTableOnly ? (
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
                      registerNames={registry_info}
                      unitNames={selectedTreatmentUnits}
                      treatmentYear={selectedYear}
                      colspan={selectedTreatmentUnits.length + 1}
                      medicalFieldFilter={selectedMedicalFields}
                      showLevelFilter={selectedLevel}
                      selection_bar_height={0}
                      legend_height={0}
                      blockTitle={registry_info.map(
                        (register: { full_name: string }) => register.full_name,
                      )}
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
            registryNameData={registry_info}
            medicalFieldData={[]}
            context={tableContext}
            register={registry_name}
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
      </FilterDrawer>
    </ThemeProvider>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const registries = await fetchRegisterNames();

  const registry_info: RegisterName = registries.filter(
    (register) => register.rname === context.params?.registry,
  );

  return {
    props: { registry_info: registry_info },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const registries = await fetchRegisterNames();
  const paths = registries.flatMap((registry: RegisterName) => {
    return [{ params: { registry: registry.rname } }];
  });
  return { paths, fallback: false };
};
