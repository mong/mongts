import algoliasearch from "algoliasearch";
import * as env from "env";
import { readdir, readFile } from "fs/promises";
import { tryParseJSON } from "../utils";
const HELSEATLAS_DIR = "../../apps/skde/_posts/helseatlas/atlas";

// These types are copied from the helseatlast code. They should be put in some common .ts file which this code is
// allowed to import from

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
};

type ChapterProps = {
  overskrift?: string;
  innhold: (Tekst | Faktaboks | Resultatboks)[];
  lang: "nb" | "en" | "nn";
};

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

const APP_ID = env;

const parseContent = (content: ChapterProps["innhold"][0]) => {
  switch (content.type) {
    case "faktaboks":
      return { content: content.tekst, subTitle: content.overskrift };
    case "resultatboks":
      if (!content.publisert) {
        return {};
      }
      return {
        ingress: content.ingress,
        subTitle: content.overskrift,
        result: content.resultat,
        utvalg: content.utvalg,
      };
    case "tekst":
      return { content: content.tekst };
    default:
      throw new Error(
        `Unexpected content type encountered ${
          (content as any).type // has to be any to compile so in the future it will complain
        } implement me`
      );
  }
};

const indexHelseatlas = async () => {
  const atlasFiles = await readdir(HELSEATLAS_DIR);
  const atlasRecords = await Promise.all(
    atlasFiles.map(async (fileName) => {
      const file = await readFile(`${HELSEATLAS_DIR}/${fileName}`);
      try {
        const res = tryParseJSON(file.toString());
        if (res.error) {
          return null;
        }
        const data: AtlasJson = res.parsed;
        if (!data.publisert) {
          return null;
        }
        const title = data.mainTitle;
        return data.kapittel
          .map((chapter) =>
            chapter.innhold.map((paragraph) => ({
              title,
              chapterTitle: chapter.overskrift,
              permalink: `https://www.skde.no/helseatlas/v2/${data.filename}`,
              content: parseContent(paragraph),
            }))
          )
          .flat();
      } catch (e) {
        console.error(`Failed to index ${fileName}`, e);
      }
    })
  );
  console.log(atlasRecords[0]);
  const client = algoliasearch("APP_ID", "YourWriteAPIKey");
  const index = client.initIndex("prod_HELSEATLAS");
  console.log(atlasFiles);
};

export default indexHelseatlas;
