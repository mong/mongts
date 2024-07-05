import IframeResizer from "@iframe-resizer/react";
import { Footer } from "../../src/components/Footer";
import { ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";
import {
  Header,
  HeaderData,
  BreadCrumbPath,
} from "../../src/components/Header";

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

const headerData: HeaderData = {
  title: "Pasientstrømmer",
  subtitle:
    "Det interaktive tabellverket inneholder overordnet anonymisert informasjon om aktivitet og pasientstrømmer innad i, til og ut av helseregion Nord.",
};

const Pasient = () => {
  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <Header headerData={headerData} breadcrumbs={breadcrumbs} />
        <IframeResizer
          src="https://prod-tabellverk.skde.org/"
          style={{
            width: "1px",
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
