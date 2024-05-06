import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from '@visx/vendor/d3-time-format';

export type BarGroupHorizontalProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const blue = '#aeeef8';
export const green = '#e5fd3d';
const purple = '#9caff6';
export const background = '#612efb';
const defaultMargin = { top: 20, right: 40, bottom: 40, left: 150 };

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);
function max<D>(arr: D[], fn: (d: D) => number) {
  return Math.max(...arr.map(fn));
}


const data = [
  {unitName: "Tromsø", value: 50},
  {unitName: "Bodø", value: 80},
  {unitName: "Stavanger", value: 70},
  {unitName: "Harstad", value: 100},
]

// accessors
const getY = (d) => d.unitName;
const getX = (d) => d.value;




export const BarchartBase = ({
  width,
  height,
  margin = defaultMargin
}: BarGroupHorizontalProps) => {

  const xMax = width; 
  const yMax = height;

  // scales
  const yScale = scaleBand({
    range: [0, yMax],
    domain: data.map(getY),
    padding: 0.2,
  });

  const xScale = scaleLinear<number>({
    range: [0, xMax],
    domain: [0, 100]
  });

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <Group>
        <Group top={margin.top} left={margin.left}>
                  {data.map((d) => {
                    const name = getY(d);
                    const barHeight = yScale.bandwidth();
                    const barWidth= xScale(getX(d));
                    const barY = yScale(name);
                    return(
                    <Bar
                      key={d.unitName}
                      x={0}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill={"#005544"}
                      rx={4}
                    />
                  )}
                )}
                </Group>

          <AxisLeft
            scale={yScale}
            left={margin.left}
            stroke={green}
            tickStroke={green}
            tickLabelProps={{
              fill: green,
              fontSize: 11,
              textAnchor: 'end',
              dy: '0.33em',
            }}/>

            <AxisBottom
              top={yMax - margin.bottom}
              scale={xScale}
              stroke={purple}
              tickStroke={purple}
              tickLabelProps={{
                fill: purple,
                fontSize: 11,
                textAnchor: 'middle',
              }}/>
          
        </Group>
    </svg>
        );
}