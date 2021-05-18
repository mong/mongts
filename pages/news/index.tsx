import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { MdxRemote } from "next-mdx-remote/types";
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
  console.log("props", articles);
  return (
    <Layout page="Flere aktuelle artikler">
      <div className={`${styles.full_bleed}`}>
        {articles.map((article) => (
          <div className={styles.article_container}>
            <div className={styles.news_section_article}>
              <h3>{article.frontMatter.title}</h3>
              <p>{article.frontMatter.ingress}</p>

              <Link href={`/news/${article.slug}`}>
                <a>Les mer</a>
              </Link>
            </div>
            <div className={styles.news_section_article__image}>
              <Image
                src={`/${article.frontMatter.thumbnail}`}
                height="300px"
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
  const articleSlugs = fs.readdirSync(NEWS_DIR).map((file) => ({
    path: { slug: file.replace(/.md?$/, "") },
  }));
  const fullPaths = articleSlugs.map((article) =>
    join(NEWS_DIR, `${article.path.slug}.md`)
  );
  const articles = fullPaths
    .map((fp) => {
      const f = fs.readFileSync(fp);
      return matter(f);
    })
    .sort((a, b) => b.data.date - a.data.date)
    .map((x) => {
      const data = x.data;

      return {
        frontMatter: { ...data, date: data.date.toString() },
        slug: data.title.toString().toLowerCase().replace(/ /gi, "-"), //<<--replace with filename from above...
      };
    });

  return {
    props: { articles },
  };
};
