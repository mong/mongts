import matter from "gray-matter";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { join } from "path";
import styles from "../../styles/Home.module.css";
import fs from "fs";
import Layout from "../../components/layout";

export default function News() {
  return (
    <Layout page="Flere nyheter">
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
          <h3>tittel</h3>
          <p>ingress</p>

          <Link href={`/news/`}>
            <a>Les mer</a>
          </Link>
        </div>
        <div className={styles.news_article__image}>
          {/* <Image
            src={`/${latestNews.thumbnail}`}
            height="300"
            width="500"
            alt={latestNews.title}
          /> */}
        </div>
      </div>
    </Layout>
  );
}
