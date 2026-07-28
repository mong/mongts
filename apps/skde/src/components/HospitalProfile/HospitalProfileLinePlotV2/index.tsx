import { useState } from "react";
import {
  type IndicatorLinechartParamsV2,
  IndicatorLinechartV2,
} from "../../Charts/IndicatorLinechartV2";

type HospitalProfileLinePlotProps = {
  unitFullName: string;
  unitNames: string;
  lastYear: number;
  pastYears: number;
};

export const HospitalProfileLinePlotV2 = (
  props: HospitalProfileLinePlotProps,
) => {
  const { unitNames, lastYear, pastYears } = props;

  // States
  const [normalise] = useState<boolean>(true);

  const indicatorParams: IndicatorLinechartParamsV2 = {
    unitNames: [unitNames],
    context: "caregiver",
    type: "ind",
    height: 455,
    yAxisText: "",
    startYear: lastYear - pastYears,
    endYear: lastYear,
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
