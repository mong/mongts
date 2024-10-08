import Head from "next/head";

export const LayoutHead = () => {
  return (
    <Head>
      <title>Pastientstrømmer</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:site_name" content="Helse Nord RHF"></meta>
      <meta
        name="description"
        content="This page shows the transfer of patients between treatment units in Helse Nord RHF."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
