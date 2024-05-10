import { AppBar, styled } from "@mui/material";
import { HeaderTopToolbar } from "./HeaderTopToolbar";
import { HeaderMiddleToolbar } from "./HeaderMiddleToolbar";
import { StickyToolbar } from "./StickyToolbar";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

type AppBarProps = {
  openDrawer: () => void;
};

export const TreatmentQualityProminentAppBar = ({
  openDrawer,
}: AppBarProps) => {
  return (
    <>
      <HeaderTopToolbar />
      <HeaderMiddleToolbar />
      <StyledAppBar position="sticky" elevation={0}>
        <StickyToolbar openDrawer={openDrawer} />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityProminentAppBar;
