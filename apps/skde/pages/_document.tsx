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
        <meta
          name="google-site-verification"
          content="FHmfT4_kWFk4h0B5r_hil2Mz0CAm_keKrt7kUL5BmIM"
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
