import React from "react";
import { extent, min, max } from "@visx/vendor/d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import _ from "lodash";
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
  }

  const xTicksProps = {
    fontSize: 11,
    fontFamily: font,
    fontWeight: fontWeight
  }


  const lineStyles= {
    high: {
      text: "High",
      strokeDash: "0",
      colour: "#3BAA34"
    },
    medium: {
      text: "Medium",
      strokeDash: "1 3",
      colour: "#FD9C00"
    },
    low: {
      text: "Low",
      strokeDash: "8 8",
      colour: "#E30713"
    }
  };

  const getLineColour = (lineID: number) => {
    return lineID === 0 ? lineStyles.high.colour
         : lineID === 1 ? lineStyles.medium.colour
         : lineID === 2 ? lineStyles.low.colour
         : null
  }

  const getStrokeDash = (lineID: number) => {
    return lineID === 0 ? lineStyles.high.strokeDash
         : lineID === 1 ? lineStyles.medium.strokeDash
         : lineID === 2 ? lineStyles.low.strokeDash
         : 0
  };
  
  const legendScale = scaleOrdinal<string, any>({
      domain: ["High", "Medium", "Low"],
      range: [
        <path d="M0 1H12" stroke="#3BAA34"/>,
        <path d="M1 1H13" stroke="#FD9C00" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 3"/>,
        <path d="M1 1H13" stroke="#E30713" strokeLinecap="square" strokeLinejoin="round" strokeDasharray="8 8"/>
      ]
  });

  return (
    <div className="visx-linechartbase">
    <Legend scale={legendScale}>
          {(labels) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {labels.map((label, i) => {
                console.log(label);
                return (
                  <LegendItem
                    key={`legend-${i}`}
                    margin="0 4px 0 0"
                    flexDirection="column"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
                      {label.value}
                    </svg>
                    <LegendLabel align="left" margin={0}>
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
              stroke={getLineColour(i)}
              strokeDasharray={getStrokeDash(i)}
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
}
