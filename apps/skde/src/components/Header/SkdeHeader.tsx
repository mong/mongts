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

const breadcrumbsMapping = {
  forside: {
    link: "https://www.skde.no",
    text: "Forside",
  },
  resultater: {
    link: "https://www.skde.no/resultater",
    text: "Tall om helsetjenesten",
  },
  pasientstrømmer: {
    link: "/pasientstrommer/",
    text: "Pasientstrømmer",
  },
  behandlingskvalitet: {
    link: "/behandlingskvalitet/",
    text: "Behandlingskvalitet",
  },
  sykehusprofil: {
    link: "/sykehusprofil/",
    text: "Sykehusprofil",
  },
};

const SkdeBreadcrumbs = ({ path }: { path: string[] }) => {
  return (
    <Breadcrumbs
      separator={<StyledBreadcrumbSeparator fontSize="large" />}
      aria-label="breadcrumb"
    >
      {["forside", ...path].slice(0, -1).map((id, index) => (
        <Link
          underline="hover"
          key={index}
          color="inherit"
          href={breadcrumbsMapping[id].link}
        >
          {breadcrumbsMapping[id].text}
        </Link>
      ))}
      <Typography color="text.primary">
        {breadcrumbsMapping[path.at(-1)].text}
      </Typography>
    </Breadcrumbs>
  );
};

export const SkdeHeader = ({ path }: { path: string[] }) => {
  return (
    <StyledToolbar className="header-top">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Link href={"/"}>
            <LogoImage src="/img/logos/skde-blue.png" alt="SKDE logo" />
          </Link>
        </Grid>
        <Grid xs={12}>
          <SkdeBreadcrumbs path={path} />
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};

export default SkdeHeader;
