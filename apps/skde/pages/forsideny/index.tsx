import React, { useEffect, useState } from "react";
import Link from "next/link";
import LinechartBase from "../../src/charts/LinechartBase";
import generateDateValue, { DateValue } from '@visx/mock-data/lib/generators/genDateValue';
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import { Indicator } from "types";

const allData = generateDateValue(25, /* seed= */ 1 / 72).sort(
  (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime());


export const Skde = (): JSX.Element => {
  
  const indQryData = useIndicatorQuery({registerShortName: "hjerneslag"});

  let data: Indicator[] = [];

  if (!!indQryData) {
    console.log("Hei, ", indQryData.data)

    console.log(
      data.filter((row) => row.ind_id === "hjerneslag_beh_enh")
    )
    
    return (
      <div>
        <LinechartBase data = {allData} height = {500} width = {1000}></LinechartBase>
      </div>
    );
  }
  
};

export default Skde;
