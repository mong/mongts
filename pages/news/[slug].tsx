import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { MdxRemote } from "next-mdx-remote/types";
import Image from "next/image";

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
    <div style={{ padding: "64px" }}>
      <h2>News</h2>
      <p style={{ padding: "32px 0", fontWeight: "bold" }}>
        {frontMatter.ingress}
      </p>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "50%" }}>
          <p>{content}</p>
        </div>
        <Image src="/img/helseatlasbilde.jpg" height="300" width="500" />
      </div>
    </div>
  );
};

export default News;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fullPath = join(NEWS_DIR, `${params.slug}.md`);
  const file = fs.readFileSync(fullPath);

  const { content, data } = matter(file);
  const source = await renderToString(content);
  return {
    props: { source, frontMatter: { ...data, date: data.date.toString() } },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs.readdirSync(NEWS_DIR).map((file) => ({
    params: { slug: file.replace(/.md?$/, "") },
  }));

  return { paths, fallback: false };
};
