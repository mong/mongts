import { useDescriptionQuery, useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import LinechartBase, { LinechartData } from "../LinechartBase";
import { UseQueryResult } from "@tanstack/react-query";
import { NumberMatcher } from "cypress/types/net-stubbing";
import _ from "lodash";

export declare interface IndicatorLinechartParams {
  registerShortName: string;
  unitNames: string[];
  unitLevel: "nation" | "rhf" | "hf" | "hospital";
  context: "caregiver" | "resident";
  type: "ind" | "dg";
  width?: number;
  height?: number;
}

declare interface IndicatorLevels {
  ind_id: string;
  year: number;
  level: "green" | "yellow" | "red"
}; 

declare interface IndicatorLevelCounts {
  year: number;
  greenCounts: number;
  yellowCounts: number;
  redCounts: number
};

export const IndicatorLinechart = (
  indicatorParams: IndicatorLinechartParams,
) => {

  // Fetch aggregated data
  const indicatorQuery: UseQueryResult<any, unknown> = useIndicatorQuery(indicatorParams);

  if (indicatorQuery.isFetching) {
    return null;
  };

  // Count green, red and yellow indicators per year
  const levels: IndicatorLevels[] = indicatorQuery.data
    .map((row) => {

      if (row.level_direction === 1) {
        var level = row.var > row.level_green ? "green"
          : row.var > row.level_yellow ? "yellow"
          : "red";
      } else {
        var level = row.var < row.level_green ? "green"
          : row.var < row.level_yellow ? "yellow"
          : "red";
      };

      return {ind_id: row.ind_id, year: row.year, level: level};
    });

    const minYear = _.min(levels.map((row) => {
      return row.year
      })
    );

    const maxYear = _.max(levels.map((row) => {
      return row.year
      })
    );

    const groupedLevels = _(levels).countBy((row) => {return [row.level, row.year]})
    
      .reduce((result, value, key) => {

        const [level, year] = key.split(",");

        result[level].push({date:new Date(parseInt(year), 0), number:value});
        
        return result;

        }, {green:[], yellow:[], red:[]}
      );

    console.log(groupedLevels);
 

    


  const chartData: LinechartData[] = indicatorQuery.data
    .filter((row) => {
      return row.ind_id === "hjerneslag_beh_enhet";
    })
    .map((row) => {
      return { x: new Date(row.year, 0), y: row.var } as LinechartData;
    });

  return (
    <LinechartBase
      data={chartData}
      height={indicatorParams.height ?? 500}
      width={indicatorParams.width ?? 1000}
    />
  );
};

export default IndicatorLinechart;
