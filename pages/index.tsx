import Link from "next/link";
import styles from "../styles/Home.module.css";

import Layout from "../components/layout";

interface MarkdownFile {
  title: string;
  ingress: string;
  date: string;
  thumbnail?: string;
  slug: string;
}

interface Props {
  latestNews: MarkdownFile;
}

export default function Home() {
  return (
    <Layout>
      <div className={styles.full_bleed}>
        <div className={styles.banner_article}>
          <div className={styles.banner_article__content}>
            <h2>Kvalitet og forbruk i helsetjenesten</h2>
            <p>
              Senter for klinisk dokumentasjon og evaluering (SKDE) jobber med å
              kartlegge og synliggjøre geografiske ulikheter i
              spesialisthelsetjenester. Målet er å bidra til likeverdige
              helsetjenester av god kvalitet uansett hvor pasientene bor.
            </p>
          </div>
        </div>
      </div>
      <div className={`${styles.full_bleed} ${styles.buttons_container}`}>
        <div className={`${styles.buttons}`}>
          <h2>Resultater</h2>
          <div className={styles.block_buttons}>
            <div className={styles.block_button}>
              <Link href="/kvalitetsregistre/">
                <a>Kvalitetsregistre</a>
              </Link>
            </div>

            <div className={styles.block_button}>
              <Link href="https://helseatlas.no/">
                <a>Helseatlas</a>
              </Link>
            </div>

            <div className={styles.block_button}>
              <Link href="/pasientstrommer">
                <a>Pasientstrømmer</a>
              </Link>
            </div>

            <div className={styles.block_button}>
              <Link href="/publikasjoner">
                <a>Publikasjoner</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
