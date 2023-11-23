import React from 'react';
import { extent, min, max } from '@visx/vendor/d3-array';
import { curveLinear } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { MarkerCircle} from '@visx/marker';
import { AxisBottom, AxisLeft } from '@visx/axis';
import _ from 'lodash';

export interface LinechartData {
  x: Date;
  y: number;
};

export interface LinechartBaseProps {
  data: LinechartData[];
  width: number;
  height: number;
  yMin?: number;
  yMax?: number;
};

export default function LinechartBase({ data, width, height, yMin, yMax }: LinechartBaseProps) {  
  // data accessors
  const getX = (d: LinechartData) => d.x;
  const getY = (d: LinechartData) => d.y;

  yMin = yMin ?? _.floor(min(data, getY), 2);
  yMax = yMax ?? _.ceil(max(data, getY), 2);

  // scales
  const xScale = scaleTime<number>({
    domain: extent(data, getX) as [Date, Date],
  });
  
  const yScale = scaleLinear<number>({
    domain: [yMin, yMax],
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
      <svg className="linechartbase" width={width} height={svgHeight}>
        <MarkerCircle id="marker-circle" fill="#333" 
        size = {pointSize} refX={pointXOffset} refY={pointYOffset} />
        <rect width={width} height={svgHeight} rx={14} ry={14} />
        <LinePath<LinechartData>
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
        .visx-linechartbase {
        }

        svg.linechartbase rect {
          fill: #efefef;
          rx: 14;
          ry: 14;
        }        
      `}</style>
    </div>
  );
}