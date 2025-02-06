import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import matter from "gray-matter";
import AtlasPage, { AtlasPageProps } from "../../../../src/components/Atlas/v2";

const Page = ({ content, atlasData }: AtlasPageProps) => (
  <AtlasPage content={content} atlasData={atlasData} />
);

export const getStaticProps: GetStaticProps = async (context) => {
  const fullPath = path.join(
    process.cwd(),
    "_posts/helseatlas/atlas",
    `${context.params.atlas}.json`,
  );
  const file = fs.readFileSync(fullPath);
  const { content } = matter(file);
  const dataPath = path.join(
    "public/helseatlas/data",
    `${context.params.atlas}/`,
  );

  const fileData = fs.existsSync(dataPath)
    ? await Promise.all(
        await fs
          .readdirSync(dataPath)
          .filter((files) => files.includes(".json"))
          .map(async (files) => {
            const filePath = `${dataPath}/${files}`;
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const data = {};
            data[files] = fileContent;
            return data;
          }),
      )
    : [];
  const atlasData = fileData.reduce((result, data) => {
    const key: string = Object.keys(data)[0];
    result[key] = data[key];
    return result;
  }, {});
  return {
    props: { content, atlasData },
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
