import Link from "next/link";
import React from "react";
import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/browser";
import { ThemeProvider, styled, Toolbar } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { PageWrapper } from "./behandlingskvalitet";
import Image from "next/image";
import { imgLoader } from "qmongjs";

/* istanbul ignore next */
if (process.env.NEXT_PUBLIC_SENTRY) {
  try {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY,
      autoSessionTracking: true,
      integrations: [browserTracingIntegration()],
      tracesSampleRate: 1.0,
    });
  } catch (error) {
    console.log(
      "Sentry not working with dsn=" + process.env.NEXT_PUBLIC_SENTRY,
    );
  }
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
}));

export default function Home() {
  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <StyledToolbar className="header-top">
          <div style={{ paddingLeft: 50 }}>
            <Image
              loader={imgLoader}
              src="/img/logos/skde-blue.png"
              alt="SKDE logo"
              width={1.5 * 96}
              height={1.5 * 39}
            />
          </div>
        </StyledToolbar>
        <div style={{ textAlign: "center", paddingTop: 50, paddingBottom: 50 }}>
          <h1>
            Siden er flyttet til{" "}
            <Link href="https://www.skde.no/">www.skde.no</Link>{" "}
          </h1>
        </div>
      </PageWrapper>
    </ThemeProvider>
  );
}
