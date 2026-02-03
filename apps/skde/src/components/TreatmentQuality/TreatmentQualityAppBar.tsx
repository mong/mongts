import { AppBar, styled } from "@mui/material";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";
import { Header, BreadCrumbPath } from "../Header";
import { PropsWithChildren } from "react";
import { SetStateAction } from "react";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = PropsWithChildren<{
  openDrawer: () => void;
  title?: string;
  extraBreadcrumbs?: { link: string; text: string }[];
  useBeta: boolean;
  setUseBeta: (value: SetStateAction<boolean>) => void;
}>;

const TreatmentQualityAppBar = ({
  openDrawer,
  title = "Behandlingskvalitet",
  extraBreadcrumbs,
  children,
  useBeta,
  setUseBeta,
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
        <TreatmentQualityToolbar
          openDrawer={openDrawer}
          useBeta={useBeta}
          setUseBeta={setUseBeta}
        />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityAppBar;
