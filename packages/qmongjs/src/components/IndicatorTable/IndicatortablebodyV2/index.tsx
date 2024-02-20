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
import { Indicator } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import { FetchIndicatorParams } from "../../../helpers/hooks";

export type IndicatorTableBodyV2Props = {
  context: string,
  type: string,
  year: number,
  registers: string[],
  unitNames: string[],
  width: number,
}


type IndicatorData = {
  indicatorID: string,
  indicatorName: string | null,
  targetMeasure: number | null,
  shortDescription: string | null,
  longDescription: string | null,
  sortingName: string | null,
  unitName: string[],
  var: number[],
  numerator: number[],
  denominator: number[],
}

type RegisterData = {
  registerName: string,
  registerID: number,
  medfieldID: number,
  data: IndicatorData[],
}

const searchArray = (arr: Array<IndicatorData>, target: string) => {
  let i = 0;

  while (arr[i].indicatorID !== target) {
    i++;
  };

  return(i);
}

const createData = (indicatorData: Indicator[]) => {
  
  const regData: RegisterData[] = indicatorData.reduce((returnData: RegisterData[], row) => {
    // Initialise array
    const i = row.registry_id;

    // Add medfield to array if not already there
    if (!returnData[i]) {
      returnData[i] = { 
        registerName: row.registry_full_name,
        registerID: row.registry_id,
        medfieldID: row.medfield_id,
        data: [] as IndicatorData[],
      };
    };

    // Add indicator to register and initialise of not already there
    if (!(row.ind_id in returnData[i].data.map((row) => {return(row.indicatorName)}))) {
      returnData[i].data.push({
        indicatorID: row.ind_id,
        indicatorName: row.ind_title,
        targetMeasure: row.level_green,
        shortDescription: row.ind_short_description,
        longDescription: row.ind_long_description,
        sortingName: row.ind_name,
        unitName: [] as string[],
        var: [] as number[],
        numerator: [] as number[],
        denominator: [] as number[]
      });
  };

    // Add data to indicator
    const j = searchArray(returnData[i].data, row.ind_id);
    returnData[i].data[j].unitName.push(row.unit_name);
    returnData[i].data[j].var.push(row.var);
    returnData[i].data[j].numerator.push(Math.round(row.var*row.denominator));
    returnData[i].data[j].var.push(row.denominator);

    return(returnData);
  }, [] as RegisterData[]);


  return(regData);

};



const Row = (props: { row: RegisterData }) => {
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
          {row.registerName}
        </TableCell>
        <TableCell>{}</TableCell>
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
                  {row.data.map((registerRow) => (
                    <TableRow key={registerRow.indicatorName}>
                      <TableCell component="th" scope="row">
                        {registerRow.var}
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

export const IndicatorTableBodyV2: React.FC<IndicatorTableBodyV2Props> = (props) => {

  const {context, type, year, registers, unitNames, width} = props;

  // Filtrering her? 
  const queryParams: FetchIndicatorParams = { 
    context: context,
    treatmentYear: year,
    unitNames: unitNames,
    type: type,
   };

  const indicatorQuery: UseQueryResult<any, unknown> =
  useIndicatorQuery(queryParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const rowData = createData(indicatorQuery.data);

      return (
        <TableContainer component={Paper}>
        <Table
          aria-label="collapsible table"
          style={{ width: width }}
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
              <Row key={row.registerName} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      );
};