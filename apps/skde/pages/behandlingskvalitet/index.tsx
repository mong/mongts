import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Tune } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useQueryParam, withDefault, StringParam } from "use-query-params";
import Image from "next/image";
import {
  imgLoader,
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
  IndicatorTableBodyV2,
  indicatorTableTheme,
  IndicatorTable,
  FilterSettingsActionType,
} from "qmongjs";
import {
  FilterIconButton,
  FilterDrawer,
  FilterDrawerBox,
  MainBox,
  appBarElevation,
  filterMenuTopMargin,
  desktopBreakpoint,
  TreatmentQualityAppBar,
  SkdeLogoBox,
} from "../../src/components/TreatmentQuality";
import TreatmentQualityFooter from "../../src/components/TreatmentQuality/TreatmentQualityFooter";
import { ThemeProvider } from "@mui/material/styles";
import { UseQueryResult } from "@tanstack/react-query";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSearchParams } from "next/navigation";
import TreatmentQualityTabs from "../../src/components/TreatmentQuality/TreatmentQualityTabs";

const dataQualityKey = "dg";

/**
 * Treatment quality page (Behandlingskvalitet)
 *
 * @returns The page component
 */
export default function TreatmentQuality() {
  const [newIndicatorTableActivated, setNewIndicatorTableActivated] =
    useState(false);
  const [width, setWidth] = useState(desktopBreakpoint);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isPhoneSizedScreen = width < desktopBreakpoint;
  const drawerOpen = isPhoneSizedScreen ? mobileOpen : true;
  const drawerType = isPhoneSizedScreen ? "temporary" : "permanent";

  const searchParams = useSearchParams();
  const newTableOnly = searchParams.get("newtable") === "true";
  // const tableContext =
  //   searchParams.get("context") === "resident" ? "resident" : "caregiver";

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

  // Used to change drawer style between small screens and larger screens
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Load register names and medical fields
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
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
      let selectedRegisters = medicalFieldFilter.filter(
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
    setSelectedLevel(filterSettings.get(levelKey)[0].value ?? undefined);

    const medicalFieldFilter = filterSettings
      .get(medicalFieldKey)
      .map((value) => value.value);
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
        return filterSettings.map.get(levelKey)[0].value ?? undefined;
      }
      case medicalFieldKey: {
        const medicalFieldFilter = filterSettings.map
          .get(medicalFieldKey)
          .map((value) => value.value);
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

  return (
    <ThemeProvider theme={indicatorTableTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TreatmentQualityAppBar position="fixed" elevation={appBarElevation}>
          <Toolbar>
            <Box sx={{ marginLeft: 1 }}>
              <Typography variant="h3">Behandlingskvalitet</Typography>
              {!isPhoneSizedScreen && (
                <Typography variant="body1">
                  Resultater fra nasjonale medisinske kvalitetsregistre.
                </Typography>
              )}
            </Box>
            <SkdeLogoBox>
              <Image
                className="skde-logo"
                loader={imgLoader}
                src="/img/logos/SKDE_sort.png"
                height="40"
                width="99"
                alt="SKDE logo"
              />
            </SkdeLogoBox>
          </Toolbar>
          <Toolbar>
            <FilterIconButton
              color="inherit"
              aria-label="åpne sidemeny"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <Tune />
              <Typography variant="body1">Filter</Typography>
            </FilterIconButton>
            <TreatmentQualityTabs
              context={tableContext}
              onTabChanged={setTableContext}
            />
          </Toolbar>
        </TreatmentQualityAppBar>
        <FilterDrawerBox
          component="nav"
          sx={{ flexShrink: { sm: 0 } }}
          aria-label="filtermenyboks"
        >
          <FilterDrawer
            variant={drawerType}
            open={drawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Toolbar />
            <Toolbar />
            <Box sx={{ marginTop: filterMenuTopMargin }}>
              {queriesReady && (
                <>
                  <TreatmentQualityFilterMenu
                    onSelectionChanged={handleFilterChanged}
                    onFilterInitialized={handleFilterInitialized}
                    registryNameData={registers}
                    medicalFieldData={medicalFields}
                    context={tableContext}
                  />
                  {!newTableOnly && (
                    <FormGroup sx={{ paddingRight: "1.5rem" }}>
                      <FormControlLabel
                        label="Prøv ny tabellversjon"
                        labelPlacement="start"
                        control={
                          <Switch
                            checked={newIndicatorTableActivated}
                            onChange={(event) =>
                              setNewIndicatorTableActivated(
                                event.target.checked,
                              )
                            }
                          />
                        }
                      />
                    </FormGroup>
                  )}
                </>
              )}
            </Box>
          </FilterDrawer>
        </FilterDrawerBox>
        <MainBox>
          {queriesReady &&
            (newIndicatorTableActivated || newTableOnly ? (
              <>
                <IndicatorTableBodyV2
                  key="indicator-table"
                  context={tableContext}
                  unitNames={selectedTreatmentUnits}
                  year={selectedYear}
                  type={dataQualitySelected ? "dg" : "ind"}
                  levels={selectedLevel}
                  medfields={selectedMedicalFields}
                />
                <TreatmentQualityFooter />
              </>
            ) : (
              <>
                <IndicatorTable
                  key="indicator-table"
                  context={dataQualitySelected ? "coverage" : tableContext}
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
                    (register: { full_name: string }) => register.full_name,
                  )}
                />
                <TreatmentQualityFooter />
              </>
            ))}
        </MainBox>
      </Box>
    </ThemeProvider>
  );
}
