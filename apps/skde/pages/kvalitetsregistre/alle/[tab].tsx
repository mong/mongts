import { GetStaticProps, GetStaticPaths } from "next";
import { ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { PageWrapper } from "../../../src/components/StyledComponents/PageWrapper";
import {
  Header,
  HeaderData,
  BreadCrumbPath,
} from "../../../src/components/Header";

const MainRegisterPage = () => {
  // Header settings
  const breadcrumbs: BreadCrumbPath = {
    path: [
      {
        link: "https://www.skde.no",
        text: "Forside",
      },
      {
        link: "https://www.skde.no/resultater/",
        text: "Tall om helsetjenesten",
      },
      {
        link: `/kvalitetsregistre/`,
        text: `Kvalitetsregistre/`,
      },
    ],
  };

  const headerData: HeaderData = {
    title: "Kvalitetsregistre",
    subtitle: `Siden er flyttet til <a href="/behandlingskvalitet/">/behandlingskvalitet</a>.`,
  };

  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <Header
          bgcolor="surface2.light"
          headerData={headerData}
          breadcrumbs={breadcrumbs}
        ></Header>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default MainRegisterPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { content: [] },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { tab: "sykehus" } },
    { params: { tab: "opptaksomraade" } },
    { params: { tab: "datakvalitet" } },
  ];
  return { paths, fallback: false };
};
