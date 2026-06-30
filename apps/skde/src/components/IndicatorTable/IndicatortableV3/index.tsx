import type { IndicatorData } from "types";

type IndicatorTableV3Props = {
  data: IndicatorData;
  medfields: string[];
  unitNames: string[];
  year: number;
  chartColours: string[];
};

export const IndicatorTableV3 = (props: IndicatorTableV3Props) => {
  return <div>{props.medfields}</div>;
};
