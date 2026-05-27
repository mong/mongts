import { AppBar, styled } from "@mui/material";
import type { PropsWithChildren } from "react";
import { type BreadCrumbPath, Header } from "../Header";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";

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
      {/* biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future */}
      <Header title={title} breadcrumbs={breadcrumbs} children={children} />
      <StyledAppBar position="sticky" elevation={0}>
        <TreatmentQualityToolbar openDrawer={openDrawer} />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityAppBar;
