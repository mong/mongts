import React, { Fragment } from "react";
import { TextBox } from "../TextBox";
import { FactBox } from "../Factbox";
import { ResultBox } from "../ResultBox";
import { AtlasData } from "../../types";

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

const json2atlas = {
  tekst: TextBox,
  faktaboks: FactBox,
  resultatboks: ResultBox,
};

export const Chapters = ({ innhold, lang }: ChaptersProps) => {
  return (
    <>
      {innhold.map((chapter, i) => (
        <Chapter {...chapter} key={`${i}_${chapter.overskrift}`} lang={lang} />
      ))}
    </>
  );
};

const Chapter = ({ innhold, overskrift, lang }: ChapterProps) => {
  const mainID = overskrift
    ? overskrift.toLowerCase().replace(/\s/g, "-")
    : "qwerty";
  return (
    <div id={mainID} style={{ paddingTop: "10px" }}>
      {overskrift ? <h2>{overskrift}</h2> : undefined}
      {innhold ? (
        <div>
          {innhold.map((box, index) => {
            const props =
              box.type === "faktaboks"
                ? {
                    boxContent: box.tekst,
                    boxTitle: box.overskrift,
                    id:
                      mainID +
                      "-fact-" +
                      box.overskrift.toLowerCase().replace(/\s/g, "-"),
                    lang: lang,
                  }
                : box.type === "resultatboks"
                ? {
                    result: box.resultat,
                    title: box.overskrift,
                    intro: box.ingress,
                    selection: box.utvalg,
                    id:
                      mainID +
                      "_" +
                      box.overskrift.toLowerCase().replace(/\s/g, "-"),
                    lang: lang,
                    carousel: box.data,
                    published: box.publisert,
                    updated: box.oppdatert,
                    map: box.kart,
                  }
                : { children: box.tekst, lang: lang };

            const Component: React.FC<typeof props> = json2atlas[box.type];
            /* Husk: endre key til noe mer unikt to linjer under */
            return (
              <Fragment key={index}>
                <Component {...props} />
              </Fragment>
            );
          })}
        </div>
      ) : undefined}
    </div>
  );
};
