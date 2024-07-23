import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import matter from "gray-matter";


import { AnalyseData, Tag } from "../../src/types";
import { AnalyseBox } from "../../src/components/AnalyseBox";
import { Header, BreadCrumbPath, HeaderData } from "../../src/components/Header";
import { Footer } from "../../src/components/Footer";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { skdeTheme } from "qmongjs";

let analyseTheme = createTheme(skdeTheme, {});

type PageParams = {
  tag: Tag;
  analyser: AnalyseData[];
}

const Page = ({ tag, analyser }: PageParams) => {

  const breadcrumbs: BreadCrumbPath = {
    path: [
      {
        link: "https://www.skde.no",
        text: "Forside",
      },
      {
        link: `/${tag.name}/`,
        text: tag.fullname,
      },
    ],
  };

  const headerData: HeaderData = {
    title: tag.fullname,
    subtitle: tag.introduction,
  };

  return (
    <ThemeProvider theme={analyseTheme}>
      <CssBaseline />
      <PageWrapper>
        <Header headerData={headerData} breadcrumbs={breadcrumbs}>
        <p>{new Date(analyser[0].published).toString()}</p>
        </Header>
        <div className="footer">
          {analyser.map((a) => (
             <AnalyseBox analyse={a} key={a.name} />
          ))}
        </div>
        <Footer page="helseatlas" />
      </PageWrapper>
    </ThemeProvider>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  const analyserDir = path.join(process.cwd(), "analyser/data");

  const analyser: AnalyseData[] = fs
    .readdirSync(analyserDir)
    .map((fname) => {
      const fpath = path.join(analyserDir, fname);
      return JSON.parse(matter(fs.readFileSync(fpath)).content);
    })
    .filter((analyse) => {
      console.log(analyse.tags);
      return analyse.tags.includes(context.params.tag);
    });

  const tagFile = path.join(
    process.cwd(),
    "analyser/tags",
    `${context.params.tag}.json`,
  );
  const content: Tag = JSON.parse(matter(fs.readFileSync(tagFile)).content);

  return {
    props: { tag: content, analyser: analyser },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const tagDir = path.join(process.cwd(), "analyser/tags");

  const paths = fs.readdirSync(tagDir).flatMap((fname) => {
    const fpath = path.join(tagDir, fname);
    const tagData: Tag = JSON.parse(matter(fs.readFileSync(fpath)).content);

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
