import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { breakpoints } from "qmongjs/src/themes/SkdeTheme";

const narrowDrawerWidth = 320;
const smDrawerWidth = 544;
const mdDrawerWidth = 768;
const lgDrawerWidth = 992;

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

/**
 * Style overrides for old indicator table
 */
export const IndicatorTableWrapper = styled(Box)(({ theme }) => ({
  "& table": {
    fontFamily: theme.typography.fontFamily,
    borderSpacing: "0 0.25rem",
    wordBreak: "break-word",
    "& th:nth-last-of-type(n+3):first-of-type ~ th, & th:nth-last-of-type(n+3):first-of-type":
      {
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "1.0rem",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: ".8rem",
        },
      },
    "& th:nth-last-of-type(n+4):first-of-type ~ th, & th:nth-last-of-type(n+4):first-of-type":
      {
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "0.8rem !important",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.6rem !important",
        },
      },
    "& td:nth-last-of-type(n+4):first-of-type ~ td, & td:nth-last-of-type(n+4):first-of-type":
      {
        "& h4": {
          [theme.breakpoints.between("sm", "md")]: {
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
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 0,
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    ...theme.typography.subtitle2,
    borderBottom: "0rem",
    borderColor: theme.palette.primary.light,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
      top: `calc(${theme.mixins.toolbar.minHeight}rem/16) !important`,
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
      top: `calc(${theme.mixins.toolbar.minHeight}rem/16) !important`,
    },
  },
  ".register-row": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary,
    "& td": {
      wordBreak: "break-word",
      ...theme.typography.body1,
    },
  },
  "& tr": {
    backgroundColor: "white",
  },
  "& td": {
    paddingLeft: 0,
    verticalAlign: "center",
    "& div.barchart-wrapper": {
      [theme.breakpoints.up("xl")]: {
        width: `${breakpoints.xl}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        width: "100% !important",
        "& text": {
          fontSize: `0.625rem !important`,
        },
      },
      ...theme.typography.body2,
    },

    "& button": {
      ...theme.typography.body2,
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8em",
      },
    },
  },
}));
