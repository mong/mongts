import { Toolbar, styled, Box } from "@mui/material";

export const lineChartTheme = {
  lineChartBackground: {
    fill: "#FFFFFF",
    rx: 25,
    ry: 25,
  },
};

export const StyledToolbarMiddle = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.hospitalProfileHeader.light,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

export const ItemBox = styled(Box)(() => ({
  backgroundColor: "white",
  borderRadius: 24,
}));
