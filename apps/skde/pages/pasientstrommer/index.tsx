import { FrontPageLayout } from "../../src/components/Layout";
import IframeResizer from "@iframe-resizer/react";
import styles from "../../src/styles/Pages.module.css";
import { Footer } from "../../src/components/Footer";
import { ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";

const Pasient = () => {
  return (
    <ThemeProvider theme={skdeTheme}>
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
          style={{
            width: "1px",
            minWidth: "100%",
            height: "100vh",
            border: "none",
          }}
          license="GPLv3"
        />
      </FrontPageLayout>
      <PageWrapper>
        <Footer page="pasientstrømmer" />
      </PageWrapper>
    </ThemeProvider>
  );
};
export default Pasient;
