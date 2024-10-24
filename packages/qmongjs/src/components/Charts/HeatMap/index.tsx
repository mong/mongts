import React, { useCallback } from "react";
import { scaleLinear } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";
import { Group } from "@visx/group";
import { Indicator } from "types";
import { level } from "qmongjs";
import { AxisLeft, AxisTop } from "@visx/axis";
import { scaleOrdinal, scaleBand } from "@visx/scale";
import { withTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { Box } from "@mui/material";
import { localPoint } from "@visx/event";
import { RectCell } from "@visx/heatmap/lib/heatmaps/HeatmapRect";

type HeatMapBox = {
  bin: number;
  name: string;
  count: number;
};

export type HeatMapColumn = {
  bin: number;
  bins: HeatMapBox[];
};

type HeatMapData = {
  data: HeatMapColumn[];
  xTicks: string[];
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

      const count: string | undefined = indRow ? level(indRow) : undefined;

      return {
        bin: unitBin,
        name: indID + " " + unitName,
        count: count === "L" ? 0 : count === "M" ? 1 : count === "H" ? 2 : -1,
      } as HeatMapBox;
    });

    return { bin: indBin, bins: bins } as HeatMapColumn;
  });

  return {
    data: heatmapData as HeatMapColumn[],
    xTicks: unitNames,
  } as HeatMapData;
};

const rectColorScale = scaleOrdinal<
  number | { valueOf(): number },
  string | undefined
>({
  range: ["#e30713", "#fd9c00", "#3baa34", "#EEEEEE"],
  domain: [0, 1, 2, -1],
});

type HeatmapProps = {
  heatmapData: HeatMapData;
  width: number;
  minBoxWidth?: number;
  maxBoxWidth?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
};

const defaultMargin = { top: 50, left: 200, right: 0, bottom: 0 };

export const HeatMap = withTooltip<HeatmapProps, HeatMapBox>(
  ({
  heatmapData,
  width,
  minBoxWidth,
  maxBoxWidth,
  events = true,
  margin = defaultMargin,
  separation = 3,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
}: HeatmapProps & WithTooltipProvidedProps<HeatMapBox>) => {
  const data = heatmapData.data;
  const xTicks = heatmapData.xTicks;

  // Bounds
  const nRows = data[0].bins.length;
  const nCols = data.length;

  let binWidth = width / nCols;

  if (minBoxWidth && binWidth < minBoxWidth) {
    binWidth = minBoxWidth;
    width = binWidth * nCols;
  }

  if (maxBoxWidth && binWidth > maxBoxWidth) {
    binWidth = maxBoxWidth;
    width = binWidth * nCols;
  }

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

  const yAxisScale = scaleBand<string>({
    domain: xTicks,
    range: [0, height],
  });

  const xAxisScale = scaleBand<number>({
    domain: Array.from({ length: nCols }, (_, i) => i + 1),
    range: [0, width],
  });

  const handleToolTip = (bin: RectCell<HeatMapColumn, unknown>) => {
    
    return(useCallback
      (
    (
      event:
        | React.TouchEvent<SVGRectElement>
        | React.MouseEvent<SVGRectElement>,
    ) => {

        // eslint-disable-next-line prefer-const
        let { x, y } = localPoint(event) || { x: 0 }; // SVG cordinates
        y = y ? y : 0;

        const data = bin.bin as HeatMapBox

        const selectedBox = {
          bin: 2,
        name: data.name,
        count: 10,
        }

      showTooltip({
        tooltipData: selectedBox,
        tooltipLeft: x,
        tooltipTop: y,
      });
    },
    [showTooltip, xScale, yScale],
  )
)}

  return (
    <>
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
                    alert(JSON.stringify(bin.bin));
                  }}
                  onTouchStart={handleToolTip(bin)}
                  onTouchMove={handleToolTip(bin)}
                  onMouseMove={handleToolTip(bin)}
                  onMouseLeave={() => hideTooltip()}
                />
              )),
            )
          }
        </HeatmapRect>

        <AxisLeft scale={yAxisScale} hideAxisLine={true} numTicks={nRows} />
        <AxisTop scale={xAxisScale} hideAxisLine={true} numTicks={nCols} />
      </Group>
    </svg>
    {tooltipData && (
      <TooltipWithBounds
      key={Math.random()}
      top={tooltipTop - 50}
      left={tooltipLeft}

    >
      <Box width={100} height={100} sx={{backgroundColour: "blue"}}>
            {
            tooltipData.count.toString() + " " +
            tooltipData.name.toString()}
            </Box>
          </TooltipWithBounds>
)}
    </>
  );
},
)
