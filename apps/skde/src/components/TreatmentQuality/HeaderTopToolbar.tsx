import Image from "next/image";
import { Toolbar, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { imgLoader } from "qmongjs";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(5),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

export const HeaderTopToolbar = () => {
  return (
    <StyledToolbar>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Image
            className="skde-logo"
            loader={imgLoader}
            src="/img/logos/skde-blue.png"
            height={121 / 2.4}
            width={299 / 2.4}
            alt="SKDE logo"
          />
        </Grid>
        <Grid xs={12}>...</Grid>
      </Grid>
    </StyledToolbar>
  );
};
