import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "../src/styles/Pages.module.css";
import Layout from "../src/components/frontpageLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const CONTENT_DIR = join(process.cwd(), "_posts/innhold");

interface Props {
  frontMatter: any;
  content;
}
const Content = ({ content, frontMatter }: Props) => {
  return (
    <Layout page={frontMatter.title}>
      <div className={styles.container}>
        <div className={styles.article__title}>
          <h2>{frontMatter.title}</h2>
        </div>
        <div className={styles.article}>
          <div className={styles.article__ingress}>{frontMatter.ingress}</div>
          <div className={styles.article__content}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                details: (object) => {
                  return (
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {object.children[0]}
                      </AccordionSummary>
                      <AccordionDetails>
                        {object.children.filter((_, i) => i !== 0)}
                      </AccordionDetails>
                    </Accordion>
                  );
                },
                summary: (object) => <div>{object.children}</div>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
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
