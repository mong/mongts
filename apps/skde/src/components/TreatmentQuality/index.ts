import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { createTheme, styled } from "@mui/material/styles";

export const appBarElevation = 2;
export const filterMenuTopMargin = 2;

export const smDrawerWidth = 320;
export const mdDrawerWidth = 500;
export const lgDrawerWidth = 700;
export const xlDrawerWidth = 450;

/** The width at which the drawer type changes.
 * Most modern desktops have a resolution greater than this, whereas
 * many smart phones have landscape mode width of 1280 px.
 * */
export const desktopBreakpoint = 1300;

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    desktop: true;
  }
}

/** The theme for the treatment quality page */
export const treatmentQualityTheme = createTheme({
  breakpoints: {
    values: {
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      desktop: desktopBreakpoint,
    },
  },
});

export const FilterIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("desktop")]: {
    display: "none",
  },
}));

export const FilterDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: smDrawerWidth,
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiDrawer-paper": {
      width: mdDrawerWidth,
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiDrawer-paper": {
      width: lgDrawerWidth,
    },
  },
  [theme.breakpoints.up("desktop")]: {
    "& .MuiDrawer-paper": {
      width: xlDrawerWidth,
    },
  },
}));

export const FilterDrawerBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: smDrawerWidth,
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiDrawer-paper": {
      width: mdDrawerWidth,
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiDrawer-paper": {
      width: lgDrawerWidth,
    },
  },
  [theme.breakpoints.up("desktop")]: {
    "& .MuiDrawer-paper": {
      width: xlDrawerWidth,
    },
  },
}));

export const MainBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: "100%",
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiDrawer-paper": {
      width: "100%",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiDrawer-paper": {
      width: `calc(100% - ${lgDrawerWidth}px)`,
    },
  },
  [theme.breakpoints.up("desktop")]: {
    marginLeft: xlDrawerWidth,
    "& .MuiDrawer-paper": {
      width: `calc(100% - ${xlDrawerWidth}px)`,
    },
  },
}));
