import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleOrdinal, scaleBand } from "@visx/scale";

type LinechartProps<> = {
  lang: "en" | "nb" | "nn";
  width?: number;
  height?: number;
  backgroundColor?: string;
  margin?: { top: number; bottom: number; right: number; left: number };
  xLabel?: { en: string; nb: string; nn: string };
  yLabel?: { en: string; nb: string; nn: string };
};

export const Linechart = ({
  lang,
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
}: LinechartProps) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const yScale = scaleLinear({
    domain: [0, 100], // y-coordinate data values
    // svg y-coordinates, these increase from top to bottom so we reverse the order
    // so that minY in data space maps to graphHeight in svg y-coordinate space
    range: [0, innerHeight],
    round: true,
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
            top={5}
            left={-10}
            scale={yScale}
            strokeWidth={0}
            stroke="black"
            tickValues={[1, 2, 3, 4, 5, 6]}
            tickStroke="black"
            tickLabelProps={() => ({
              fontSize: 14,
              fill: "black",
              textAnchor: "end",
            })}
            label={yLabel[lang]}
            labelProps={{
              fontSize: 14,
              x: -127,
              y: -15,
              transform: "",
              fontWeight: "bold",
            }}
          />
        </Group>
      </svg>
    </div>
  );
};
