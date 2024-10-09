import Head from "next/head";

export const LayoutHead = (props: {
  title: string;
  content: string;
  href: string;
}) => {
  const { title, content, href } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:site_name" content="Helse Nord RHF"></meta>
      <meta name="description" content={content} />
      <link rel="icon" href={href} />
    </Head>
  );
};
