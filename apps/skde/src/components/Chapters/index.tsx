import React from "react";
import { TextBox } from "../TextBox";
import { FactBox } from "../Factbox";
import { ResultBox } from "../ResultBox";
import { Box } from "@mui/material";
import { Atlas, AtlasData, ChapterType } from "../../types";

type ChaptersProps = {
  atlas: Atlas;
  atlasData: AtlasData;
};

export const Chapters = ({ atlas, atlasData }: ChaptersProps) => {
  return atlas.kapittel.map((chapter, i) => (
    <Box key={i}>
      <Chapter
        atlas={atlas}
        atlasData={atlasData}
        {...chapter}
        key={`${i}_${chapter.overskrift}`}
      />
    </Box>
  ));
};

type ChapterProps = ChapterType & {
  atlas: Atlas;
  atlasData: AtlasData;
};
const Chapter = ({ atlas, atlasData, innhold, overskrift }: ChapterProps) => {
  const mainID = overskrift?.toLowerCase().replace(/\s/g, "-") || "qwerty";
  return (
    <Box
      id={mainID}
      sx={{
        paddingTop: "0.5rem",
        "@media print": { padding: "0.625rem 1.25rem" },
      }}
    >
      {overskrift && <h2>{overskrift}</h2>}
      {innhold &&
        innhold.map((box, index) => {
          switch (box.type) {
            case "faktaboks":
              return (
                <FactBox
                  atlas={atlas}
                  boxContent={box.tekst}
                  boxTitle={box.overskrift}
                  id={
                    mainID +
                    "-fact-" +
                    box.overskrift.toLowerCase().replace(/\s/g, "-")
                  }
                  key={index}
                />
              );
            case "resultatboks":
              return (
                <ResultBox
                  atlas={atlas}
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
                  data_filename={box.data}
                  published={box.publisert}
                  updated={box.oppdatert}
                  map={box.kart}
                  key={index}
                />
              );
            default:
              return <TextBox atlas={atlas} children={box.tekst} key={index} />;
          }
        })}
    </Box>
  );
};
