import Layout from "../../components/layout";
import IframeResizer from "iframe-resizer-react";
import newsStyles from "../../styles/News.module.css";

const Indikatorer = () => {
  return (
    <Layout page="«10 indikatorer»">
      <div className={newsStyles.container_mod}>
        <div className={newsStyles.article}>
          <div className={newsStyles.article__title}>
            <h2>«10 indikatorer», Helse Nord RHF</h2>
          </div>
        </div>
      </div>
      <IframeResizer
        log
        src="https://qa-cdmongr.skde.org/"
        style={{ width: "1px", minWidth: "100%", border: "none" }}
      />
    </Layout>
  );
};
export default Indikatorer;
