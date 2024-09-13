import { AppBar, styled } from "@mui/material";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";
import { Header, HeaderData, BreadCrumbPath } from "../Header";
import { ArrowLink } from "qmongjs";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = {
  openDrawer: () => void;
  context;
  onTabChanged;
  tabs?: boolean;
  title?: string;
  subtitle?: string;
  extraBreadcrumbs?: { link: string; text: string }[];
};

const TreatmentQualityAppBar = ({
  openDrawer,
  context,
  onTabChanged,
  tabs = true,
  title = "Behandlingskvalitet",
  subtitle = "Resultater fra nasjonale medisinske kvalitetsregistre",
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
      <Header headerData={headerData} breadcrumbs={breadcrumbs}>
        <ArrowLink
          href={"https://www.kvalitetsregistre.no/"}
          text={"Om kvalitetsregistre"}
          externalLink={true}
          button={true}
          textVariant="button"
        />
      </Header>
      <StyledAppBar position="sticky" elevation={0}>
        <TreatmentQualityToolbar
          openDrawer={openDrawer}
          onTabChanged={onTabChanged}
          context={context}
          tabs={tabs}
        />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityAppBar;
