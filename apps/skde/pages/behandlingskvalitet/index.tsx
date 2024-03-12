import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { imgLoader } from "qmongjs/src/helpers/functions";
import { useState } from "react";
import { TreatmentQualityFilterMenu } from "qmongjs";
import {
  FilterDrawer,
  FilterDrawerBox,
  MainBox,
  appBarElevation,
  filterMenuTopMargin,
} from "./styled";

/**
 * Treatment quality page (Behandlingskvalitet)
 *
 * @returns The page component
 */
export default function TreatmentQuality() {
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

  return (
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
            },
          }}
        >
          <Toolbar />
          <Box sx={{ marginTop: filterMenuTopMargin }}>
            <TreatmentQualityFilterMenu />
          </Box>
        </FilterDrawer>
        <FilterDrawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
          open
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
  );
}
