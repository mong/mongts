import { Group } from "@visx/group";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { DataItemPoint } from "../../types";
import classNames from "./ChartLegend.module.css";

type LollipopProps = {
  data: DataItemPoint;
  y: string;
  lollipopVar: string;
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleBand<string>;
  label?: string;
};

export const Lollipop = function ({
  data,
  xScale,
  yScale,
  lollipopVar,
  y,
}: LollipopProps) {
  return (
    <Group top={yScale.bandwidth() / 2}>
      <line
        x1={xScale(0)}
        x2={xScale(data[lollipopVar] as number)}
        y1={yScale(data[y].toString())}
        y2={yScale(data[y].toString())}
        stroke={"black"}
        strokeWidth="2"
      />
      <circle
        r={5}
        cx={xScale(data[lollipopVar] as number)}
        cy={yScale(data[y].toString())}
        fill={"#AAA"}
        stroke={"black"}
        strokeWidth="1"
      />
    </Group>
  );
};

export const LollipopLegend = ({ label }: { label: string }) => {
  return (
    <div className={classNames.legendContainer}>
      <ul className={classNames.legendUL}>
        <li className={classNames.legendLI}>
          <div className={classNames.legendAnnualVar}>
            <svg width="20px" height="20px">
              <circle
                r={5}
                cx={10}
                cy={10}
                fill={"#AAA"}
                stroke={"black"}
                strokeWidth="1"
              />
            </svg>
          </div>
          {label}
        </li>
      </ul>
    </div>
  );
};
