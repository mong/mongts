import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import matter from "gray-matter";


import { AnalyseData, Tag } from "../../src/types";
import { AnalyseBoxFilter } from "../../src/components/AnalyseBoxFilter";
import { AnalyseBoxList } from "../../src/components/AnalyseBoxList";
import { Header, BreadCrumbPath, HeaderData } from "../../src/components/Header";
import { Footer } from "../../src/components/Footer";
import { PageWrapper } from "../../src/components/StyledComponents/PageWrapper";

import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import { skdeTheme } from "qmongjs";



type PageParams = {
  tag: Tag;
  tagsMetadata: { [k: string]: Tag };
  analyser: AnalyseData[];
}

const Page = ({ tag, tagsMetadata, analyser }: PageParams) => {

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
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <PageWrapper>
        <Header headerData={headerData} breadcrumbs={breadcrumbs}>
          <Typography variant="body1" sx={{marginRight: "1em"}}>Filtrer analyser: </Typography>
          <AnalyseBoxFilter kompendium={tag.name} tagsMetadata={tagsMetadata} analyser={analyser}/>
        </Header>
        <Box className="footer" sx={{ paddingTop: "40px" }}>
          <AnalyseBoxList analyser={analyser} tagsMetadata={tagsMetadata}/>
        </Box>
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

  const tagDir = path.join(process.cwd(), "analyser/tags");
  const tagsMetadata = Object.fromEntries(fs.readdirSync(tagDir).map((fname) => {
    const fpath = path.join(tagDir, fname);
    const tagData: Tag = JSON.parse(matter(fs.readFileSync(fpath)).content);

    return [tagData.name, tagData];
  }));

  return {
    props: { tag: tagsMetadata[`${context.params.tag}`], analyser: analyser, tagsMetadata: tagsMetadata },
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
