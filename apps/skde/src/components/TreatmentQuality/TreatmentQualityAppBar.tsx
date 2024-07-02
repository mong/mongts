import { AppBar, styled } from "@mui/material";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";
import { Header } from "../Header";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = {
  openDrawer: () => void;
  context;
  onTabChanged;
};

const breadcrumbs = {
  path: [
    { link: "https://www.skde.no", text: "Forside" },
    { link: "/behandlingskvalitet/", text: "Behandlingskvalitet" },
  ],
};

const TreatmentQualityAppBar = ({
  openDrawer,
  context,
  onTabChanged,
}: AppBarProps) => {
  return (
    <>
      <Header page="behandlingskvalitet" breadcrumbs={breadcrumbs} />
      <StyledAppBar position="sticky" elevation={0}>
        <TreatmentQualityToolbar
          openDrawer={openDrawer}
          onTabChanged={onTabChanged}
          context={context}
        />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityAppBar;
