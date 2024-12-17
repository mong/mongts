import { GetStaticProps, GetStaticPaths } from "next";
import { Link, ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { PageWrapper } from "../../../src/components/StyledComponents/PageWrapper";
import { Header, BreadCrumbPath } from "../../../src/components/Header";

const MainRegisterPage = () => {
  // Header settings
  const breadcrumbs: BreadCrumbPath = [
    {
      link: "https://www.skde.no",
      text: "Forside",
    },
    {
      link: `/kvalitetsregistre/`,
      text: `Kvalitetsregistre/`,
    },
  ];

  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <Header
          bgcolor="surface2.light"
          title={"Kvalitetsregistre"}
          breadcrumbs={breadcrumbs}
        >
          Siden er flyttet til{" "}
          <Link href="/behandlingskvalitet/">behandlingskvalitet</Link>.
        </Header>
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
