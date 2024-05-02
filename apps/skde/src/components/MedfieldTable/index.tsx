import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import { level } from "qmongjs";
import { newLevelSymbols } from "qmongjs";
import { Indicator } from "types";

export type MedfieldTableProps = {
  unitNames: string[];
  treatmentYear: number;
  context: string;
  type: string;
  width: number;
};

export type IndicatorLevels = {
  ind_id: string;
  year: number;
  level: "H" | "M" | "L";
};

const createSymbols = (green: number, yellow: number, red: number) => {
  const symbols = [];

  for (let i = 0; i < green; i++) {
    symbols.push(newLevelSymbols("H"));
  }

  for (let i = 0; i < yellow; i++) {
    symbols.push(newLevelSymbols("M"));
  }

  for (let i = 0; i < red; i++) {
    symbols.push(newLevelSymbols("L"));
  }

  return symbols;
};

type RowData = {
  name: string;
  green: number;
  yellow: number;
  red: number;
  registers: {
    name: string;
    green: number;
    yellow: number;
    red: number;
  }[];
};

export const createMedfieldTableData = (data: Indicator[]) => {
  // Set indicator colour from value and colour limits
  const levels = data.map((row) => {
    const indicatorLevel = level(row);
    return {
      ind_id: row.ind_id,
      registry_id: row.registry_id,
      registry_full_name: row.registry_full_name,
      medfield_id: row.medfield_id,
      medfield_full_name: row.medfield_full_name,
      level: indicatorLevel,
    };
  });

  // Group by medfield and registry and initialise counts
  const rowData: RowData[] = levels.reduce((result, value) => {
    if (!result[value.medfield_id]) {
      result[value.medfield_id] = {
        name: value.medfield_full_name,
        green: 0,
        yellow: 0,
        red: 0,
        registers: [],
      };
    }

    result[value.medfield_id].registers[value.registry_id] = {
      name: value.registry_full_name,
      green: 0,
      yellow: 0,
      red: 0,
    };

    return result;
  }, []);

  // Count levels
  for (let i = 0; i < levels.length; i++) {
    const registry_id = levels[i].registry_id;
    const medfield_id = levels[i].medfield_id;
    const level = levels[i].level;

    if (level == "H") {
      rowData[medfield_id].green += 1;
      rowData[medfield_id].registers[registry_id].green += 1;
    }

    if (level == "M") {
      rowData[medfield_id].yellow += 1;
      rowData[medfield_id].registers[registry_id].yellow += 1;
    }

    if (level == "L") {
      rowData[medfield_id].red += 1;
      rowData[medfield_id].registers[registry_id].red += 1;
    }
  }

  return rowData;
};

const Row = (props: { row: RowData }) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{createSymbols(row.green, row.yellow, row.red)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="registries">
                <TableHead>
                  <TableRow>
                    <TableCell>Register</TableCell>
                    <TableCell>Resultat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.registers.map((registerRow) => (
                    <TableRow key={registerRow.name}>
                      <TableCell component="th" scope="row">
                        {registerRow.name}
                      </TableCell>
                      <TableCell>
                        {createSymbols(
                          registerRow.green,
                          registerRow.yellow,
                          registerRow.red,
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const MedfieldTable = (medfieldTableParams: MedfieldTableProps) => {
  // Fetch aggregated data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(medfieldTableParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const rowData: RowData[] = createMedfieldTableData(indicatorQuery.data);

  return (
    <TableContainer component={Paper}>
      <Table
        aria-label="collapsible table"
        style={{ width: medfieldTableParams.width }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Fagområde</TableCell>
            <TableCell>Resultat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
