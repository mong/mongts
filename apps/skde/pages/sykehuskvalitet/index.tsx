import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  FilterMenu,
  SelectedFiltersSection,
  FilterSettingsValue,
  FilterSettingsAction,
} from "qmongjs";
import Image from "next/image";
import { imgLoader } from "qmongjs/src/helpers/functions";

const drawerWidth = 300;

/**
 * Extracts the query parameters from a path string
 *
 * @param path A path string
 * @returns A URLSearchParams object containing the query parameters in the path
 */
export const extractQueryParams = (path: string) => {
  const queryParamsStartIndex = path.lastIndexOf("?");
  let queryString: string;

  if (queryParamsStartIndex === -1) {
    queryString = "";
  } else {
    queryString = path.substring(queryParamsStartIndex);
  }

  return new URLSearchParams(queryString);
};

/**
 * Sykehuskvalitet (hospital quality) page
 *
 * @returns The page component
 */
export default function Sykehuskvalitet() {
  // When the user navigates to the page, it may contain query parameters for
  // filtering indicators. Use NextRouter to get the current path containing the
  // initial query parameters.

  const router = useRouter();
  const path = router.asPath;

  // Next's prerender stage causes problems for the initial values given to
  // useReducer, because they are only set once by the reducer and are missing
  // during Next's prerender stage. Tell FilterMenu to refresh its state during
  // the first call after the prerender is done.

  const [prevReady, setPrevReady] = useState(router.isReady);
  const shouldRefreshInititalState = prevReady !== router.isReady;

  useEffect(() => {
    setPrevReady(router.isReady);
  }, [router.isReady]);

  const initialQueryParams = extractQueryParams(path);

  // State and functions controlling the mobile drawer

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  // Query parameters

  const [selectedYear, setSelectedYear] = useQueryParam<string | undefined>(
    "year",
    withDefault(StringParam, undefined),
  );

  // Filter menu default values

  const defaultYear = "2022";

  /**
   * Handler function for filter selection changes
   */
  const filterSelectionChanged = (
    newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    oldFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    action: FilterSettingsAction,
  ) => {
    setSelectedYear(newFilterSettings.map.get("selectedfilters")?.[0]?.value);
    console.log(
      "Filter selection changed",
      newFilterSettings,
      oldFilterSettings,
      action,
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "rgba(222, 231, 238, .8)",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="åpne sidemeny"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <TuneIcon />
            <Typography>Filter</Typography>
          </IconButton>
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="h6">
              Resultater fra medisinske kvalitetsregistre
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "auto", marginTop: 1.15 }}>
            <Image
              loader={imgLoader}
              src="/img/logos/SKDE_sort.png"
              height="40"
              width="99"
              alt="SKDE logo"
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="filtermenyboks"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <FilterMenu
            refreshState={shouldRefreshInititalState}
            onSelectionChanged={filterSelectionChanged}
          >
            <SelectedFiltersSection
              accordion="false"
              filterkey="selectedfilters"
              sectionid="selectedfilters"
              sectiontitle="Valgte filtre"
              defaultvalues={[{ value: defaultYear, valueLabel: defaultYear }]}
              initialselections={
                selectedYear
                  ? [{ value: selectedYear, valueLabel: selectedYear }]
                  : undefined
              }
            />
          </FilterMenu>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <FilterMenu
            refreshState={shouldRefreshInititalState}
            onSelectionChanged={filterSelectionChanged}
          >
            <SelectedFiltersSection
              accordion="false"
              filterkey="selectedfilters"
              sectionid="selectedfilters"
              sectiontitle="Valgte filtre"
              defaultvalues={[{ value: defaultYear, valueLabel: defaultYear }]}
              initialselections={
                selectedYear
                  ? [{ value: selectedYear, valueLabel: selectedYear }]
                  : undefined
              }
            />
          </FilterMenu>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Tabell for sykehuskvalitet vil vises her.
        </Typography>
      </Box>
    </Box>
  );
}
