import Image from "next/image";

import { imgLoader } from "../../helpers/functions";
import classNames from "./MainBanner.module.css";

type MainBannerProps = {
  lang?: "nb" | "nn" | "en";
  title?: string;
  ingress?: string;
  imageSource?: string;
};

export const MainBanner: React.FC<MainBannerProps> = ({
  lang = "no",
  title = "Likeverdige helsetjenester – uansett hvor du bor?",
  ingress = "Helseatlas sammenlikner befolkningens bruk av helsetjenester i forskjellige geografiske områder, uavhengig av hvilket sted pasientene behandles.",
  imageSource = "/helseatlas/img/frontpage.jpg",
}) => {
  const engTitle = "Equitable health services – regardless of where you live?";
  const engIngress =
    "In Norway, it is a goal for the entire population to have an equal supply of health services across geography and social groups. The health atlas is a tool for comparing the population's use of health services in different geographical areas, regardless of where the patients are treated.";
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
          />
          <h1 className={classNames.pageTitle}>
            {lang === "en" ? engTitle : title}
          </h1>
        </div>
      </div>
      <div className={classNames.pageTitle}></div>
      <div className={classNames.pageIngressContent}>
        <div className={classNames.pageIngress}>
          {lang === "en" ? engIngress : ingress}
        </div>
      </div>
    </div>
  );
};
