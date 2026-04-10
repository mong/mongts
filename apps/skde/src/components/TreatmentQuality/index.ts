import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

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
