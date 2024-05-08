import { AppBar } from "@mui/material";
import { HeaderTopToolbar } from "./HeaderTopToolbar";
import { HeaderMiddleToolbar } from "./HeaderMiddleToolbar";

export const TreatmentQualityProminentAppBar = () => {
  return (
    <AppBar position="static">
      <HeaderTopToolbar />
      <HeaderMiddleToolbar />
    </AppBar>
  );
};

export default TreatmentQualityProminentAppBar;
