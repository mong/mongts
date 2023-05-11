import { useEffect, useState } from "react";
import { LayoutHead } from "./LayoutHead";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  children: React.ReactNode;
  title?: string;
  page?: string;
  lang: "nb" | "en" | "nn";
}

export function AtlasLayout({ children, title = "Helseatlas", lang }: Props) {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, [setOrigin]);
  console.log(lang);

  return (
    <>
      <LayoutHead title={title} lang={lang} />
      <Header origin={origin} lang={lang} />
      {children}
      <Footer />
    </>
  );
}
