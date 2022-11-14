import { UseQueryResult } from "react-query";
import { SelectedRegister } from "qmongjs";
import { Layout } from "qmongjs";
import { useRegisterNamesQuery, fetchRegisterNames } from "qmongjs";
import { GetStaticProps, GetStaticPaths } from "next";
import classNames from "../../../src/styles/Kvalitetsregistre.module.css";

const SelectedRegisterPage = () => {
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  if (registryNameQuery.isLoading) {
    return null;
  }
  const registerNames = registryNameQuery.data;
  return (
    <Layout>
      <div
        className={classNames.kvalitetsregister}
        data-testid="SelectedRegister"
      >
        <SelectedRegister registerNames={registerNames || []} />
      </div>
    </Layout>
  );
};

export default SelectedRegisterPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: { content: [] },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const registries = await fetchRegisterNames();
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
