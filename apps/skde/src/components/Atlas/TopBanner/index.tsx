import style from "./TopBanner.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface TopBannerProps {
  mainTitle: string;
  ia: boolean;
  lang: string;
}

export const TopBanner: React.FC<TopBannerProps> = ({
  mainTitle,
  ia,
  lang,
}) => {
  return (
    <div className={style.atlasTopBanner}>
      <div className={style.bannerWrapper}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon htmlColor="#D3D7DA" />}
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
        <div className={style.rightbanner}>
          {ia && (
            <div className={style.map_button}>
              <a href="ia">{lang === "en" ? "Map" : "Kart"}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
