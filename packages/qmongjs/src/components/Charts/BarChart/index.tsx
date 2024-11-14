import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef } from "react";
import { useResizeObserver } from "../../../helpers/hooks";
import styles from "./BarChart.module.css";
import { levelColor } from "../utils";
import { Level, Margin } from "../types";
import { customFormat } from "../../../helpers/functions/localFormater";
import { Typography } from "@mui/material";
import { Description } from "types";

export interface BarStyle {
  opacity?: number;
  color?: string;
}

export interface Bar {
  label: string;
  value: number;
  denominator: number;
  style?: BarStyle;
}
export interface Props {
  svgContainerRef: React.RefObject<HTMLDivElement>;
  showLevel: boolean;
  data: Bar[];
  levels: Level[];
  tickformat?: string;
  zoom?: boolean;
  margin?: Margin;
  max_value?: number;
  lastCompleteYear?: number;
  description: Description;
}

const getLabel = (d: Bar) => {
  return d.label + " (n=" + d.denominator + ")";
};

const MARGIN = { top: 0.05, bottom: 10, right: 0.05, left: 0.25 };

function BarChart(props: Props) {
  const {
    svgContainerRef: wrapperRef,
    data,
    showLevel: displayLevels,
    levels,
    tickformat,
    zoom = false,
    margin = {},
    max_value,
    lastCompleteYear,
    description,
  } = props;
  const svgRef = useRef<SVGSVGElement>(null);
  const entry = useResizeObserver(wrapperRef);
  const height = Math.max(data.length * 30, 150);
  const width = entry?.contentRect.width ?? 0;

  const marginOffsets = {
    top: margin.top ?? MARGIN.top,
    right: (margin.right ?? MARGIN.right) * width,
    bottom: margin.bottom ?? MARGIN.bottom,
    left: (margin.left ?? MARGIN.left) * width,
  };
  const innerHeight = height - marginOffsets.top - marginOffsets.bottom;
  const innerWidth = width - marginOffsets.left - marginOffsets.right;
  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = select(svgRef.current).selectChild<SVGGElement>();
    // Scales
    const yScale = scaleBand()
      .domain(data.map((d) => getLabel(d)))
      .range([0, innerHeight])
      .padding(0.3);

    // Check if format is percentage
    const percentage: boolean =
      typeof tickformat === "string"
        ? tickformat.substring(tickformat.length - 1) === "%"
          ? true
          : false
        : false;

    const xScaleDomain = getXScaleDomain(data, zoom, percentage, max_value);
    const xScale = scaleLinear()
      .domain(xScaleDomain)
      .range([0, innerWidth])
      .clamp(true);

    const yAxis = axisLeft(yScale);
    const yAxisElement = svg.select<SVGGElement>(".y-axis");
    yAxisElement.call(yAxis);
    yAxisElement.select(".domain").remove();
    yAxisElement.selectAll(".tick line").remove();
    yAxisElement.selectAll(".tick text").attr("font-size", "1.2rem");

    // X-Axis format, delete trailing zero
    const xAxisFormat = percentage
      ? "~%" // if percentage format -> delete trailing zero
      : "~";

    const barLabelFormat = typeof tickformat === "string" ? tickformat : ",.0f";

    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .ticks(6)
      .tickFormat(customFormat(xAxisFormat));
    const xAxisElement = svg.select<SVGGElement>(".x-axis");
    xAxisElement
      .style("transform", `translateY(${innerHeight}px)`)
      .transition()
      .duration(1000)
      .call(xAxis);
    xAxisElement.select(".domain").remove();
    xAxisElement.selectAll(".tick line").attr("stroke", "#D2D3D4");
    xAxisElement
      .selectAll(".tick text")
      .attr("fill", "#828586")
      .attr("font-size", "18.57px");

    // Levels
    svg
      .select(".levels")
      .selectAll(".level")
      .data(displayLevels ? levels : [])
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "level")
            .attr("data-testid", ({ level }) => `level-${level}`)
            .attr("x", ({ end }) => xScale(end))
            .attr("y", 0)
            .attr("width", ({ start, end }) => xScale(start) - xScale(end))
            .attr("height", innerHeight)
            .attr("fill", ({ level }) => levelColor(level))
            .attr("opacity", 0.2),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(1000)
              .attr("x", ({ end }) => xScale(end))
              .attr("width", ({ start, end }) => xScale(start) - xScale(end)),
          ),
        (exit) => exit.remove(),
      );

    svg
      .select(".bars")
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("data-testid", (d) => `bar-${getLabel(d)}`)
      .attr("x", 0)
      .attr("y", (d) => yScale(getLabel(d)) ?? 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => d.style?.color ?? "#7EBEC7")
      .attr("opacity", (d) => d.style?.opacity ?? 1)
      .transition()
      .duration(1000)
      .attr("width", (d) => xScale(d.value));

    svg
      .select(".labels")
      .selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("data-testid", (d) => `bar-label-${getLabel(d)}`)
      .attr("opacity", 0.3)
      .attr("x", 0)
      .attr("y", (d) => yScale(getLabel(d))! + yScale.bandwidth() / 2 + 3)
      .text((d) => customFormat(barLabelFormat)(d.value))
      .attr("text-anchor", "middle")
      .attr("font-size", "0.7em")
      .attr("fill", "white")
      .transition()
      .duration(1000)
      .attr("opacity", 0.9)
      .attr("fill", (d) => (d.value > 0.95 ? "white" : "black"))
      .attr("x", (d) =>
        d.value > 0.95 ? xScale(d.value) - 18 : xScale(d.value) + 16,
      );
  }, [
    data,
    displayLevels,
    levels,
    tickformat,
    zoom,
    innerHeight,
    innerWidth,
    max_value,
  ]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: "90%", margin: "auto", position: "relative" }}
      className="barchart-wrapper"
    >
      <svg
        ref={svgRef}
        className={styles.barChart}
        height={marginOffsets.top + height + marginOffsets.bottom}
        width={width}
        style={{ backgroundColor: "white" }}
      >
        <g transform={`translate(${marginOffsets.left}, ${marginOffsets.top})`}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="levels" />
          <g className="bars" />
          <g className="labels" />
        </g>
        {lastCompleteYear && (
          <>
            <rect
              height={marginOffsets.top + height + marginOffsets.bottom}
              width={width}
              style={{ opacity: "0.10" }}
              rx="5"
            ></rect>
            <text
              textAnchor="middle"
              y={height / 2}
              x={width / 2 + 10}
              fill="#e30713"
              fontSize="2rem"
            >
              <tspan>Siste komplette år er {lastCompleteYear}</tspan>
            </text>
          </>
        )}
      </svg>
      <img
        src="/img/logos/logo-skde-graa.svg"
        width={width / 15}
        style={{ position: "relative", left: "88%", top: 0 }}
      />
      <Typography
        variant="subtitle1"
        style={{
          position: "relative",
          left: "13%",
          top: -32,
          width: "fit-content",
        }}
      >
        {"Kilde: " + description.full_name}
      </Typography>
    </div>
  );
}
export default BarChart;

function getXScaleDomain(
  data: Bar[],
  zoom: boolean,
  percentage: boolean,
  max_value?: number,
): [number, number] {
  const maxVal = Math.max(...data.map((d) => d.value));
  const additionalMargin = (0.01 + maxVal) * 0.2;
  const xMax = Math.ceil((maxVal + additionalMargin) * 100) / 100;

  // min is always 0 for barchart
  // If percentage and not zoom: max is 1
  // If not percentage and not zoom: max is max_value if defined
  return [
    0,
    percentage
      ? zoom
        ? Math.min(xMax, 1)
        : 1
      : zoom
        ? xMax
        : Math.max(max_value ?? xMax, xMax),
  ];
}
