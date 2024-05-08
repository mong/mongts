import { CssBaseline, ThemeProvider } from "@mui/material";
import TreatmentQualityProminentAppBar from "../../src/components/TreatmentQuality/TreatmentQualityProminentAppBar";
import { indicatorTableTheme } from "qmongjs";

export default function TreatmentQualityPage() {
  return (
    <ThemeProvider theme={indicatorTableTheme}>
      <CssBaseline />
      <TreatmentQualityProminentAppBar />
    </ThemeProvider>
  );
}
