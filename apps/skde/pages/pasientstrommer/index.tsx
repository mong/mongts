import { FrontPageLayout } from "../../src/components/Layout";
import IframeResizer from "@iframe-resizer/react";
import styles from "../../src/styles/Pages.module.css";

const Pasient = () => {
  return (
    <FrontPageLayout page="Pasientstrømmer">
      <div className={styles.container_mod}>
        <div className={styles.article}>
          <div className={styles.article__title}>
            <h2>Pasientstrømmer, Helse Nord RHF</h2>
          </div>
        </div>
      </div>
      <IframeResizer
        src="https://prod-tabellverk.skde.org/"
        style={{ width: "1px", minWidth: "100%", border: "none" }}
        license="LGPL-3.0"
      />
    </FrontPageLayout>
  );
};
export default Pasient;
