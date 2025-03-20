import Link from "next/link";
import React from "react";
import { ThemeProvider, styled, Toolbar } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { PageWrapper } from "../src/components/StyledComponents/PageWrapper";
import Image from "next/image";
import { imgLoader } from "qmongjs";

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
              src="/img/logos/logo-skde.svg"
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
