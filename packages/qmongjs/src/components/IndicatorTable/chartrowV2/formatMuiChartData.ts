import { IndicatorData, DataPoint } from "types";
import { customFormat } from "../../../helpers/functions";
import { LineSeriesType } from "@mui/x-charts";

type Point = { x: number; y: number | null };

export const formatMuiChartData = (
  data: IndicatorData,
  unitNames: string[],
  context: string,
  year: number,
  dataFormat: string,
) => {
  // Format to {x, y}
  const reshapedData = unitNames.map((unitName: string) => {
    return data
      .data!.filter((row: DataPoint) => {
        return row.unitName === unitName && row.context === context;
      })
      .map((row: DataPoint) => {
        return { x: row.year, y: row.var } as Point;
      });
  });

  // Get the years from the data
  const years = reshapedData
    .map((row: Point[]) => {
      return row.map((point) => point.x);
    })
    .flat();

  // Unique years
  const uniqueYears = [...new Set(years)];

  // missing years from each series
  const missingYears = reshapedData.map((row: Point[]) => {
    return uniqueYears.filter(
      (year: number) => !row.map((point: Point) => point.x).includes(year),
    );
  });

  // Make datapoints for the missing years with value null
  const missingData = missingYears.map((row) => {
    return row.map((element) => {
      return { x: element, y: null } as Point;
    });
  });

  // Combine and sort by year
  const paddedData = reshapedData
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

  // Add unit name label
  const lineData = paddedData.map((row, i) => {
    return {
      data: row.map((point) => point.y),
      label: unitNames[i],
      curve: "linear",
      type: "line",
      connectNulls: true,
      valueFormatter: (value: number) => customFormat(dataFormat)(value),
    } as LineSeriesType;
  });

  const barData = paddedData
    .map((row) => {
      return row
        .filter((point) => {
          return point.x === year;
        })
        .map((row) => row.y);
    })
    .flat();

  return {
    lineData: lineData,
    barData: barData,
    uniqueYears: uniqueYears,
  };
};
