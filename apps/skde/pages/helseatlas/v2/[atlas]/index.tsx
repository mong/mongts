import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import matter from "gray-matter";
import Layout from "../../../../src/components/Layout";
import { TopBanner } from "../../../../src/components/Atlas/topBanner";
import styles from "../../../../src/styles/Atlas.module.css";
import { Chapters } from "../../../../src/components/Chapters";
import { DataProps, ChapterProps } from "../../../../src/types";
import { TableOfContents } from "../../../../src/components/toc";
import { OrderedList } from "../../../../src/components/toc/orderedlist";
import { ListItem } from "../../../../src/components/toc/listitem";
import { DataContext } from "../../../../src/components/Context";

interface AtlasPageProps {
  content: string;
  body: string;
  atlasData: DataProps[];
  mapData: any;
}

type AtlasJson = {
  lang: "nb" | "en" | "nn";
  date: Date;
  filename: string;
  mainTitle: string;
  shortTitle: string;
  ingress: string;
  kapittel: ChapterProps[];
};

const AtlasPage: React.FC<AtlasPageProps> = ({
  content,
  atlasData,
  mapData,
}) => {
  const obj: AtlasJson = JSON.parse(content);
  const tocContent = obj.kapittel
    .filter((chapter) => chapter.overskrift)
    .map((chapter) => {
      const level1 = chapter.overskrift;
      const level2 = chapter.innhold
        .filter((subChapter) => subChapter.type === "resultatboks")
        .map((subChapter) => subChapter["overskrift"]);
      return { level1, level2 };
    });
  console.log(atlasData);

  return (
    <DataContext.Provider value={{ atlasData, mapData }}>
      <Layout lang={obj.lang === "en" ? "en" : "no"}>
        <main data-testid="v2atlas">
          <TopBanner
            mainTitle={obj.shortTitle}
            pdfUrl=""
            lang={obj.lang}
            ia={false}
          />
          <div className={`${styles.atlasContent}`}>
            <TableOfContents>
              <OrderedList>
                {tocContent.map((cont) => {
                  const level2Header = (
                    <OrderedList>
                      {cont.level2.map((level2) => {
                        const level2ID = (cont.level1 + "_" + level2)
                          .toLowerCase()
                          .replace(/\s/g, "-");
                        return (
                          <ListItem key={level2ID}>
                            <a href={`#${level2ID}`}>{level2}</a>
                          </ListItem>
                        );
                      })}
                    </OrderedList>
                  );
                  const level1ID = cont.level1
                    .toLowerCase()
                    .replace(/\s/g, "-");
                  return (
                    <ListItem key={level1ID}>
                      <a href={`#${level1ID}`}>{cont.level1}</a>
                      {level2Header}
                    </ListItem>
                  );
                })}
              </OrderedList>
            </TableOfContents>
            <div className={styles.main_content}>
              <h1>{obj.mainTitle}</h1>
              <div className="ingress">{obj.ingress}</div>
              <Chapters innhold={obj.kapittel} lang={obj.lang} />
            </div>
          </div>
        </main>
      </Layout>
    </DataContext.Provider>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const fullPath = path.join(
    process.cwd(),
    "_posts/helseatlas/atlas",
    `${context.params.atlas}.json`
  );
  const file = fs.readFileSync(fullPath);
  const { content } = matter(file);
  const dataPath = path.join(
    "public/helseatlas/data",
    `${context.params.atlas}/`
  );

  const fileData = fs.existsSync(dataPath)
    ? await Promise.all(
        await fs
          .readdirSync(dataPath)
          .filter((files) => files.includes(".json"))
          .map(async (files) => {
            const filePath = `${dataPath}/${files}`;
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const data = {};
            data[files] = fileContent;
            return data;
          })
      )
    : [];
  const mapDataPath = "public/helseatlas/data/kronikere.geojson";
  const mapData = JSON.parse(fs.readFileSync(mapDataPath, "utf-8"));
  const atlasData = fileData.reduce((result, data) => {
    const key: string = Object.keys(data)[0];
    result[key] = data[key];
    return result;
  }, {});
  return {
    props: { content, atlasData, mapData },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const atlasDir = path.join(process.cwd(), "_posts/helseatlas/atlas");
  const paths = fs
    .readdirSync(atlasDir)
    .map((Info) => ({ params: { atlas: Info.replace(/.json?$/, "") } }));

  return {
    paths,
    fallback: false,
  };
};

export default AtlasPage;
