import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Link from "next/link";
import { join } from "path";
import Layout from "../../src/components/layout";
import { dateToString } from "../../src/helpers/dateHelpers";
import styles from "../../src/styles/Home.module.css";
const NEWS_DIR = join(process.cwd(), "_posts/aktuelt");

interface Article {
  title: string;
  ingress?: string;
  date: string;
  thumbnail: string;
}
interface Props {
  articles: { frontMatter: Article; slug: string }[];
}

const News = ({ articles }: Props) => {
  if (articles.length < 1)
    return (
      <Layout page="Flere aktuelle artikler">
        <div className={`${styles.full_bleed}`}>
          {articles.length < 1 && (
            <div className={styles.article_container}>
              <h3>For tiden ingen aktuelle saker</h3>
            </div>
          )}
        </div>
      </Layout>
    );
  return (
    <Layout page="Flere aktuelle artikler">
      <div>
        <div className={`${styles.full_bleed} ${styles.article_container}`}>
          {articles.length < 1 && (
            <div className={styles.article_container}>
              <h3>For tiden ingen aktuelle saker</h3>
            </div>
          )}
          {articles.map((article) => (
            <div className={styles.article_container} key={article.slug}>
              <div className={styles.news_section_article}>
                <h3>{article.frontMatter.title}</h3>
                <small>{article.frontMatter.date}</small>
                <p>{article.frontMatter.ingress}</p>
              </div>
              <div className={styles.news_section_article__image}>
                <img
                  src={`/${article.frontMatter.thumbnail}`}
                  width="100%"
                  alt={article.frontMatter.title}
                />
              </div>
              <div className={styles.news_section_article__button}>
                <Link href={`/aktuelt/${article.slug}`}>
                  <a>Les mer</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default News;

export const getStaticProps: GetStaticProps = async ({}) => {
  const files = fs.readdirSync(NEWS_DIR, "utf-8");
  const articles = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = join(NEWS_DIR, fn);
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const { data } = matter(rawContent);
      const slug = fn.replace(/\.md$/, "");
      return {
        slug: slug,
        frontMatter: data,
      };
    })
    .sort((a, b) => b.frontMatter.date - a.frontMatter.date)
    .map((article) => {
      return {
        ...article,
        frontMatter: {
          ...article.frontMatter,
          date: dateToString(article.frontMatter.date, false),
        },
      };
    });

  return {
    props: { articles },
  };
};
