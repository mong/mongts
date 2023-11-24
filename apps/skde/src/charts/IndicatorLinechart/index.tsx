import React, { useEffect, useState } from "react";
import { fetchIndicators, useRegisterNamesQuery } from "qmongjs/src/helpers/hooks";
import LinechartBase, {LinechartData} from "../LinechartBase";
import { UseQueryResult } from "@tanstack/react-query";

export declare interface IndicatorParams {
  registerShortName: string;
  unitNames: string[];
  unitLevel: "nation" | "rhf" | "hf" | "hospital";
  context: "caregiver" | "resident";
  type: "ind" | "dg";
}

const validateParams = (indicatorParams: IndicatorParams) => {
  if (indicatorParams.context === "resident" && 
      indicatorParams.unitLevel === "hospital") {
        console.error("Cannot combine resident and hospital");
        return false;
  }

  return true;
};

export const IndicatorLinechart = (indicatorParams: IndicatorParams) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchIndicatorData = async () => {
      if(validateParams(indicatorParams)) {
        const responseData = await fetchIndicators(indicatorParams);
        setData(responseData);
      }
    };

    fetchIndicatorData();
  }, []);

  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();

    const chartData: LinechartData[] = data
      .filter((row) => {return row.ind_id === "hjerneslag_beh_enhet"})
      .map((row) => { return { x: new Date(row.year, 0), y: row.var } as LinechartData });

    return <LinechartBase data={chartData} height={500} width={1000} />;
};

export default IndicatorLinechart;