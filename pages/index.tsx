import matter from "gray-matter";
import { GetStaticProps } from "next";
import Link from "next/link";
import { join } from "path";
import styles from "../styles/Home.module.css";
import { dateToString } from "../helpers/dateHelpers";

import fs from "fs";
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

export default function Home({ latestNews }: Props) {
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

      <div className={`${styles.full_bleed} ${styles.news_section__container}`}>
        <div className={styles.news_section}>
          <div className={styles.news_section_title}>
            <h2>Aktuelt</h2>
          </div>
          <div className={styles.news_section_title__link}>
            <Link href="/aktuelt">
              <a>Se flere nyheter fra skde</a>
            </Link>
          </div>
          <div className={styles.news_section_article}>
            <h3>{latestNews.title}</h3>
            <small>{latestNews.date}</small>
            <p>{latestNews.ingress}</p>
          </div>
          <div className={styles.news_section_article__image}>
            <img
              src={`/${latestNews.thumbnail}`}
              width="100%"
              alt={latestNews.title}
            />
          </div>
          <div className={styles.news_section_article__button}>
            <Link href={`/aktuelt/${latestNews.slug}`}>
              <a>Les mer</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const NEWS_DIR = join(process.cwd(), "_posts/aktuelt");
  const newsArticles = fs.readdirSync(NEWS_DIR).map((slug) => {
    const fullPath = join(NEWS_DIR, slug);
    const file = fs.readFileSync(fullPath);
    const { content, data } = matter(file);
    return { content, data, slug: slug.replace(/.md?$/, "") };
  });

  const latestNewsArticle = newsArticles.sort(
    (a, b) => b.data.date - a.data.date
  )[0];

  return {
    props: {
      latestNews: {
        ...latestNewsArticle.data,
        date: dateToString(latestNewsArticle.data.date, false),
        slug: latestNewsArticle.slug,
      },
    },
  };
};
