import React from "react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleOrdinal, scaleBand } from "@visx/scale";
import { Group } from "@visx/group";
import { max, sum, min } from "d3-array";
import { useRouter } from "next/router";

import { ColorLegend } from "./ColorLegend";
import { AnnualVarLegend } from "./AnnualVarLegend";
import { toBarchart } from "../../helpers/functions/dataTransformation";
import {
  customFormat,
  customFormatEng,
} from "../../helpers/functions/localFormater";

import { AnnualVariation } from "./AnnualVariation";
import { mainBarColors, nationBarColors, selectedBarColors } from "../colors";

export type BarchartData<
  Data,
  X extends (string & keyof Data)[],
  Y extends keyof Data,
  ColorBy extends keyof Data,
  AnnualVar extends (keyof Data)[]
> = {
  [k in keyof Data & keyof X]: number;
} & {
  [k in Y]: string;
} & {
  [k in ColorBy]?: number | string;
} & {
  [k in keyof Data]?: number | string;
} & {
  [k in keyof Data & keyof AnnualVar]?: number;
};

type BarchartProps<
  Data,
  X extends (string & keyof Data)[],
  Y extends string & keyof Data,
  ColorBy extends keyof Data,
  AnnualVar extends (string & keyof Data)[]
> = {
  data: BarchartData<Data, X, Y, ColorBy, AnnualVar>[];
  lang: "en" | "nb" | "nn";
  x: X;
  y: Y;
  width?: number;
  height?: number;
  margin?: { top: number; bottom: number; right: number; left: number };
  xLabel?: { en: string; nb: string; nn: string };
  yLabel?: { en: string; nb: string; nn: string };
  xMin?: number;
  xMax?: number;
  xLegend?: { en: string[]; nb: string[]; nn: string[] };
  backgroundColor?: string;
  xAxisLineStroke?: string;
  xAxisTickStroke?: string;
  xAxisLineStrokeWidth?: number;
  yAxisLineStroke?: string;
  yAxisTickStroke?: string;
  yAxisLineStrokeWidth?: number;
  tickLength?: number;
  yInnerPadding?: number;
  yOuterPadding?: number;
  annualVar?: AnnualVar;
  annualVarLabels?: { en: number[]; nn: number[]; nb: number[] };
  format: string;
};

export const Barchart = <
  Data,
  X extends (string & keyof Data)[],
  Y extends string & keyof Data,
  ColorBy extends string & keyof Data,
  AnnualVar extends (string & keyof Data)[]
>({
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
  backgroundColor = "white",
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
  format,
}: BarchartProps<Data, X, Y, ColorBy, AnnualVar>) => {
  //missing
  //tooltip
  //animation
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const varLabels = annualVarLabels ? annualVarLabels[lang] : undefined;

  const sorted = [...data].sort((first, second) => {
    const firstVal = sum(x.map((xVal) => parseFloat(first[xVal])));
    const secondVal = sum(x.map((xVal) => parseFloat(second[xVal])));
    return secondVal - firstVal;
  });

  const series = toBarchart<BarchartData<Data, X, Y, ColorBy, AnnualVar>, X>(
    sorted,
    x
  );

  // Pick out bohf query from the url
  const router = useRouter();
  const selected_bohf = [router.query.bohf].flat();

  //used to find max values
  const annualValues = annualVar
    ? annualVar.flatMap((annual) => data.flatMap((dt) => parseInt(dt[annual])))
    : [];
  const values = [...annualValues, ...series.flat().flat().flat()];
  const xMaxValue = xMax ? xMax : max(values) * 1.1;

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
    domain: sorted.map((s) => s[y]),
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
    .range([2, yScale.bandwidth() / 2]);

  return (
    <div style={{ width: "auto", margin: "auto" }}>
      <svg
        style={{ backgroundColor, display: "block", margin: "auto" }}
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
            tickValues={data.map((s) => s[y])}
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
              transform: "(rotateX(90deg))",
              fontWeight: "bold",
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
              format
                ? lang === "en"
                  ? customFormatEng(format)(val)
                  : customFormat(format)(val)
                : val.toString()
            }
            tickLength={tickLength}
            tickStroke={xAxisTickStroke}
            tickTransform={`translate(0,0)`}
            label={xLabel[lang]}
            labelProps={{
              fontSize: 14,
              textAnchor: "middle",
              fontWeight: "bold",
            }}
          />
        </Group>
        <Group left={margin.left} top={margin.top}>
          {series.map((d, i) => {
            const bars = (
              <Group fill={colorScale(d["key"])} key={`${i}`}>
                {d.map((barData, i) => {
                  const bohfName = barData.data["bohf"].toString();
                  return (
                    <rect
                      key={`${i}`}
                      x={xScale(barData[0])}
                      y={yScale(barData.data[y].toString())}
                      width={xScale(Math.abs(barData[0] - barData[1]))}
                      height={yScale.bandwidth()}
                      fill={
                        selected_bohf.includes(bohfName)
                          ? x.length === 1
                            ? selectedColors[0]
                            : selectedColorScale(d["key"])
                          : bohfName === "Norge"
                          ? x.length === 1
                            ? nationColors[0]
                            : nationColorScale(d["key"])
                          : x.length === 1
                          ? colors[0]
                          : colorScale(d["key"])
                      }
                      data-testid={
                        selected_bohf.includes(bohfName)
                          ? `rect_${bohfName}_selected`
                          : `rect_${bohfName}_unselected`
                      }
                      style={{
                        cursor: bohfName != "Norge" ? "pointer" : "auto",
                      }}
                      onClick={() => {
                        // Add HF to query param if clicked on.
                        // Remove HF from query param if it already is selected.
                        // Only possible to click on HF, and not on Norge
                        bohfName != "Norge"
                          ? router.replace(
                              {
                                query: {
                                  ...router.query,
                                  bohf:
                                    selected_bohf[0] === undefined
                                      ? bohfName
                                      : selected_bohf.includes(bohfName)
                                      ? selected_bohf.filter(
                                          (d) => d != bohfName
                                        )
                                      : selected_bohf.concat(bohfName),
                                },
                              },
                              undefined,
                              { shallow: true }
                            )
                          : undefined;
                      }}
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
                  key={`${d["bohf"]}${i}`}
                />
              );
            })}
        </Group>
      </svg>
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
    </div>
  );
};
