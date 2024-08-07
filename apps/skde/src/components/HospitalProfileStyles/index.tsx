import { styled, Box, Link } from "@mui/material";

export const lineChartTheme = {
  lineChartBackground: {
    fill: "#FFFFFF",
    rx: 25,
    ry: 25,
  },
};

export const ItemBox = styled(Box)(() => ({
  backgroundColor: "white",
  borderRadius: 24,
}));

export const StyledLink = styled(Link)(() => ({
  color: "#0000ee",
  textDecoration: "underline",
}));
