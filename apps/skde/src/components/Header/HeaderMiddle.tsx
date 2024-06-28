import React from "react";
import { Toolbar, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ArrowLink } from "../ArrowLink";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

export const HeaderMiddle = ({
  page,
}: {
  page: "behandlingskvalitet" | "pasientstrømmer";
}) => {
  let linkButton;
  let headerTitle: string;
  let headerSubtitle: string;

  if (page === "behandlingskvalitet") {
    linkButton = (
      <ArrowLink
        href={"https://www.kvalitetsregistre.no/"}
        text={"Om kvalitetsregistre"}
        externalLink={true}
        button={true}
      />
    );

    headerTitle = "Behandlingskvalitet";
    headerSubtitle = "Resultater fra nasjonale medisinske kvalitetsregistre";
  } else if (page === "pasientstrømmer") {
    linkButton = null;

    headerTitle = "Pasientstrømmer";
    headerSubtitle =
      "Det interaktive tabellverket inneholder overordnet anonymisert informasjon om aktivitet og pasientstrømmer innad i, til og ut av helseregion Nord.";
  }
  return (
    <StyledToolbar className="header-middle">
      <Grid container spacing={2} rowSpacing={6}>
        <Grid xs={12}>
          <Typography variant="h1">{headerTitle}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h6">{headerSubtitle}</Typography>
        </Grid>
        {linkButton}
      </Grid>
    </StyledToolbar>
  );
};
