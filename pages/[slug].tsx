import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { MdxRemote } from "next-mdx-remote/types";
import newsStyles from "../styles/News.module.css";
import Layout from "../components/layout";
const CONTENT_DIR = join(process.cwd(), "_posts/innhold");

interface Props {
  source: MdxRemote.Source;
  frontMatter: any;
}

const Box = () => {
  return (
    <div style={{ backgroundColor: "blue", height: 500, width: 500 }}></div>
  );
};

const Content = ({ source, frontMatter }: Props) => {
  const content = hydrate(source, { components: { Box } });
  return (
    <Layout page={frontMatter.title}>
      <div className={newsStyles.container}>
        <div className={newsStyles.article__title}>
          <h2>{frontMatter.title}</h2>
        </div>
        <div className={newsStyles.article}>
          <div className={newsStyles.article__ingress}>
            {frontMatter.ingress}
          </div>
          <div className={newsStyles.article__content}>{content}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Content;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fullPath = join(CONTENT_DIR, `${params.slug}.md`);
  const file = fs.readFileSync(fullPath);

  const { content, data } = matter(file);
  const source = await renderToString(content);
  return {
    props: {
      source,
      frontMatter: {
        ...data,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs.readdirSync(CONTENT_DIR).map((file) => ({
    params: { slug: file.replace(/.md?$/, "") },
  }));

  return { paths, fallback: false };
};
