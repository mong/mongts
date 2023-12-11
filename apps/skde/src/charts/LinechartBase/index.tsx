import React from "react";
import { extent, min, max } from "@visx/vendor/d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinechartBackground } from "./LinechartBaseStyles";
import { Legend, LegendItem, LegendLabel } from "@visx/legend";

export interface LinechartData {
  x: Date;
  y: number;
}

type lineStyle = {
  text: string;
  strokeDash: string;
  colour: string;
};

export class LineStyles {
  styles: lineStyle[];

  constructor(styles: lineStyle[]) {
    this.styles = styles.map((row) => {
      return row;
    });
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

export interface LinechartBaseProps {
  data: LinechartData[][];
  width: number;
  height: number;
  lineStyles: LineStyles;
  yMin?: number;
  yMax?: number;
}

export default function LinechartBase({
  data,
  width,
  height,
  lineStyles,
  yMin,
  yMax,
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
    domain: [yMin, yMax],
  });

  const borderWidth = 100;
  const fontWeight = 700;
  const font = "Plus Jakarta Sans";

  // update scale output ranges
  xScale.range([borderWidth, width - borderWidth]);
  yScale.range([height - borderWidth, borderWidth]);

  const yLabelProps = {
    fontSize: 12,
    x: -height / 1.7,
    fontFamily: font,
    fontWeight: fontWeight,
  };

  const xTicksProps = {
    fontSize: 11,
    fontFamily: font,
    fontWeight: fontWeight,
  };

  const legendScale = scaleOrdinal<string, React.JSX.Element>({
    domain: lineStyles.getLabels(),
    range: lineStyles.getPaths(),
  });

  return (
    <div className="visx-linechartbase">
      <Legend scale={legendScale}>
        {(labels) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {labels.map((label, i) => {
              return (
                <LegendItem
                  key={`legend-${i}`}
                  margin="0 40px 0 0"
                  flexDirection="column"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="6"
                    viewBox="0 0 30 2"
                    fill="none"
                  >
                    {label.value}
                  </svg>
                  <LegendLabel align="left" margin={10}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            })}
          </div>
        )}
      </Legend>

      <svg className="linechartbase" width={width} height={height}>
        <LinechartBackground width={width} height={height} />
        {data.map((lineData, i) => {
          return (
            <LinePath<LinechartData>
              key={`lineid-${i}`}
              curve={curveLinear}
              data={lineData}
              x={(d) => xScale(getX(d))}
              y={(d) => yScale(getY(d))}
              stroke={lineStyles.styles[i].colour}
              strokeDasharray={lineStyles.styles[i].strokeDash}
              shapeRendering="geometricPrecision"
              strokeWidth={"1px"}
              strokeLinejoin={"round"}
              strokeLinecap={"square"}
            />
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
          label={"Antall indikatorer"}
          labelProps={yLabelProps}
        />
      </svg>
    </div>
  );
}
