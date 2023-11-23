import React, { useEffect, useState } from "react";
import LinechartBase from "../../src/charts/LinechartBase";
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import { Indicator } from "types";
import { LinechartData } from "../../src/charts/LinechartBase";

export const Skde = (): JSX.Element => {
  
  const indQryData = useIndicatorQuery({registerShortName: "hjerneslag"});

  let data: Indicator[] = [];

  if (!!indQryData.data) {
    console.log("Hei, ", indQryData.data);
    
    const chartData: LinechartData[] = indQryData.data
      .filter((row) => {return row.ind_id === "hjerneslag_beh_enhet" &&
        row.unit_name === "Tromsø"})
      .map((row) => { return { x: new Date(row.year, 0), y: row.var } as LinechartData });
    
    return (
      <div>
        <LinechartBase data={chartData} height={500} width={1000} ></LinechartBase>
      </div>
    );
  }
  else {
    return <></>;
  }
};

export default Skde;
