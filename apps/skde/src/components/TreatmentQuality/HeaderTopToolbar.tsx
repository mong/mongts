import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Link, Toolbar, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
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

const StyledBreadcrumbSeparator = styled(NavigateNext)(({ theme }) => ({
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
        Behandlingskvalitet
      </Typography>
    </Breadcrumbs>
  );
};

export const HeaderTopToolbar = () => {
  return (
    <StyledToolbar>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <LogoImage src="/img/logos/skde-blue.png" alt="SKDE logo" />
        </Grid>
        <Grid xs={12}>
          <SkdeBreadcrumbs />
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};
