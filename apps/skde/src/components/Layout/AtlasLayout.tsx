import { useEffect, useState } from "react";
import { LayoutHead } from "./LayoutHead";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";

interface Props {
  children: React.ReactNode;
  title?: string;
  page?: string;
  lang: "no" | "en" | "nb" | "nn";
}

export function AtlasLayout({ children, title = "Helseatlas", lang }: Props) {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, [setOrigin]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: lang === "no" ? "nb" : lang }} />
      <LayoutHead title={title} />
      <Header origin={origin} lang={lang in ["nb", "nn", "no"] ? "no" : "en"} />
      {children}
      <Footer />
    </>
  );
}
