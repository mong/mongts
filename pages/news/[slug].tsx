import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { MdxRemote } from "next-mdx-remote/types";
import styles from "../../styles/Home.module.css";
import newsStyles from "../../styles/News.module.css";
import Layout from "../../components/layout";
import { dateToString } from "../../helpers/dateHelpers";
const NEWS_DIR = join(process.cwd(), "_posts/news");

interface Props {
  source: MdxRemote.Source;
  frontMatter: any;
}

const Box = () => {
  return (
    <div style={{ backgroundColor: "blue", height: 500, width: 500 }}></div>
  );
};

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

export default News;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fullPath = join(NEWS_DIR, `${params.slug}.md`);
  const file = fs.readFileSync(fullPath);

  const { content, data } = matter(file);
  const source = await renderToString(content);
  return {
    props: { source, frontMatter: { ...data, date: dateToString(data.date) } },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs.readdirSync(NEWS_DIR).map((file) => ({
    params: { slug: file.replace(/.md?$/, "") },
  }));

  return { paths, fallback: false };
};
