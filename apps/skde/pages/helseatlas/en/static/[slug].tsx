import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect, useState } from "react";
import fs from "fs";
import { join } from "path";

import Page, { PageContentProps } from "../../../../src/components/Static";

const CONTENT_DIR = join(process.cwd(), "_posts/helseatlas/en/static");

const Content = ({ slug, strapiHost }: PageContentProps) => {
  const [content, setContent] = useState<PageContentProps>({
    content: "",
    frontMatter: { title: "", lang: "en" },
    slug: slug,
    strapiHost: strapiHost,
  });

  if (content.slug !== slug) {
    setContent({ ...content, slug: slug });
  }

  useEffect(() => {
    const fetchPageContent = async () => {
      const locale = content.frontMatter.lang === "en" ? "en" : "nb";
      const response = await fetch(
        `${content.strapiHost}/api/static-pages?filters[name][$eq]=${content.slug}&locale=${locale}`,
      );

      // TODO: Add error handling if fetch fails

      const json = await response.json();

      let body = "";
      let frontMatter = {
        fileName: "",
        title: "",
        lang: "en",
      } as PageContentProps["frontMatter"];

      if (json.data.length === 1) {
        const pageAttr = json.data[0].attributes;
        body = pageAttr.body;
        let { name, title, lang } = pageAttr;
        frontMatter = {
          filename: name,
          title,
          lang,
        } as PageContentProps["frontMatter"];
      }

      setContent({
        content: body,
        frontMatter,
        slug: content.slug,
        strapiHost: content.strapiHost,
      });
    };

    fetchPageContent();
  }, [content.slug, content.strapiHost, content.frontMatter.lang]);

  return <Page content={content.content} frontMatter={content.frontMatter} />;
};

export default Content;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      slug: params.slug,
      strapiHost: process.env.STRAPI_PUBLIC_API_HOST ?? "http://localhost:1337",
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs.readdirSync(CONTENT_DIR).map((file) => ({
    params: { slug: file.replace(/.md?$/, "") },
  }));

  return { paths, fallback: false };
};
