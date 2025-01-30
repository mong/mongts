import { AtlasLayout } from "../AtlasLayout";
import { TopBanner } from "../TopBanner";
import styles from "./atlas.module.css";
import { Chapters } from "../../Chapters";
import { Atlas, AtlasData } from "../../../types";
import { TableOfContents } from "../../TableOfContents";
import { Ingress } from "../../Ingress";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { skdeTheme } from "qmongjs";

export interface AtlasPageProps {
  atlas: Atlas;
  atlasData: AtlasData;
}

const AtlasPage = ({ atlas, atlasData }: AtlasPageProps) => {
  const tocData = atlas.kapittel
    ? atlas.kapittel
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
        })
    : [];

  const unpublished_warning =
    atlas.lang === "nn"
      ? "Dette atlaset er berre eit utkast og er ikkje publisert! Resultata og analysane kan vere mangelfulle."
      : atlas.lang === "nb"
        ? "Dette atlaset er kun et utkast og er ikke publisert! Resultatene og analysene kan være mangelfulle."
        : "This is a draft!";
  return (
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <AtlasLayout lang={atlas.lang === "en" ? "en" : "no"}>
        <main data-testid="v2atlas">
          <TopBanner
            mainTitle={atlas.shortTitle ?? "Tittel mangler"}
            lang={atlas.lang ?? "nb"}
          />
          <div className={`${styles.atlasContent}`}>
            <TableOfContents tocData={tocData} />
            <div className={styles.main_content}>
              {!atlas.publisert && (
                <b style={{ color: "red" }}>{unpublished_warning}</b>
              )}
              <h1>{atlas.mainTitle}</h1>
              <Ingress>{atlas.ingress ?? "Ingress mangler"}</Ingress>
              {atlas.kapittel ? (
                <Chapters atlas={atlas} atlasData={atlasData} />
              ) : (
                <div> Innhold mangler </div>
              )}
            </div>
          </div>
        </main>
      </AtlasLayout>
    </ThemeProvider>
  );
};

export default AtlasPage;
