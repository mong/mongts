import { IndicatorData, DataPoint } from "types";
import { customFormat } from ".";
import { LineSeriesType } from "@mui/x-charts";

type Point = { x: number; y: number | null };

// Format to {x, y}
export const reshapeData = (
  data: IndicatorData,
  unitNames: string[],
  context: string,
) => {
  const reshapedData = unitNames.map((unitName: string) => {
    return data
      .data!.filter((row: DataPoint) => {
        return row.unitName === unitName && row.context === context;
      })
      .map((row: DataPoint) => {
        return { x: row.year, y: row.var } as Point;
      });
  });

  return reshapedData;
};

// Get the years from the data
const getUniqueYears = (data: Point[][]) => {
  const years = data
    .map((row: Point[]) => {
      return row.map((point) => point.x);
    })
    .flat();

  const uniqueYears = [...new Set(years)];

  return uniqueYears;
};

// Make datapoints for the missing years with value null
const padData = (data: Point[][], uniqueYears: number[]) => {
  // missing years from each series
  const missingYears = data.map((row: Point[]) => {
    return uniqueYears.filter(
      (year: number) => !row.map((point: Point) => point.x).includes(year),
    );
  });

  const missingData = missingYears.map((row) => {
    return row.map((element) => {
      return { x: element, y: null } as Point;
    });
  });

  // Combine and sort by year
  const paddedData = data
    .map((row, i) => {
      return row.concat(missingData[i]);
    })
    .map((row) => {
      return row.sort((a: Point, b: Point) => {
        if (a.x < b.x) {
          return -1;
        }

        if (a.x > b.x) {
          return 1;
        }

        return 0;
      });
    });

  return paddedData;
};

const formatLineData = (
  data: Point[][],
  unitNames: string[],
  dataFormat: string,
) => {
  // Add unit name label
  const lineData = data.map((row, i) => {
    return {
      data: row.map((point) => point.y),
      label: unitNames[i],
      curve: "linear",
      type: "line",
      connectNulls: true,
      valueFormatter: (value: number) => customFormat(dataFormat)(value),
    } as LineSeriesType;
  });

  return lineData;
};

export const formatBarData = (data: Point[][], year: number) => {
  const barData = data
    .map((row) => {
      return row
        .filter((point) => {
          return point.x === year;
        })
        .map((row) => row.y);
    })
    .flat();

  return barData;
};

export const formatMuiChartData = (
  data: IndicatorData,
  unitNames: string[],
  context: string,
  year: number,
  dataFormat: string,
) => {
  const reshapedData = reshapeData(data, unitNames, context);
  const barData = formatBarData(reshapedData, year);
  const uniqueYears = getUniqueYears(reshapedData);
  const paddedData = padData(reshapedData, uniqueYears);
  const lineData = formatLineData(paddedData, unitNames, dataFormat);

  return {
    lineData: lineData,
    barData: barData,
    uniqueYears: uniqueYears,
  };
};
