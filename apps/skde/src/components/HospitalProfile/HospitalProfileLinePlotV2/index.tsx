import { useState } from "react";
import type { IndicatorLineChartDataPoint } from "types";
import {
  type IndicatorLinechartParamsV2,
  IndicatorLinechartV2,
} from "../../Charts/IndicatorLinechartV2";

type HospitalProfileLinePlotProps = {
  chartData: IndicatorLineChartDataPoint[][];
};

export const HospitalProfileLinePlotV2 = (
  props: HospitalProfileLinePlotProps,
) => {
  // States
  const [normalise] = useState<boolean>(true);

  const indicatorParams: IndicatorLinechartParamsV2 = {
    chartData: props.chartData,
    height: 455,
    yAxisText: "",
    yMin: 0,
    normalise: normalise,
    useToolTip: true,
  };

  return (
    <>
      <h4 className="pb-6">Måloppnåelse siste 10 år</h4>

      <div id="plot-window" className="p-0">
        <IndicatorLinechartV2 {...indicatorParams} />
      </div>
    </>
  );
};
