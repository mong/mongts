import { AtlasLayout } from "../../Layout";
import { TopBanner } from "../TopBanner";
import styles from "./atlas.module.css";
import { ChapterProps, Chapters } from "../../Chapters";
import { AtlasData } from "../../../types";
import { TableOfContents } from "../../TableOfContents";
import { DataContext } from "../../Context";
import { Ingress } from "../../Ingress";

export interface AtlasPageProps {
  content: string;
  atlasData: AtlasData[];
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
  publisert: boolean;
};

const AtlasPage: React.FC<AtlasPageProps> = ({ content, atlasData }) => {
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

  const unpublished_warning =
    obj.lang === "nn"
      ? "Dette atlaset er berre eit utkast og er ikkje publisert! Resultata og analysane kan vere mangelfulle."
      : obj.lang === "nb"
      ? "Dette atlaset er kun et utkast og er ikke publisert! Resultatene og analysene kan være mangelfulle."
      : "This is a draft!";
  return (
    <DataContext.Provider value={{ atlasData }}>
      <AtlasLayout lang={obj.lang === "en" ? "en" : "no"}>
        <main data-testid="v2atlas">
          <TopBanner mainTitle={obj.shortTitle} lang={obj.lang} ia={obj.ia} />
          <div className={`${styles.atlasContent}`}>
            <TableOfContents tocData={tocData} />
            <div className={styles.main_content}>
              {!obj.publisert && (
                <b style={{ color: "red" }}>{unpublished_warning}</b>
              )}
              <h1>{obj.mainTitle}</h1>
              <Ingress>{obj.ingress}</Ingress>
              <Chapters innhold={obj.kapittel} lang={obj.lang} />
            </div>
          </div>
        </main>
      </AtlasLayout>
    </DataContext.Provider>
  );
};

export default AtlasPage;
