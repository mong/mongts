import { NavigateNextRounded } from "@mui/icons-material";
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

const StyledBreadcrumbSeparator = styled(NavigateNextRounded)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const TreatmentQualityBreadcrumbs = () => {
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
      <Link
        underline="hover"
        key="2"
        color="inherit"
        href="https://www.skde.no/resultater"
      >
        Tall om helsetjenesten
      </Link>
      <Typography key="3" color="text.primary">
        Behandlingskvalitet
      </Typography>
    </Breadcrumbs>
  );
};

const PasientstrommerBreadcrumbs = () => {
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
      <Link
        underline="hover"
        key="2"
        color="inherit"
        href="https://www.skde.no/om-skde/analyseseksjonen/"
      >
        Analyseseksjonen
      </Link>
      <Typography key="3" color="text.primary">
        Pasientstrømmer
      </Typography>
    </Breadcrumbs>
  );
};

type HeaderTopProps = {
  page: "behandlingskvalitet" | "pasientstrømmer";
};

export const HeaderTop = (props: HeaderTopProps) => {
  const { page } = props;

  return (
    <StyledToolbar className="header-top">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Link href={"https://www.skde.no/"}>
            <LogoImage src="/img/logos/skde-blue.png" alt="SKDE logo" />
          </Link>
        </Grid>
        <Grid xs={12}>
          {page === "behandlingskvalitet" ? (
            <TreatmentQualityBreadcrumbs />
          ) : page === "pasientstrømmer" ? (
            <PasientstrommerBreadcrumbs />
          ) : null}
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};

export default HeaderTop;
