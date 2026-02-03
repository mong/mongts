import {
  Button,
  Toolbar,
  Tooltip,
  styled,
  Switch,
  FormControlLabel,
} from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { SetStateAction } from "react";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
}));

type StickyToolbarProps = {
  openDrawer: () => void;
  useBeta: boolean;
  setUseBeta: (value: SetStateAction<boolean>) => void;
};

const scrollToTop = () => {
  if (window) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export const TreatmentQualityToolbar = (props: StickyToolbarProps) => {
  const { openDrawer, useBeta, setUseBeta } = props;

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
        <FormControlLabel
          control={
            <Switch
              checked={useBeta}
              onChange={() => {
                setUseBeta(!useBeta);
              }}
            />
          }
          label="Prøv betaversjonen av Behandlingskvalitet"
        />
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
