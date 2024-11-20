import { UseQueryResult } from "@tanstack/react-query";
import { useRegisterNamesQuery, fetchRegisterNames } from "qmongjs";
import { GetStaticProps, GetStaticPaths } from "next";
import { Link, ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { PageWrapper } from "../../../src/components/StyledComponents/PageWrapper";
import { Header, BreadCrumbPath } from "../../../src/components/Header";

const SelectedRegisterPage = ({ register }: { register: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  if (registryNameQuery.isLoading) {
    return null;
  }

  // Header settings
  const breadcrumbs: BreadCrumbPath = [
    {
      link: "https://www.skde.no",
      text: "Forside",
    },
    {
      link: "https://www.skde.no/resultater/",
      text: "Tall om helsetjenesten",
    },
    {
      link: `/kvalitetsregistre/${register}`,
      text: `Kvalitetsregistre/${register}`,
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
          <Link href={`/behandlingskvalitet/${register}`}>
            behandlingskvalitet/{register}
          </Link>
          .
        </Header>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default SelectedRegisterPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const register = context.params?.register;
  return {
    props: { register },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const registries = await fetchRegisterNames();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = registries.flatMap((registry: any) => {
    const { caregiver_data, resident_data, dg_data } = registry;
    const sykehustab =
      caregiver_data === 1
        ? [{ params: { register: registry.rname, tab: "sykehus" } }]
        : [];
    const opptaktab =
      resident_data === 1
        ? [{ params: { register: registry.rname, tab: "opptaksomraade" } }]
        : [];
    const kvalitettab =
      dg_data === 1
        ? [{ params: { register: registry.rname, tab: "datakvalitet" } }]
        : [];
    return [...sykehustab, ...opptaktab, ...kvalitettab];
  });

  return { paths, fallback: false };
};
