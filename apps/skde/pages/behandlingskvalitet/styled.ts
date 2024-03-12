import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export const appBarElevation = 2;
export const filterMenuTopMargin = 2;

export const smDrawerWidth = 350;
export const mdDrawerWidth = 400;
export const lgDrawerWidth = 500;

export const FilterDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
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

export const FilterDrawerBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
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

export const MainBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    "& .MuiDrawer-paper": {
      width: `calc(100% - ${smDrawerWidth}px)`,
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiDrawer-paper": {
      width: `calc(100% - ${mdDrawerWidth}px)`,
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .MuiDrawer-paper": {
      width: `calc(100% - ${lgDrawerWidth}px)`,
    },
  },
}));
