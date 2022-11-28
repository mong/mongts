import { AtlasLayout } from "../../Layout";
import { MainBanner } from "../../MainBanner";
import { AtlasLink } from "../../Buttons";
import classNames from "./FrontPage.module.css";

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

const FrontPage: React.FC<HomeProps> = ({ atlasInfo, lang }) => {
  const url = lang === "no" ? "helseatlas" : "helseatlas/en";
  const Links = atlasInfo.map((atlas, i) => (
    <AtlasLink
      key={atlas.article}
      linkTo={`${url}/${atlas.article}`}
      imageSource={atlas.frontMatter.image}
      linkTitle={atlas.frontMatter.shortTitle}
      linkText={atlas.frontMatter.frontpagetext}
      wide={i === 0}
      date={atlas.frontMatter.date}
      newlyUpdated={i === 0}
      lang={lang}
    />
  ));

  return (
    <AtlasLayout lang={lang}>
      <main>
        <MainBanner lang={lang} />
        <div className={classNames.atlasLinksWrapper}>{Links}</div>
      </main>
    </AtlasLayout>
  );
};

export default FrontPage;
