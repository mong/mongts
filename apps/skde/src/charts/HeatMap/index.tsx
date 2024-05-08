import React from "react";
import { scaleLinear } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";
import { Group } from "@visx/group";
import { Indicator } from "types";
import { level } from "qmongjs";

export type Box = {
  bin: number;
  count: number;
};

export type HeatMapColumn = {
  bin: number;
  bins: Box[];
};

export const createHeatmapData = (indicatorData: Indicator[]) => {

  const uniqueValues = (value, index, array) => {return(array.indexOf(value) === index)}

  const unitNames = indicatorData.map((row) => row.unit_name)
    .filter(uniqueValues);

  const indIDs = indicatorData.map((row) => row.ind_id)
    .filter(uniqueValues);


  const heatmapData = indIDs.map((indID, indIndex) => {
    const indBin = indIndex;

    const bins = unitNames.map((unitName, unitIndex) => {
      const unitBin = unitIndex;
      
      const count = level(
        indicatorData.find((row) => {
          return(row.ind_id === indID && row.unit_name === unitName)
        })
      )

      return({bin: unitBin, count: count === "L" ? 0 : count === "M" ? 1 : count === "H" ? 2 : null} as Box)
    })

    return({bin: indBin, bins: bins} as HeatMapColumn)
  })

  return(heatmapData as HeatMapColumn[])
};

const rectColorScale = (x: number) => {
  switch (x) {
    case 0: {
      return "#e30713";
    }
    case 1: {
      return "#fd9c00";
    }
    case 2: {
      return "#3baa34";
    }
  }
};

export type HeatmapProps = {
  data: HeatMapColumn[];
  width: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
};

const defaultMargin = { top: 0, left: 0, right: 0, bottom: 0 };

export const HeatMap = ({
  data,
  width,
  events = true,
  margin = defaultMargin,
  separation = 3,
}: HeatmapProps) => {
  // Bounds
  const nRows = data[0].bins.length;
  const nCols = data.length;

  const binWidth = width / nCols;
  const height = binWidth * nRows;

  // Scales
  const xScale = scaleLinear<number>({
    domain: [0, nCols],
    range: [0, width],
  });

  const yScale = scaleLinear<number>({
    domain: [0, nRows],
    range: [0, height],
  });

  return (
    <svg
      width={width + margin.left + margin.right + separation}
      height={height + margin.top + margin.bottom + separation}
    >
      <Group left={margin.left + separation} top={margin.top}>
        <HeatmapRect
          data={data}
          xScale={(d) => xScale(d) ?? 0}
          yScale={(d) => yScale(d) ?? 0}
          colorScale={rectColorScale}
          binWidth={binWidth}
          binHeight={binWidth}
          gap={separation}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  className="visx-heatmap-rect"
                  width={bin.width}
                  height={bin.height}
                  x={bin.x}
                  y={bin.y}
                  fill={bin.color}
                  onClick={() => {
                    if (!events) return;
                    const { row, column } = bin;
                    alert(JSON.stringify({ row, column, bin: bin.bin }));
                  }}
                />
              )),
            )
          }
        </HeatmapRect>
      </Group>
    </svg>
  );
};
