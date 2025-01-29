import React from "react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleOrdinal, scaleBand } from "@visx/scale";
import { Group } from "@visx/group";
import { max, sum, min } from "d3-array";
import { useBohfQueryParam } from "../../helpers/hooks";

import { ColorLegend } from "./ColorLegend";
import { AnnualVarLegend } from "./AnnualVarLegend";
import { toBarchart } from "../../helpers/functions/dataTransformation";
import { customFormat } from "qmongjs";

import { AnnualVariation } from "./AnnualVariation";
import { ErrorBars } from "./errorBars";
import {
  mainBarColors,
  nationBarColors,
  selectedBarColors,
  nationalLabel,
} from "../colors";
import { Box } from "@mui/material";
import { DataItemPoint } from "../../types";

type BarchartProps = {
  data: DataItemPoint[];
  lang: "en" | "nb" | "nn";
  x: string[];
  y: string;
  width?: number;
  height?: number;
  margin?: { top: number; bottom: number; right: number; left: number };
  xLabel?: { en: string; nb: string; nn: string };
  yLabel?: { en: string; nb: string; nn: string };
  xMin?: number;
  xMax?: number;
  xLegend?: { en: string[]; nb: string[]; nn: string[] };
  xAxisLineStroke?: string;
  xAxisTickStroke?: string;
  xAxisLineStrokeWidth?: number;
  yAxisLineStroke?: string;
  yAxisTickStroke?: string;
  yAxisLineStrokeWidth?: number;
  tickLength?: number;
  yInnerPadding?: number;
  yOuterPadding?: number;
  annualVar?: string[];
  annualVarLabels?: { en: number[]; nn: number[]; nb: number[] };
  errorBars?: string[];
  format: string;
  national: string;
  forfatter: "SKDE" | "Helse Førde";
};

export const Barchart = ({
  width = 600,
  height = 500,
  margin = {
    top: 30,
    bottom: 50,
    right: 20,
    left: 140,
  },
  data,
  lang,
  xLabel,
  yLabel,
  x,
  y,
  xMin = 0,
  xMax,
  xAxisLineStroke = "black",
  xAxisLineStrokeWidth = 2,
  xAxisTickStroke = "black",
  yAxisLineStroke = "black",
  yAxisLineStrokeWidth = 0,
  yAxisTickStroke = "white",
  tickLength = 3,
  yInnerPadding = 0.2,
  yOuterPadding = 0.1,
  xLegend,
  annualVar,
  annualVarLabels,
  errorBars,
  format,
  national,
  forfatter,
}: BarchartProps) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const varLabels = annualVarLabels
    ? annualVarLabels[lang]
      ? annualVarLabels[lang]
      : annualVarLabels["en"]
    : undefined;

  const sorted = [...data].sort((first, second) => {
    const firstVal = sum(x.map((xVal) => first[xVal] as number));
    const secondVal = sum(x.map((xVal) => second[xVal] as number));
    return secondVal - firstVal;
  });

  const series = toBarchart(sorted, x);

  // Pick out bohf query from the url
  const [selectedBohfs, toggleBohf] = useBohfQueryParam(national);

  // Find max values
  const annualValues = annualVar
    ? annualVar.flatMap((annual) =>
        data.flatMap((item) => item[annual] as number),
      )
    : [];
  const errorBarValues = errorBars
    ? errorBars.flatMap((errorBar) =>
        data.flatMap((item) => item[errorBar] as number),
      )
    : [];

  const values = [
    ...annualValues,
    ...errorBarValues,
    ...series.flat().flat().flat(),
  ];
  const xMaxValue = xMax ? xMax : max(values);

  const colors = mainBarColors;
  const nationColors = nationBarColors;
  const selectedColors = selectedBarColors;

  const colorScale = scaleOrdinal({
    domain: series.map((s) => s.key),
    range: [...colors],
  });
  const nationColorScale = scaleOrdinal({
    domain: series.map((s) => s.key),
    range: [...nationColors],
  });
  const selectedColorScale = scaleOrdinal({
    domain: series.map((s) => s.key),
    range: [...selectedColors],
  });

  const xScale = scaleLinear<number>({
    domain: [xMin, xMaxValue],
    range: [0, innerWidth],
  });

  const yScale = scaleBand<string>({
    domain: sorted.map((s) => s[y] as string),
    range: [0, innerHeight],
    paddingInner: yInnerPadding,
    paddingOuter: yOuterPadding,
  });

  //annual var scales
  const colorFillScale = scaleLinear()
    .domain([min(varLabels ?? [0]), max(varLabels ?? [1])])
    .range(["black", "white"]);
  const sizeScale = scaleLinear<number>()
    .domain([min(varLabels ?? [0]), max(varLabels ?? [0])])
    .range([2, 7]);

  return (
    <Box
      sx={{
        width: "auto",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${
            {
              "Helse Førde": "/helseatlas/img/logos/helse-forde-graa.svg",
              SKDE: "/img/logos/logo-skde-graa.svg",
            }[forfatter]
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: lang === "nn" ? "max(5rem, 20%)" : "max(3rem, 10%)",
          backgroundPosition: "bottom min(13%, 5rem) right 5%",
        }}
      >
        <svg
          style={{ display: "block", margin: "auto" }}
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
        >
          <Group left={margin.left} top={margin.top}>
            <AxisLeft
              top={5}
              left={-10}
              scale={yScale}
              strokeWidth={yAxisLineStrokeWidth}
              stroke={yAxisLineStroke}
              tickValues={data.map((s) => s[y] as string)}
              tickFormat={(name) =>
                name === national ? nationalLabel[lang] : name
              }
              tickStroke={yAxisTickStroke}
              tickLabelProps={() => ({
                fontSize: 14,
                fill: "black",
                textAnchor: "end",
              })}
              label={yLabel[lang]}
              labelProps={{
                fontSize: 14,
                x: -127,
                y: -15,
                transform: "",
                fontWeight: "bold",
                textAnchor: "start",
                fill: "",
                fontFamily: "",
              }}
            />
          </Group>
          <Group left={margin.left} top={margin.top + innerHeight}>
            <AxisBottom
              top={0}
              scale={xScale}
              strokeWidth={xAxisLineStrokeWidth}
              stroke={xAxisLineStroke}
              numTicks={4}
              tickFormat={(val) =>
                format ? customFormat(format, lang)(val) : val.toString()
              }
              tickLength={tickLength}
              tickStroke={xAxisTickStroke}
              tickTransform={`translate(0,0)`}
              label={xLabel[lang]}
              labelProps={{
                fontSize: 14,
                textAnchor: "middle",
                fontWeight: "bold",
                fill: "",
                fontFamily: "",
              }}
            />
          </Group>
          <Group left={margin.left} top={margin.top}>
            {series.map((d, i) => {
              const bars = (
                <Group fill={colorScale(d["key"])} key={`${i}`}>
                  {d.map((barData, i) => {
                    const bohfName = (
                      barData.data.bohf || barData.data.borhf
                    ).toString();
                    return (
                      <rect
                        key={`${i}`}
                        x={xScale(barData[0])}
                        y={yScale(barData.data[y].toString())}
                        width={xScale(Math.abs(barData[0] - barData[1]))}
                        height={yScale.bandwidth()}
                        fill={
                          selectedBohfs.has(bohfName)
                            ? x.length === 1
                              ? selectedColors[0]
                              : selectedColorScale(d["key"])
                            : bohfName === national
                              ? x.length === 1
                                ? nationColors[0]
                                : nationColorScale(d["key"])
                              : x.length === 1
                                ? colors[0]
                                : colorScale(d["key"])
                        }
                        data-testid={
                          selectedBohfs.has(bohfName)
                            ? `rect_${bohfName}_selected`
                            : `rect_${bohfName}_unselected`
                        }
                        style={{
                          cursor: bohfName != national ? "pointer" : "auto",
                        }}
                        onClick={() => toggleBohf(bohfName)}
                      />
                    );
                  })}
                </Group>
              );
              return bars;
            })}
            {annualVar &&
              data.map((d, i) => {
                return (
                  <AnnualVariation
                    data={d}
                    xScale={xScale}
                    yScale={yScale}
                    annualVar={annualVar}
                    colorFillScale={colorFillScale}
                    sizeScale={sizeScale}
                    y={y}
                    labels={varLabels}
                    key={`${d["bohf"] || d["borhf"]}${i}`}
                  />
                );
              })}
            {errorBars &&
              data.map((d) => {
                return (
                  <ErrorBars
                    data={d}
                    xScale={xScale}
                    yScale={yScale}
                    errorBars={errorBars}
                    y={y}
                    key={`${d["bohf"] || d["borhf"]}_errorbar`}
                  />
                );
              })}
          </Group>
        </svg>
      </Box>
      {annualVar && (
        <AnnualVarLegend
          colorFillScale={colorFillScale}
          sizeScale={sizeScale}
          values={annualVar}
          labels={varLabels}
        />
      )}
      {x.length > 1 && (
        <ColorLegend
          colorScale={colorScale}
          labels={xLegend[lang]}
          values={x}
        />
      )}
    </Box>
  );
};
