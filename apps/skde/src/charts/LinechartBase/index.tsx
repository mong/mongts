import React from 'react';
import { extent, max } from '@visx/vendor/d3-array';
import { curveLinear } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { MarkerCircle} from '@visx/marker';
import { DateValue } from '@visx/mock-data/lib/generators/genDateValue';
import { AxisBottom, AxisLeft } from '@visx/axis';





export type LinechartBaseProps = {
  data: DateValue[];
  width: number;
  height: number;
};

export default function LinechartBase({data, width, height }: LinechartBaseProps) {
  // data accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
  domain: extent(data, getX) as [Date, Date],
});
const yScale = scaleLinear<number>({
  domain: [0, max(data, getY) as number],
});
  
  const svgHeight = height;
  const lineHeight = svgHeight;

  const borderWidth = 50

  const pointSize = 4
  const pointXOffset = pointSize
  const pointYOffset = pointSize

  // update scale output ranges
  xScale.range([borderWidth, width - borderWidth]);
  yScale.range([lineHeight - borderWidth, borderWidth]);

  return (
    <div className="visx-linechartbase">
      <svg width={width} height={svgHeight}>
        <MarkerCircle id="marker-circle" fill="#333" 
        size = {pointSize} refX={pointXOffset} refY={pointYOffset} />
        <rect width={width} height={svgHeight} rx={14} ry={14} />
          <LinePath<DateValue>
            curve={curveLinear}
            data={data}
            x={(d) => xScale(getX(d)) ?? 0}
            y={(d) => yScale(getY(d)) ?? 0}
            stroke="#333"
            shapeRendering="geometricPrecision"
            markerMid="url(#marker-circle)"
          />
        <AxisBottom
          scale = {xScale}
          top = {yScale.range()[0]}
        />
        <AxisLeft
        scale = {yScale}
        left = {borderWidth}
        />
      </svg>
      <style jsx>{`
        .visx-linechartbase  {
          label { 
            font-size: 12px;
          }
          rect {
            fill: #e0efef;
            rx: 14;
            ry: 14;
          }
        }
      `}</style>
    </div>
  );
}