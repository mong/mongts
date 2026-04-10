import { Button, Toolbar, Tooltip, styled } from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
}));

type StickyToolbarProps = {
  openDrawer: () => void;
};

const scrollToTop = () => {
  if (window) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export const TreatmentQualityToolbar = (props: StickyToolbarProps) => {
  const { openDrawer } = props;

  const theme = useTheme();
  const notLargeScreen = useMediaQuery(theme.breakpoints.down("xxl"));

  return (
    <StyledToolbar className="main-toolbar">
      <Grid
        container
        spacing={2}
        sx={{ flexGrow: 1 }}
        justifyContent="space-between"
      >
        <Grid sx={{ xs: "auto" }}>
          {notLargeScreen ? (
            <Tooltip title="Åpne sidemeny">
              <Button
                variant="contained"
                aria-label="Åpne sidemeny"
                color="primary"
                sx={{
                  borderRadius: 4,
                }}
                onClick={() => {
                  openDrawer();
                }}
              >
                <TuneRoundedIcon
                  fontSize="medium"
                  data-testid="TuneRoundedIcon"
                />
              </Button>
            </Tooltip>
          ) : (
            <></>
          )}
        </Grid>
        <Grid sx={{ xs: "auto" }}>
          <Tooltip title="Til toppen">
            <Button
              variant="outlined"
              aria-label="Til toppen"
              color="primary"
              sx={{
                borderRadius: 4,
              }}
              onClick={() => {
                scrollToTop();
              }}
            >
              <KeyboardArrowUpRoundedIcon fontSize="medium" />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};
