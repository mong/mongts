import { GetServerSideProps, GetStaticPaths } from "next";
import { useRegisterNamesQuery } from "../../../src/helpers/hooks/apihooks";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import MainRegister from "../../../src/components/RegisterPage/MainRegister";

function Page({ registerNames }) {
  console.log(registerNames);

  return (
    <>
      <Header />
      <MainRegister registerNames={registerNames ?? []} tab="sykehus" />
      <Footer />
    </>
  );

  // Render data...
}

// This gets called on every request
export async function getServerSideProps(context) {
  console.log(context.query.register);
  console.log(context.query.tab);
  const API_HOST = process.env.REACT_APP_API_HOST ?? "http://localhost:4000";
  const register = context.query.register;
  // Fetch data from external API
  const res = await fetch(`${API_HOST}/info/names`);
  const registerNames = await res.json();

  //    const data = register === "alle" ? data_tmp.map((tmp) => {
  //      return(tmp.rname)
  //    }) : [register];

  // Pass data to the page via props
  return { props: { registerNames } };
}

export default Page;
