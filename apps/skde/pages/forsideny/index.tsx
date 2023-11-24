import React, { useEffect, useState } from "react";
import LinechartBase from "../../src/charts/LinechartBase";
import { fetchIndicators, useRegisterNamesQuery } from "qmongjs/src/helpers/hooks";
import { LinechartData } from "../../src/charts/LinechartBase";
import { UseQueryResult } from "@tanstack/react-query";

export const Skde = (): JSX.Element => {

  const [data, setData] = useState<any>([]);

  const indicatorParams = {
    registerShortName:  "hjerneslag",
    unitNames: ["Tromsø"],
    unitLevel: "hospital",
    context: "caregiver",
    type: "ind",
  }

  useEffect(() => {
    const fetchIndicatorData = async () => {
      const responseData = await fetchIndicators(indicatorParams);


      setData(responseData)
    };

    fetchIndicatorData()

  }, []);

  const registryNameQuery: UseQueryResult<any, unknown> =
     useRegisterNamesQuery();

  
  
  //const registryNames = registryNameQuery.data;

  //console.log(registryNames);

 

  //const indQuery = useIndicatorQuery(indicatorProps);

    const chartData: LinechartData[] = data
      .filter((row) => {return row.ind_id === "hjerneslag_beh_enhet"})
      .map((row) => { return { x: new Date(row.year, 0), y: row.var } as LinechartData });

    return (
      <div>
       <LinechartBase data={chartData} height={500} width={1000} ></LinechartBase>
      </div>
    );

    }
export default Skde;
