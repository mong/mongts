import Layout from "../../components/layout";
import style from "./index.module.css";
import newsStyles from "../../styles/News.module.css";

const Privacy = () => {
  return (
    <Layout page="Personvern">
      <div className={style.privacyWrapper}>
        <div className={newsStyles.container}>
          <div className={newsStyles.title}>
            <div>
              <h2>Personvern</h2>
            </div>
          </div>
          <div className={newsStyles.article}>
            <div>
              <p className={newsStyles.ingress}>
                SKDE følger samme behandling av personopplysninger som i Helse
                Nord RHF. Se{" "}
                <a
                  href="https://helse-nord.no/om-nettstedet/personvern"
                  target="_blank"
                >
                  https://helse-nord.no/om-nettstedet/personvern
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Privacy;
