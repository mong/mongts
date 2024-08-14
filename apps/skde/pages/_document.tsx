import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document<{ lang: string; pathname: string }> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { pathname } = ctx;
    const lang =
      pathname.includes("/en/") || pathname.endsWith("/en") ? "en" : "no";
    return { ...initialProps, lang, pathname };
  }

  render() {
    const { lang, pathname } = this.props;

    return (
      <Html lang={lang}>
        <Head>
          {pathname === "/" ? (
            <meta
              http-equiv="refresh"
              content="0; url=https://www.skde.no/"
            ></meta>
          ) : (
            <meta
              name="google-site-verification"
              content="XnhRhaBwfeuAccfCFysPPpe1f49t46JAfInHBDfK6HE"
            />
          )}
        </Head>
        <body>
          {pathname !== "/" && (
            <>
              <Main />
              <NextScript />
            </>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
