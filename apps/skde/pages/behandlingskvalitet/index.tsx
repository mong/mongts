import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TuneIcon from "@mui/icons-material/Tune";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { imgLoader } from "qmongjs/src/helpers/functions";
import {
  FilterSettingsAction,
  FilterSettingsValue,
  TreatmentQualityFilterMenu,
  useRegisterNamesQuery,
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
import { defaultYear } from "qmongjs/src/app_config";
import {
  levelKey,
  treatmentUnitsKey,
  yearKey,
  medicalFieldKey,
} from "qmongjs/src/components/FilterMenu/TreatmentQualityFilterMenu";
import { useMedicalFieldsQuery } from "qmongjs/src/helpers/hooks";
import { IndicatorTableBodyV2 } from "qmongjs/src/components/IndicatorTable/IndicatortablebodyV2";

/**
 * Treatment quality page (Behandlingskvalitet)
 *
 * @returns The page component
 */
export default function TreatmentQuality() {
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

    let medicalFieldFilter = filterSettings.get(medicalFieldKey)[0].value;
    if (!medicalFieldFilter || medicalFieldFilter === "all") {
      setSelectedMedicalFields(registers.map((register) => register.rname));
    } else {
      const selectedMedicalFields = medicalFields
        .filter((field) => field.shortName === medicalFieldFilter)
        .flatMap((field) => field.registers);
      setSelectedMedicalFields(selectedMedicalFields);
    }
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
        let medicalFieldFilter =
          newFilterSettings.map.get(medicalFieldKey)[0].value;
        if (!medicalFieldFilter || medicalFieldFilter === "all") {
          setSelectedMedicalFields(registers.map((register) => register.rname));
        } else {
          const selectedMedicalFields = medicalFields
            .filter((field) => field.shortName === medicalFieldFilter)
            .flatMap((field) => field.registers);
          setSelectedMedicalFields(selectedMedicalFields);
        }
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
                <TreatmentQualityFilterMenu
                  onSelectionChanged={handleFilterChanged}
                  onFilterInitialized={handleFilterInitialized}
                />
              )}
            </Box>
          </FilterDrawer>
        </FilterDrawerBox>
        <MainBox>
          {queriesReady && (
            <>
              <IndicatorTableBodyV2
                key="indicator-table"
                context={"caregiver"}
                registers={registers}
                unitNames={selectedTreatmentUnits}
                year={selectedYear}
                type={"ind"}
                level={selectedLevel}
                medfields={selectedMedicalFields}
              />
              <TreatmentQualityFooter />
            </>
          )}
        </MainBox>
      </Box>
    </ThemeProvider>
  );
}
