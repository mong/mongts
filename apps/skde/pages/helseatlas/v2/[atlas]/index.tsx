import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import matter from "gray-matter";
import AtlasPage, { AtlasPageProps } from "../../../../src/components/Atlas/v2";
import { Atlas, AtlasData } from "../../../../src/types";

const Page = ({ atlas, atlasData }: AtlasPageProps) => (
  <AtlasPage atlas={atlas} atlasData={atlasData} />
);

export const getStaticProps: GetStaticProps = async (context) => {
  const fullPath = path.join(
    process.cwd(),
    "_posts/helseatlas/atlas",
    `${context.params.atlas}.json`,
  );
  const file = fs.readFileSync(fullPath);
  const atlas: Atlas = JSON.parse(matter(file).content);
  const dataPath = path.join(
    "public/helseatlas/data",
    `${context.params.atlas}/`,
  );

  const atlasData: AtlasData = Object.fromEntries(
    await Promise.all(
      fs
        .readdirSync(dataPath)
        .filter((file) => file.endsWith(".json"))
        .map((file) => [
          file,
          JSON.parse(fs.readFileSync(`${dataPath}/${file}`, "utf-8"))[
            "innhold"
          ],
        ]),
    ),
  );

  return {
    props: { atlas, atlasData },
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
