import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.grid_container}>
      <div className={styles.header}>
        <div className={styles.header__logo}>
          <a href="index.html" rel="home">
            <Image
              src="/img/logos/SKDE_sort.png"
              alt="Hjem"
              width={96}
              height={39}
            />
          </a>
        </div>
        <div className={styles.header__links}>
          <a href="#">Kontakt</a>
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

      <div className={styles.banner}>
        <div className={styles.banner__article}>article</div>
      </div>

      <div className={styles.buttons}>Buttons</div>

      <div className={styles.video}>
        <div className={styles.video__article}>videoArticle</div>
        <div className={styles.video__bg}></div>
      </div>

      <div className={styles.news}>
        <div className={styles.article}>article</div>
        <div className={styles.articleImage}>
          <Image src="/img/helseatlasbilde.jpg" height="175px" width="auto" />
        </div>
        <div className={styles.news__title}>Aktuelt</div>
        <div className={styles.news__title_link}>SE FLERE NYHETER FRA SKDE</div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footer__logo}>
          <Image src="/img/logos/SKDE_hvit_lys.png" height="40" width="99" />
        </div>
        <div className={styles.footer__contact}>contact</div>
        <div className={styles.footer__social}>social</div>

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
