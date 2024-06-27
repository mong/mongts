import style from "./TopBanner.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { NavigateNext } from "@mui/icons-material";

interface TopBannerProps {
  mainTitle: string;
  lang: string;
}

export const TopBanner = ({ mainTitle, lang }: TopBannerProps) => {
  return (
    <div className={style.atlasTopBanner}>
      <div className={style.bannerWrapper}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNext htmlColor="#D3D7DA" />}
        >
          <Link
            underline="hover"
            color="#034584"
            href={lang === "en" ? "/helseatlas/en/" : "/helseatlas/"}
          >
            {lang === "en" ? "Front page" : "Forside"}
          </Link>
          <div className={style.breadcrumb_text}>{mainTitle}</div>
        </Breadcrumbs>
      </div>
    </div>
  );
};
