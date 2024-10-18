import { AppBar, styled } from "@mui/material";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";
import { Header, HeaderData, BreadCrumbPath } from "../Header";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = {
  openDrawer: () => void;
  title?: string;
  subtitle?: string;
  extraBreadcrumbs?: { link: string; text: string }[];
};

const TreatmentQualityAppBar = ({
  openDrawer,
  title = "Behandlingskvalitet",
  subtitle = `Resultater fra nasjonale medisinske kvalitetsregistre. For mer informasjon, se <a href="https://www.kvalitetsregistre.no/">kvalitetsregistre.no</a>`,
  extraBreadcrumbs,
}: AppBarProps) => {
  const headerData: HeaderData = {
    title: title,
    subtitle: subtitle,
  };

  const breadcrumbs: BreadCrumbPath = {
    path: [
      { link: "https://www.skde.no", text: "Forside" },
      {
        link: "https://www.skde.no/resultater/",
        text: "Tall om helsetjenesten",
      },
      { link: "/behandlingskvalitet/", text: "Behandlingskvalitet" },
    ],
  };

  if (extraBreadcrumbs) {
    breadcrumbs.path = [...breadcrumbs.path, ...extraBreadcrumbs];
  }

  return (
    <>
      <Header headerData={headerData} breadcrumbs={breadcrumbs} />
      <StyledAppBar position="sticky" elevation={0}>
        <TreatmentQualityToolbar openDrawer={openDrawer} />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityAppBar;
