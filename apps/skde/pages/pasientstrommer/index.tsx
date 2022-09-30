import Layout from "../../src/components/frontpageLayout";
import IframeResizer from "iframe-resizer-react";
import newsStyles from "../../src/styles/News.module.css";

const Pasient = () => {
  return (
    <Layout page="Pasientstrømmer">
      <div className={newsStyles.container_mod}>
        <div className={newsStyles.article}>
          <div className={newsStyles.article__title}>
            <h2>Pasientstrømmer, Helse Nord RHF</h2>
          </div>
        </div>
      </div>
      <IframeResizer
        log
        src="https://prod-tabellverk.skde.org/"
        style={{ width: "1px", minWidth: "100%", border: "none" }}
      />
    </Layout>
  );
};
export default Pasient;
