import Link from "next/link";
import styles from "../src/styles/Home.module.css";
import Layout from "../src/components/layout";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

if (process.env.NEXT_PUBLIC_SENTRY) {
  try {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY,
      autoSessionTracking: true,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  } catch (error) {
    console.log(
      "Sentry not working with dsn=" + process.env.NEXT_PUBLIC_SENTRY
    );
  }
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
              <a href="/kvalitetsregistre/alle/sykehus">Kvalitetsregistre</a>
            </div>

            <div className={styles.block_button}>
              <a href="/helseatlas">Helseatlas</a>
            </div>

            <div className={styles.block_button}>
              <a href="/pasientstrommer">Pasientstrømmer</a>
            </div>

            <div className={styles.block_button}>
              <Link href="https://helse-nord.no/skde">
                <a>Om SKDE</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
