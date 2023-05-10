import Link from "next/link";
import React from "react";
import styles from "../src/styles/Home.module.css";
import { FrontPageLayout } from "../src/components/Layout";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/browser";

/* istanbul ignore next */
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
  const [origin, setOrigin] = React.useState("");
  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, [setOrigin]);
  return (
    <FrontPageLayout>
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
            <div
              className={styles.block_button}
              data-testid="kvalitetsregistre_button"
            >
              <Link href="/kvalitetsregistre/alle/sykehus">
                Kvalitetsregistre
              </Link>
            </div>

            <div className={styles.block_button}>
              <Link href="/helseatlas">Helseatlas</Link>
            </div>

            <div className={styles.block_button}>
              <Link href="/pasientstrommer">Pasientstrømmer</Link>
            </div>

            <div className={styles.block_button}>
              <a href="https://helse-nord.no/skde">Om SKDE</a>
            </div>
          </div>
        </div>
      </div>
    </FrontPageLayout>
  );
}
