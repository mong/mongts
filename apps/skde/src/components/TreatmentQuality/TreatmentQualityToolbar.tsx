import { Button, Toolbar, styled } from "@mui/material";
import { TuneRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
}));

type StickyToolbarProps = {
  openDrawer: () => void;
};

export const TreatmentQualityToolbar = ({ openDrawer }: StickyToolbarProps) => {
  const theme = useTheme();
  const notLargeScreen = useMediaQuery(theme.breakpoints.down("xxl"));

  return (
    <StyledToolbar className="main-toolbar">
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {notLargeScreen ? (
          <Grid size={{ xs: 1, sm: 1, md: 2 }} sx={{ alignContent: "center" }}>
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
              <TuneRounded fontSize="medium" />
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </StyledToolbar>
  );
};
