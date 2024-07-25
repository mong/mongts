import { AnalyseData } from "../../types";
import { PieChart } from "@mui/x-charts/PieChart";
import { names } from "./nameMapping";

type AnalysePieChartProps = {
  analyse: AnalyseData;
  year: number;
  level: "region" | "sykehus";
}

export const AnalysePieChart = ({ analyse, year, level }: AnalysePieChartProps) => {

  console.log(        {
    data: Object.keys(analyse.data[level]).map(area => ({
      id: `${area}`,
      value: analyse.data[level][area][year],
      label: `${area}`
    }))
  });


  return (
    <PieChart
      margin={{ right: 170 }}
      series={[
        {
          data: Object.keys(analyse.data[level]).filter((a) => a !== "8888").map(area => ({
            id: `${area}`,
            value: analyse.data[level][area][year].reduce((a,b)=>a+b),
            label: `${names[level][area]}`
          })),
          paddingAngle: 1,
          cornerRadius: 25,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 170, additionalRadius: -150 },
          highlighted: {  additionalRadius: 10  }
        }
      ]}
    />
  );
};