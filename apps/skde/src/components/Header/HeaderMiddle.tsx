import React from "react";
import { Toolbar, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

export type HeaderData = {
  title: string;
  subtitle: string;
};

type HeaderMiddleProps = {
  headerData: HeaderData;
  children?: React.ReactNode;
  bgcolor?: string;
};

export const HeaderMiddle = (props: HeaderMiddleProps) => {
  return (
    <StyledToolbar
      sx={{ bgcolor: props.bgcolor || "primary.light" }}
      className="header-middle"
    >
      <Grid container spacing={2} rowSpacing={6}>
        <Grid xs={12}>
          <Typography variant="h1">{props.headerData.title}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h6">{props.headerData.subtitle}</Typography>
        </Grid>
        {props.children !== undefined && props.children}
      </Grid>
    </StyledToolbar>
  );
};
