import { AtlasLink } from "../../Buttons";
import linkClassNames from "../../Buttons/AtlasLink.module.css";
import { Header, BreadCrumbPath } from "../../Header";
import { PageWrapper } from "../../StyledComponents/PageWrapper";
import {
  Box,
  Container,
  CssBaseline,
  Link,
  ThemeProvider,
} from "@mui/material";
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

  const title = { no: "Rapporter", en: "Reports" }[lang];

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
            href="/favicon.ico"
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
                  no: "Her finner du helseatlas i form av digitale rapporter som omhandler et utvalgt tema, fagområde eller en pasientgruppe. Rapportene gir et overordnet bilde av geografisk variasjon i tjenestebruk for en begrenset tidsperiode. Oppdaterte helseatlas kan du finne på ",
                  en: "Here you will find Health Atlases in the form of digital reports that cover a selected topic, field, or patient group. The reports provide an overview of geographical variation in the use of healthcare services for a defined period. Updated Health Atlases can be found at ",
                }[lang]
              }
              <Link
                href={`https://analyser.skde.no/${lang === "en" ? "en/" : ""}`}
                target="_blank"
              >
                analyser.skde.no
              </Link>
              .
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
