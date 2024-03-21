import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
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
    xs: true;
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
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      desktop: desktopBreakpoint,
    },
  },
});

export const TreatmentQualityAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "rgba(222, 231, 238, 1)",
  color: "black",
}));

export const FilterIconButton = styled(IconButton)(({ theme }) => ({
  paddingLeft: 0,
  [theme.breakpoints.up("desktop")]: {
    display: "none",
  },
}));

export const FilterDrawer = styled(Drawer)(({ theme }) => ({
  display: "block",
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
  },
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

export const SkdeLogoBox = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  "& .skde-logo": {
    verticalAlign: "middle",
  },
  [theme.breakpoints.down("sm")]: {
    "& .skde-logo": {
      height: 27,
      width: 67,
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .skde-logo": {
      height: 30,
      width: 75,
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .skde-logo": {
      height: 40,
      width: 100,
    },
  },
}));

export const FooterWrapper = styled(Paper)(({ theme }) => ({
  marginTop: "calc(100vh)",
  color: "white",
}));

export const FooterGrid = styled(Grid)(({ theme }) => ({
  justifyContent: "space-around",
  backgroundColor: "#00263d",
}));

export const FooterItem = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  "& .footer-logo": {
    verticalAlign: "middle",
    marginTop: "8px",
    marginBottom: "8px",
  },
}));

export const FooterListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: "white",
}));

export const FooterListItemText = styled(ListItemText)(({ theme }) => ({
  lineHeight: 1,
  margin: 0,
}));

export const FooterDividerBox = styled(Box)(({ theme }) => ({}));

export const FooterDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: "#27485b",
}));

export const MainBox = styled(Box)(({ theme }) => ({
  padding: 0,
  flexGrow: 1,
  overflowX: "auto",
  display: "grid",
  "& table": {
    borderSpacing: "0px",
  },
  "& th": {
    top: "0px !important",
    position: "sticky",
    zIndex: theme.zIndex.drawer - 1,
    minWidth: "10rem",
    verticalAlign: "top",
    lineHeight: "1.5rem",
    backgroundColor: "#00263d",
    color: "white",
  },
  [theme.breakpoints.down("sm")]: {
    "& th": {
      minWidth: "6rem",
    },
    marginTop: "56px",
    height: "calc(100vh - 56px)",
    "& .MuiDrawer-paper": {
      width: "100%",
    },
  },
  [theme.breakpoints.up("sm")]: {
    marginTop: "64px",
    height: "calc(100vh - 64px)",
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
