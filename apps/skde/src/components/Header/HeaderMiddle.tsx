import React, { PropsWithChildren } from "react";
import { Toolbar, Typography, styled, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Breakpoint } from "@mui/material";
import { useRouter } from "next/router";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

type HeaderMiddleProps = PropsWithChildren<{
  title: string;
  bgcolor?: string;
  maxWidth?: false | Breakpoint;
}>;

/**
 * A component for displaying a title and subtitle in the middle section of the page.
 *
 * If the `NEXT_PUBLIC_VERIFY` environment variable is set, the component will display a warning
 * message indicating that the data is for testing purposes only, and provide a link to the
 * official website.
 *
 * The component takes the following props:
 *
 * - `title`: The title to be displayed.
 * - `children`: The subtitle to be displayed.
 * - `bgcolor`: The background color of the component. If not specified, the background color will
 *              be set to "primary.light".
 * - `maxWidth`: The maximum width of the component. If not specified, the component will take up
 *              the full width of the page.
 */
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
            <Typography variant="h6">{props.children}</Typography>
          </Grid>
        </Grid>
      </Container>
    </StyledToolbar>
  );
};
