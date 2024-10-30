import React, { PropsWithChildren } from "react";
import { Toolbar, Typography, styled, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Breakpoint } from "@mui/material";
import { useRouter } from "next/router";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

type HeaderMiddleProps = PropsWithChildren<{
  title: string;
  children?: React.ReactNode;
  bgcolor?: string;
  maxWidth?: false | Breakpoint;
}>;

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
            <Typography variant="h1">{props.title}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">
              {props.children !== undefined && props.children}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </StyledToolbar>
  );
};
