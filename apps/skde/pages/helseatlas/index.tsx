import path from "path";
import { GetStaticProps } from "next";
import fs from "fs";

import FrontPage, { HomeProps } from "../../src/components/Atlas/FrontPage";
import { getMDInfo } from "../../src/helpers/functions/markdownHelpers";

const Home: React.FC<HomeProps> = ({ atlasInfo }) => {
  return <FrontPage atlasInfo={atlasInfo} lang="no" />;
};

export const getStaticProps: GetStaticProps = async () => {
  const atlasDir = path.join(
    process.cwd(),
    "_posts/helseatlas/tidligere_atlas"
  );
  const atlasInfo = getMDInfo(atlasDir);
  const atlasDirNew = path.join(process.cwd(), "_posts/helseatlas/atlas");
  const atlasInfoNew = fs
    .readdirSync(atlasDirNew)
    .filter((fn) => fn.endsWith(".json"))
    .map((fn) => {
      const filePath = path.join(atlasDirNew, fn);
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
      atlasInfo: [...atlasInfoNew, ...atlasInfo],
    },
  };
};

export default Home;
