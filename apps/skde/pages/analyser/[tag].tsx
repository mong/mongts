import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import matter from "gray-matter";


//import { AnalyseData, Tag } from "../../src/types";
import { SkdeHeader } from "../../src/components/Header";
import { Footer } from "../../src/components/Footer";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";

import { ThemeProvider, Typography } from "@mui/material";
import { skdeTheme } from "qmongjs";

const Page = (params) => {
  return (
    <ThemeProvider theme={skdeTheme}>
      <PageWrapper>
        <SkdeHeader path={[{ text: params.fullname, link: `/analyser/${params.name}/` }]} />
        <div className="footer" style={{backgroundColor: "wheat"}}>
          <Typography variant="h1">{params.fullname}</Typography>
          <Typography variant="body1">
            {params.introduction} <br />
            {skdeTheme.breakpoints.only("md")}
          </Typography>
        </div>
        <Footer page="helseatlas" />
      </PageWrapper>
    </ThemeProvider>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  const analyserDir = path.join(process.cwd(), "analyser/data");

  const analyser = fs
    .readdirSync(analyserDir)
    .map((fname) => {
      const fpath = path.join(analyserDir, fname);
      const analyseData = JSON.parse(matter(fs.readFileSync(fpath)).content);

      return analyseData;
    })
    .filter((analyse) => {
      console.log(analyse.tags);
      return analyse.tags.includes(context.params.tag);
    });

  console.log("Tilgjengelige analyser: ", analyser);

  const tagFile = path.join(
    process.cwd(),
    "analyser/tags",
    `${context.params.tag}.json`,
  );
  const file = fs.readFileSync(tagFile);
  const content = JSON.parse(matter(file).content);

  return {
    props: { ...content },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const tagDir = path.join(process.cwd(), "analyser/tags");

  const paths = fs.readdirSync(tagDir).flatMap((fname) => {
    const fpath = path.join(tagDir, fname);
    const tagData = JSON.parse(matter(fs.readFileSync(fpath)).content);

    return tagData.introduction
      ? {
          params: {
            tag: tagData.name,
          },
        }
      : [];
  });

  return {
    paths,
    fallback: false,
  };
};

export default Page;
