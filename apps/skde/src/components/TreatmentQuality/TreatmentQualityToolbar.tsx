import { useState } from "react";
import { Button, Tab, Tabs, Toolbar, styled, Stack } from "@mui/material";
import { TuneRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import { Hoverbox } from "qmongjs";
import { HelpOutline } from "@mui/icons-material";

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
  tabs?: boolean;
};

export const TreatmentQualityToolbar = ({
  openDrawer,
  context,
  onTabChanged,
  tabs = true,
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
        {useMediaQuery(theme.breakpoints.down("xxl")) ? (
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
        {(tabs || tabs === undefined) && (
          <Grid size={{ xs: 3, sm: 7, md: 10 }}>
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
                  <Stack direction="row" alignItems="center">
                    Behandlingsenheter
                    <Hoverbox
                      title="Med behandlingsenheter menes sykehus hvor pasienten har blitt behandlet uavhengig av pasientens bosted."
                      placement="top"
                      offset={[50, 20]}
                    >
                      <HelpOutline sx={{ fontSize: "18px", marginLeft: 1 }} />
                    </Hoverbox>
                  </Stack>
                }
                value={"caregiver"}
                data-testid="tab_caregiver"
              />
              <StyledTab
                label={
                  <Stack direction="row" alignItems="center">
                    Opptaksområder
                    <Hoverbox
                      title="Med opptaksområde menes de geografiske områdene som helseforetakene og sykehusene har ansvar for å betjene. Resultatene er basert på pasientens bosted og uavhengig av behandlingssted."
                      placement="top"
                      offset={[50, 20]}
                    >
                      <HelpOutline sx={{ fontSize: "18px", marginLeft: 1 }} />
                    </Hoverbox>
                  </Stack>
                }
                value={"resident"}
                data-testid="tab_resident"
              />
            </StyledTabs>
          </Grid>
        )}
      </Grid>
    </StyledToolbar>
  );
};
