import { useEffect, useState } from "react";
import { LayoutHead } from "./LayoutHead";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  children: React.ReactNode;
  title?: string;
  page?: string;
  lang: "no" | "en";
}

export function AtlasLayout({ children, lang }: Props) {
  return (
    <>
      <LayoutHead />
      <Header lang={lang} />
      {children}
      <Footer />
    </>
  );
}
