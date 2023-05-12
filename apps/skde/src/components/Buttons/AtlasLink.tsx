import Link from "next/link";
import Image from "next/image";
import classNames from "./AtlasLink.module.css";
import { timeFormat } from "d3-time-format";

import { imgLoader } from "../../helpers/functions";

interface Props {
  linkTo: string;
  imageSource: string;
  linkTitle: string;
  linkText: string;
  wide?: boolean;
  date: Date;
  lang: "no" | "en";
}

const formatTimeEng = timeFormat("%B %d %Y");

const formatTimeNo = timeFormat("%d.%m.%Y");

export const AtlasLink: React.FC<Props> = ({
  linkTo,
  imageSource,
  linkTitle,
  wide,
  linkText,
  date,
  lang,
}) => {
  // Newly updated if there is less than 60 says since atlas was published
  const newlyUpdated =
    (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24) <
    60;
  return (
    <div
      className={`${classNames.linkOuterWrapper} ${
        wide ? classNames.wide : ""
      }`}
    >
      <Link href={`/${linkTo}`} data-testid={linkTo}>
        <div className={classNames.linkInnerWrapper}>
          <div className={classNames.linkImageWrapper}>
            <Image
              loader={imgLoader}
              src={imageSource}
              alt={"atlas photo"}
              width={1160}
              height={740}
              layout="intrinsic"
            />
          </div>
          <div className={classNames.linkText}>
            <div
              className={`${classNames.linkDateContainer} ${
                newlyUpdated ? classNames.newlyUpdated : ""
              }`}
            >
              <div className={classNames.outerCircle}>
                <div className={classNames.innerDot}></div>
              </div>
              {lang === "en" ? "Published " : "Publisert:"}
              <strong className={classNames.date}>
                {lang === "en"
                  ? formatTimeEng(new Date(date))
                  : formatTimeNo(new Date(date))}
              </strong>
            </div>
            <div className={classNames.linkTitle}>{linkTitle}</div>
            <div className={classNames.linkIngress}>
              <p>{linkText}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
