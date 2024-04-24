import React from "react";
import { extent, min, max } from "@visx/vendor/d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinechartBackground } from "./LinechartBaseStyles";
import { Legend, LegendItem, LegendLabel } from "@visx/legend";
import { customFormat } from "qmongjs";
import { Group } from "@visx/group";

export type LinechartData = {
  x: Date;
  y: number;
};

type lineStyle = {
  text: string;
  strokeDash: string;
  colour: string;
};

export type font = {
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
};

export class LineStyles {
  styles: lineStyle[];
  font: font;

  constructor(styles: lineStyle[], font: font) {
    this.styles = styles.map((row) => {
      return row;
    });
    this.font = font;
  }

  getLabels = () => {
    return this.styles.map((row) => row.text);
  };

  getPaths = () => {
    return this.styles.map((row, i) => {
      return (
        <path
          d="M0 1H30"
          stroke={row.colour}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={row.strokeDash}
          key={`linestyle-${i}`}
        />
      );
    });
  };
}

export type LinechartBaseProps = {
  data: LinechartData[][];
  width: number;
  height: number;
  lineStyles: LineStyles;
  font: font;
  yAxisText: string;
  yMin?: number;
  yMax?: number;
  format_y?: string;
  lang?: "en" | "nb" | "nn";
};

export function LinechartBase({
  data,
  width,
  height,
  lineStyles,
  font,
  yAxisText,
  yMin,
  yMax,
  format_y,
  lang = "nb",
}: LinechartBaseProps) {
  // data accessors
  const getX = (d: LinechartData) => d.x;
  const getY = (d: LinechartData) => d.y;

  const allData = data.reduce((rec, d) => rec.concat(d), []);

  const nXTicks = data[0].length;

  yMin = yMin ?? min(allData, getY);
  yMax = yMax ?? max(allData, getY);

  // scales
  const xScale = scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date],
  });

  const yScale = scaleLinear<number>({
    domain: [yMin!, yMax!],
  });

  const borderWidth = 100;

  // update scale output ranges
  xScale.range([borderWidth, width - borderWidth]);
  yScale.range([height - borderWidth, borderWidth]);

  const yLabelProps = {
    fontSize: font.fontSize,
    x: -height / 1.7,
    fontFamily: font.fontFamily,
    fontWeight: font.fontWeight,
  };

  const xTicksProps = {
    fontSize: font.fontSize,
    fontFamily: font.fontFamily,
    fontWeight: font.fontWeight,
  };

  const legendScale = scaleOrdinal<string, React.JSX.Element>({
    domain: lineStyles.getLabels(),
    range: lineStyles.getPaths(),
  });

  return (
    <div className="visx-linechartbase">
      <Legend scale={legendScale}>
        {(labels) => (
          <div
            style={{ display: "flex", flexDirection: "row", marginLeft: "10%" }}
          >
            {labels.map((label, i) => {
              return (
                <div style={{ padding: "10px" }} key={`legend-div-${i}`}>
                  <LegendItem key={`legend-${i}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="70"
                      height="6"
                      viewBox="0 0 40 1"
                      fill="none"
                    >
                      {label.value}
                    </svg>
                    <LegendLabel align="left" style={{ ...lineStyles.font }}>
                      {label.text}
                    </LegendLabel>
                  </LegendItem>
                </div>
              );
            })}
          </div>
        )}
      </Legend>

      <svg className="linechartbase" width={width} height={height}>
        <LinechartBackground width={width} height={height} />
        {data.map((lineData, i) => {
          return (
            <Group>
              {lineData.map((d, j) => (
                <circle
                  key={i + j}
                  r={3}
                  cx={xScale(getX(d))}
                  cy={yScale(getY(d))}
                  stroke={lineStyles.styles[i].colour}
                  fill={lineStyles.styles[i].colour}
                />
              ))}
              <LinePath<LinechartData>
                key={`lineid-${i}`}
                curve={curveLinear}
                data={lineData}
                x={(d) => xScale(getX(d))}
                y={(d) => yScale(getY(d))}
                stroke={lineStyles.styles[i].colour}
                strokeDasharray={lineStyles.styles[i].strokeDash}
                shapeRendering="geometricPrecision"
                strokeWidth={"2px"}
                strokeLinejoin={"round"}
                strokeLinecap={"square"}
              />
            </Group>
          );
        })}

        <AxisBottom
          scale={xScale}
          top={yScale.range()[0]}
          numTicks={nXTicks}
          tickLabelProps={xTicksProps}
        />
        <AxisLeft
          scale={yScale}
          left={borderWidth}
          label={yAxisText}
          labelProps={yLabelProps}
          tickFormat={(val) =>
            format_y ? customFormat(format_y, lang)(val) : val.toString()
          }
        />
      </svg>
    </div>
  );
}
