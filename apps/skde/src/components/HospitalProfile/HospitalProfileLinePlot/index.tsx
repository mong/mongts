import React, { useState, useEffect } from "react";
import {
  IndicatorLinechart,
  IndicatorLinechartParams,
} from "../../../charts/IndicatorLinechart";
import { LineStyles } from "qmongjs";
import { ThemeProvider, Box, Typography, Stack, Button } from "@mui/material";
import { ChipSelection } from "../../ChipSelection";
import {
  LinePlotLegend,
  ItemBox,
  lineChartTheme,
} from "../..//HospitalProfile";
import { formatUnitNameIfNational } from "../../../helpers/functions/formatUnitNameIfNational";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

type HospitalProfileLinePlotProps = {
  unitFullName: string;
  unitNames: string;
  lastYear: number;
  pastYears: number;
  titlePadding: number;
  titleStyle: { marginTop: number; marginLeft: number };
  textMargin: number;
};

export const HospitalProfileLinePlot = (
  props: HospitalProfileLinePlotProps,
) => {
  const {
    unitFullName,
    unitNames,
    lastYear,
    pastYears,
    titlePadding,
    titleStyle,
    textMargin,
  } = props;

  // States
  const [normalise, setNormalise] = useState<boolean>(true);
  const [zoomIn, setZoomIn] = useState<boolean>(false);

  // Set the line plot width to fill the available space
  const [plotWidth, setPlotWidth] = useState(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setPlotWidth(event[0].contentBoxSize[0].inlineSize);
    });

    resizeObserver.observe(document.getElementById("plot-window"));
  });

  const indicatorParams: IndicatorLinechartParams = {
    unitNames: [unitNames],
    context: "caregiver",
    type: "ind",
    width: plotWidth,
    height: 600,
    lineStyles: new LineStyles(
      [
        {
          text: "Høy måloppnåelse",
          strokeDash: "0",
          colour: "#3BAA34",
          marker: "circle",
          markEnd: true,
        },
        {
          text: "Moderat måloppnåelse",
          strokeDash: "0",
          colour: "#FD9C00",
          marker: "square",
          markEnd: true,
        },
        {
          text: "Lav måloppnåelse",
          strokeDash: "0",
          colour: "#E30713",
          marker: "triangle",
          markEnd: true,
        },
      ],
      { fontSize: 16, fontFamily: "Arial", fontWeight: 500 },
    ),
    font: {
      fontSize: 18,
      fontWeight: 500,
      fontFamily: "Arial",
    },
    yAxisText: normalise ? "Andel" : "Antall indikatorer",
    xTicksFont: { fontFamily: "Arial", fontSize: 16, fontWeight: 500 },
    yTicksFont: { fontFamily: "Arial", fontSize: 14, fontWeight: 500 },
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
    <ItemBox sx={{ overflow: "auto" }}>
      <Box padding={titlePadding}>
        <Typography variant="h5" style={titleStyle}>
          <b>
            {"Utvikling over tid fra " +
              (lastYear - pastYears) +
              " til " +
              lastYear}
          </b>
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
        <div style={{ margin: textMargin }}>
          <Typography variant="body1">
            {"Grafen gir en oversikt over kvalitetsindikatorer fra de nasjonale medisinske kvalitetsregistrene for " +
              formatUnitNameIfNational(unitFullName, false) +
              ". Her vises andel eller antall av kvalitetsindikatorer som har hatt høy, middels eller lav måloppnåelse de siste årene."}
          </Typography>
        </div>
        <div style={{ margin: textMargin }}>
          <LinePlotLegend itemSpacing={6} symbolSpacing={2} />
        </div>
      </Box>

      <ThemeProvider theme={lineChartTheme}>
        <div id="plot-window">
          <IndicatorLinechart {...indicatorParams} />
          <img
            src="/img/logos/logo-skde-graa.svg"
            height={plotWidth / 30}
            style={{
              position: "relative",
              left: "85%",
              width: "auto",
              bottom: 50,
            }}
          />
        </div>
      </ThemeProvider>
    </ItemBox>
  );
};
