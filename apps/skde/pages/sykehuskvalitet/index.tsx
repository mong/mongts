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
import { Layout } from "qmongjs";

const drawerWidth = 300;

export const getInitialQueryParams = (path: string) => {
  const queryParamsStartIndex = path.lastIndexOf("?");
  let queryString: string;

  if (queryParamsStartIndex === -1) {
    queryString = "";
  } else {
    queryString = path.substring(queryParamsStartIndex);
  }

  return new URLSearchParams(queryString);
};

export default function Sykehuskvalitet() {
  // Use router to get the current path containing the initial query parameters

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

  const initialQueryParams = getInitialQueryParams(path);

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
    <Layout>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
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
            <Typography variant="h6" noWrap component="div">
              Sykehuskvalitet
            </Typography>
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
                defaultvalues={[
                  { value: defaultYear, valueLabel: defaultYear },
                ]}
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
                defaultvalues={[
                  { value: defaultYear, valueLabel: defaultYear },
                ]}
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
}
