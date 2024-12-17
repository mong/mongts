import { AppBar, styled } from "@mui/material";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";
import { Header, BreadCrumbPath } from "../Header";
import { PropsWithChildren } from "react";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = PropsWithChildren<{
  openDrawer: () => void;
  title?: string;
  extraBreadcrumbs?: { link: string; text: string }[];
}>;

const TreatmentQualityAppBar = ({
  openDrawer,
  title = "Behandlingskvalitet",
  extraBreadcrumbs,
  children,
}: AppBarProps) => {
  let breadcrumbs: BreadCrumbPath = [
    { link: "https://www.skde.no", text: "Forside" },
    { link: "/behandlingskvalitet/", text: "Behandlingskvalitet" },
  ];

  if (extraBreadcrumbs) {
    breadcrumbs = [...breadcrumbs, ...extraBreadcrumbs];
  }

  return (
    <>
      <Header title={title} breadcrumbs={breadcrumbs} children={children} />
      <StyledAppBar position="sticky" elevation={0}>
        <TreatmentQualityToolbar openDrawer={openDrawer} />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityAppBar;
