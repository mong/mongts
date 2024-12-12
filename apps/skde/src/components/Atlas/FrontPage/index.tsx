import { AtlasLink } from "../../Buttons";
import linkClassNames from "../../Buttons/AtlasLink.module.css";
import { Header, BreadCrumbPath } from "../../Header";
import { PageWrapper } from "../../StyledComponents/PageWrapper";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { LayoutHead } from "../../LayoutHead";
import { Footer } from "../../Footer";
import { LangButton } from "../AtlasLayout/Header";
import { skdeTheme } from "qmongjs";

export interface HomeProps {
  atlasInfo: {
    article: string;
    frontMatter: {
      shortTitle: string;
      image: string;
      frontpagetext: string;
      date: Date;
    };
  }[];
  lang: "no" | "en";
}

const FrontPage = ({ atlasInfo, lang }: HomeProps) => {
  const sortedAtlas = atlasInfo
    .sort((a, b) => {
      const c = new Date(a.frontMatter.date);
      const d = new Date(b.frontMatter.date);
      return c.getTime() - d.getTime();
    })
    .reverse();

  const url = lang === "no" ? "helseatlas" : "helseatlas/en";
  const Links = sortedAtlas.map((atlas, i) => (
    <AtlasLink
      key={atlas.article}
      linkTo={`${url}/${atlas.article}`}
      imageSource={atlas.frontMatter.image}
      linkTitle={atlas.frontMatter.shortTitle}
      linkText={atlas.frontMatter.frontpagetext}
      wide={i === 0}
      date={atlas.frontMatter.date}
      lang={lang}
    />
  ));

  const title = { no: "Tematiske helseatlas", en: "Thematic Health Atlases" }[
    lang
  ];

  const breadcrumbs: BreadCrumbPath = [
    {
      link: "https://www.skde.no",
      text: { no: "Forside", en: "Homepage" }[lang],
    },
    {
      link: "https://www.skde.no/helseatlas/",
      text: { no: "Helseatlas", en: "Health Atlas" }[lang],
    },
    {
      link: "/helseatlas/",
      text: title,
    },
  ];

  return (
    <ThemeProvider theme={skdeTheme}>
      <CssBaseline />
      <PageWrapper>
        <Box sx={{ backgroundColor: "white" }}>
          <LayoutHead
            title="Helseatlas"
            content="The healthcare atlases on Helseatlas.no are a tool for comparing the population's use of health services in different geographical areas, regardless of where the patients actually receive treatment."
            href="/helseatlas/img/logos/favicon.ico"
          />
          <main>
            <Header
              bgcolor="surface2.light"
              title={title}
              breadcrumbs={breadcrumbs}
              maxWidth={"xl"}
              menu={<LangButton lang={lang} />}
            >
              {
                {
                  no: "Her finner du tematiske helseatlas som tar for seg utvalgte tjenester på ett fagområde eller til én pasientgruppe, i en periode på tre til fem år.",
                  en: "Here you find thematic Health Atlases concering selected health services or patient groups, in a period from three to five years.",
                }[lang]
              }
            </Header>
            <Box className="footer">
              <Container maxWidth={"xl"} disableGutters={true}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "2.5rem",
                    paddingTop: "2.5rem",
                  }}
                >
                  {Links}
                  <div /* Dummy links to make the last link align correctly with CSS flex */
                    className={`${linkClassNames.linkOuterWrapper}`}
                    style={{ height: "0rem" }}
                  ></div>
                  <div
                    className={`${linkClassNames.linkOuterWrapper}`}
                    style={{ height: "0rem" }}
                  ></div>
                </Box>
              </Container>
            </Box>
          </main>
          <Footer page="helseatlas" maxWidth={"xl"} className="header-top" />
        </Box>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default FrontPage;
