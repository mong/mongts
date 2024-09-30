import React, { useState, useEffect } from "react";
import {
  IndicatorLinechart,
  IndicatorLinechartParams,
} from "../../../charts/IndicatorLinechart";
import { LineStyles } from "qmongjs";
import { Stack, ThemeProvider, Box, Typography } from "@mui/material";
import { ChipSelection } from "../../ChipSelection";
import {
  LinePlotLegend,
  ItemBox,
  lineChartTheme,
} from "../..//HospitalProfile";

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
    yAxisText: "Antall indikatorer",
    xTicksFont: { fontFamily: "Arial", fontSize: 16, fontWeight: 500 },
    yTicksFont: { fontFamily: "Arial", fontSize: 14, fontWeight: 500 },
    startYear: lastYear - pastYears,
    endYear: lastYear,
    yMin: 0,
    normalise: true,
    useToolTip: true,
  };

  // State logic for normalising the line plot
  const [normalise, setNormalise] = useState(indicatorParams.normalise);

  indicatorParams.normalise = normalise;

  if (normalise) {
    indicatorParams.yAxisText = "Andel";
  } else {
    indicatorParams.yAxisText = "Antall indikatorer";
  }

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
          alignItems="center"
          justifyContent="space-between"
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
          <LinePlotLegend itemSpacing={8} symbolSpacing={2} />
        </Stack>
        <div style={{ margin: textMargin }}>
          <Typography variant="body1">
            {"Grafen gir en oversikt over kvalitetsindikatorer fra de nasjonale medisinske kvalitetsregistrene for " +
              unitFullName +
              ". Her vises andel eller antall av kvalitetsindikatorer som har hatt høy, middels eller lav måloppnåelse de siste årene."}
          </Typography>
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
