import { SkdeLogo } from "@mong/material-ui";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import { formatUnitNameIfNational } from "../../../helpers/functions/formatUnitNameIfNational";
import {
  IndicatorLinechart,
  type IndicatorLinechartParams,
} from "../../Charts/IndicatorLinechart";
import { ChipSelection } from "../../ChipSelection";
import { ItemBox, lineChartTheme } from "../..//HospitalProfile";

type HospitalProfileLinePlotProps = {
  unitFullName: string;
  unitNames: string;
  lastYear: number;
  pastYears: number;
};

export const HospitalProfileLinePlotV2 = (
  props: HospitalProfileLinePlotProps,
) => {
  const { unitFullName, unitNames, lastYear, pastYears } = props;

  // States
  const [normalise, setNormalise] = useState<boolean>(true);
  const [zoomIn, setZoomIn] = useState<boolean>(false);

  const indicatorParams: IndicatorLinechartParams = {
    unitNames: [unitNames],
    context: "caregiver",
    type: "ind",
    width: 600,
    height: 600,
    yAxisText: normalise ? "Andel" : "Antall indikatorer",
    startYear: lastYear - pastYears,
    endYear: lastYear,
    yMin: 0,
    yMax: normalise && !zoomIn ? 1 : undefined,
    normalise: normalise,
    useToolTip: true,
  };

  const zoomButtonicon = zoomIn ? <ZoomOutIcon /> : <ZoomInIcon />;
  const zoomButtonText = zoomIn ? "Zoom ut" : "Zoom inn";

  return (
    <>
      <h4>Måloppnåelse siste 10 år</h4>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <ChipSelection
          leftChipLabel="Vis andel"
          rightChipLabel="Vis Antall"
          leftChipHelpText=""
          rightChipHelpText=""
          hoverBoxOffset={[20, 20]}
          hoverBoxPlacement="top"
          hoverBoxMaxWidth={400}
          state={normalise}
          stateSetter={setNormalise}
          trueChip="left"
        />
        <Button
          disabled={!normalise}
          variant="outlined"
          startIcon={zoomButtonicon}
          sx={{ height: "3rem", marginRight: "4rem" }}
          onClick={() => {
            setZoomIn(!zoomIn);
          }}
        >
          {zoomButtonText}
        </Button>
      </Stack>
      <div>
        <Typography variant="body1">
          {"Grafen gir en oversikt over kvalitetsindikatorer fra de nasjonale medisinske kvalitetsregistrene for " +
            formatUnitNameIfNational(unitFullName, false) +
            ". Her vises andel eller antall av kvalitetsindikatorer som har hatt høy, middels eller lav måloppnåelse de siste årene."}
        </Typography>
      </div>

      <ThemeProvider theme={lineChartTheme}>
        <div id="plot-window">
          <Box margin={2}>
            <IndicatorLinechart {...indicatorParams} />
            <div className="flex items-end justify-end pb-12 pr-4">
              <SkdeLogo height={"auto"} width={192} />
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
};
