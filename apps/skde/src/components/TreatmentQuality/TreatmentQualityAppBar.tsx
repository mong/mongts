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
};

const breadcrumbs: BreadCrumbPath = {
  path: [
    { link: "https://www.skde.no", text: "Forside" },
    { link: "/behandlingskvalitet/", text: "Behandlingskvalitet" },
  ],
};

const headerData: HeaderData = {
  title: "Behandlingskvalitet",
  subtitle: "Resultater fra nasjonale medisinske kvalitetsregistre",
};

const TreatmentQualityAppBar = ({
  openDrawer,
  context,
  onTabChanged,
  tabs,
}: AppBarProps) => {
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
      {(tabs || tabs === undefined) && (
        <StyledAppBar position="sticky" elevation={0}>
          <TreatmentQualityToolbar
            openDrawer={openDrawer}
            onTabChanged={onTabChanged}
            context={context}
          />
        </StyledAppBar>
      )}
    </>
  );
};

export default TreatmentQualityAppBar;
