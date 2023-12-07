import React from "react";
import { extent, min, max } from "@visx/vendor/d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinechartBackground } from "./LinechartBaseStyles";
import { Legend, LegendItem, LegendLabel } from "@visx/legend"

export interface LinechartData {
  x: Date;
  y: number;
}

export interface LinechartBaseProps {
  data: LinechartData[][];
  width: number;
  height: number;
  yMin?: number;
  yMax?: number;
}

export default function LinechartBase({
  data,
  width,
  height,
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
    x: -height/1.7, 
    fontFamily: font, 
    fontWeight: fontWeight
  };

  const xTicksProps = {
    fontSize: 11,
    fontFamily: font,
    fontWeight: fontWeight
  };

  // Style the lines
  type lineStyle = {
    text: string,
    strokeDash: string,
    colour: string
  };

  class LineStyles {
    0: lineStyle;
    1: lineStyle;
    2: lineStyle;

    constructor(style0: lineStyle, style1: lineStyle, style2: lineStyle) {
      this[0] = style0;
      this[1] = style1;
      this[2] = style2;
    };

    getLabels = () => {
      return [0,1,2].map((i) => this[i].text);
    };

    getPaths = () => {
      return [0,1,2].map((i) => 
        <path d="M0 1H30" stroke={this[i].colour} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={this[i].strokeDash}/>);
    };
  };

  // This could be passed into the component
  // Need to check that there is one style for each line
  const lineStyles = new LineStyles(
    {text: "Høy måloppnåelse", strokeDash: "0", colour: "#3BAA34"}, 
    {text: "Moderat måloppnåelse", strokeDash: "1 3", colour: "#FD9C00"},
    {text: "Lav måloppnåelse", strokeDash: "8 8", colour: "#E30713"}
  );
  
  const legendScale = scaleOrdinal<string, React.JSX.Element>({
      domain: lineStyles.getLabels(),
      range: lineStyles.getPaths()
  });

  return (
    <div className="visx-linechartbase">
    <Legend scale={legendScale}>
          {(labels) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {labels.map((label, i) => {
                return (
                  <LegendItem
                    key={`legend-${i}`}
                    margin="0 40px 0 0"
                    flexDirection="column"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="6" viewBox="0 0 30 2" fill="none">
                      {label.value}
                    </svg>
                    <LegendLabel align="keft" margin={10}>
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
              stroke={lineStyles[i].colour}
              strokeDasharray={lineStyles[i].strokeDash}
              shapeRendering="geometricPrecision"
              strokeWidth={"1px"}
              strokeLinejoin={"round"}
              strokeLinecap={"square"}
            />
          );
        })}

        <AxisBottom scale={xScale} top={yScale.range()[0]} numTicks={nXTicks} tickLabelProps={xTicksProps} />
        <AxisLeft scale={yScale} left={borderWidth} label={"Antall indikatorer"} labelProps={yLabelProps}/>
      </svg>
    </div>
  );
};
