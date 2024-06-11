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
        <Grid container xs={4} sm={8} md={12} lg={12} justifyContent="flex-end">
          <Grid xs={4} sm={4} md={4} lg={4}>
            <Button
              href="https://www.kvalitetsregistre.no/"
              target="_blank"
              variant="contained"
            >
              Mer om kvalitetsregistre
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};
