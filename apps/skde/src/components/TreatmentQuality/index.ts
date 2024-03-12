import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export const appBarElevation = 2;
export const filterMenuTopMargin = 2;

export const smDrawerWidth = 320;
export const mdDrawerWidth = 400;
export const lgDrawerWidth = 450;
export const xlDrawerWidth = 500;

export const smSizeWidth = 600;

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
  [theme.breakpoints.up("lg")]: {
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
  [theme.breakpoints.up("lg")]: {
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
    marginLeft: mdDrawerWidth,
    "& .MuiDrawer-paper": {
      width: `calc(100% - ${mdDrawerWidth}px)`,
    },
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: lgDrawerWidth,
    "& .MuiDrawer-paper": {
      width: `calc(100% - ${lgDrawerWidth}px)`,
    },
  },
  [theme.breakpoints.up("lg")]: {
    marginLeft: xlDrawerWidth,
    "& .MuiDrawer-paper": {
      width: `calc(100% - ${xlDrawerWidth}px)`,
    },
  },
}));
