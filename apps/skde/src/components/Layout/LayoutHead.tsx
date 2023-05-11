import React from "react";
import Head from "next/head";

type LayoutHeadProps = {
  title: string;
  lang?: "nb" | "nn" | "en";
};

export const LayoutHead: React.FC<LayoutHeadProps> = ({ title, lang }) => {
  return (
    <Head>
      <html lang={lang ?? "nb"} />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:site_name" content="Helse Nord RHF"></meta>
      <meta
        name="description"
        content="The healthcare atlases on Helseatlas.no are a tool for comparing the population's use of health services in different geographical areas, regardless of where the patients actually receive treatment."
      />
      <link rel="icon" href="/helseatlas/img/logos/favicon.ico" />
    </Head>
  );
};
