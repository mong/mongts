import { ToggleButton, ToggleButtonGroup } from "@mong/material-ui";
import { useState } from "react";
import type { IndicatorLineChartDataPoint } from "types";
import {
  type IndicatorLinechartParamsV2,
  IndicatorLinechartV2,
} from "../../Charts/IndicatorLinechart";

type HospitalProfileLinePlotProps = {
  chartData: IndicatorLineChartDataPoint[][];
};

export const HospitalProfileLinePlot = (
  props: HospitalProfileLinePlotProps,
) => {
  // States
  const [normalise, setNormalise] = useState<boolean>(true);

  const indicatorParams: IndicatorLinechartParamsV2 = {
    chartData: structuredClone(props.chartData),
    height: 455,
    yAxisText: "",
    yMin: 0,
    normalise: normalise,
    useToolTip: true,
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="pb-6">Måloppnåelse siste 10 år</h4>

        <div className="mr-13 mb-6">
          <ToggleButtonGroup
            compact={true}
            disabled={false}
            exclusive
            onChange={(_e, newValue: boolean | null) => {
              if (newValue === null) return;
              setNormalise(newValue);
            }}
            orientation="horizontal"
            value={normalise}
          >
            <ToggleButton aria-label="andel" value={true}>
              Andel
            </ToggleButton>
            <ToggleButton aria-label="antall" value={false}>
              Antall
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <div id="plot-window" className="p-0">
        <IndicatorLinechartV2 {...indicatorParams} />
      </div>
    </>
  );
};
