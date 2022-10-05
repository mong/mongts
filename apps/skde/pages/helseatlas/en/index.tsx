import path from "path";
import { GetStaticProps } from "next";
import fs from "fs";

import Layout from "../../../src/components/Layout";
import { MainBanner } from "../../../src/components/MainBanner/MainBanner";
import { AtlasLink } from "../../../src/components/Btns/AtlasLink";
import { getMDInfo } from "../../../src/helpers/functions/markdownHelpers";
import classNames from "../../../src/styles/Atlas.module.css";

interface HomeProps {
  atlasInfo: {
    article: string;
    frontMatter: {
      shortTitle: string;
      image: string;
      frontpagetext: string;
      date: Date;
    };
  }[];
}

const Home: React.FC<HomeProps> = ({ atlasInfo }) => {
  const Links = atlasInfo.map((atlas, i) => (
    <AtlasLink
      key={atlas.article}
      linkTo={`helseatlas/en/${atlas.article}`}
      imageSource={atlas.frontMatter.image}
      linkTitle={atlas.frontMatter.shortTitle}
      linkText={atlas.frontMatter.frontpagetext}
      wide={i === 0}
      date={atlas.frontMatter.date}
      newlyUpdated={i === 0}
      lang={"en"}
    />
  ));

  return (
    <Layout lang="en">
      <main>
        <MainBanner lang="en" />
        <div className={classNames.atlasLinksWrapper}>{Links}</div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const atlasDir = path.join(
    process.cwd(),
    "_posts/helseatlas/en/tidligere_atlas"
  );
  const atlasInfo = getMDInfo(atlasDir);
  const atlasDirNew = path.join(process.cwd(), "_posts/helseatlas/en/v2");
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
