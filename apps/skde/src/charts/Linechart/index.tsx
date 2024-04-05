import { Grid, Axis, LineSeries, XYChart, Tooltip } from "@visx/xychart";
import { scaleOrdinal } from "@visx/scale";
import { useRouter } from "next/router";
import {
  customFormat,
  customFormatEng,
} from "qmongjs/src/helpers/localFormater";
import { ColorLegend } from "./ColorLegend";
import { linechartColors } from "../colors";

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
  const router = useRouter();
  const selected_bohf = [router.query.bohf].flat();

  var uniqueLabels: string[] = Array.from(new Set(data.map((d) => d[label])));
  var allNonSelectedHF = [];

  if (label === "bohf") {
    allNonSelectedHF = uniqueLabels.filter(
      (item) => ![national].concat(selected_bohf).includes(item),
    );
    uniqueLabels = [national].concat(
      uniqueLabels.filter((item) => selected_bohf.includes(item)),
    );
  }

  const plotableData = (
    uniqueLabels: string[],
    data: LinechartData<Data, X, Y, Label>[],
  ) => {
    // put data in a plotable format
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
    return values;
  };

  const values = plotableData(uniqueLabels, data);
  const greyValues = plotableData(allNonSelectedHF, data);

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
  const yvaluesMaxTextLength = Math.max(
    ...data.map(
      (d) =>
        (format_y
          ? lang === "en"
            ? customFormatEng(format_y)(d[y])
            : customFormat(format_y)(d[y])
          : d[y]
        ).toString().length,
    ),
  );

  const colorScale = scaleOrdinal({
    domain: values.map((s) => s.label),
    range: [...linechartColors],
  });

  return (
    <div style={{ width: "auto", margin: "auto" }}>
      <XYChart
        height={500}
        xScale={{ type: "band", paddingOuter: label === "bohf" ? -0.3 : 0 }}
        yScale={{ type: "linear" }}
        margin={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 50 + yvaluesMaxTextLength,
        }}
      >
        {greyValues.map((plots, i) => (
          <LineSeries
            stroke="rgb(229, 228, 226)"
            dataKey={plots.label}
            data={plots.points}
            xAccessor={(d) => d.x}
            yAccessor={(d) => d.y}
            key={i}
          />
        ))}
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
            strokeWidth={label === "bohf" ? 5 : 2}
            dataKey={plots.label}
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
          showDatumGlyph={label === "bohf"}
          showVerticalCrosshair={label !== "bohf"}
          showSeriesGlyphs={label !== "bohf"}
          glyphStyle={{ fill: linechartColors[0] }}
          renderTooltip={({ tooltipData }) => (
            <div>
              <div>
                {xLabel[lang].split(/[^A-Za-zæøåÆØÅ]/)[0]}
                {": "}
                {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              </div>
              {label === "bohf" ? (
                <div>
                  <div>
                    {tooltipData.nearestDatum.key}
                    {": "}
                    {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                  </div>
                </div>
              ) : (
                Object.keys(tooltipData.datumByKey)
                  .filter(function (value) {
                    return uniqueLabels.includes(value);
                  })
                  .map((d: LinechartData<Data, X, Y, Label>[Label]) => {
                    return (
                      <div key={d}>
                        <div style={{ color: colorScale(d) }}>
                          {d}
                          {": "}
                          {accessors.yAccessor(tooltipData.datumByKey[d].datum)}
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          )}
        />
      </XYChart>
      <ColorLegend colorScale={colorScale} values={uniqueLabels} />
    </div>
  );
};
