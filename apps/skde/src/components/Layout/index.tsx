import { useEffect, useState } from "react";
import { LayoutHead } from "./LayoutHead";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  children: any;
  title?: string;
  page?: string;
  lang: "no" | "en";
}

export default function Layout({
  children,
  title = "Helseatlas",
  lang,
}: Props) {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, [setOrigin]);

  return (
    <>
      <LayoutHead title={title} />
      <Header origin={origin} lang={lang} />
      {children}
      <Footer />
    </>
  );
}
