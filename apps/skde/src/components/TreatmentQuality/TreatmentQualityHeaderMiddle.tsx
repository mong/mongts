import { Toolbar, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

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
        <Button
          href="https://www.kvalitetsregistre.no/"
          target="_blank"
          variant="contained"
        >
          Om kvalitetsregistre
        </Button>
      </Grid>
    </StyledToolbar>
  );
};
