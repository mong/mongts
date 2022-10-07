import { UseQueryResult } from "react-query";
import MainRegister from "../../../src/components/Kvalitetsregistre/RegisterPage/MainRegister";
import { useRegisterNamesQuery } from "../../../src/helpers/hooks";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../../src/components/Kvalitetsregistre/Layout";
import classNames from "../../../src/styles/Kvalitetsregistre.module.css";

const MainRegisterPage = () => {
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  if (registryNameQuery.isLoading) {
    return null;
  }
  const registerNames = registryNameQuery.data;
  return (
    <Layout>
      <div className={classNames.kvalitetsregister}>
        <MainRegister registerNames={registerNames || []} />
      </div>
    </Layout>
  );
};

export default MainRegisterPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
