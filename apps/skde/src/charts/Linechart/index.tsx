import { Grid, Axis, LineSeries, XYChart, Tooltip } from "@visx/xychart";
import { scaleOrdinal } from "@visx/scale";
import { customFormat } from "qmongjs";
import { ColorLegend } from "./ColorLegend";
import { linechartColors } from "../colors";

type LinechartData<Data, X extends keyof Data> = {
  [k in keyof Data & keyof X]: number;
} & {
  [k in keyof Data]?: number | string;
};

type LinechartProps<Data, X extends string & keyof Data> = {
  data: LinechartData<Data, X>[];
  x: X;
  linevars: string[];
  linevarsLabels: { en: string[]; nb: string[]; nn: string[] };
  lang: "en" | "nb" | "nn";
  xLabel?: { en: string; nb: string; nn: string };
  yLabel?: { en: string; nb: string; nn: string };
  format_x?: string;
  format_y?: string;
  linecolors?: string[];
  national?: string;
};

export const Linechart = <Data, X extends string & keyof Data>({
  data,
  x,
  linevars,
  linevarsLabels,
  lang,
  xLabel,
  yLabel,
  format_x,
  format_y,
  linecolors,
}: LinechartProps<Data, X>) => {
  const getLinevarLabel = (linevar) =>
    linevarsLabels[lang][linevars.findIndex((v) => v === linevar)];

  const values = linevars.map((linevar) => {
    return {
      linevar: linevar,
      linevarLabel: getLinevarLabel(linevar),
      points: data
        .map((d) => ({ x: d[x], y: d[linevar] }))
        .sort((a, b) => a.x - b.x),
    };
  });

  const accessors = {
    xAccessor: (d) =>
      format_x === "month"
        ? new Date(2020, d.x - 1).toLocaleString(lang, { month: "long" })
        : d.x,
    yAccessor: (d) => (format_y ? customFormat(format_y, lang)(d.y) : d.y),
  };

  const yvaluesMaxTextLength = Math.max(
    ...data.flatMap((d) =>
      linevars.map(
        (linevar) =>
          (format_y
            ? customFormat(format_y, lang)(d[linevar])
            : d[linevar]
          ).toString().length,
      ),
    ),
  );

  const colorScale = scaleOrdinal({
    domain: values.map((s) => s.linevar),
    range: [...(linecolors || []), ...linechartColors],
  });

  return (
    <div style={{ width: "auto", margin: "auto" }}>
      <XYChart
        height={500}
        xScale={{ type: "band", paddingOuter: 0 }}
        yScale={{ type: "linear" }}
        margin={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 55 + yvaluesMaxTextLength,
        }}
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
        {values.map((plots, i) => (
          <LineSeries
            strokeWidth={2}
            dataKey={plots.linevar}
            data={plots.points}
            xAccessor={(d) => d.x}
            yAccessor={(d) => d.y}
            key={i}
            colorAccessor={colorScale}
          />
        ))}
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          glyphStyle={{ fill: linechartColors[0] }}
          renderTooltip={({ tooltipData }) => (
            <div>
              <div>
                {xLabel[lang].split(/[^A-Za-zæøåÆØÅ]/)[0]}
                {": "}
                {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              </div>
              {Object.keys(tooltipData.datumByKey)
                .filter(function (value) {
                  return linevars.includes(value);
                })
                .map((d) => {
                  return (
                    <div key={d}>
                      <div style={{ color: colorScale(d) }}>
                        {getLinevarLabel(d)}
                        {": "}
                        {accessors.yAccessor(tooltipData.datumByKey[d].datum)}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        />
      </XYChart>
      <ColorLegend
        colorScale={colorScale}
        values={linevars}
        getLabel={getLinevarLabel}
      />
    </div>
  );
};
