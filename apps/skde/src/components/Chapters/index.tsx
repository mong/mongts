import React, { Fragment } from "react";
import { TextBox } from "../TextBox";
import { FactBox } from "../Factbox";
import { ResultBox } from "../ResultBox";
import { ChaptersProps, ChapterProps } from "../../types";

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
    </div>
  );
};
