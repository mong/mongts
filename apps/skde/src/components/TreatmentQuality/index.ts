import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { breakpoints } from "qmongjs/src/themes/SkdeTheme";

const narrowDrawerWidth = 320;
const smDrawerWidth = 544;
const mdDrawerWidth = 768;
const lgDrawerWidth = 992;

export const TreatmentQualityAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.primary,
}));

export const TabsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingLeft: theme.typography.body1.fontSize,
}));

export const FilterDrawer = styled(Drawer)(({ theme }) => ({
  display: "block",
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: narrowDrawerWidth,
    },
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiDrawer-paper": {
      width: smDrawerWidth,
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiDrawer-paper": {
      width: mdDrawerWidth,
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .MuiDrawer-paper": {
      width: lgDrawerWidth,
    },
  },
}));

export const FooterWrapper = styled(Paper)(() => ({
  marginTop: "calc(100vh)",
  color: "white",
}));

export const FooterGrid = styled(Grid)(() => ({
  justifyContent: "space-around",
  backgroundColor: "#00263d",
}));

export const FooterItem = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  "& .footer-logo": {
    verticalAlign: "middle",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const FooterListItemIcon = styled(ListItemIcon)(() => ({
  color: "white",
}));

export const FooterListItemText = styled(ListItemText)(() => ({
  lineHeight: 1,
  margin: 0,
}));

export const FooterDividerBox = styled(Box)(() => ({}));

export const FooterDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
}));

/**
 * Style overrides for old indicator table
 */
export const IndicatorTableWrapper = styled(Box)(({ theme }) => ({
  "& table": {
    fontFamily: theme.typography.fontFamily,
    borderSpacing: "0px",
    wordBreak: "break-word",
    "& th:nth-last-of-type(n+3):first-of-type ~ th, & th:nth-last-of-type(n+3):first-of-type":
      {
        [theme.breakpoints.down("md")]: {
          fontSize: "1.2rem",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.0rem",
        },
      },
    "& th:nth-last-of-type(n+4):first-of-type ~ th, & th:nth-last-of-type(n+4):first-of-type":
      {
        [theme.breakpoints.down("md")]: {
          fontSize: "0.8rem !important",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.6rem !important",
        },
      },
    "& td:nth-last-of-type(n+4):first-of-type ~ td, & td:nth-last-of-type(n+4):first-of-type":
      {
        "& h4": {
          [theme.breakpoints.down("md")]: {
            fontSize: "1.0rem",
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.8rem",
          },
        },
      },
    ...theme.typography.body2,
  },
  "& th": {
    position: "sticky",
    verticalAlign: "top",
    backgroundColor: theme.palette.background.default,
    paddingLeft: 0,
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    ...theme.typography.subtitle2,
    borderBottom: "1px solid",
    borderColor: theme.palette.primary.light,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
      top: `calc(2 * ${theme.mixins.toolbar.minHeight}px) !important`,
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
      top: `calc(${theme.mixins.toolbar.minHeight}px) !important`,
    },
  },
  ".register-row": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary,
    "& td": {
      wordBreak: "break-word",
      ...theme.typography.body1,
    },
    "& a": {
      pointerEvents: "none",
    },
  },
  "& td": {
    paddingLeft: 0,
    verticalAlign: "top",
    "& div.barchart-wrapper": {
      [theme.breakpoints.up("xl")]: {
        width: `${breakpoints.xl}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        width: "100% !important",
        "& text": {
          fontSize: `10px !important`,
        },
      },
      ...theme.typography.body2,
    },
    "& div.linechart-wrapper": {
      [theme.breakpoints.up("xl")]: {
        width: `${breakpoints.xl}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        width: "100% !important",
        "& text": {
          fontSize: `10px !important`,
        },
      },
      ...theme.typography.body2,
    },
    "& button": {
      ...theme.typography.body2,
    },
  },
}));

export const IndicatorTableV2Wrapper = styled(Box)((/*{ theme }*/) => ({
  "& .MuiTable-root": {
    tableLayout: "fixed",
    width: "95%",
  },
}));
