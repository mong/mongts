import { join } from "path";
import { GetStaticProps } from "next";
import fs from "fs";
import matter from "gray-matter";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import newsStyles from "../../styles/News.module.css";
import Layout from "../../components/layout";


const INNHOLD_DIR = join(process.cwd(), "_posts/innhold");

interface Props {
    source: MdxRemote.Source;
    frontMatter: any;
  }

const News = ({ source, frontMatter }: Props) => {
    const content = hydrate(source, { components: { Box } });
    return (
      <Layout page={`Aktuelt / ${frontMatter.title}`}>
        <div className={newsStyles.container}>
          <div className={newsStyles.article__title}>
            <div>
              <h2>{frontMatter.title}</h2>
              <small>{frontMatter.date}</small>
            </div>
          </div>
          <div className={newsStyles.article}>
            <div className={newsStyles.article__ingress}>
              {frontMatter.ingress}
            </div>
            <div className={newsStyles.article__image}>
              <img src={`/${frontMatter.thumbnail}`} width="100%" />
            </div>
            <div className={newsStyles.article__content}>{content}</div>
          </div>
        </div>
      </Layout>
    );
  };
  


export const getStaticProps: GetStaticProps = async ({}) => {
    const files = fs.readdirSync(INNHOLD_DIR, "utf-8");
    const articles = files
      .filter((fn) => fn.endsWith(".md"))
      .map((fn) => {
        const path = join(INNHOLD_DIR, fn);
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
      .map((article) => {
        return {
          ...article,
          frontMatter: {
            ...article.frontMatter,
          },
        };
      });
  
    return {
      props: { articles },
    };
  };
