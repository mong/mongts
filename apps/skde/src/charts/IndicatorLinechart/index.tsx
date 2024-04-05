import { useIndicatorQuery } from "qmongjs";
import {
  LinechartBase,
  LinechartData,
} from "qmongjs/src/components/Charts/LinechartBase";
import { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import { level } from "qmongjs";
import { LineStyles, font } from "qmongjs/src/components/Charts/LinechartBase";

export type IndicatorLinechartParams = {
  registerShortName?: string;
  unitNames?: string[];
  unitLevel?: "nation" | "rhf" | "hf" | "hospital";
  context: "caregiver" | "resident";
  type: "ind" | "dg";
  width: number;
  height: number;
  lineStyles: LineStyles;
  font: font;
  yAxisText: string;
  normalise: boolean;
  yMin?: number;
  yMax?: number;
  startYear?: number;
  endYear?: number;
};

export type IndicatorLevels = {
  ind_id: string;
  year: number;
  level: 0 | 1 | 2;
};

type DataPoint = {
  year: number;
  number: number;
};

type GroupedLevels = {
  0: DataPoint[];
  1: DataPoint[];
  2: DataPoint[];
};

// Define high achievement as 0, medium as 1 and low as 2
// If the limits are not set the level is undefined
// Let -1 be undefined
const mapLevel = (indicatorLevel: string) => {
  let mappedLevel: number;
  switch (indicatorLevel) {
    case "H":
      mappedLevel = 0;
      break;
    case "M":
      mappedLevel = 1;
      break;
    case "L":
      mappedLevel = 2;
      break;
    default:
      mappedLevel = -1;
  }

  return mappedLevel;
};

export const countLevels = (levels: IndicatorLevels[]) => {
  return _(levels)
    .countBy((row) => {
      return [row.level, row.year];
    })
    .reduce(
      (result, value, key) => {
        const [level, year] = key.split(",");

        if (level !== "-1") {
          result[level].push({ year: parseInt(year), number: value });
        }

        return result;
      },
      {
        0: new Array<DataPoint>(),
        1: new Array<DataPoint>(),
        2: new Array<DataPoint>(),
      } as GroupedLevels,
    );
};

export const setMissingToZero = (
  groupedLevels: GroupedLevels,
  minYear: number,
  maxYear: number,
) => {
  const dataAllLevels = [[], [], []];

  let i = 0;
  for (let year = minYear; year <= maxYear; year++) {
    for (let level = 0; level < 3; level++) {
      dataAllLevels[level][i] = { year: year, number: 0 };

      for (let j = 0; j < groupedLevels[level].length; j++) {
        if (dataAllLevels[level][i].year === groupedLevels[level][j].year) {
          dataAllLevels[level][i].number = groupedLevels[level][j].number;
        }
      }
    }
    i++;
  }

  // Reassemble into array
  const chartData: LinechartData[][] = [0, 1, 2].map((i) => {
    return dataAllLevels[i].map((row) => {
      return { x: new Date(row.year, 0), y: row.number } as LinechartData;
    });
  });

  return chartData;
};

const normaliseChartData = (data: LinechartData[][]) => {
  // Count instances per year
  const sum0 = data[0].map((point: LinechartData) => point.y);
  const sum1 = data[1].map((point: LinechartData) => point.y);
  const sum2 = data[2].map((point: LinechartData) => point.y);

  for (let i = 0; i < data[0].length; i++) {
    const sumAll = sum0[i] + sum1[i] + sum2[i];
    data[0][i].y = data[0][i].y / sumAll;
    data[1][i].y = data[1][i].y / sumAll;
    data[2][i].y = data[2][i].y / sumAll;
  }

  return data;
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

  // Count indicators per level per year
  const groupedLevels = countLevels(levels);

  // Time series bounds
  const minYear =
    indicatorParams.startYear ??
    _.min(
      levels.map((row) => {
        return row.year;
      }),
    );

  const maxYear =
    indicatorParams.endYear ??
    _.max(
      levels.map((row) => {
        return row.year;
      }),
    );

  // Fill missing years with zero
  let chartData = setMissingToZero(groupedLevels, minYear, maxYear);

  const normalise = indicatorParams.normalise ?? false;

  if (normalise) {
    chartData = normaliseChartData(chartData);
  }

  return (
    <LinechartBase
      data={chartData}
      height={indicatorParams.height}
      width={indicatorParams.width}
      lineStyles={indicatorParams.lineStyles}
      font={indicatorParams.font}
      yAxisText={indicatorParams.yAxisText}
      yMin={indicatorParams.yMin}
      yMax={indicatorParams.yMax}
      format_y={normalise ? ",.0%" : ",.0f"}
    />
  );
};

export default IndicatorLinechart;
