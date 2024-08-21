import React from "react";
import { TextBox } from "../TextBox";
import { FactBox } from "../Factbox";
import { ResultBox } from "../ResultBox";

type Tekst = {
  type: "tekst";
  tekst: string;
  lang: "nb" | "en" | "nn";
};

type Faktaboks = {
  type: "faktaboks";
  overskrift: string;
  tekst: string;
  lang: "nb" | "en" | "nn";
};

type Resultatboks = {
  type: "resultatboks";
  overskrift: string;
  data: string;
  ingress: string;
  utvalg: string;
  resultat: string;
  lang: "nb" | "en" | "nn";
  publisert: Date;
  oppdatert: Date;
  kart?: string;
};

export type ChapterProps = {
  overskrift?: string;
  innhold: (Tekst | Faktaboks | Resultatboks)[];
  lang: "nb" | "en" | "nn";
};

type ChaptersProps = {
  innhold: ChapterProps[];
  lang: "nb" | "en" | "nn";
};

export const Chapters = ({ innhold, lang }: ChaptersProps) => {
  return innhold.map((chapter, i) => (
    <Chapter {...chapter} key={`${i}_${chapter.overskrift}`} lang={lang} />
  ));
};

const Chapter = ({ innhold, overskrift, lang }: ChapterProps) => {
  const mainID = overskrift?.toLowerCase().replace(/\s/g, "-") || "qwerty";
  return (
    <div id={mainID} style={{ paddingTop: "10px" }}>
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
                  carousel={box.data}
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
