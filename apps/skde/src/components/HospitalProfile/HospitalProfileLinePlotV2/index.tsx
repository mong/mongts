import { useState } from "react";
import { formatUnitNameIfNational } from "../../../helpers/functions/formatUnitNameIfNational";
import {
  type IndicatorLinechartParamsV2,
  IndicatorLinechartV2,
} from "../../Charts/IndicatorLinechartV2";
import { ItemBox, lineChartTheme } from "../..//HospitalProfile";

type HospitalProfileLinePlotProps = {
  unitFullName: string;
  unitNames: string;
  lastYear: number;
  pastYears: number;
};

export const HospitalProfileLinePlotV2 = (
  props: HospitalProfileLinePlotProps,
) => {
  const { unitFullName, unitNames, lastYear, pastYears } = props;

  // States
  const [normalise, setNormalise] = useState<boolean>(true);
  const [zoomIn, setZoomIn] = useState<boolean>(false);

  const indicatorParams: IndicatorLinechartParamsV2 = {
    unitNames: [unitNames],
    context: "caregiver",
    type: "ind",
    height: 455,
    yAxisText: normalise ? "Andel" : "Antall indikatorer",
    startYear: lastYear - pastYears,
    endYear: lastYear,
    yMin: 0,
    yMax: normalise && !zoomIn ? 1 : undefined,
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
