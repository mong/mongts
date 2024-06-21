import { Toolbar, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ArrowLink } from "../ArrowLink";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

export const HeaderMiddleToolbar = () => {
  return (
    <StyledToolbar className="header-middle">
      <Grid container spacing={2} rowSpacing={6}>
        <Grid xs={12}>
          <Typography variant="h1">Behandlingskvalitet</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h6">
            Resultater fra nasjonale medisinske kvalitetsregistre
          </Typography>
        </Grid>
        <ArrowLink
          href={"https://www.kvalitetsregistre.no/"}
          text={"Om kvalitetsregistre"}
          externalLink={true}
          button={true}
        />
      </Grid>
    </StyledToolbar>
  );
};
