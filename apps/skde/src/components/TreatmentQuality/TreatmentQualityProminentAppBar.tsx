import { AppBar, styled } from "@mui/material";
import { HeaderTopToolbar } from "./HeaderTopToolbar";
import { HeaderMiddleToolbar } from "./HeaderMiddleToolbar";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  "& .MuiToolbar-root": {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
}));

export const TreatmentQualityProminentAppBar = () => {
  return (
    <StyledAppBar position="static">
      <HeaderTopToolbar />
      <HeaderMiddleToolbar />
    </StyledAppBar>
  );
};

export default TreatmentQualityProminentAppBar;
