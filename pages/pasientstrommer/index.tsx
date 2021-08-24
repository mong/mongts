import Layout from "../../components/layout";
import newsStyles from "../../styles/News.module.css";
import IframeResizer from "iframe-resizer-react"
import style from "./index.module.css";

const Pasient = () => {
  return (
/*    <Layout page="Pasientstrømmer">
      <div className={newsStyles.container}>
        <div className={newsStyles.article}>
          <div className={newsStyles.article__title}>
              <h2>Pasientstrømmer Helse-Nord RHF</h2>
          </div>
          <div className={newsStyles.article__title}>*/
<IframeResizer
  log
   src="http://qa-tabellverk.eu-west-1.elasticbeanstalk.com/"
  style={{ width: '1px', minWidth: '100%', border: "none"}}
/>
/*</div>
</div>
</div>
    </Layout>*/
  );
};
export default Pasient;
