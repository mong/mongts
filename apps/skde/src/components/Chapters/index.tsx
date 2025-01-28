import React from "react";
import { TextBox } from "../TextBox";
import { FactBox } from "../Factbox";
import { ResultBox } from "../ResultBox";
import classNames from "./Chapters.module.css";
import { Box } from "@mui/material";
import { AtlasData, ChapterType } from "../../types";

type ChaptersProps = {
  innhold: ChapterType[];
  lang: "nb" | "en" | "nn";
  atlasData: AtlasData;
};

export const Chapters = ({ innhold, lang, atlasData }: ChaptersProps) => {
  return innhold.map((chapter, i) => (
    <Box key={i} sx={{ fontSize: ".95rem" }}>
      <Chapter
        atlasData={atlasData}
        {...chapter}
        key={`${i}_${chapter.overskrift}`}
        lang={lang}
      />
    </Box>
  ));
};

type ChapterProps = ChapterType & {
  lang: "nb" | "en" | "nn";
  atlasData: AtlasData;
};
const Chapter = ({ innhold, overskrift, lang, atlasData }: ChapterProps) => {
  const mainID = overskrift?.toLowerCase().replace(/\s/g, "-") || "qwerty";
  return (
    <div
      id={mainID}
      style={{ paddingTop: "0.5rem" }}
      className={classNames.chapters}
    >
      {overskrift && <h2>{overskrift}</h2>}
      {innhold &&
        innhold.map((box, index) => {
          switch (box.type) {
            case "faktaboks":
              return (
                <FactBox
                  boxContent={box.tekst}
                  boxTitle={box.overskrift}
                  id={
                    mainID +
                    "-fact-" +
                    box.overskrift.toLowerCase().replace(/\s/g, "-")
                  }
                  lang={lang}
                  key={index}
                />
              );
            case "resultatboks":
              return (
                <ResultBox
                  atlasData={atlasData}
                  result={box.resultat}
                  title={box.overskrift}
                  intro={box.ingress}
                  selection={box.utvalg}
                  id={
                    mainID +
                    "_" +
                    box.overskrift.toLowerCase().replace(/\s/g, "-")
                  }
                  lang={lang}
                  data_filename={box.data}
                  published={box.publisert}
                  updated={box.oppdatert}
                  map={box.kart}
                  key={index}
                />
              );
            default:
              return <TextBox children={box.tekst} lang={lang} key={index} />;
          }
        })}
    </div>
  );
};
