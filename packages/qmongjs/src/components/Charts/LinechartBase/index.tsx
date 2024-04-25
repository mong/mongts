import React, { useCallback } from "react";
import { extent, min, max, bisector } from "@visx/vendor/d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath, Line, Bar } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinechartBackground } from "./LinechartBaseStyles";
import { Legend, LegendItem, LegendLabel } from "@visx/legend";
import { customFormat } from "qmongjs";
import { Group } from "@visx/group";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { timeFormat } from "@visx/vendor/d3-time-format";

export type LinechartData = {
  x: Date;
  y: number;
};

type lineStyle = {
  text: string;
  strokeDash: string;
  colour: string;
};

export type font = {
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
};

export class LineStyles {
  styles: lineStyle[];
  font: font;

  constructor(styles: lineStyle[], font: font) {
    this.styles = styles.map((row) => {
      return row;
    });
    this.font = font;
  }

  getLabels = () => {
    return this.styles.map((row) => row.text);
  };

  getPaths = () => {
    return this.styles.map((row, i) => {
      return (
        <path
          d="M0 1H30"
          stroke={row.colour}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={row.strokeDash}
          key={`linestyle-${i}`}
        />
      );
    });
  };
}

export const background = "#3b6978";
export const background2 = "#204051";
export const accentColor = "#edffea";
export const accentColorDark = "#75daad";
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: "1px solid white",
  color: "white",
};

const formatDate = timeFormat("%b %d, '%y");

export type LinechartBaseProps = {
  data: LinechartData[][];
  width: number;
  height: number;
  lineStyles: LineStyles;
  font: font;
  yAxisText: string;
  yMin?: number;
  yMax?: number;
  format_y?: string;
  lang?: "en" | "nb" | "nn";
};

export const LinechartBase = withTooltip<LinechartBaseProps, LinechartData>(
  ({
    data,
    width,
    height,
    lineStyles,
    font,
    yAxisText,
    yMin,
    yMax,
    format_y,
    lang = "nb",
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: LinechartBaseProps & WithTooltipProvidedProps<LinechartData>) => {
    // data accessors
    const getX = (d: LinechartData) => d.x;
    const getY = (d: LinechartData) => d.y;

    const getTooltipData = (d: LinechartData[], x: Date) => {
      return d.filter((el) => { return(el.x === x)})
    }

    const allData = data.reduce((rec, d) => rec.concat(d), []);

    const nXTicks = data[0].length;

    yMin = yMin ?? min(allData, getY);
    yMax = yMax ?? max(allData, getY);

    // scales
    const xScale = scaleTime<number>({
      domain: extent(allData, getX) as [Date, Date],
    });

    const yScale = scaleLinear<number>({
      domain: [yMin!, yMax!],
    });

    const borderWidth = 100;

    // update scale output ranges
    xScale.range([borderWidth, width - borderWidth]);
    yScale.range([height - borderWidth, borderWidth]);

    const yLabelProps = {
      fontSize: font.fontSize,
      x: -height / 1.7,
      fontFamily: font.fontFamily,
      fontWeight: font.fontWeight,
    };

    const xTicksProps = {
      fontSize: font.fontSize,
      fontFamily: font.fontFamily,
      fontWeight: font.fontWeight,
    };

    const legendScale = scaleOrdinal<string, React.JSX.Element>({
      domain: lineStyles.getLabels(),
      range: lineStyles.getPaths(),
    });

    const bisectDate = bisector<LinechartData[], Date>((d) => {
      return d[0]?.x;
    }).left;

    // Tooltip handler
    const handleToolTip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>,
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = xScale.invert(x);
        const nearestPoint = new Date(Math.round(x0.getFullYear()), 0);
        const x0_nearest = xScale(nearestPoint)
        const index = bisectDate(data, nearestPoint, 1);
        const d = data[0][index];
        console.log(d)
        
        showTooltip({
          tooltipData: {x: getX(d), y: getY(d)},
          tooltipLeft: x0_nearest,
          tooltipTop: d.y,
        });
      },
      [showTooltip, xScale, yScale],
    );

    return (
      <div className="visx-linechartbase">
        <Legend scale={legendScale}>
          {(labels) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "10%",
              }}
            >
              {labels.map((label, i) => {
                return (
                  <div style={{ padding: "10px" }} key={`legend-div-${i}`}>
                    <LegendItem key={`legend-${i}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="70"
                        height="6"
                        viewBox="0 0 40 1"
                        fill="none"
                      >
                        {label.value}
                      </svg>
                      <LegendLabel align="left" style={{ ...lineStyles.font }}>
                        {label.text}
                      </LegendLabel>
                    </LegendItem>
                  </div>
                );
              })}
            </div>
          )}
        </Legend>

        <svg className="linechartbase" width={width} height={height}>
          <LinechartBackground width={width} height={height} />
          {data.map((lineData, i) => {
            return (
              <Group>
                {lineData.map((d, j) => (
                  <circle
                    key={i + j}
                    r={3}
                    cx={xScale(getX(d))}
                    cy={yScale(getY(d))}
                    stroke={lineStyles.styles[i].colour}
                    fill={lineStyles.styles[i].colour}
                  />
                ))}
                <LinePath<LinechartData>
                  key={`lineid-${i}`}
                  curve={curveLinear}
                  data={lineData}
                  x={(d) => xScale(getX(d))}
                  y={(d) => yScale(getY(d))}
                  stroke={lineStyles.styles[i].colour}
                  strokeDasharray={lineStyles.styles[i].strokeDash}
                  shapeRendering="geometricPrecision"
                  strokeWidth={"2px"}
                  strokeLinejoin={"round"}
                  strokeLinecap={"square"}
                />
              </Group>
            );
          })}

          <AxisBottom
            scale={xScale}
            top={yScale.range()[0]}
            numTicks={nXTicks}
            tickLabelProps={xTicksProps}
          />
          <AxisLeft
            scale={yScale}
            left={borderWidth}
            label={yAxisText}
            labelProps={yLabelProps}
            tickFormat={(val) =>
              format_y ? customFormat(format_y, lang)(val) : val.toString()
            }
          />
          <Bar
            x={0}
            y={0}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleToolTip}
            onTouchMove={handleToolTip}
            onMouseMove={handleToolTip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: innerHeight }}
                stroke={"#000000"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={"#000000"}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>

        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {tooltipData.y}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
              }}
            >
              {formatDate(tooltipData.x)}
            </Tooltip>
          </div>
        )}
      </div>
    );
  },
);
