import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";

import { AtlasContent } from "../../../../../src/components/Atlas/classic";

interface AtlasPageProps {
  content: string;
  frontMatter: {
    num: string;
    mainTitle: string;
    shortTitle: string;
    pdfUrl: string;
    ia: boolean;
    lang: "nb" | "en" | "nn";
    toc: boolean;
  };
}

const atlasDir = path.join(process.cwd(), "_posts/helseatlas/en/tidligere_atlas");

const AtlasPage: React.FC<AtlasPageProps> = ({ content, frontMatter }) => {
  return (
    <>
      <AtlasContent content={content} frontMatter={frontMatter} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const file = fs.readFileSync(
    path.join(atlasDir, `${context.params.atlas}.md`)
  );
  const { content, data } = matter(file, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });
  return {
    props: { content, frontMatter: { ...data } },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs
    .readdirSync(atlasDir)
    .map((Info) => ({ params: { atlas: Info.replace(/.md?$/, "") } }));
  return {
    paths,
    fallback: false,
  };
};

export default AtlasPage;
