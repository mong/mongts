import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { imgLoader } from "../../helpers/functions";

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
            <Link href="/" rel="home">
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
                <Link href="/">SKDE</Link>
              </li>
              <li>{page}</li>
            </ol>
          </div>
        )}
        {children}
        <footer className={`${styles.full_bleed} ${styles.footer_container}`}>
          <div className={styles.footer__top}>
            <div>
              <Image
                loader={imgLoader}
                src="/img/logos/SKDE_hvit_lys.png"
                height="40"
                width="99"
                alt="SKDE logo"
              />
            </div>
            <div>
              <strong>Telefon: </strong>
              <a href="tel:77 75 58 00">77 75 58 00</a>
              <br />
              <strong>E-post: </strong>
              <Link href="mailto:postmottak@helse-nord.no">
                postmottak@helse-nord.no
              </Link>
              <br />
              <strong>Ansvarlig redaktør: </strong>
              <Link href="mailto:barthold.vonen@helse-nord.no">
                Barthold Vonen
              </Link>
            </div>
            <div className={styles.footer__social}>
              <Link href="/kontakt" title="Link til kontakt SKDE">
                Kontakt
              </Link>
              <Link href="/personvern" title="link til personvern">
                Personvern
              </Link>
            </div>
          </div>
          <div className={styles.footer__bottom}>
            <div className={styles.footer__partner_l}>
              <Link
                href="https://www.helse-nord.no/"
                title="Link til Helse Nord"
              >
                <Image
                  loader={imgLoader}
                  src="/img/logos/hf_nord-white.svg"
                  height={40}
                  width={180}
                  alt="Helse Nord logo"
                />
              </Link>
            </div>
            <div className={styles.footer__partner_m}>
              <Link
                href="https://www.kvalitetsregistre.no/"
                title="Link til Kvalitetsregistre"
              >
                <Image
                  loader={imgLoader}
                  src="/img/logos/NSM_logo_hvit.png"
                  height={40}
                  width={359}
                  alt="NSM logo"
                />
              </Link>
            </div>
            <div className={styles.footer_partner_r}>
              <Link href="/helseatlas/index.html" title="Link til Helseatlas">
                <Image
                  loader={imgLoader}
                  src="/img/logos/Logo_atlas_hvit.png"
                  height={40}
                  width={146}
                  alt="Helseatlas logo"
                />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
