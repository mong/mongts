import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document<{ lang: string }> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { pathname } = ctx;
    const lang =
      pathname.includes("/en/") || pathname.endsWith("/en") ? "en" : "no";
    return { ...initialProps, lang };
  }

  render() {
    const { lang } = this.props;
    return (
      <Html lang={lang}>
        <Head>
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
