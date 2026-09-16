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
          <meta
            name="google-site-verification"
            content="XnhRhaBwfeuAccfCFysPPpe1f49t46JAfInHBDfK6HE"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap&icon_names=arrow_circle_down"
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
