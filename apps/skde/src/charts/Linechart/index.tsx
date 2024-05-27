import { Grid, Axis, LineSeries, XYChart, DataContext } from "@visx/xychart";
import { scaleOrdinal } from "@visx/scale";
import { useBohfQueryParam } from "../../helpers/hooks";
import { customFormat } from "qmongjs";
import { ColorLegend } from "./ColorLegend";
import { linechartColors } from "../colors";
import React from "react";
import { localPoint } from "@visx/event";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";

export type LinechartData<
  Data,
  X extends keyof Data,
  Y extends keyof Data,
  Label extends keyof Data,
> = {
  [k in keyof Data & keyof X]: number;
} & {
  [k in Y]: number;
} & {
  [k in keyof Data]?: number | string;
} & {
  [k in keyof Data & keyof Label]?: string;
};

type LinechartProps<
  Data,
  X extends string & keyof Data,
  Y extends string & keyof Data,
  Label extends string & keyof Data,
> = {
  data: LinechartData<Data, X, Y, Label>[];
  x: X;
  y: Y;
  label: Label;
  lang: "en" | "nb" | "nn";
  xLabel?: { en: string; nb: string; nn: string };
  yLabel?: { en: string; nb: string; nn: string };
  format_x?: string;
  format_y?: string;
  national?: string;
};

const Lines = ({ hoverRef, values, colorScale, isBohf }) => {
  return values.map((lineData, i) => {
    const colorAccessor = () => {
      if (lineData.isSelected || hoverRef.current?.key === lineData.labelText)
        return colorScale(lineData.labelText);
      else return "rgb(239, 239, 239)";
    };

    return (
      <LineSeries
        colorAccessor={colorAccessor}
        strokeWidth={isBohf && lineData.isSelected ? 5 : 2}
        dataKey={lineData.labelText}
        data={lineData.points}
        xAccessor={(d) => d.x}
        yAccessor={(d) => d.y}
        key={i}
      />
    );
  });
};

const MyTooltip = ({ hoverRef, mousePosRef, render }) => {
  const { xScale, yScale, dataRegistry } = React.useContext(DataContext);

  const dataPoints = dataRegistry.entries().flatMap((entry) => {
    return entry.data.map((d) => ({
      x: d.x,
      y: d.y,
      key: entry.key,
      dist: Infinity,
    }));
  });

  const findClosest = (best, datum) => {
    const graphX = Number(xScale(datum.x));
    const graphY = Number(yScale(datum.y));
    const dist = Math.sqrt(
      (mousePosRef.current.x - graphX) ** 2 +
        (mousePosRef.current.y - graphY) ** 2,
    );
    // ^ Pythagorean theorem
    return best.dist < dist
      ? best
      : { ...datum, graphX: graphX, graphY: graphY, dist: dist };
  };

  hoverRef.current = dataPoints.reduce(findClosest);

  return (
    <>
      {render()}
      <circle
        cx={hoverRef.current.graphX}
        fill={linechartColors[0]}
        cy={hoverRef.current.graphY}
        stroke={"white"}
        r="4"
      />
    </>
  );
};

export const Linechart = <
  Data,
  X extends string & keyof Data,
  Y extends string & keyof Data,
  Label extends string & keyof Data,
>({
  data,
  x,
  y,
  label,
  lang,
  xLabel,
  yLabel,
  format_x,
  format_y,
  national,
}: LinechartProps<Data, X, Y, Label>) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  const [selectedBohfs, toggleBohf] = useBohfQueryParam(national);
  const isBohf = label === "bohf";

  const allLabels: string[] = Array.from(new Set(data.map((d) => d[label])));
  let nonSelectedLabels = [];
  let selectedLabels: string[] = allLabels;

  const hoverRef = React.useRef(null);
  const mousePosRef = React.useRef({ x: 0, y: 0 });

  if (isBohf) {
    nonSelectedLabels = selectedLabels.filter(
      (item) => !selectedBohfs.has(item),
    );
    selectedLabels = [national].concat(
      selectedLabels.filter((item) => selectedBohfs.has(item)),
    );
  }

  const plotableData = (labels: string[]) => {
    // put data in a plotable format
    return labels.map((labelText) => ({
      labelText: labelText,
      isSelected: selectedLabels.includes(labelText),
      points: data
        .flatMap((d) => (d[label] === labelText ? { x: d[x], y: d[y] } : []))
        .sort((a, b) => a.x - b.x),
    }));
  };

  const allValues = plotableData(nonSelectedLabels).concat(
    plotableData(selectedLabels),
  );

  const yvaluesMaxTextLength = Math.max(
    ...data.map(
      (d) =>
        (format_y ? customFormat(format_y, lang)(d[y]) : d[y]).toString()
          .length,
    ),
  );

  const colorScale = scaleOrdinal({
    domain: allLabels,
    range: linechartColors,
  });
  return (
    <div ref={containerRef} style={{ width: "auto", margin: "auto" }}>
      <XYChart
        height={500}
        xScale={{ type: "point", padding: 0.02 }}
        yScale={{ type: "linear" }}
        margin={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 18 + yvaluesMaxTextLength * 8,
        }}
        onPointerMove={(e) => {
          const coords = localPoint(e.event.target.ownerSVGElement, e.event);
          showTooltip({
            tooltipLeft: coords.x + 25,
            tooltipTop: coords.y - 15,
            tooltipData: e.svgPoint,
          });
          mousePosRef.current = e.svgPoint;
        }}
        onPointerOut={() => {
          hoverRef.current = null;
          hideTooltip();
        }}
        onPointerDown={() => isBohf && toggleBohf(hoverRef.current.key)}
      >
        <Axis
          orientation="bottom"
          label={xLabel[lang]}
          labelProps={{
            fontSize: 14,
            textAnchor: "middle",
            fontWeight: "bold",
          }}
          tickLabelProps={() => ({
            fontSize: 14,
            fill: "black",
          })}
          tickFormat={(val) =>
            format_x === "month"
              ? new Date(2020, val - 1).toLocaleString(lang, { month: "short" })
              : val
          }
          numTicks={11}
        />
        <Axis
          orientation="left"
          tickLabelProps={() => ({
            fontSize: 14,
            fill: "black",
            textAnchor: "end",
          })}
          numTicks={4}
          label={yLabel[lang]}
          labelProps={{
            fontSize: 14,
            textAnchor: "start",
            fontWeight: "bold",
            x: -50,
            y: 25,
            transform: "",
          }}
          stroke="black"
          tickFormat={(val) =>
            format_y ? customFormat(format_y, lang)(val) : val.toString()
          }
        />
        <Grid columns={false} numTicks={4} />
        <Lines
          hoverRef={hoverRef}
          values={allValues}
          colorScale={colorScale}
          isBohf={isBohf}
        />
        {tooltipOpen && (
          <MyTooltip
            hoverRef={hoverRef}
            mousePosRef={mousePosRef}
            render={() => (
              <TooltipInPortal
                // set this to random so it correctly updates with parent bounds
                key={Math.random()}
                top={tooltipTop}
                left={tooltipLeft}
              >
                Bohf: <strong>{hoverRef.current?.key}</strong>
                <br />
                Datalocation{" "}
                <strong>
                  ({Math.round(hoverRef.current?.x)}, {hoverRef.current?.y})
                </strong>
                <br />
                Closest:{" "}
                <strong>
                  ({Math.round(hoverRef.current?.graphX)},{" "}
                  {Math.round(hoverRef.current?.graphY)})
                </strong>{" "}
                Distance: <strong>{Math.round(hoverRef.current?.dist)}</strong>
                <br />
                Mouse{" "}
                <strong>
                  ({Math.round(tooltipData.x)}, {Math.round(tooltipData.y)})
                </strong>
              </TooltipInPortal>
            )}
          />
        )}
      </XYChart>
      <ColorLegend colorScale={colorScale} values={selectedLabels} />
    </div>
  );
};
