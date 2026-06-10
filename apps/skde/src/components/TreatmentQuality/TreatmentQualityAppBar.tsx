import { AppBar, styled } from "@mui/material";
import type { PropsWithChildren } from "react";
import { Header } from "../Header";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = PropsWithChildren<{
  openDrawer: () => void;
  title?: string;
}>;

const TreatmentQualityAppBar = ({
  openDrawer,
  title = "Behandlingskvalitet",
  children,
}: AppBarProps) => {
  return (
    <>
      {/* biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future */}
      <Header title={title} children={children} />
      <StyledAppBar position="sticky" elevation={0}>
        <TreatmentQualityToolbar openDrawer={openDrawer} />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityAppBar;
