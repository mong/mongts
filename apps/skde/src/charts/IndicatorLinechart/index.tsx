import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import LinechartBase, { LinechartData } from "../LinechartBase";
import { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import { level } from "qmongjs/src/helpers/functions";

export declare interface IndicatorLinechartParams {
  registerShortName?: string;
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
  level: "green" | "yellow" | "red";
}

const mapLevel = (indicatorLevel: string) => {
  let mappedLevel = "";
  switch (indicatorLevel) {
    case "L":
      mappedLevel = "red";
      break;
    case "M":
      mappedLevel = "yellow";
      break;
    case "H":
      mappedLevel = "green";
      break;
    default:
      mappedLevel = "NA";
  }

  return mappedLevel;
};

export const IndicatorLinechart = (
  indicatorParams: IndicatorLinechartParams,
) => {
  // Fetch aggregated data
  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(indicatorParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  // Set indicator colour from value and colour limits
  const levels: IndicatorLevels[] = indicatorQuery.data.map((row) => {
    const indicatorLevel = mapLevel(level(row));
    return { ind_id: row.ind_id, year: row.year, level: indicatorLevel };
  });

  // Count green, red and yellow indicators per year
  const groupedLevels = _(levels)
    .countBy((row) => {
      return [row.level, row.year];
    })

    .reduce(
      (result, value, key) => {
        const [level, year] = key.split(",");

        if (level !== "NA") {
          result[level].push({ year: parseInt(year), number: value });
        }
        
        return result;
      },
      { green: [], yellow: [], red: [] },
    );

  // Time series bounds
  const minYear = _.min(
    levels.map((row) => {
      return row.year;
    }),
  );

  const maxYear = _.max(
    levels.map((row) => {
      return row.year;
    }),
  );

  // Fill missing years with zero
  const dataAllLevels = { green: [], yellow: [], red: [] };

  let j = 0;
  for (let i = minYear; i <= maxYear; i++) {
    dataAllLevels.green[j] = { year: i, number: 0 };

    for (let k = 0; k < groupedLevels.green.length; k++) {
      if (groupedLevels.green[k].year === dataAllLevels.green[j].year) {
        dataAllLevels.green[j].number = groupedLevels.green[k].number;
      }
    }

    dataAllLevels.yellow[j] = { year: i, number: 0 };

    for (let k = 0; k < groupedLevels.yellow.length; k++) {
      if (groupedLevels.yellow[k].year === dataAllLevels.yellow[j].year) {
        dataAllLevels.yellow[j].number = groupedLevels.yellow[k].number;
      }
    }

    dataAllLevels.red[j] = { year: i, number: 0 };

    for (let k = 0; k < groupedLevels.red.length; k++) {
      if (groupedLevels.red[k].year === dataAllLevels.red[j].year) {
        dataAllLevels.red[j].number = groupedLevels.red[k].number;
      }
    }
    j++;
  }

  // Reassemble into array
  const chartDataGreen: LinechartData[] = dataAllLevels.green.map((row) => {
    return { x: new Date(row.year, 0), y: row.number } as LinechartData;
  });

  const chartDataYellow: LinechartData[] = dataAllLevels.yellow.map((row) => {
    return { x: new Date(row.year, 0), y: row.number } as LinechartData;
  });

  const chartDataRed: LinechartData[] = dataAllLevels.red.map((row) => {
    return { x: new Date(row.year, 0), y: row.number } as LinechartData;
  });

  const chartData = [chartDataGreen, chartDataYellow, chartDataRed];

  return (
    <LinechartBase
      data={chartData}
      height={indicatorParams.height ?? 500}
      width={indicatorParams.width ?? 1000}
    />
  );
};

export default IndicatorLinechart;
