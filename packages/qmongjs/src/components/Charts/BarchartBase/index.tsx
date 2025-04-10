import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { IndicatorData } from "types";
import { customFormat } from "../../../helpers/functions";

type BarchartProps = {
  indicatorData: IndicatorData;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  xTickFormat: string;
};

const background = "#FFFFFF";

const defaultMargin = { top: 40, right: 40, bottom: 40, left: 150 };

type BarchartData = {
  unitName: string;
  value: number;
};

// accessors
const getY = (d: BarchartData) => d.unitName;
const getX = (d: BarchartData) => d.value;

const createBarchartData = (data: IndicatorData) => {
  if (data.data) {
    return data.data.map((row) => {
      return { unitName: row.unitName, value: row.var } as BarchartData;
    });
  } else {
    return null;
  }
};

export const BarchartBase = ({
  indicatorData,
  width,
  height,
  margin = defaultMargin,
  xTickFormat,
}: BarchartProps) => {
  const data = createBarchartData(indicatorData);

  if (data === null) {
    return null;
  }

  const xMax = width;
  const yMax = height;

  // scales
  const yScale = scaleBand({
    range: [0, yMax],
    domain: data.map(getY),
    padding: 0.2,
  });

  const xScale = scaleLinear<number>({
    range: [0, xMax],
    domain: [0, 1],
  });

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <rect
        x={0}
        y={0}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        fill={background}
        rx={14}
      />
      <Group>
        <Group top={margin.top} left={margin.left}>
          {data.map((d) => {
            const name = getY(d);
            const barHeight = yScale.bandwidth();
            const barWidth = xScale(getX(d));
            const barY = yScale(name);
            return (
              <Bar
                key={d.unitName}
                x={0}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={"#BFCED6"}
                rx={4}
              />
            );
          })}
        </Group>

        <AxisLeft
          scale={yScale}
          left={margin.left}
          top={margin.top}
          stroke={"#000000"}
          tickStroke={"#000000"}
          tickLabelProps={{
            fill: "#000000",
            fontSize: 11,
            textAnchor: "end",
            dy: "0.33em",
          }}
        />

        <AxisBottom
          top={yMax + margin.top}
          left={margin.left}
          scale={xScale}
          tickFormat={customFormat(xTickFormat)}
          stroke={"#000000"}
          tickStroke={"#000000"}
          tickLabelProps={{
            fill: "#000000",
            fontSize: 11,
            textAnchor: "middle",
          }}
        />
      </Group>
    </svg>
  );
};
