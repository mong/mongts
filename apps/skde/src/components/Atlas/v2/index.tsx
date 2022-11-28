import Layout from "../../Layout";
import { TopBanner } from "../../topBanner";
import styles from "../../../styles/Atlas.module.css";
import { ChapterProps, Chapters } from "../../Chapters";
import { AtlasData } from "../../../types";
import { TableOfContents } from "../../toc";
import { OrderedList } from "../../toc/orderedlist";
import { ListItem } from "../../toc/listitem";
import { DataContext } from "../../Context";

export interface AtlasPageProps {
  content: string;
  atlasData: AtlasData[];
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

export default AtlasPage;
