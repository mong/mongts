import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import newsStyles from "../../src/styles/News.module.css";
import Layout from "../../src/components/layout";
import { dateToString } from "../../src/helpers/dateHelpers";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
const NEWS_DIR = join(process.cwd(), "_posts/aktuelt");

interface Props {
  content: string;
  frontMatter: any;
}

const News = ({ content, frontMatter }: Props) => {
  return (
    <Layout page={`Aktuelt / ${frontMatter.title}`}>
      <div className={newsStyles.container}>
        <div className={newsStyles.article__title}>
          <div>
            <h2>{frontMatter.title}</h2>
            <small>{`Publisert ${frontMatter.date}`}</small>
          </div>
        </div>
        <div className={newsStyles.article}>
          <div className={newsStyles.article__ingress}>
            {frontMatter.ingress}
          </div>
          <div className={newsStyles.article__image}>
            <img
              src={`/${frontMatter.thumbnail}`}
              width="100%"
              alt={frontMatter.title}
            />
          </div>
          <div className={newsStyles.article__content}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
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
  return {
    props: {
      content,
      frontMatter: { ...data, date: dateToString(data.date, false) },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs.readdirSync(NEWS_DIR).map((file) => ({
    params: { slug: file.replace(/.md?$/, "") },
  }));

  return { paths, fallback: false };
};
