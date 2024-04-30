import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Indicator } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import {
  FetchIndicatorParams,
  useIndicatorQuery,
} from "qmongjs/src/helpers/hooks";
import { newLevelSymbols, level } from "qmongjs";
import { customFormat } from "qmongjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";

const getVar = (data: Indicator[], year: number) => {
  const rows = data.filter((row: Indicator) => {
    return row.year === year;
  });

  console.log(rows);

  if (rows.length > 0) {
    const row = rows[0];
    return [
      row?.sformat ? customFormat(row.sformat)(row.var) : row.var,
      "   ",
      newLevelSymbols(level(row)),
    ];
  } else {
    return "NA";
  }
};

const CollapsedRow = (props: { data: Indicator[]; indID: string }) => {
  const { data, indID } = props;

  const filteredData = data.filter((row) => {
    return row.ind_id === indID;
  });

  return (
    <TableCell colSpan={6}>
      <Table>
        <TableHead>
          <TableCell>2020</TableCell>
          <TableCell>2021</TableCell>
          <TableCell>2022</TableCell>
        </TableHead>

        <TableBody>
          <TableCell>
            {filteredData ? getVar(filteredData, 2020) : null}
          </TableCell>

          <TableCell>
            {filteredData ? getVar(filteredData, 2021) : null}
          </TableCell>

          <TableCell>
            {filteredData ? getVar(filteredData, 2022) : null}
          </TableCell>
        </TableBody>
      </Table>
    </TableCell>
  );
};

const IndicatorRow = (props: { data: Indicator[]; row: Indicator }) => {
  const { data, row } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        key={row.id}
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <TableCell>
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label="expand"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.ind_title}</TableCell>
        <TableCell>{row.registry_full_name}</TableCell>
        <TableCell>{row.unit_name}</TableCell>
        <TableCell>{Math.round(row.var * row.denominator)}</TableCell>
        <TableCell>{row.denominator}</TableCell>
        <TableCell>
          {[
            customFormat(row.sformat)(row.var),
            "  ",
            newLevelSymbols(level(row)),
          ]}
        </TableCell>
        <TableCell>{row.dg}</TableCell>
      </TableRow>

      <TableRow
        key={row.id + "-collapse"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <CollapsedRow data={data} indID={row.ind_id} />
      </TableRow>
    </React.Fragment>
  );
};

export const Indikatorliste = (): JSX.Element => {
  const context = "caregiver";
  const unitNames = ["Nasjonalt"];
  const type = "ind";
  const year = 2023;

  const queryParams: FetchIndicatorParams = {
    context: context,
    unitNames: unitNames,
    type: type,
  };

  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(queryParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const data = indicatorQuery.data;
  const filteredData = data.filter((row: Indicator) => {
    return row.year === year && level(row) === "L";
  });

  return (
    <div>
      <div>
        <h1>Indikatorliste</h1>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Indikator</TableCell>
                <TableCell>Register</TableCell>
                <TableCell>Enhet</TableCell>
                <TableCell>Teller</TableCell>
                <TableCell>Nevner</TableCell>
                <TableCell>Resultat</TableCell>
                <TableCell>Dekningsgrad</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.map((row: Indicator) => {
                return <IndicatorRow data={data} row={row} key={row.id} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Indikatorliste;
