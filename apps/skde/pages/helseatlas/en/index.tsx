import path from "path";
import { GetStaticProps } from "next";
import fs from "fs";

import FrontPage, { HomeProps } from "../../../src/components/Atlas/FrontPage";

const Home: React.FC<HomeProps> = ({ atlasInfo }) => {
  return <FrontPage atlasInfo={atlasInfo} lang="en" />;
};

export const getStaticProps: GetStaticProps = async () => {
  const atlasDir = path.join(process.cwd(), "_posts/helseatlas/en/atlas");
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
