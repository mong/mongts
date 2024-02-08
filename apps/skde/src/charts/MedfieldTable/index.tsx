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

export type MedfieldTableProps = {
  unitNames: string[];
  treatmentYear: number;
  context: string;
  type: string;
  width: number;
  height: number;
};

const rows = [
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

const Row = (props: { row: (typeof rows)[0] }) => {
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
        <TableCell>{row.green}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Registre i fagområde
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Register</TableCell>
                    <TableCell>Grønn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.registers.map((registerRow) => (
                    <TableRow key={registerRow.name}>
                      <TableCell component="th" scope="row">
                        {registerRow.name}
                      </TableCell>
                      <TableCell>{registerRow.green}</TableCell>
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
