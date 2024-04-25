import React, { useCallback } from "react";
import { extent, min, max, bisector } from "@visx/vendor/d3-array";
import { curveLinear } from "@visx/curve";
import { LinePath, Bar } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Legend, LegendItem, LegendLabel } from "@visx/legend";
import { customFormat } from "qmongjs";
import { LinechartGrid } from "qmongjs";
import { GridRows } from "@visx/grid";
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
  levelGreen?: number;
  levelYellow?: number;
  levelDirection?: number;
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
    levelGreen,
    levelYellow,
    levelDirection,
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

    const allData = data.reduce((rec, d) => rec.concat(d), []);

    const nXTicks = data[0].length;

    yMin = yMin ?? min(allData, getY)!;
    yMax = yMax ?? max(allData, getY)!;

    // scales
    const xScale = scaleTime<number>({
      domain: extent(allData, getX) as [Date, Date],
    });

    const yScale = scaleLinear<number>({
      domain: [yMin!, yMax!],
    });

    const xMin = xScale.domain()[0];
    const xMax = xScale.domain()[1];

    const borderWidth = 100;

    // update scale output ranges
    xScale.range([borderWidth, width - borderWidth]);
    yScale.range([height - borderWidth, borderWidth]);

    const yAxisLabelDisplacementFactor = 0.5;

    const yLabelProps = {
      fontSize: font.fontSize,
      x: -height * yAxisLabelDisplacementFactor,
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

    const bisectDate = bisector<LinechartData, Date>((d) => {
      return d.x;
    }).center;

    // Tooltip handler
    const handleToolTip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>,
      ) => {
        // x and y are the SVG coordinates
        // u and v are the plot coordinates
        const { x, y } = localPoint(event) || { x: 0 }; // SVG cordinates
        const u = xScale.invert(x); // Plot coordinates
        const v = yScale.invert(y);

        let u_nearest = new Date(Math.round(u.getFullYear()), 0);
        // Stop the cursor from snapping to the first year to the left of the y-axis
        if (u_nearest < xScale.domain()[0]) {
          u_nearest = xScale.domain()[0];
        } else if (u_nearest > xScale.domain()[1]) {
          u_nearest = xScale.domain()[1];
        }

        const x_nearest = xScale(u_nearest);

        const goal = v;
        const v_nearest = data
          .map((row) => {
            const validPoints = row.filter((p) => {
              return p.x.getFullYear() === u_nearest.getFullYear();
            });

            const ind = bisectDate(validPoints, u_nearest);

            const retVal = validPoints.length > 0 ? validPoints[ind].y : null;
            return retVal;
          })
          .filter((arr) => arr !== null)
          .reduce((prev, curr) => {
            return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
          });

        const y_nearest = yScale(v_nearest);

        showTooltip({
          tooltipData: {x: u_nearest, y: v_nearest },
          tooltipLeft: x_nearest,
          tooltipTop: y_nearest,
        });
      },
      [showTooltip, xScale, yScale],
    );

    const background =
      levelGreen &&
      levelYellow &&
      (levelDirection === 0 || levelDirection === 1)
        ? LinechartGrid({
            xStart: xScale(xMin),
            xStop: xScale(xMax),
            yStart: yScale(yMax),
            yStop: yScale(yMin),
            levelGreen: yScale(levelGreen),
            levelYellow: yScale(levelYellow),
            levelDirection: levelDirection,
          })
        : null;

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
          {background}
          <Group>
            <GridRows
              numTicks={5}
              scale={yScale}
              left={xScale(xMin)}
              width={xScale(xMax) - xScale(xMin)}
              height={yMax}
              stroke="#989898"
            />
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
              width={width}
              height={height}
              fill="transparent"
              rx={14}
              onTouchStart={handleToolTip}
              onTouchMove={handleToolTip}
              onMouseMove={handleToolTip}
              onMouseLeave={() => hideTooltip()}
            />
            {tooltipData && (
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={6}
                fill={"#000000"}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            )}
          </Group>
        </svg>
        {tooltipData && (
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft}
              style={tooltipStyles}
            >
              {tooltipData.y}
            </TooltipWithBounds>
        )}
      </div>
    );
  },
);
