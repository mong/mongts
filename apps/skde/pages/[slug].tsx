import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

import styles from "../src/styles/Pages.module.css";
import { FrontPageLayout } from "../src/components/Layout";
import { Markdown } from "../src/components/Markdown";
const CONTENT_DIR = join(process.cwd(), "_posts/innhold");

interface Props {
  frontMatter: any;
  content;
}
const Content = ({ content, frontMatter }: Props) => {
  return (
    <FrontPageLayout page={frontMatter.title}>
      <div className={styles.container}>
        <div className={styles.article__title}>
          <h2>{frontMatter.title}</h2>
        </div>
        <div className={styles.article}>
          <div className={styles.article__ingress}>{frontMatter.ingress}</div>
          <div className={styles.article__content}>
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </FrontPageLayout>
  );
};

export default Content;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fullPath = join(CONTENT_DIR, `${params.slug}.md`);
  const file = fs.readFileSync(fullPath);

  const { content, data } = matter(file);

  return {
    props: {
      content,
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
