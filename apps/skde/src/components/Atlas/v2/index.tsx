import { AtlasLayout } from "../../Layout";
import { TopBanner } from "../TopBanner";
import styles from "./atlas.module.css";
import { ChapterProps, Chapters } from "../../Chapters";
import { AtlasData } from "../../../types";
import { TableOfContents } from "../../TableOfContents";
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
  ia?: boolean;
};

const AtlasPage: React.FC<AtlasPageProps> = ({
  content,
  atlasData,
  mapData,
}) => {
  const obj: AtlasJson = JSON.parse(content);

  const tocData = obj.kapittel
    .filter((chapter) => chapter.overskrift)
    .map((chapter) => {
      const level = 1;
      const elemID = chapter.overskrift;
      const children = chapter.innhold
        ? chapter.innhold
            .filter((subChapter) => subChapter.type === "resultatboks")
            .map((subChapter) => ({
              level: 2,
              elemID: subChapter["overskrift"],
              children: [],
            }))
        : [];
      return { level, elemID, children };
    });

  return (
    <DataContext.Provider value={{ atlasData, mapData }}>
      <AtlasLayout lang={obj.lang === "en" ? "en" : "no"}>
        <main data-testid="v2atlas">
          <TopBanner mainTitle={obj.shortTitle} lang={obj.lang} ia={obj.ia} />
          <div className={`${styles.atlasContent}`}>
            <TableOfContents tocData={tocData} />
            <div className={styles.main_content}>
              <h1>{obj.mainTitle}</h1>
              <div className="ingress">{obj.ingress}</div>
              <Chapters innhold={obj.kapittel} lang={obj.lang} />
            </div>
          </div>
        </main>
      </AtlasLayout>
    </DataContext.Provider>
  );
};

export default AtlasPage;
