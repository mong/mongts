import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.grid_container}>
      <div className={styles.header}>
        <div className={styles.header__logo}>
          <Link href="/" rel="home">
            <a rel="home">
              <Image
                src="/img/logos/SKDE_sort.png"
                alt="Hjem"
                width={96}
                height={39}
              />
            </a>
          </Link>
        </div>
        <div className={styles.header__links}>
          <Link href="#">
            <a>Kontakt</a>
          </Link>
          <div className={styles.fsz_helper} style={{ display: "inline" }}>
            Tekststørrelse A+
            <div className={styles.fsz_helper__container}>
              ENDRE SKRIFTSTØRRELSE
              <br />
              Hold Ctrl-tasten nede.
              <br />
              Trykk på + for å forstørre eller - for å forminske, eventuelt
              scroll med hjulet på musen.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.banner_section}>
        <div className={styles.banner_section_article}>
          <h2>Kvalitet og forbruk i helsetjenesten</h2>
          <p>
            Senter for klinisk dokumentasjon og evaluering (SKDE) jobber med å
            kartlegge og synliggjøre geografiske ulikheter i
            spesialisthelsetjenester. Målet er å bidra til likeverdige
            helsetjenester av god kvalitet uansett hvor pasientene bor.
          </p>
          <Link href="#">
            <a>Les mer om SKDE</a>
          </Link>
        </div>
      </div>

      <div className={styles.buttons}>
        <h2>Resultater</h2>
        <div className={styles.block_buttons}>
          <div className={styles.block_button}>
            <Link href="https://www.kvalitetsregistre.no/">
              <a>Kvalitetsregistre</a>
            </Link>
          </div>

          <div className={styles.block_button}>
            <Link href="https://helseatlas.no/">
              <a>Helseatlas</a>
            </Link>
          </div>

          <div className={styles.block_button}>
            <Link href="https://helse-nord.no/skde/pasientstrommer">
              <a>Pasientstrømmer</a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.video_section}>
        <div className={styles.video_section__article}>
          <h3>Tittel her om demovideo</h3>
          <p>
            Her kommer det en tekst som forteller om interaktive løsninger og om
            demo-videoen på andre siden. Her kommer det en tekst som forteller
            om interaktive løsninger og om demo-videoen på andre siden.
          </p>
        </div>
        <div className={styles.video_section__background}></div>
      </div>

      <div className={styles.news_section}>
        <div className={styles.news_section_title}>
          <h2>Aktuelt</h2>
        </div>
        <div className={styles.news_section_title__link}>
          <Link href="#">
            <a>Se flere nyheter fra skde</a>
          </Link>
        </div>

        {/* latest article  */}
        <div className={styles.news_section_article}>
          <h3>Nytt helseatlas</h3>
          <p>
            Nytt helseatlas lanseres tirsdag 11.juni SKDE arrangerer webinar fra
            10-13 i forbindelse med lanseringen.
          </p>
          <Link href="#">
            <a>Les mer</a>
          </Link>
        </div>
        <div className={styles.news_article__image}>
          <Image src="/img/helseatlasbilde.jpg" height="300" width="500" />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footer__logo}>
          <Image src="/img/logos/SKDE_hvit_lys.png" height="40" width="99" />
        </div>
        <div className={styles.footer__contact}>
          <p>
            <strong>Telefon: </strong>
            <a href="tel:77 75 58 00">77 75 58 00</a>
            <br />
            <strong>E-post:</strong>{" "}
            <Link href="mailto:servicemiljoet@skde.no">
              <a>servicemiljoet@skde.no</a>
            </Link>
          </p>
        </div>
        <div className={styles.footer__social}>
          <a href="https://www.facebook.com/medisinskekvalitetsregistre">
            Følg oss på Facebook
          </a>
          <Link href="https://helse-nord.no/skde/kontakt-skde">
            <a>Kontakt</a>
          </Link>
          <Link href="https://helse-nord.no/om-nettstedet/personvern">
            <a>Personvern</a>
          </Link>
        </div>

        <div className={styles.footer__partner_l}>
          <Image
            src="/img/logos/hf_nord-white.svg"
            height="40px"
            width="180px"
          />
        </div>
        <div className={styles.footer__partner_m}>
          <Image
            src="/img/logos/NSM_logo_hvit.png"
            height="40px"
            width="359px"
          />
        </div>
        <div className={styles.footer_partner_r}>
          <Image
            src="/img/logos/Logo_atlas_hvit.png"
            height="40px"
            width="146px"
          />
        </div>
      </div>
    </div>
  );
}
