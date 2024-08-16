import { styled, Box } from "@mui/material";

export const PageWrapper = styled(Box)(({ theme }) => ({
  "& .header-top, & .header-middle, & .main-toolbar, & .footer": {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
    },
  },
  "& .menu-wrapper": {
    [theme.breakpoints.up("xxl")]: {
      paddingLeft: theme.spacing(16),
    },
  },
  "& .table-wrapper table, & .table-wrapper .MuiTable-root": {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
    },
    [theme.breakpoints.up("xxl")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(16),
    },
  },
  "& .hospital-profile-box": {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
    },
    [theme.breakpoints.up("xxl")]: {
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
    },
  },
  backgroundColor: theme.palette.background.paper,
}));
