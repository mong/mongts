import { NavigateNextRounded } from "@mui/icons-material";
import { Breadcrumbs, Link, Toolbar, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

const StyledToolbarTop = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
}));

const LogoImage = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    height: 40,
    width: 100,
  },
  [theme.breakpoints.up("lg")]: {
    height: 50,
    width: 125,
  },
}));

const StyledBreadcrumbSeparator = styled(NavigateNextRounded)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const SkdeBreadcrumbs = () => {
  return (
    <Breadcrumbs
      separator={<StyledBreadcrumbSeparator fontSize="large" />}
      aria-label="breadcrumb"
    >
      <Link
        underline="hover"
        key="1"
        color="inherit"
        href="https://www.skde.no"
      >
        Forside
      </Link>
      <Typography key="3" color="text.primary">
        Sykehusprofil
      </Typography>
    </Breadcrumbs>
  );
};

const HeaderTop = () => {
  return (
    <StyledToolbarTop className="header-top">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <LogoImage src="/img/logos/skde-blue.png" alt="SKDE logo" />
        </Grid>
        <Grid xs={12}>
          <SkdeBreadcrumbs />
        </Grid>
      </Grid>
    </StyledToolbarTop>
  );
};

const StyledToolbarMiddle = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

const HeaderMiddle = () => {
  return (
    <StyledToolbarMiddle className="header-middle">
      <Grid container spacing={2} rowSpacing={6}>
        <Grid xs={12}>
          <Typography variant="h1">Sykehusprofil</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h6">Resultater fra sykehus</Typography>
        </Grid>
      </Grid>
    </StyledToolbarMiddle>
  );
};

export const Header = () => {
  return (
    <React.Fragment>
      <HeaderTop />
      <HeaderMiddle />
    </React.Fragment>
  );
};
