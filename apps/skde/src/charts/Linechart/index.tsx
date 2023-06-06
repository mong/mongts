import { Grid, Axis, LineSeries, XYChart, Tooltip } from "@visx/xychart";
import {
  customFormat,
  customFormatEng,
} from "../../helpers/functions/localFormater";

export type LinechartData<
  Data,
  X extends keyof Data,
  Y extends keyof Data,
  Label extends keyof Data
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
  Label extends string & keyof Data
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
};

export const Linechart = <
  Data,
  X extends string & keyof Data,
  Y extends string & keyof Data,
  Label extends string & keyof Data
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
}: LinechartProps<Data, X, Y, Label>) => {
  let uniqueLabels = Array.from(new Set(data.map((d) => d[label])));

  const values = uniqueLabels.map((l) => {
    return {
      label: l,
      points: data
        .flatMap((d) => {
          if (d[label] === l) {
            return { x: d[x], y: d[y] };
          } else {
            return [];
          }
        })
        .sort((a, b) => a.x - b.x),
    };
  });

  const accessors = {
    xAccessor: (d) =>
      format_x === "month"
        ? new Date(2020, d.x - 1).toLocaleString(lang, { month: "long" })
        : d.x,
    yAccessor: (d) =>
      format_y
        ? lang === "en"
          ? customFormatEng(format_y)(d.y)
          : customFormat(format_y)(d.y)
        : d.y,
  };

  return (
    <div style={{ width: "auto", margin: "auto" }}>
      <XYChart
        height={500}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <Axis
          orientation="bottom"
          label={xLabel[lang]}
          labelProps={{
            fontSize: 14,
            textAnchor: "middle",
            fontWeight: "bold",
          }}
          tickFormat={(val) =>
            format_x === "month"
              ? new Date(2020, val - 1).toLocaleString(lang, { month: "short" })
              : val
          }
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
            format_y
              ? lang === "en"
                ? customFormatEng(format_y)(val)
                : customFormat(format_y)(val)
              : val.toString()
          }
        />
        <Grid columns={false} numTicks={4} />
        {values.map((plots, i) => (
          <LineSeries
            dataKey={plots.label}
            data={plots.points}
            xAccessor={(d) => d.x}
            yAccessor={(d) => d.y}
            key={i}
          />
        ))}
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => (
            <div>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              {": "}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          )}
        />
      </XYChart>
    </div>
  );
};
