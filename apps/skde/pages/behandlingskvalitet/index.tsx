import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TuneIcon from "@mui/icons-material/Tune";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { imgLoader } from "qmongjs/src/helpers/functions";
import { useState, useEffect } from "react";
import { TreatmentQualityFilterMenu } from "qmongjs";
import {
  FilterIconButton,
  FilterDrawer,
  FilterDrawerBox,
  MainBox,
  appBarElevation,
  filterMenuTopMargin,
  desktopBreakpoint,
  treatmentQualityTheme,
} from "../../src/components/TreatmentQuality";
import { ThemeProvider } from "@mui/material/styles";

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

  return (
    <ThemeProvider theme={treatmentQualityTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={appBarElevation}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(222, 231, 238, 1)",
            color: "black",
          }}
        >
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
        <FilterDrawerBox
          component="nav"
          sx={{ flexShrink: { sm: 0 } }}
          aria-label="filtermenyboks"
        >
          <Toolbar />
          <FilterDrawer
            variant={drawerType}
            open={drawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: "block",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ marginTop: filterMenuTopMargin }}>
              <TreatmentQualityFilterMenu />
            </Box>
          </FilterDrawer>
        </FilterDrawerBox>
        <MainBox
          component="main"
          sx={{
            paddingLeft: "0px",
            flexGrow: 1,
            p: 3,
          }}
        >
          <Toolbar />
          <Typography paragraph>
            Resultater fra medisinske kvalitetsregistre
          </Typography>
        </MainBox>
      </Box>
    </ThemeProvider>
  );
}
