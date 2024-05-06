import React from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { IndicatorData } from "../../IndicatorTable/IndicatortablebodyV2";

export type BarchartProps = {
  indicatorData: IndicatorData;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const blue = "#aeeef8";
export const green = "#e5fd3d";
const purple = "#9caff6";
export const background = "#DEDEDE";
const defaultMargin = { top: 20, right: 40, bottom: 40, left: 150 };

type BarchartData = {
  unitName: string;
  value: number;
};

// accessors
const getY = (d: BarchartData) => d.unitName;
const getX = (d: BarchartData) => d.value;

const createBarchartData = (data: IndicatorData) => {
  return data.data.map((row) => {
    return { unitName: row.unitName, value: row.var } as BarchartData;
  });
};

export const BarchartBase = ({
  indicatorData,
  width,
  height,
  margin = defaultMargin,
}: BarchartProps) => {
  const data = createBarchartData(indicatorData);

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
    domain: [0, 1],
  });

  return (
    <svg width={width + 2 * margin.left} height={height + margin.top}>
      <rect
        x={0}
        y={0}
        width={width + 2 * margin.left}
        height={height + margin.top}
        fill={background}
        rx={14}
      />
      <Group>
        <Group top={margin.top} left={margin.left}>
          {data.map((d) => {
            const name = getY(d);
            const barHeight = yScale.bandwidth();
            const barWidth = xScale(getX(d));
            const barY = yScale(name);
            return (
              <Bar
                key={d.unitName}
                x={0}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={"#BFCED6"}
                rx={4}
              />
            );
          })}
        </Group>

        <AxisLeft
          scale={yScale}
          left={margin.left}
          stroke={"#000000"}
          tickStroke={"#000000"}
          tickLabelProps={{
            fill: "#000000",
            fontSize: 11,
            textAnchor: "end",
            dy: "0.33em",
          }}
        />

        <AxisBottom
          top={yMax - margin.top}
          left={margin.left}
          scale={xScale}
          stroke={"#000000"}
          tickStroke={"#000000"}
          tickLabelProps={{
            fill: "#000000",
            fontSize: 11,
            textAnchor: "middle",
          }}
        />
      </Group>
    </svg>
  );
};
