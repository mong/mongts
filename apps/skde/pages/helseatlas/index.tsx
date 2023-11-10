import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import FrontPage, {
  HomeProps,
  AtlasInfo,
} from "../../src/components/Atlas/FrontPage";

const defaultLang: "no" | "en" = "no";

interface AtlasHomeStaticProps {
  strapiHost: string;
}

const emptyHomeProps: HomeProps = {
  atlasInfo: [],
  lang: defaultLang,
};

const buildAtlasInfo = (strapiHost: string, atlasData: any): AtlasInfo[] => {
  const atlasInfos = atlasData.map((entry) => {
    const info = entry.attributes;
    return {
      article: `v2/${info.name}`,
      frontMatter: {
        shortTitle: info.shortTitle,
        image: `${strapiHost}${info.image.data.attributes.formats.medium.url}`,
        frontpagetext: info.frontpagetext,
        date: info.date,
        lang: info.lang === "en" ? info.lang : "no",
      },
    } as AtlasInfo;
  });

  return atlasInfos;
};

const Home: React.FC<AtlasHomeStaticProps> = ({ strapiHost }) => {
  const [homeProps, setHomeProps] = useState<HomeProps>(emptyHomeProps);

  useEffect(() => {
    const fetchHomeProps = async () => {
      const localFilter =
        homeProps.lang === "en"
          ? `filters[lang][$eq]=en`
          : `&filters[$and][0][$or][0][locale][$eq]=nb&filters[$and][0][$or][1][locale][$eq]=nn`;

      const apiUrl = `http://localhost:1337/api/atlases/?locale=all&populate=image&&filters[publisert][$eq]=true&${localFilter}`;
      const response = await fetch(apiUrl);

      // TODO: Add error handling if fetch fails

      const json = await response.json();
      const atlasInfo = buildAtlasInfo(strapiHost, json.data);

      setHomeProps({
        lang: defaultLang,
        atlasInfo: atlasInfo,
      });
    };

    fetchHomeProps();
  }, [homeProps.lang, strapiHost]);

  return <FrontPage atlasInfo={homeProps.atlasInfo} lang={homeProps.lang} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      strapiHost: process.env.STRAPI_PUBLIC_API_HOST ?? "http://localhost:1337",
    },
  };
};

export default Home;
