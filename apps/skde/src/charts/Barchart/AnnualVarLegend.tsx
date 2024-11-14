import { ScaleLinear } from "d3-scale";

import classNames from "./ChartLegend.module.css";
type AnnualVarLegendPops = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorFillScale: ScaleLinear<any, any, never>;
  sizeScale: ScaleLinear<number, number, never>;
  labels?: number[];
  values: (string | number)[];
};

export const AnnualVarLegend = ({
  colorFillScale,
  sizeScale,
  labels,
  values,
}: AnnualVarLegendPops) => {
  return (
    <div className={classNames.legendContainer}>
      <ul className={classNames.legendUL}>
        {values.map((val, i) => (
          <li key={val.toString() + i} className={classNames.legendLI}>
            <div className={classNames.legendAnnualVar}>
              <svg width="20px" height="20px">
                <circle
                  r={sizeScale(labels[i]) ?? 7}
                  cx={10}
                  cy={10}
                  fill={colorFillScale(labels[i])}
                  stroke={"black"}
                  strokeWidth="1"
                />
              </svg>
            </div>
            {labels[i] ?? val}
          </li>
        ))}
      </ul>
    </div>
  );
};
