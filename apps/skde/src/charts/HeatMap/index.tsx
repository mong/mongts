import React from "react";
import { scaleLinear } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";
import { Group } from "@visx/group";
import { Indicator } from "types";
import { level } from "qmongjs";
import { Axis, AxisLeft, AxisTop } from "@visx/axis";
import { scaleBand } from "@visx/scale";

export type Box = {
  bin: number;
  name: string;
  count: number;
};

export type HeatMapColumn = {
  bin: number;
  bins: Box[];
};

export type HeatMapData = {
  data: HeatMapColumn[];
  xTicks: string[];
  yTicks: string[];
};

export const createHeatmapData = (
  indicatorData: Indicator[],
  unitNames: string[],
  indIDs: string[],
) => {
  const heatmapData = indIDs.map((indID, indIndex) => {
    const indBin = indIndex;

    const bins = unitNames.map((unitName, unitIndex) => {
      const unitBin = unitIndex;

      const indRow = indicatorData.find((row) => {
        return row.ind_id === indID && row.unit_name === unitName;
      });

      let count: string;
      indRow ? (count = level(indRow)) : (count = null);

      return {
        bin: unitBin,
        name: indID + " " + unitName,
        count: count === "L" ? 0 : count === "M" ? 1 : count === "H" ? 2 : -1,
      } as Box;
    });

    return { bin: indBin, bins: bins } as HeatMapColumn;
  });

  return {
    data: heatmapData as HeatMapColumn[],
    xTicks: unitNames,
    yTicks: indIDs,
  } as HeatMapData;
};

const rectColorScale = (x: number) => {
  switch (x) {
    case -1: {
      return "#222222";
    }
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
  heatmapData: HeatMapData;
  width: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
};

const defaultMargin = { top: 50, left: 150, right: 0, bottom: 0 };

export const HeatMap = ({
  heatmapData,
  width,
  events = true,
  margin = defaultMargin,
  separation = 3,
}: HeatmapProps) => {
  let { data, xTicks, yTicks } = heatmapData;

  data = data.filter((col) => {
    return col.bins.map((bin) => bin.count).every((v) => v !== -1);
  });

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

  const xAxisScale = scaleBand<string>({
    domain: xTicks,
    range: [0, height],
  });

  const yAxisScale = scaleBand<number>({
    domain: Array.from({ length: nCols }, (_, i) => i + 1),
    range: [0, width],
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

        <AxisLeft scale={xAxisScale} hideAxisLine={true} numTicks={nRows} />
        <AxisTop scale={yAxisScale} hideAxisLine={true} numTicks={nCols} />
      </Group>
    </svg>
  );
};
