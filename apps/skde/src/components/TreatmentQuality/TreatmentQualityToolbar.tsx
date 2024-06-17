import { useState } from "react";
import { Button, Tab, Tabs, Toolbar, styled } from "@mui/material";
import { TuneRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
  paddingTop: theme.spacing(2),
  paddingBottom: 0,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .Mui-selected": {
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  ...theme.typography.button,
  textTransform: "none",
}));

type StickyToolbarProps = {
  openDrawer: () => void;
  context;
  onTabChanged;
};

export const TreatmentQualityToolbar = ({
  openDrawer,
  context,
  onTabChanged,
}: StickyToolbarProps) => {
  const theme = useTheme();
  const isNarrowScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState(
    context === "resident" ? "resident" : "caregiver",
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTimeout(() => {
      onTabChanged(newValue);
    }, 0);
  };

  return (
    <StyledToolbar className="main-toolbar">
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid
          xs={1}
          sm={1}
          md={2}
          sx={{
            alignContent: "center",
          }}
        >
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
        <Grid xs={3} sm={7} md={10}>
          <StyledTabs
            indicatorColor="secondary"
            aria-label="Arkfaner for behandlingskvalitet og opptaksområde"
            value={value}
            onChange={handleChange}
            orientation={isNarrowScreen ? "vertical" : "horizontal"}
            variant="fullWidth"
          >
            <StyledTab
              label={
                <Tooltip title="Med behandlingsenheter menes med sykehus, helseforetak og regionale helseforetak.">
                  <Box>Behandlingsenheter</Box>
                </Tooltip>
              }
              value={"caregiver"}
            />
            <StyledTab
              label={
                <Tooltip title="Definert geografisk område og befolkning som behandlingsenheter skal gi helsetjenester til.">
                  <Box>Opptaksområder</Box>
                </Tooltip>
              }
              value={"resident"}
            />
          </StyledTabs>
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};
