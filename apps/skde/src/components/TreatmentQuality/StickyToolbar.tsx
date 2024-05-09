import { Tab, Tabs, Toolbar, styled } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(0),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .Mui-selected": {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  font: theme.typography.button.font,
  textTransform: "none",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  fontWeight: "bold",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

export const StickyToolbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("phone"));

  return (
    <StyledToolbar>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <StyledTabs
            aria-label="Arkfaner for behandlingskvalitet og opptaksområde"
            value="caregiver"
            orientation={isSmallScreen ? "vertical" : "horizontal"}
          >
            <StyledTab label="Behandlingsenheter" value={"caregiver"} />
            <StyledTab label="Opptaksområder" value={"resident"} />
          </StyledTabs>
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};
