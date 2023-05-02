import { UseQueryResult } from "@tanstack/react-query";
import { MainRegister } from "qmongjs";
import { useRegisterNamesQuery } from "qmongjs";
import { GetStaticProps, GetStaticPaths } from "next";
import { Layout } from "qmongjs";
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
      <div className={classNames.kvalitetsregister} data-testid="MainRegister">
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
