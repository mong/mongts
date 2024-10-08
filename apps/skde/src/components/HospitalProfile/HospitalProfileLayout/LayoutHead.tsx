import Head from "next/head";

export const LayoutHead = () => {
  return (
    <Head>
      <title>Sykehusprofil</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:site_name" content="Helse Nord RHF"></meta>
      <meta
        name="description"
        content="This page shows the quality indicators from national health registries in the Norwegian specialist healthcare service for individual treatment units."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
