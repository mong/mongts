import React, { useCallback } from "react";
import { scaleLinear } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";
import { Group } from "@visx/group";
import { Indicator } from "types";
import { level } from "qmongjs";
import { AxisLeft, AxisTop } from "@visx/axis";
import { scaleOrdinal, scaleBand } from "@visx/scale";
import { withTooltip, TooltipWithBounds } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { Stack, Typography } from "@mui/material";
import { localPoint } from "@visx/event";

type HeatMapBox = {
  bin: number;
  registry: string;
  registryShortName: string;
  indID: string;
  unitName: string;
  indTitle: string;
  count: number;
};

type HeatMapColumn = {
  bin: number;
  bins: HeatMapBox[];
};

type HeatMapData = {
  data: HeatMapColumn[];
  xTicks: string[];
};

const tickLabelProps = {
  fontSize: 20,
  fontFamily: "sans-serif",
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
        registry: indRow?.registry_name,
        registryShortName: indRow?.registry_short_name,
        unitName: unitName,
        indID: indID,
        indTitle: indRow?.ind_title,
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
  year: number;
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
    year,
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

    const handleToolTip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>,
      ) => {
        // eslint-disable-next-line prefer-const
        let { x, y } = localPoint(event) || { x: 0, y: 0 }; // SVG cordinates

        // Find the bin number from x and y coordinates.
        let xStep = margin.left + binWidth;
        let xInd = 0;

        while (xStep < x) {
          xStep += separation + binWidth;
          xInd += 1;
        }

        let yStep = margin.top + binWidth;
        let yInd = 0;

        while (yStep < y) {
          yStep += separation + binWidth;
          yInd += 1;
        }

        const data = heatmapData.data[xInd].bins[yInd];

        const selectedBox = {
          bin: data.bin,
          registry: data.registry,
          registryShortName: data.registryShortName,
          unitName: data.unitName,
          indID: data.indID,
          indTitle: data.indTitle,
          count: data.count,
        };

        showTooltip({
          tooltipData: selectedBox,
          tooltipLeft: x,
          tooltipTop: y,
        });
      },
      [showTooltip, xScale, yScale],
    );

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
                        if (!events || bin.count! < 0) return;
                        const data = bin.bin as HeatMapBox;
                        window.open(
                          "/behandlingskvalitet/" +
                            data.registry +
                            "?selected_row=" +
                            data.indID +
                            "&selected_treatment_units=Nasjonalt_" +
                            data.unitName +
                            "&year=" +
                            year,
                          "_blank",
                        );
                      }}
                      onTouchStart={handleToolTip}
                      onTouchMove={handleToolTip}
                      onMouseMove={handleToolTip}
                      onMouseLeave={() => hideTooltip()}
                      style={{
                        cursor: bin.count! >= 0 ? "pointer" : "default",
                      }}
                    />
                  )),
                )
              }
            </HeatmapRect>

            <AxisLeft
              scale={yAxisScale}
              hideAxisLine={true}
              numTicks={nRows}
              tickLabelProps={tickLabelProps}
            />
            <AxisTop
              scale={xAxisScale}
              hideAxisLine={true}
              numTicks={nCols}
              tickLabelProps={tickLabelProps}
            />
          </Group>
        </svg>
        {tooltipData && (
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop - 50}
            left={tooltipLeft}
          >
            <Stack direction="column">
              <Typography>{tooltipData.registryShortName}</Typography>
              <Typography>{tooltipData.indTitle}</Typography>
              <Typography>{tooltipData.unitName}</Typography>
            </Stack>
          </TooltipWithBounds>
        )}
      </>
    );
  },
);
