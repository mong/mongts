import { AppBar, styled } from "@mui/material";
import { HeaderTopToolbar } from "./HeaderTopToolbar";
import { HeaderMiddleToolbar } from "./HeaderMiddleToolbar";
import { StickyToolbar } from "./StickyToolbar";

const StyledAppBar = styled(AppBar)(() => ({
  elevation: 0,
}));

export const TreatmentQualityProminentAppBar = () => {
  return (
    <>
      <HeaderTopToolbar />
      <HeaderMiddleToolbar />
      <StyledAppBar position="sticky" elevation={0}>
        <StickyToolbar />
      </StyledAppBar>
    </>
  );
};

export default TreatmentQualityProminentAppBar;
