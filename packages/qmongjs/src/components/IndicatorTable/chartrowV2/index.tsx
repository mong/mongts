import { DataPoint, IndicatorData } from "types";
import { LineChart, LineSeries } from "@mui/x-charts/LineChart";

type chartRowV2Props = {
  data: IndicatorData;
  unitNames: string[];
  context: string;
};

type Point = { x: number; y: number | null };

export const ChartRowV2 = (props: chartRowV2Props) => {
  const { data, unitNames, context } = props;

  if (data.data === undefined) {
    return <div>No data</div>;
  }

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
  const labelledData = paddedData.map((row, i) => {
    return {
      data: row.map((point) => point.y),
      label: unitNames[i],
      curve: "linear",
    } as LineSeries;
  });

  return (
    <LineChart
      series={labelledData}
      xAxis={[{ scaleType: "point", data: uniqueYears }]}
      height={500}
    />
  );
};
