import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TuneIcon from "@mui/icons-material/Tune";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { imgLoader } from "../../src/helpers/functions";
import {
  FilterSettingsAction,
  FilterSettingsValue,
  TreatmentQualityFilterMenu,
  useRegisterNamesQuery,
  defaultYear,
  levelKey,
  treatmentUnitsKey,
  yearKey,
  medicalFieldKey,
  useMedicalFieldsQuery,
  IndicatorTableBodyV2,
  IndicatorTable,
} from "qmongjs";
import {
  FilterIconButton,
  FilterDrawer,
  FilterDrawerBox,
  MainBox,
  appBarElevation,
  filterMenuTopMargin,
  desktopBreakpoint,
  treatmentQualityTheme,
  TreatmentQualityAppBar,
  SkdeLogoBox,
} from "../../src/components/TreatmentQuality";
import TreatmentQualityFooter from "../../src/components/TreatmentQuality/TreatmentQualityFooter";
import { ThemeProvider } from "@mui/material/styles";
import { UseQueryResult } from "@tanstack/react-query";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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
          ...selectedRegisters,
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
          parseInt(
            newFilterSettings.map.get(yearKey)[0].value ??
              defaultYear.toString(),
          ),
        );
        break;
      }
      case levelKey: {
        setSelectedLevel(
          newFilterSettings.map.get(levelKey)[0].value ?? undefined,
        );
        break;
      }
      case medicalFieldKey: {
        const medicalFieldFilter = newFilterSettings.map
          .get(medicalFieldKey)
          .map((value) => value.value);
        const registerFilter =
          getMedicalFieldFilterRegisters(medicalFieldFilter);
        setSelectedMedicalFields(registerFilter);
        break;
      }
      case treatmentUnitsKey: {
        setSelectedTreatmentUnits(
          newFilterSettings.map
            .get(treatmentUnitsKey)
            .map((value) => value.value),
        );
        break;
      }
      default:
        break;
    }
  };

  return (
    <ThemeProvider theme={treatmentQualityTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TreatmentQualityAppBar position="fixed" elevation={appBarElevation}>
          <Toolbar>
            <FilterIconButton
              color="inherit"
              aria-label="åpne sidemeny"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <TuneIcon />
              <Typography>Filter</Typography>
            </FilterIconButton>
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="h6">Behandlingskvalitet</Typography>
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
            <Box sx={{ marginTop: filterMenuTopMargin }}>
              {queriesReady && (
                <>
                  <TreatmentQualityFilterMenu
                    onSelectionChanged={handleFilterChanged}
                    onFilterInitialized={handleFilterInitialized}
                    registryNameData={registers}
                    medicalFieldData={medicalFields}
                  />
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
                </>
              )}
            </Box>
          </FilterDrawer>
        </FilterDrawerBox>
        <MainBox>
          {queriesReady &&
            (newIndicatorTableActivated ? (
              <>
                <IndicatorTableBodyV2
                  key="indicator-table"
                  context={"caregiver"}
                  unitNames={selectedTreatmentUnits}
                  year={selectedYear}
                  type={"ind"}
                  level={selectedLevel}
                  medfields={selectedMedicalFields}
                />
                <TreatmentQualityFooter />
              </>
            ) : (
              <>
                <IndicatorTable
                  key="indicator-table"
                  context={"caregiver"}
                  tableType="allRegistries"
                  registerNames={registers}
                  unitNames={selectedTreatmentUnits}
                  treatmentYear={selectedYear}
                  colspan={selectedTreatmentUnits.length + 1}
                  medicalFieldFilter={selectedMedicalFields}
                  showLevelFilter={selectedLevel}
                  selection_bar_height={0}
                  legend_height={0}
                  blockTitle={registers.map((register) => register.full_name)}
                />
                <TreatmentQualityFooter />
              </>
            ))}
        </MainBox>
      </Box>
    </ThemeProvider>
  );
}
