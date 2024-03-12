import React from "react";
import { scaleLinear } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";

type Box = {
  bin: number;
  count: number;
};

type HeatMapColumn = {
  bin: number;
  bins: Box[];
};

const binData2: HeatMapColumn[] = [
  {
    bin: 0,
    bins: [
      { bin: 0, count: 2 },
      { bin: 1, count: 2 },
      { bin: 2, count: 1 },
      { bin: 3, count: 2 },
    ],
  },
  {
    bin: 1,
    bins: [
      { bin: 0, count: 2 },
      { bin: 1, count: 2 },
      { bin: 2, count: 1 },
      { bin: 3, count: 2 },
    ],
  },
  {
    bin: 2,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 1 },
      { bin: 2, count: 0 },
      { bin: 3, count: 0 },
    ],
  },
  {
    bin: 3,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 2 },
      { bin: 2, count: 2 },
      { bin: 3, count: 2 },
    ],
  },
];

function max(data: any[], value: (d: any) => number): number {
  return Math.max(...data.map(value));
}

// accessors
const x = (d: HeatMapColumn) => d.bins;

const bucketSizeMax = max(binData2, (d) => x(d).length);

// scales
const xScale = scaleLinear<number>({
  domain: [0, binData2.length],
});

const yScale = scaleLinear<number>({
  domain: [0, bucketSizeMax],
});

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
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
};

const defaultMargin = { top: 0, left: 0, right: 0, bottom: 0 };

function Example({
  width,
  height,
  events = true,
  margin = defaultMargin,
}: HeatmapProps) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / binData2.length;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={binWidth + height}>
      <rect x={0} y={0} width={width} height={height} rx={0} fill={"#FFFFFF"} />

      <HeatmapRect
        data={binData2}
        xScale={(d) => xScale(d) ?? 0}
        yScale={(d) => yScale(d) ?? 0}
        colorScale={rectColorScale}
        binWidth={binWidth}
        binHeight={binWidth}
        gap={2}
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
    </svg>
  );
}

export default Example;
