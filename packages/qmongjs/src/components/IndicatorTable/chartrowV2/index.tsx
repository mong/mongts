import { DataPoint, IndicatorData } from "types";
import { LineChart } from "@mui/x-charts/LineChart"

type chartRowV2Props = {
  data: IndicatorData;
  unitNames: string[];
  context: string
}

type Point = {x: number, y: number, label: string}

export const ChartRowV2 = (props: chartRowV2Props) => {
  const { data, unitNames, context } = props;

  if (data.data === undefined) {
    return(
      <div>
        No data
      </div>
    )
  }

  const reshapedData = unitNames.map((unitName: string) => {
    return(data.data!.filter((row: DataPoint) => {
      return(
        row.unitName === unitName
      )
    })
    .map((row: DataPoint) => {
      return ({x: row.year, y: row.var, label: unitName} as Point)
    })
  )
  })

  const years = reshapedData.map(
    (row: Point[]) => {
      return(row.map((point) => point.x))
    }).flat()

  const uniqueYears = [...new Set(years)];

  const yData = reshapedData.map((row: Point[]) => {
    return({
      data: row.map((point: Point) => point.y),
      label: row[0].label
  })
  })



  
  return(
    <LineChart
    series={yData}
    xAxis={[{scaleType: "point", data: uniqueYears}]}
   />
  )
}