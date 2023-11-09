import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect, useState } from "react";
import fs from "fs";
import AtlasPage, {
  AtlasPageProps,
  AtlasJson,
} from "../../../../../src/components/Atlas/v2";

const defaultLang = "en";

const emptyAtlasJson: AtlasJson = {
  lang: defaultLang,
  date: new Date(),
  filename: "",
  shortTitle: "",
  mainTitle: "",
  ingress: "",
  publisert: false,
  kapittel: [],
};

const mapInnholdType = (intype: string): string => {
  intype = intype.toLowerCase();
  if (intype.includes("faktaboks")) return "faktaboks";
  else if (intype.includes("resultatboks")) return "resultatboks";
  else return "tekst";
};

const transformChapterEntry = (chapterInput) => {
  let transformedChapter = chapterInput.attributes;

  if (transformedChapter.innhold) {
    transformedChapter.innhold = transformedChapter.innhold.map(
      (innholdEntry) => {
        return {
          ...innholdEntry,
          type: mapInnholdType(innholdEntry.__component),
        };
      },
    );
  }

  return transformedChapter;
};

const Page: React.FC<AtlasPageProps> = ({ atlas, strapiHost }) => {
  const [content, setContent] = useState<AtlasPageProps>({
    content: JSON.stringify(emptyAtlasJson),
    frontMatter: { title: "", lang: defaultLang },
    atlas: atlas,
    strapiHost: strapiHost,
    atlasData: [],
  });

  if (content.atlas !== atlas) {
    setContent({ ...content, atlas: atlas });
  }

  useEffect(() => {
    const fetchPageContent = async () => {
      const response = await fetch(
        `${content.strapiHost}/api/atlases/?filters[name][$eq]=${content.atlas}&locale=${content.frontMatter.lang}&populate=kapittel.innhold&populate=jsondata`,
      );

      // TODO: Add error handling if fetch fails

      const json = await response.json();

      let atlasObj: AtlasJson = emptyAtlasJson;
      let atlasData: any = {};

      let frontMatter = {
        fileName: "",
        title: "",
        lang: "en",
      } as AtlasPageProps["frontMatter"];

      if (json.data.length === 1) {
        let atlasTmp = json.data[0].attributes;
        atlasTmp.kapittel = atlasTmp.kapittel.data.map((chapter) =>
          transformChapterEntry(chapter),
        );
        atlasTmp.filename = atlasTmp.name;

        atlasObj = atlasTmp as AtlasJson;

        let { filename, mainTitle, lang } = atlasObj;
        frontMatter = {
          filename,
          title: mainTitle,
          lang,
        } as AtlasPageProps["frontMatter"];

        atlasData = atlasTmp.jsondata.data.reduce((result, entry) => {
          result[entry.attributes.name] = JSON.stringify(entry.attributes.json);
          return result;
        }, {});
      }

      setContent({
        content: JSON.stringify(atlasObj),
        frontMatter,
        atlas: content.atlas,
        atlasData: atlasData,
        strapiHost: content.strapiHost,
      });
    };

    fetchPageContent();
  }, [
    content.atlas,
    content.strapiHost,
    content.frontMatter.lang,
    content.content,
  ]);

  return <AtlasPage content={content.content} atlasData={content.atlasData} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      atlas: context.params.atlas,
      strapiHost: process.env.STRAPI_PUBLIC_API_HOST ?? "http://localhost:1337",
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const atlasDir = path.join(process.cwd(), "_posts/helseatlas/atlas");
  const paths = fs
    .readdirSync(atlasDir)
    .map((Info) => ({ params: { atlas: Info.replace(/.json?$/, "") } }));

  return {
    paths,
    fallback: false,
  };
};

export default Page;
