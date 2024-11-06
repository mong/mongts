import path from "path";
import { GetStaticProps } from "next";
import fs from "fs";

import FrontPage, { HomeProps } from "../../src/components/Atlas/FrontPage";

const Home = ({ atlasInfo }: HomeProps) => {
  const host = typeof window !== "undefined" ? window.location.host : "";
  if (host === "helseatlas.no") {
    window.location.href = "https://www.skde.no/helseatlas/";
    return null;
  }

  return <FrontPage atlasInfo={atlasInfo} lang="no" />;
};

export const getStaticProps: GetStaticProps = async () => {
  const atlasDir = path.join(process.cwd(), "_posts/helseatlas/atlas");
  const atlasInfo = fs
    .readdirSync(atlasDir)
    .filter((fn) => fn.endsWith(".json"))
    .map((fn) => {
      const filePath = path.join(atlasDir, fn);
      const rawContent = fs.readFileSync(filePath, {
        encoding: "utf-8",
      });
      const parsedContent = JSON.parse(rawContent);
      const {
        image,
        frontpagetext,
        filename,
        publisert,
        lang,
        date,
        shortTitle,
      } = parsedContent;
      if (!publisert) {
        return null;
      }

      return {
        article: `v2/${filename}`,
        frontMatter: {
          shortTitle,
          image,
          frontpagetext,
          date,
          lang: lang === "en" ? lang : "no",
        },
      };
    })
    .filter((d) => d !== null);

  return {
    props: {
      atlasInfo: [...atlasInfo],
    },
  };
};

export default Home;
