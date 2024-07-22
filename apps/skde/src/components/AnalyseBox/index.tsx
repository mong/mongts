import React from "react";
import classNames from "./AnalyseBox.module.css";
import { BarChart } from '@mui/x-charts/BarChart';
import { Select, MenuItem, InputLabel } from '@mui/material';

import { AnalyseData, Tag } from "../../types";

const labels = {
  sykehus: {
    "1": "Finnmark",
    "2": "UNN",
    "3": "Nordland",
    "4": "Helgeland",
    "6": "Nord-Trøndelag",
    "7": "St. Olav",
    "8": "Møre og Romsdal",
    "10": "Førde",
    "11": "Bergen",
    "12": "Fonna",
    "13": "Stavanger",
    "14": "Østfold",
    "15": "Akershus",
    "16": "OUS",
    "17": "Lovisenberg",
    "18": "Diakonhjemmet",
    "19": "Innlandet",
    "20": "Vestre Viken",
    "21": "Vestfold",
    "22": "Telemark",
    "23": "Sørlandet",
    "8888": "Norge"
  },
  region: {
    "1": "Helse Nord RHF",
    "2": "Helse Midt-Norge RHF",
    "3": "Helse Vest RHF",
    "4": "Helse Sør-Øst RHF",
    "8888": "Norge"
  }
}

export const AnalyseBox = ({ analyse }: { analyse: AnalyseData }) => {
  const years = Object.keys(analyse.data.region["1"]).map(Number);
  years.sort((a, b) => b - a);

  const [year, setYear] = React.useState(Math.max(...years));
  const [level, setLevel] = React.useState<"region" | "sykehus">("sykehus");

  console.log("Years: ", years);

  const dataset = [];
  for (let area of Object.keys(analyse.data[level])) {
    let datapoint = {
      area: labels[level][area],
      sum: 0
    };
    for (let i = 0; i < analyse.variables.length; i++) {
      datapoint[analyse.variables[i]] = analyse.data[level][area][year][i];
      datapoint.sum += datapoint[analyse.variables[i]];
    }
    dataset.push(datapoint);
  }
  dataset.sort((a, b) => b.sum - a.sum);
  console.log("Data for barchart: ", dataset);

  return (
    <div className={classNames['analyse-box']}>
      <p>Hello. This is an analysis box!</p>
      {new Date(analyse.published).toString()}
      <p>{analyse.description.no}</p>
      <InputLabel id="select-year-label">Year</InputLabel>
      <Select
        labelId="select-year-label"
        id="select-year"
        value={year}
        label="Year"
        onChange={(e) => setYear(Number(e.target.value))}
      >
        {years.map((y) => (
          <MenuItem value={y}>{y}</MenuItem>
        ))}
      </Select>
      <InputLabel id="select-level-label">Nivå</InputLabel>
      <Select
        labelId="select-level-label"
        id="select-level"
        value={level}
        label="Nivå"
        onChange={(e) => setLevel(e.target.value as "sykehus" | "region")}
      >
        <MenuItem value={"region"}>Region</MenuItem>
        <MenuItem value={"sykehus"}>Sykehus</MenuItem>
      </Select>


      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'area', tickPlacement: "middle" }]}
        series={analyse.variables.map(varname => ({
          dataKey: varname,
          label: `${varname}`,
          stack: "stack_group"
        }))}
        layout="horizontal"
        height={700}
      />
      <p>Dis bist ze end of de analyse boks</p>
    </div>
  );
};
