import React from "react";
import classNames from "./AnalyseBox.module.css";
import { Select, FormControl, MenuItem, InputLabel, Box , Typography, Paper, FormHelperText} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { AnalyseData } from "../../types";
import { AnalyseBarChart } from "./AnalyseBarChart";
import { AnalyseLineChart } from "./AnalyseLineChart";

export const AnalyseBox = ({ analyse }: { analyse: AnalyseData }) => {
  const years = Object.keys(analyse.data.region["1"]).map(Number);
  years.sort((a, b) => b - a);

  const [year, setYear] = React.useState(Math.max(...years));
  const [level, setLevel] = React.useState<"region" | "sykehus">("sykehus");
  const [view, setView] = React.useState<"barchart" | "tidstrend">("barchart");

  return (
    <div className={classNames['analyse-box']}>
      <Typography>Hello. This is an analysis box!</Typography>
      <Typography>{new Date(analyse.published).toString()}</Typography>
      <Typography>{analyse.description.no}</Typography>
      <br></br>


      <Grid container spacing={2}>
        <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
          <FormControl fullWidth>
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
          </FormControl>
        </Grid>
        <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
          <FormControl fullWidth>
            <InputLabel id="select-view-label">Visning</InputLabel>
            <Select
              labelId="select-view-label"
              id="select-view"
              value={view}
              label="Visning"
              onChange={(e) => setView(e.target.value as "barchart" | "tidstrend")}
            >
              <MenuItem value={"barchart"}>Enkleltår</MenuItem>
              <MenuItem value={"tidstrend"}>Tidstrend</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
          <FormControl fullWidth disabled={view === "tidstrend"}>
            <InputLabel id="select-year-label">Year</InputLabel>
            <Select
              labelId="select-year-label"
              id="select-year"
              value={view === "tidstrend" ? "-" : year.toString()}
              label="Year"
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {years.map((y) => (
                <MenuItem key={y.toString()} value={y}>{y}</MenuItem>
              ))}
              {view === "tidstrend" && <MenuItem value={"-"}>Alle år vises</MenuItem>}
            </Select>
          </FormControl>

        </Grid>
      </Grid>


      <Paper elevation={3} className={classNames['chart-container']}>
        { view === "barchart" ? (
        <AnalyseBarChart
          analyse={analyse}
          year={year}
          level={level}
        />)
        : (
          <AnalyseLineChart
            analyse={analyse}
            years={years}
            level={level}
          />)
        }
      </Paper>
      <br/><Typography>Dis bist ze end of de analywse boks</Typography><br/>
      <div className={classNames['tag-container']}>
        {analyse.tags.map((tag) => (
            <Typography variant="body1" className={classNames['tag']}>{tag}</Typography>
        ))}
      </div>
    </div>
  );
};
