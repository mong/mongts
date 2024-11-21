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
  paddingTop: theme.spacing(3.5),
  paddingBottom: theme.spacing(3.5),
}));

const LogoImage = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    height: 46,
    width: 114,
  },
  [theme.breakpoints.up("md")]: {
    height: 52,
    width: 129,
  },
}));

const StyledBreadcrumbSeparator = styled(NavigateNextRounded)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

type BreadCrumbStop = {
  link: string;
  text: string;
};

export type BreadCrumbPath = BreadCrumbStop[];

/**
 * A component that displays breadcrumbs based on the provided path.
 *
 * @param {BreadCrumbPath} path - An array containing the breadcrumb path.
 * @return {JSX.Element} A JSX element representing the breadcrumbs.
 */

const SkdeBreadcrumbs = ({ path }: { path: BreadCrumbPath }) => {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * On small screens, only second to last element is displayed.
   * The first element is empty.
   * The separator is a left arrow.
   */
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
      separator={
        <StyledBreadcrumbSeparator fontSize="medium" fontWeight="bold" />
      }
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
  menu?: React.ReactNode;
};

/**
 * A component for displaying the top section of the header.
 *
 * The component takes in a list of breadcrumbs and a maximum width.
 * If `maxWidth` is not specified, the component will not have a maximum width.
 *
 * @param {HeaderTopProps} props - The properties of the HeaderTop component.
 * @param {BreadCrumbPath} props.breadcrumbs - The list of breadcrumbs to be displayed.
 * @param {false | Breakpoint} [props.maxWidth] - The maximum width of the component.
 * @returns {JSX.Element} A JSX element representing the HeaderTop component.
 */
export const HeaderTop = (props: HeaderTopProps) => {
  const { breadcrumbs, maxWidth } = props;

  return (
    <StyledToolbar className="header-top">
      <Container maxWidth={maxWidth ? maxWidth : false} disableGutters={true}>
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12 }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href={"https://www.skde.no/"}>
              <LogoImage src="/img/logos/logo-skde.svg" alt="SKDE logo" />
            </Link>
            {props.menu}
          </Grid>
          <Grid size={{ xs: 12 }}>
            <SkdeBreadcrumbs path={breadcrumbs} />
          </Grid>
        </Grid>
      </Container>
    </StyledToolbar>
  );
};
