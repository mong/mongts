import { BreadCrumbPath } from "../../Header";
import { SkdeBreadcrumbs } from "../../Header/HeaderTop";
import { Box } from "@mui/material";

interface TopBannerProps {
  mainTitle: string;
  atlasName: string;
  lang: string;
}

export const TopBanner = ({ mainTitle, atlasName, lang }: TopBannerProps) => {
  const breadcrumbs: BreadCrumbPath = [
    {
      link: "https://www.skde.no",
      text: lang === "en" ? "Homepage" : "Forside",
    },
    {
      link: "https://www.skde.no/helseatlas/",
      text: lang === "en" ? "Health Atlas" : "Helseatlas",
    },
    {
      link: `/helseatlas/${lang === "en" ? "en/" : ""}`,
      text: lang === "en" ? "Reports" : "Rapporter",
    },
    {
      link: `/helseatlas/${lang === "en" ? "en/" : ""}v2/${atlasName}/`,
      text: mainTitle,
    },
  ];

  return (
    <Box
      sx={{
        width: "min(95%, 76rem)",
        padding: "1rem",
        margin: "auto",
      }}
    >
      <SkdeBreadcrumbs path={breadcrumbs} />
    </Box>
  );
};
