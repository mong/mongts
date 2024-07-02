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

export type BreadcrumbData = string | {
  link: string;
  text: string;
};

const breadcrumbsMapping = {
  pasientstrømmer: {
    link: "/pasientstrommer/",
    text: "Pasientstrømmer",
  },
  behandlingskvalitet: {
    link: "/behandlingskvalitet/",
    text: "Behandlingskvalitet",
  },
  forside: {
    link: "https://www.skde.no",
    text: "Forside",
  },
  resultater: {
    link: "https://www.skde.no/resultater",
    text: "Tall om helsetjenesten",
  },
};

const SkdeBreadcrumbs = ({ path }: { path: BreadcrumbData[] }) => {
  let path_objects = path.map((b) => typeof b === "string" ? breadcrumbsMapping[b] : b);
  return (
    <Breadcrumbs
      separator={<StyledBreadcrumbSeparator fontSize="large" />}
      aria-label="breadcrumb"
    >
      {[breadcrumbsMapping["forside"], ...path_objects].slice(0, -1).map((data, index) => (
        <Link
          underline="hover"
          key={index}
          color="inherit"
          href={data.link}
        >
          {data.text}
        </Link>
      ))}
      <Typography color="text.primary">
        {path_objects.at(-1).text}
      </Typography>
    </Breadcrumbs>
  );
};

export const SkdeHeader = ({ path }: { path: BreadcrumbData[] }) => {
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
