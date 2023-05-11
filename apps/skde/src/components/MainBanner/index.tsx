import Image from "next/image";

import { imgLoader } from "../../helpers/functions";
import classNames from "./MainBanner.module.css";

type MainBannerProps = {
  lang: "nb" | "en" | "nn";
};

export const MainBanner: React.FC<MainBannerProps> = ({ lang }) => {
  const text = {
    title: {
      en: "Equitable health services – regardless of where you live?",
      nb: "Likeverdige helsetjenester – uansett hvor du bor?",
      nn: "Likeverdige helsetjenester – uansett hvor du bor?",
    },
    ingress: {
      en: "In Norway, it is a goal for the entire population to have an equal supply of health services across geography and social groups. The health atlas is a tool for comparing the population's use of health services in different geographical areas, regardless of where the patients are treated.",
      nb: "Helseatlas sammenlikner befolkningens bruk av helsetjenester i forskjellige geografiske områder, uavhengig av hvilket sted pasientene behandles.",
      nn: "Helseatlas sammenlikner befolkningens bruk av helsetjenester i forskjellige geografiske områder, uavhengig av hvilket sted pasientene behandles.",
    },
  };
  const imageSource = "/helseatlas/img/frontpage.jpg";
  return (
    <div className={classNames.main}>
      <div className={classNames.headerMain}>
        <div className={classNames.pageImage}>
          <Image
            loader={imgLoader}
            src={imageSource}
            alt={"mainpage photo"}
            width={1184}
            height={435}
            layout="intrinsic"
          />
          <h1 className={classNames.pageTitle}>{text.title[lang]}</h1>
        </div>
      </div>
      <div className={classNames.pageTitle}></div>
      <div className={classNames.pageIngressContent}>
        <div className={classNames.pageIngress}>{text.ingress[lang]}</div>
      </div>
    </div>
  );
};
