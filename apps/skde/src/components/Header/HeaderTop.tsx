import { NavigateNextRounded, ArrowBack } from "@mui/icons-material";
import {
  Breadcrumbs,
  Breakpoint,
  Link,
  Toolbar,
  Typography,
  styled,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

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

  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (onMobile && path.length > 1) {
    const secondToLastElement = path.at(-2);
    return (
      <Breadcrumbs
        separator={<ArrowBack fontSize="medium" />}
        aria-label="breadcrumb"
      >
        <div></div>
        <Link
          underline="hover"
          key="mobile_breadcrumb"
          href={secondToLastElement.link}
          variant="h6"
        >
          {secondToLastElement.text}
        </Link>
      </Breadcrumbs>
    );
  }
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

type HeaderTopProps = {
  breadcrumbs: BreadCrumbPath;
  maxWidth?: false | Breakpoint;
};

export const HeaderTop = (props: HeaderTopProps) => {
  const { breadcrumbs, maxWidth } = props;

  return (
    <StyledToolbar className="header-top">
      <Container maxWidth={maxWidth ? maxWidth : false} disableGutters={true}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Link href={"https://www.skde.no/"}>
              <LogoImage src="/img/logos/logo-skde.svg" alt="SKDE logo" />
            </Link>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <SkdeBreadcrumbs path={breadcrumbs.path} />
          </Grid>
        </Grid>
      </Container>
    </StyledToolbar>
  );
};
