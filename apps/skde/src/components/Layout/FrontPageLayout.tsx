import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { imgLoader } from "qmongjs";

interface Props {
  children: React.ReactNode;
  title?: string;
  page?: string;
}

export function FrontPageLayout({
  children,
  title = "SKDE - Helse Nord RHF",
  page,
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:site_name" content="Helse Nord RHF"></meta>
        <meta
          property="og:description"
          content="Senter for klinisk dokumentasjon og evaluering (SKDE) er en selvstendig enhet i Helse Nord RHF, og har våre kontorer i Forskningsparken i Tromsø."
        ></meta>
      </Head>
      <div className={styles.grid_wrapper}>
        <header className={`${styles.header_container}`}>
          <div className={styles.header_logo}>
            <Link href="https://www.skde.no/" rel="home">
              <Image
                loader={imgLoader}
                src="/img/logos/SKDE_sort.png"
                alt="Hjem"
                width={96}
                height={39}
              />
            </Link>
          </div>
          <div className={styles.header_links}>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </header>
        {page && (
          <div className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="https://www.skde.no/">SKDE</Link>
              </li>
              <li>{page}</li>
            </ol>
          </div>
        )}
        {children}
      </div>
    </>
  );
}
