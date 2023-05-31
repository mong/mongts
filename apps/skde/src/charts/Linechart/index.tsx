import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleOrdinal, scaleBand } from "@visx/scale";

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
  lang: "en" | "nb" | "nn";
  x: X;
  y: Y;
  label: Label;
  width?: number;
  height?: number;
  backgroundColor?: string;
  margin?: { top: number; bottom: number; right: number; left: number };
  xLabel?: { en: string; nb: string; nn: string };
  yLabel?: { en: string; nb: string; nn: string };
};

export const Linechart = <
  Data,
  X extends string & keyof Data,
  Y extends string & keyof Data,
  Label extends string & keyof Data
>({
  data,
  lang,
  x,
  y,
  label,
  width = 600,
  height = 500,
  backgroundColor = "white",
  margin = {
    top: 30,
    bottom: 50,
    right: 20,
    left: 140,
  },
  xLabel,
  yLabel,
}: LinechartProps<Data, X, Y, Label>) => {
  const xValues = data.map((d) => d[x]);
  const yValues: number[] = data.map((d) => d[y]);
  const labels = data.map((d) => d[label]);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const yScale = scaleLinear({
    domain: [0, Math.max(...yValues)], // y-coordinate data values
    // svg y-coordinates, these increase from top to bottom so we reverse the order
    // so that minY in data space maps to graphHeight in svg y-coordinate space
    range: [innerHeight, 0],
    round: true,
  });

  const xScale = scaleLinear<number>({
    domain: [Math.min(...xValues), Math.max(...xValues)],
    range: [0, innerWidth],
  });

  return (
    <div style={{ width: "auto", margin: "auto" }}>
      <svg
        style={{ backgroundColor, display: "block", margin: "auto" }}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Group left={margin.left} top={margin.top}>
          <AxisLeft
            scale={yScale}
            strokeWidth={2}
            stroke="black"
            numTicks={4}
            tickStroke="black"
            tickLabelProps={() => ({
              fontSize: 14,
              fill: "black",
              textAnchor: "end",
            })}
            label={yLabel[lang]}
            labelProps={{
              fontSize: 14,
              textAnchor: "middle",
              transform: "rotate(-90)",
              fontWeight: "bold",
            }}
          />
        </Group>
        <Group left={margin.left} top={margin.top + innerHeight}>
          <AxisBottom
            scale={xScale}
            strokeWidth={2}
            stroke="black"
            numTicks={4}
            tickStroke="black"
            tickLabelProps={() => ({
              fontSize: 14,
              fill: "black",
              textAnchor: "middle",
            })}
            label={xLabel[lang]}
            labelProps={{
              fontSize: 14,
              textAnchor: "middle",
              fontWeight: "bold",
            }}
            tickFormat={(val) => val.toString()}
          />
        </Group>
        <Group left={margin.left} top={margin.top}></Group>
      </svg>
    </div>
  );
};
