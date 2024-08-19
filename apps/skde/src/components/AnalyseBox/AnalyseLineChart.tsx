import { AnalyseData } from "../../types";
import { LineChart } from "@mui/x-charts/LineChart";
import { names } from "./nameMapping";
import React from "react";

type AnalyseLineChartProps = {
  analyse: AnalyseData;
  years: number[];
  level: "region" | "sykehus";
};
export const useWindowWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

export const AnalyseLineChart = ({
  analyse,
  years,
  level,
}: AnalyseLineChartProps) => {
  const windowWidth = useWindowWidth();

  const dataset = React.useMemo(() => {
    const dataset = [];
    for (const year of [...years].reverse()) {
      const datapoint = {
        year: year,
        sum: 0,
      };
      for (const area of Object.keys(analyse.data[level])) {
        if (datapoint[area] === undefined) datapoint[area] = 0;
        for (let i = 0; i < analyse.variables.length; i++) {
          datapoint[area] += analyse.data[level][area][year][i];
        }
      }
      dataset.push(datapoint);
    }
    return dataset;
  }, [analyse, years, level]);

  const smallFactor = Math.min(windowWidth / 1000, 1);

  return (
    <LineChart
      margin={{
        left: 70,
        top: level === "region" ? 80 : 145 + 60 * (1 - smallFactor),
      }}
      dataset={dataset}
      xAxis={[
        {
          scaleType: "point",
          dataKey: "year",
          valueFormatter: (y) => y.toString(),
          tickPlacement: "middle",
        },
      ]}
      series={Object.keys(analyse.data[level]).map((area) => ({
        dataKey: area,
        id: area,
        curve: "linear",
        showMark: false,
        label: names[level][area],
      }))}
      onLineClick={(a, b) => console.log("Info: ", a, b)}
      tooltip={{ trigger: "axis" }}
      axisHighlight={{
        x: "none",
      }}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "top", horizontal: "middle" },
          padding: {
            top: 20,
            left: 10,
            bottom: 20,
            right: 20,
          },
          itemMarkHeight: 5,
          itemMarkWidth: 5 + Math.round(15 * smallFactor),
          labelStyle: {
            fontSize: 6 + Math.round(12 * smallFactor),
          },
        },
      }}
      sx={{
        "& .MuiLineElement-root:hover": {
          strokeWidth: "5px",
        },
      }}
    />
  );
};
