import { useEffect, useState } from "react";
import Head from "next/head";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, [setOrigin]);

  return (
    <>
      <Head>
        <title>SKDE - Kvalitetsregistre</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};
