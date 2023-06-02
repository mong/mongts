import { Grid, Axis, LineSeries, XYChart, Tooltip } from "@visx/xychart";

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
}: LinechartProps<Data, X, Y, Label>) => {
  const xValues = data.map((d) => d[x]);
  const yValues: number[] = data.map((d) => d[y]);
  const labels = data.map((d) => d[label]);

  let uniqueLabels = Array.from(new Set(labels));

  const values = uniqueLabels.map((l) => {
    return {
      label: l,
      points: data.flatMap((d) => {
        if (d[label] === l) {
          return { x: d[x], y: d[y] };
        } else {
          return [];
        }
      }),
    };
  });

  const accessors = {
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
  };

  return (
    <div style={{ width: "auto", margin: "auto" }}>
      <XYChart
        height={300}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <Axis orientation="bottom" />
        <Axis orientation="left" />
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
              {", "}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          )}
        />
      </XYChart>
    </div>
  );
};
