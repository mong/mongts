import React from "react";
import classNames from "./AnalyseBox.module.css";
import {
  Select, FormControl, MenuItem, InputLabel, Typography, Paper, Box,
  Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from '@mui/material/styles';

import { AnalyseData } from "../../types";
import { AnalyseBarChart } from "./AnalyseBarChart";
import { AnalysePieChart } from "./AnalysePieChart";
import { AnalyseLineChart } from "./AnalyseLineChart";

export const AnalyseBox = ({ analyse }: { analyse: AnalyseData }) => {
  const years = Object.keys(analyse.data.region["1"]).map(Number);
  years.sort((a, b) => b - a);

  const theme = useTheme();

  const [year, setYear] = React.useState(Math.max(...years));
  const [level, setLevel] = React.useState<"region" | "sykehus">("sykehus");
  const [view, setView] = React.useState<"barchart" | "tidstrend" | "kake">("barchart");
  const [expanded, setExpanded] = React.useState(false);

  const tags = (
    <Box className={classNames['tag-container']}>
      {analyse.tags.map((tag) => (
        <Typography variant="body1" key={tag} className={classNames['tag']}>{tag}</Typography>
      ))}
    </Box>
  );

  return (
    <Accordion
      disableGutters
      className={classNames['analyse-box']}
      square={true}
      expanded={expanded}
      sx={{ overflow: "clip" }}
    >
      <AccordionSummary
        aria-controls={`${analyse.name}-content`}
        id={`${analyse.name}-header`}
        sx={{
          ":hover": {
            background: `linear-gradient(${theme.palette.surface.light}, ${theme.palette.background.paper})`
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ padding: "10px" }}>
          <Typography>Hello. This is an analysis box!</Typography>
          <Typography>{new Date(analyse.published).toString()}</Typography>
          <Typography>{analyse.description.no}</Typography>
          {!expanded && tags}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
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
          <Grid xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <InputLabel id="select-view-label">Visning</InputLabel>
              <Select
                labelId="select-view-label"
                id="select-view"
                value={view}
                label="Visning"
                onChange={(e) => setView(e.target.value as "barchart" | "tidstrend" | "kake" )}
              >
                <MenuItem value={"barchart"}>Enkleltår</MenuItem>
                <MenuItem value={"tidstrend"}>Tidstrend</MenuItem>
                <MenuItem value={"kake"}>Kake</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
            <FormControl fullWidth disabled={view === "tidstrend"}>
              <InputLabel id="select-year-label">Velg år</InputLabel>
              <Select
                labelId="select-year-label"
                id="select-year"
                value={view === "tidstrend" ? "-" : year.toString()}
                label="Velg år"
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

        <Paper elevation={0} className={classNames['chart-container']}>
          {view === "barchart" ? (
            <AnalyseBarChart
              analyse={analyse}
              year={year}
              level={level}
            />)
            : view === "tidstrend" ?(
              <AnalyseLineChart
                analyse={analyse}
                years={years}
                level={level}
              />)
              : (<AnalysePieChart
                analyse={analyse}
                year={year}
                level={level}
              />)
          }
        </Paper>
        <br /><Typography>Dis bist ze end of de analywse boks</Typography>
        {tags}
      </AccordionDetails>
    </Accordion>
  );
};
