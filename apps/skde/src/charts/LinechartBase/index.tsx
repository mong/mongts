import React from "react";
import { extent, min, max } from "@visx/vendor/d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import _ from "lodash";
import { LinechartBackground } from "./LinechartBaseStyles";

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

  yMin = yMin ?? _.floor(min(allData, getY), 2);
  yMax = yMax ?? _.ceil(max(allData, getY), 2);

  // scales
  const xScale = scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date],
  });

  const yScale = scaleLinear<number>({
    domain: [yMin, yMax],
  });

  const borderWidth = 50;

  // update scale output ranges
  xScale.range([borderWidth, width - borderWidth]);
  yScale.range([height - borderWidth, borderWidth]);

  return (
    <div className="visx-linechartbase">
      <svg className="linechartbase" width={width} height={height}>
        <LinechartBackground width={width} height={height} />
        {
          data.map((lineData, i) => {
            return (
                <LinePath<LinechartData>
                  key={`lineid-${i}`}
                  curve={curveLinear}
                  data={lineData}
                  x = {(d) => xScale(getX(d))}
                  y = {(d) => yScale(getY(d))}
                  stroke={
                    i === 0 ? "#3BAA34" : 
                    i === 1 ? "#FD9C00" :
                    i === 2 ? "#E30713" :
                    "blue"}
                  shapeRendering="geometricPrecision"
                  strokeDasharray={
                    i === 0 ? "0" : 
                    i === 1 ? "1 3" :
                    i === 2 ? "8 8" :
                    0
                  }
                  strokeWidth={"1px"}
                  strokeLinejoin={"round"}
                  strokeLinecap={"square"}
                />
            );
          })
        }

        <AxisBottom scale={xScale} top={yScale.range()[0]} numTicks={nXTicks} />
        <AxisLeft scale={yScale} left={borderWidth} />
      </svg>
    </div>
  );
}
