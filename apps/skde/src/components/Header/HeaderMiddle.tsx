import React from "react";
import { Toolbar, Typography, styled, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Breakpoint } from "@mui/material";
import { useRouter } from "next/router";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

export type HeaderData = {
  title: string;
  subtitle: string | undefined;
};

type HeaderMiddleProps = {
  headerData: HeaderData;
  bgcolor?: string;
  maxWidth?: false | Breakpoint;
};

export const HeaderMiddle = (props: HeaderMiddleProps) => {
  const router = useRouter();
  const mainUrl = "https://apps.skde.no" + router.asPath;

  return (
    <StyledToolbar
      sx={{
        bgcolor: process.env.NEXT_PUBLIC_VERIFY
          ? "error.main"
          : props.bgcolor || "primary.light",
      }}
      className="header-middle"
    >
      <Container maxWidth={props.maxWidth} disableGutters={true}>
        <Grid container spacing={2} rowSpacing={6}>
          <Grid size={{ xs: 12 }}>
            {process.env.NEXT_PUBLIC_VERIFY && (
              <>
                <Typography variant="h6">
                  OBS! Dette er en verifiseringsside for testdata. Hvis du
                  ønsker å se offisielle tall må du gå til{" "}
                  <a href={mainUrl} target="_self">
                    www.skde.no.
                  </a>
                </Typography>
                <br />
              </>
            )}
            <Typography variant="h1">{props.headerData.title}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            {props.headerData.subtitle ? (
              <Typography variant="h6">{props.headerData.subtitle}</Typography>
            ) : (
              <Typography variant="h6">
                Resultater fra{" "}
                <a href="https://www.kvalitetsregistre.no/">
                  nasjonale medisinske kvalitetsregistre
                </a>{" "}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </StyledToolbar>
  );
};
