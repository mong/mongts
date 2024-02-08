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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import { Indicator } from "types";
import { FaCircle, FaAdjust, FaRegCircle } from "react-icons/fa";
import { level } from "qmongjs";
import _ from "lodash";

export type MedfieldTableProps = {
  unitNames: string[];
  treatmentYear: number;
  context: string;
  type: string;
  width: number;
  height: number;
};

export type IndicatorLevels = {
  ind_id: string;
  year: number;
  level: "H" | "M" | "L";
};

const createSymbols = (green: number, yellow: number, red: number) => {
  let symbols = [];

  for (let i = 0; i < green; i++) {
    symbols.push(<FaCircle style={{ color: "#3baa34", fontSize: "1.2rem" }} />);
  }; 

  for (let i = 0; i < yellow; i++) {
    symbols.push(<FaAdjust style={{ color: "#fd9c00", fontSize: "1.2rem" }} />);
  }; 

  for (let i = 0; i < red; i++) {
    symbols.push(<FaRegCircle style={{ color: "#e30713", fontSize: "1.2rem" }} />);
  };

  return (symbols);
}

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
  }[]
};

const Row = (props: { row: RowData}) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
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
              <Table size="small" aria-label="purchases">
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
                      <TableCell>{createSymbols(registerRow.green,registerRow.yellow, registerRow.red)}</TableCell>
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
  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(medfieldTableParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  console.log(indicatorQuery.data)

   // Set indicator colour from value and colour limits
   const levels = indicatorQuery.data.map((row) => {
    const indicatorLevel = level(row);
    return {
      ind_id: row.ind_id, 
      registry_id: row.registry_id, 
      registry_full_name: row.registry_full_name,
      medfield_id: row.medfield_id,
      medfield_full_name: row.medfield_full_name,
      level: indicatorLevel };
  });

  console.log((levels).reduce((result, value) => {
    if (!(value.medfield_full_name in result)) {
      result[value.medfield_full_name] = new Array();
    }
    result[value.medfield_full_name].push({ind_id: value.ind_id, registry_full_name: value.registry_full_name, level: value.level})

    return(result)
  }, 
  {
  })
  )

  // TODO: Få blokken over til å se ut som blokken under
  
  const rows: RowData[] = [
    {
      name: "Hjerte",
      green: 2,
      yellow: 1,
      red: 3,
      registers: [
        { name: "reg1", green: 2, yellow: 5, red: 2 },
        { name: "reg2", green: 2, yellow: 5, red: 2 },
      ],
    },
    {
      name: "Lunge",
      green: 2,
      yellow: 1,
      red: 3,
      registers: [
        { name: "reg3", green: 2, yellow: 5, red: 2 },
        { name: "reg4", green: 2, yellow: 5, red: 2 },
      ],
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Fagområde</TableCell>
            <TableCell>Resultat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
