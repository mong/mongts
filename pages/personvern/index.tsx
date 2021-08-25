import Layout from "../../components/layout";
import newsStyles from "../../styles/News.module.css";

const Privacy = () => {
  return (
    <Layout page="Personvern">
      <div className={newsStyles.container}>
        <div className={newsStyles.article}>
          <div className={newsStyles.article__title}>
            <h2>Personvern</h2>
          </div>
          <div className={newsStyles.article__ingress}>
            SKDE følger samme behandling av personopplysninger som i{" "}
            <a
              href="https://helse-nord.no/om-nettstedet/personvern"
              target="_blank"
            >
              Helse Nord RHF
            </a>
            .
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Privacy;
