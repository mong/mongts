import { Group } from "@visx/group";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { max, min } from "d3-array";

type ErrorBarProps<Data, ErrorBar> = {
  data: Data;
  y: keyof Data;
  errorBar: ErrorBar;
  xScale: ScaleLinear<number, number, never>;
  sizeScale: ScaleLinear<number, number, never>;
  yScale: ScaleBand<string>;
};

export const ErrorBars = function <D, ErrorBar extends (string & keyof D)[]>({
  data,
  xScale,
  yScale,
  errorBar,
  y,
}: ErrorBarProps<D, ErrorBar>) {
  const allBars = errorBar.map((v) => Number(data[v]));

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
        {[...errorBar].map((d) => {
          return (
            <>
              <line
                x1={xScale(Number(data[d]))}
                x2={xScale(Number(data[d]))}
                y1={yScale(data[y].toString()) + 3}
                y2={yScale(data[y].toString()) - 3}
                stroke={"black"}
                strokeWidth="2"
              />
            </>
          );
        })}
      </Group>
    </>
  );
};
