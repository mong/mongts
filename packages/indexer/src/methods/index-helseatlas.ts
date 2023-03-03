import algoliasearch from "algoliasearch";
import * as env from "env-var";
import { readdir, readFile } from "fs/promises";
import { tryParseJSON } from "../utils";
const HELSEATLAS_DIR = "../../apps/skde/_posts/helseatlas/atlas";

const ALGOLIA_APP_ID = env.get("ALGOLIA_APP_ID").required(true).asString();
const ALGOLIA_WRITE_KEY = env
  .get("ALGOLIA_WRITE_KEY")
  .required(true)
  .asString();

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
  const atlasFiles = await readdir(HELSEATLAS_DIR); // ["ortopedi.json"]; //
  const records = (
    await Promise.all(
      atlasFiles.map(async (fileName) => {
        const file = await readFile(`${HELSEATLAS_DIR}/${fileName}`);
        try {
          const res = tryParseJSON(file.toString());
          if (res.error) {
            return [];
          }
          const data: AtlasJson = res.parsed;
          if (!data.publisert) {
            return [];
          }
          const title = data.mainTitle;
          const permalink = `https://www.skde.no/helseatlas/v2/${data.filename}`;
          const chapters = data.kapittel
            .map((chapter) =>
              chapter.innhold.map((paragraph) => ({
                title,
                chapterTitle: chapter.overskrift,
                permalink,
                // Group records on a per paragraph basis
                distinctKey: `${chapter.overskrift}_${title}`,
                content: parseContent(paragraph),
              }))
            )
            .flat();
          if (data.ingress) {
            chapters.unshift({
              title,
              permalink,
              chapterTitle: "Ingress",
              distinctKey: `Ingress_${title}`,
              content: {
                content: data.ingress,
              },
            });
          }
          console.log(`Records created for ${fileName}`);
          return chapters;
        } catch (e) {
          console.error(`Failed to index ${fileName}`, e);
          return [];
        }
      })
    )
  ).flat();
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_KEY);
  const index = client.initIndex("prod_HELSEATLAS");
  try {
    await index.setSettings({
      attributeForDistinct: "distinctKey",
      distinct: true,
    });
  } catch (e) {
    console.error("Failed to set index settings", e);
  }
  try {
    await index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
    console.log("Pushed records to algolia");
  } catch (e) {
    console.error("Failed to push records to algolia", e);
  }
  console.log(atlasFiles);
};

export default indexHelseatlas;
