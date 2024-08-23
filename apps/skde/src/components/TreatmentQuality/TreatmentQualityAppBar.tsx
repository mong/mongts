import { AppBar, Breakpoint, styled, Container } from "@mui/material";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";
import { Header, HeaderData, BreadCrumbPath } from "../Header";
import { ArrowLink, skdeTheme } from "qmongjs";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = {
  openDrawer: () => void;
  context;
  onTabChanged;
  maxWidth: false | Breakpoint;
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
  maxWidth,
}: AppBarProps) => {
  return (
    <>
      <Header
        headerData={headerData}
        breadcrumbs={breadcrumbs}
        maxWidth={maxWidth}
      >
        <ArrowLink
          href={"https://www.kvalitetsregistre.no/"}
          text={"Om kvalitetsregistre"}
          externalLink={true}
          button={true}
          textVariant="button"
        />
      </Header>
      <div style={{ backgroundColor: skdeTheme.palette.primary.light }}>
        <Container maxWidth={maxWidth} disableGutters={true}>
          <StyledAppBar position="sticky" elevation={0}>
            <TreatmentQualityToolbar
              openDrawer={openDrawer}
              onTabChanged={onTabChanged}
              context={context}
            />
          </StyledAppBar>
        </Container>
      </div>
    </>
  );
};

export default TreatmentQualityAppBar;
