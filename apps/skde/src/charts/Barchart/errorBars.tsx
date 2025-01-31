import { Group } from "@visx/group";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { max, min } from "d3-array";
import { DataItemPoint } from "../../types";

type ErrorBarProps = {
  data: DataItemPoint;
  y: string;
  errorBars: string[];
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleBand<string>;
};

export const ErrorBars = function ({
  data,
  xScale,
  yScale,
  errorBars,
  y,
}: ErrorBarProps) {
  const allBars = errorBars.map((v) => Number(data[v]));

  return (
    <>
      <Group top={yScale.bandwidth() / 2}>
        <line
          x1={xScale(min(allBars))}
          x2={xScale(max(allBars))}
          y1={yScale(data[y].toString())}
          y2={yScale(data[y].toString())}
          stroke={"black"}
          strokeWidth="2"
        />
        {[...errorBars].map((d) => {
          return (
            <line
              x1={xScale(Number(data[d]))}
              x2={xScale(Number(data[d]))}
              y1={yScale(data[y].toString()) + 3}
              y2={yScale(data[y].toString()) - 3}
              stroke={"black"}
              strokeWidth="2"
              key={`${d}_errorbar`}
            />
          );
        })}
      </Group>
    </>
  );
};
