import IframeResizer from "@iframe-resizer/react";
import { Footer } from "../../src/components/Footer";
import { ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import { Header, BreadCrumbPath } from "../../src/components/Header";
import { LayoutHead } from "../../src/components/LayoutHead";

const breadcrumbs: BreadCrumbPath = {
  path: [
    {
      link: "https://www.skde.no",
      text: "Forside",
    },
    {
      link: "/pasientstrommer/",
      text: "Pasientstrømmer",
    },
  ],
};

const Pasient = () => {
  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <LayoutHead
          title="Pasientstrømmer"
          content="This page shows the transfer of patients between treatment units in Helse Nord RHF."
          href="/favicon.ico"
        />
        <Header title={"Pasientstrømmer"} breadcrumbs={breadcrumbs}>
          Det interaktive tabellverket inneholder overordnet anonymisert
          informasjon om aktivitet og pasientstrømmer innad i, til og ut av
          helseregion Nord.
        </Header>
        <IframeResizer
          src="https://prod-tabellverk.skde.org/"
          style={{
            width: "calc(1rem / 16)",
            minWidth: "100%",
            height: "100vh",
            border: "none",
          }}
          license="GPLv3"
        />
        <Footer page="pasientstrømmer" />
      </PageWrapper>
    </ThemeProvider>
  );
};
export default Pasient;
