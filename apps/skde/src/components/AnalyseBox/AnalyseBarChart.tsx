import { AnalyseData } from "../../types";
import { BarChart } from "@mui/x-charts/BarChart";
import { names } from "./nameMapping";

type AnalyseBarChartProps = {
    analyse: AnalyseData;
    year: number;
    level: "region" | "sykehus";
}

export const AnalyseBarChart = ({ analyse, year, level }: AnalyseBarChartProps) => {

    const dataset = [];
    for (let area of Object.keys(analyse.data[level])) {
      let datapoint = {
        area: area,
        sum: 0
      };
      for (let i = 0; i < analyse.variables.length; i++) {
        datapoint[analyse.variables[i]] = analyse.data[level][area][year][i];
        datapoint.sum += datapoint[analyse.variables[i]];
      }
      dataset.push(datapoint);
    }
    dataset.sort((a, b) => b.sum - a.sum);

  return (
        <BarChart
          margin={{ left: 120 }}
          dataset={dataset}
          yAxis={[{
            scaleType: 'band',
            dataKey: 'area',
            tickPlacement: "middle",
            valueFormatter: (area) => `${names[level][area]}`
          }]}
          series={analyse.variables.map(varname => ({
            dataKey: varname,
            label: `${varname}`,
            stack: "stack_group"
          }))}
          layout="horizontal"
          borderRadius={5}
        />
  );
};