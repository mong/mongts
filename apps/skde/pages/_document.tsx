import Document, {
  type DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document<{ lang: string; pathname: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const { pathname } = ctx;
    const lang =
      pathname.includes("/en/") || pathname.endsWith("/en") ? "en" : "no";
    return { ...initialProps, lang, pathname };
  }

  render() {
    // const { lang, pathname } = this.props;
    const { lang } = this.props;

    return (
      <Html lang={lang}>
        <Head>
          {/* {pathname === "/" && (<></>
            <meta httpEquiv="refresh" content="4; url=https://www.skde.no/" />
          )} */}
          <meta
            name="google-site-verification"
            content="XnhRhaBwfeuAccfCFysPPpe1f49t46JAfInHBDfK6HE"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
