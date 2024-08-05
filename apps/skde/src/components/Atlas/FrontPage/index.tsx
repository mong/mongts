import { AtlasLayout } from "../../Layout";
import { MainBanner } from "../../MainBanner";
import { AtlasLink } from "../../Buttons";
import classNames from "./FrontPage.module.css";
import linkClassNames from "../../Buttons/AtlasLink.module.css";

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

  return (
    <AtlasLayout lang={lang}>
      <main>
        <MainBanner lang={lang} />
        <div className={classNames.atlasLinksWrapper}>
          {Links}
          <div /* Dummy link to make the last link align correctly with CSS flex */
            className={`${linkClassNames.linkOuterWrapper}`}
            style={{ height: "0px" }}
          ></div>
        </div>
      </main>
    </AtlasLayout>
  );
};

export default FrontPage;
