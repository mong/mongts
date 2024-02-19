import React from "react";
import { RegisterName } from "types";
import { NoDataAvailible } from "../ContenForEmptyTable";
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

export type IndicatorTableBodyV2Props = {
  context: string;
  tableType: "allRegistries" | "singleRegister";
  colspan: number;
  registerNames: RegisterName[];
  unitNames: string[];
  treatmentYear: number;
  medicalFieldFilter: string[];
  showLevelFilter: string;
  blockTitle?: string[];
}

type RowData = {
  
}

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

export const IndicatorTableBodyV2: React.FC<IndicatorTableBodyV2Props> = (
  props,
) => {
  const {
    context,
    tableType,
    colspan,
    registerNames,
    unitNames,
    treatmentYear,
    medicalFieldFilter,
    showLevelFilter,
    blockTitle,
  } = props;

  const done: string[] = [];
  const register_block = registerNames.map((register, i) => {
    if (!done.includes(register.rname)) {
      done.push(register.rname);

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
    } else {
      return null;
    }
  });
  const isEmpty = !done.length;

  return (
    <tbody>
      {isEmpty && <NoDataAvailible colspan={colspan} />}
      {register_block}
    </tbody>
  );
};