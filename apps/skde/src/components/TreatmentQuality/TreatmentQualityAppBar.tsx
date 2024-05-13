import { AppBar, styled } from "@mui/material";
import { TreatmentQualityHeaderTop } from "./TreatmentQualityHeaderTop";
import { TreatmentQualityHeaderMiddle } from "./TreatmentQualityHeaderMiddle";
import { TreatmentQualityToolbar } from "./TreatmentQualityToolbar";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = {
  openDrawer: () => void;
  context;
  onTabChanged;
};

export const TreatmentQualityAppBar = ({
  openDrawer,
  context,
  onTabChanged,
}: AppBarProps) => {
  return (
    <>
      <TreatmentQualityHeaderTop />
      <TreatmentQualityHeaderMiddle />
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
