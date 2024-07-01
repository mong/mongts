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

type BreadCrumbStop = {
  link: string;
  text: string;
};

export type BreadCrumbPath = {
  path: BreadCrumbStop[];
};

const SkdeBreadcrumbs = (props: BreadCrumbPath) => {
  const { path } = props;

  return (
    <Breadcrumbs
      separator={<StyledBreadcrumbSeparator fontSize="large" />}
      aria-label="breadcrumb"
    >
      {path.slice(0, -1).map((row, index) => (
        <Link underline="hover" key={index} color="inherit" href={row.link}>
          {row.text}
        </Link>
      ))}
      <Typography color="text.primary">{path.at(-1).text}</Typography>
    </Breadcrumbs>
  );
};

type SkdeHeaderProps = {
  path: BreadCrumbPath;
};

export const SkdeHeader = (props: SkdeHeaderProps) => {
  const { path } = props;

  return (
    <StyledToolbar className="header-top">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Link href={"/"}>
            <LogoImage src="/img/logos/skde-blue.png" alt="SKDE logo" />
          </Link>
        </Grid>
        <Grid xs={12}>
          <SkdeBreadcrumbs path={path.path} />
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};
