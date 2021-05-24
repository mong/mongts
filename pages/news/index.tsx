import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { join } from "path";
import Layout from "../../components/layout";
import { dateToString } from "../../helpers/dateHelpers";
import styles from "../../styles/Home.module.css";
const NEWS_DIR = join(process.cwd(), "_posts/news");

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
      <div className={`${styles.full_bleed}`}>
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

              <Link href={`/news/${article.slug}`}>
                <a>Les mer</a>
              </Link>
            </div>
            <div className={styles.news_section_article__image}>
              <Image
                src={`/${article.frontMatter.thumbnail}`}
                width="480px"
                alt={article.frontMatter.title}
              />
            </div>
            <br></br>
          </div>
        ))}
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
          date: dateToString(article.frontMatter.date),
        },
      };
    });

  return {
    props: { articles },
  };
};
