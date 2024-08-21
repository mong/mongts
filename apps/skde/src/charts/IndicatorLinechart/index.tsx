import { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import {
  useIndicatorQuery,
  LineStyles,
  font,
  level,
  LinechartBase,
  LinechartData,
} from "qmongjs";

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
  xTicksFont?: font;
  yTicksFont?: font;
  normalise: boolean;
  yMin?: number;
  yMax?: number;
  startYear?: number;
  endYear?: number;
  useToolTip?: boolean;
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

// GroupedLevels only contains datapoint for the years where there is data.
// This function adds years without data in the range [minYear, maxYear] and sets the value to 0.
export const setMissingToZero = (
  groupedLevels: GroupedLevels,
  minYear: number,
  maxYear: number,
) => {
  const dataAllLevels = [[], [], []];

  // i is the index of the year.
  // i = 0 corresponds to minYear.
  let i = 0;

  for (let year = minYear; year <= maxYear; year++) {
    for (let level = 0; level < 3; level++) {
      // Initialise the array for the current level and year
      dataAllLevels[level][i] = { year: year, number: 0 };

      for (let j = 0; j < groupedLevels[level].length; j++) {
        // Iterate over groupedLevels and copy the value to the current level and year
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
    // Sum of the number of indicators or year at index i
    const sumAll = sum0[i] + sum1[i] + sum2[i];

    if (sumAll != 0) {
      data[0][i].y = data[0][i].y / sumAll;
      data[1][i].y = data[1][i].y / sumAll;
      data[2][i].y = data[2][i].y / sumAll;
    } // Otherwise all the y values are zero
  }

  return data;
};

const IndicatorLinechart = (indicatorParams: IndicatorLinechartParams) => {
  // Fetch aggregated data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Remove duplicates due to registries under multiple medfields
  const uniqueLevels = levels.filter(
    (obj1, i, arr) =>
      arr.findIndex(
        (obj2) =>
          obj2.ind_id == obj1.ind_id &&
          obj2.year === obj1.year &&
          obj2.level === obj1.level,
      ) === i,
  );

  // Count indicators per level per year
  const groupedLevels = countLevels(uniqueLevels);

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
      yAxisText={{
        text: indicatorParams.yAxisText,
        font: indicatorParams.font,
      }}
      xTicksFont={indicatorParams.xTicksFont}
      yTicksFont={indicatorParams.yTicksFont}
      yMin={indicatorParams.yMin}
      yMax={indicatorParams.yMax}
      format_y={normalise ? ",.0%" : ",.0f"}
      useTooltip={indicatorParams.useToolTip}
    />
  );
};

export default IndicatorLinechart;
