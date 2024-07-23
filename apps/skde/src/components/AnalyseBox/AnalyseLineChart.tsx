import { AnalyseData } from "../../types";
import { LineChart } from "@mui/x-charts/LineChart";
import { names } from "./nameMapping";

type AnalyseLineChartProps = {
  analyse: AnalyseData;
  years: number[];
  level: "region" | "sykehus";
}

export const AnalyseLineChart = ({ analyse, years, level }: AnalyseLineChartProps) => {
  const dataset = [];

  for (let year of [...years].reverse()) {
    let datapoint = {
      year: year,
      sum: 0
    };
    for (let area of Object.keys(analyse.data[level])) {
      if (datapoint[area] === undefined)
        datapoint[area] = 0;
      for (let i = 0; i < analyse.variables.length; i++) {
        datapoint[area] += analyse.data[level][area][year][i];
      }
    }
    dataset.push(datapoint);
  }

  return (
    <LineChart
      margin={{ left: 120 }}
      dataset={dataset}
      xAxis={[{
        scaleType: 'point',
        dataKey: 'year',
        tickPlacement: "middle"
      }]}
      series={Object.keys(analyse.data[level]).map((area) => ({
        dataKey: area,
        label: names[level][area]
      }))}
    />
  );
};