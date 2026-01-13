import { useState } from "react";
import { IndicatorData } from "types";
import {
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";
import { getLastCompleteYear } from "../../../helpers/functions";
import { customFormat } from "../../../helpers/functions";
import { MuiLineChart } from "../../Charts/MuiLineChart";
import { MuiBarChart } from "../../Charts/MuiBarChart";
import { formatMuiChartData } from "./formatMuiChartData";

type chartRowV2Props = {
  data: IndicatorData;
  unitNames: string[];
  context: string;
  year: number;
};

export const ChartRowV2 = (props: chartRowV2Props) => {
  const { data, unitNames, context, year } = props;

  if (data.data === undefined) {
    return <div>No data</div>;
  }

  // States
  const [figureType, setFigureType] = useState("line");
  const [barChartType, setBarChartType] = useState("selected");

  // Callback dunctions for dropdown menus
  const handleBarChartTypeChange = (event: SelectChangeEvent) => {
    setBarChartType(event.target.value as string);
  };

  const handleFigureTypeChange = (event: SelectChangeEvent) => {
    setFigureType(event.target.value as string);
  };

  const figureHeight = 500;
  const backgroundMargin = 20;

  const dataFormat = data.format ? data.format : ",.0%";
  const percentage = dataFormat.includes("%");

  const { barData, lineData, uniqueYears } = formatMuiChartData(
    data,
    unitNames,
    context,
    year,
    dataFormat,
  );

  // The delivery_latest_affirm date can be different depending on the year.
  // Find the latest year and use that.
  const affirmYears = data.data.map((row) => {
    return getLastCompleteYear(row.affirmTime, 0, true);
  }) as number[];

  const lastAffirmYear = Math.max(...affirmYears);

  // Formatting functions
  const barValueFormatter = (value: number | null) => {
    return `${value && customFormat(dataFormat)(value)}`;
  };

  const valueAxisFormatter = (value: number) => {
    return percentage ? `${Math.round(value * 100)} %` : `${value}`;
  };

  return (
    <Box>
      <Stack direction={"row"} spacing={2} sx={{ paddingLeft: 4 }}>
        <FormControl sx={{ width: "10rem" }}>
          <InputLabel>Figurtype</InputLabel>
          <Select
            value={figureType}
            label="Figurtype"
            onChange={handleFigureTypeChange}
          >
            <MenuItem value={"line"}>Linje</MenuItem>
            <MenuItem value={"bar"}>Søyle</MenuItem>
          </Select>
        </FormControl>
        {figureType === "bar" && (
          <FormControl sx={{ width: "15rem" }}>
            <InputLabel>Enheter</InputLabel>
            <Select
              value={barChartType}
              label="Enheter"
              onChange={handleBarChartTypeChange}
            >
              <MenuItem value={"selected"}>Valgte enheter</MenuItem>
              <MenuItem value={"rhf"}>Regioner</MenuItem>
              <MenuItem value={"hf"}>Helseforetak</MenuItem>
              <MenuItem value={"hospital"}>Sykehus</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: figureHeight,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {figureType == "line" ? (
          <MuiLineChart
            data={data}
            lineData={lineData}
            uniqueYears={uniqueYears}
            percentage={percentage}
            valueAxisFormatter={valueAxisFormatter}
            figureHeight={figureHeight}
            lastAffirmYear={lastAffirmYear}
          />
        ) : figureType === "bar" ? (
          <Box width={"100%"}>
            <MuiBarChart
              barData={barData}
              data={data}
              figureHeight={figureHeight}
              backgroundMargin={backgroundMargin}
              unitNames={unitNames}
              percentage={percentage}
              barValueFormatter={barValueFormatter}
              valueAxisFormatter={valueAxisFormatter}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
