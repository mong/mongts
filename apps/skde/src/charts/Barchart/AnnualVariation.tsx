import { Group } from "@visx/group";
import { DefaultOutput } from "@visx/scale";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { max, min } from "d3-array";

type AnnualVariaionProps<Data, AnnualVar> = {
  data: Data;
  y: keyof Data;
  annualVar: AnnualVar;
  xScale: ScaleLinear<number, number, never>;
  colorFillScale: ScaleLinear<DefaultOutput, DefaultOutput, never>;
  sizeScale: ScaleLinear<number, number, never>;
  yScale: ScaleBand<string>;

  labels?: number[];
};

export const AnnualVariation = function <
  D,
  AnnualVar extends (string & keyof D)[]
>({
  data,
  xScale,
  yScale,
  annualVar,
  y,
  colorFillScale,
  sizeScale,
  labels,
}: AnnualVariaionProps<D, AnnualVar>) {
  const annualRates = annualVar.map((v) => Number(data[v]));

  return (
    <>
      <Group top={yScale.bandwidth() / 2}>
        <line
          x1={xScale(min(annualRates))}
          x2={xScale(max(annualRates))}
          y1={yScale(data[y].toString())}
          y2={yScale(data[y].toString())}
          stroke={"black"}
          strokeWidth="2"
        />
        {[...annualVar].reverse().map((d, i) => {
          const lab = parseFloat([...labels].reverse()[i].toString());
          return (
            <circle
              key={`annualVar${data[y]}${i}`}
              r={sizeScale(lab) ?? 7}
              cx={xScale(data[d.toString()])}
              cy={yScale(data[y].toString())}
              fill={i !== 0 ? colorFillScale(lab).toString() : "none"}
              stroke={"black"}
              strokeWidth="1"
            />
          );
        })}
        <line
          x1={xScale(min(annualRates))}
          x2={xScale(max(annualRates))}
          y1={yScale(data[y].toString())}
          y2={yScale(data[y].toString())}
          stroke={"black"}
          strokeWidth="2"
        />
      </Group>
    </>
  );
};
