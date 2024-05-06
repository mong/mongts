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
import { FetchIndicatorParams, useIndicatorQuery } from "../../helpers/hooks";
import { customFormat, newLevelSymbols, level } from "qmongjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Box, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createData } from "../IndicatorTable/IndicatortablebodyV2";

const getVar = (data: Indicator[], year: number) => {
  const row = data.find((row: Indicator) => {
    return row.year === year;
  });

  if (row) {
    return [
      row?.sformat ? customFormat(row.sformat)(row.var) : row.var,
      "   ",
      newLevelSymbols(level(row)),
    ];
  } else {
    return "NA";
  }
};

const CollapsedRow = (props: {
  data: Indicator[];
  indID: string;
  currentYear: number;
}) => {
  const { data, indID, currentYear } = props;

  const filteredData = data.filter((row) => {
    return row.ind_id === indID;
  });

  return (
    <TableCell colSpan={6}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{currentYear - 5}</TableCell>
            <TableCell>{currentYear - 4}</TableCell>
            <TableCell>{currentYear - 3}</TableCell>
            <TableCell>{currentYear - 2}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              {filteredData ? getVar(filteredData, currentYear - 5) : null}
            </TableCell>
            <TableCell>
              {filteredData ? getVar(filteredData, currentYear - 4) : null}
            </TableCell>

            <TableCell>
              {filteredData ? getVar(filteredData, currentYear - 3) : null}
            </TableCell>

            <TableCell>
              {filteredData ? getVar(filteredData, currentYear - 2) : null}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableCell>
  );
};

const IndicatorRow = (props: {
  data: Indicator[];
  row: Indicator;
  currentYear: number;
}) => {
  const { data, row, currentYear } = props;

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
            customFormat(row.sformat!)(row.var),
            "  ",
            newLevelSymbols(level(row)),
          ]}
        </TableCell>
        <TableCell>{row.dg ? customFormat(",.0%")(row.dg) : "Ingen"}</TableCell>
      </TableRow>

      <TableRow
        key={row.id + "-collapse"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <CollapsedRow
          data={data}
          indID={row.ind_id}
          currentYear={currentYear}
        />
      </TableRow>
    </React.Fragment>
  );
};

export type LowLevelIndicatorListProps = {
  context: string;
  unitNames: string[];
  type: string;
};

export const LowLevelIndicatorList = (props: LowLevelIndicatorListProps) => {
  // UI stuff
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [setting, setSetting] = React.useState("last-year");
  console.log(props);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Years for filtering
  const currentYear = new Date().getFullYear();

  // Get data

  const queryParams: FetchIndicatorParams = {
    context: props.context,
    unitNames: props.unitNames,
    type: props.type,
  };

  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(queryParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const data = indicatorQuery.data;

  // Transform to hierarchical structure
  // This removes duplicate data due to multiple medfields per registry
  const data5years = createData(
    data.filter((row: Indicator) => {
      return row.year >= currentYear - 5;
    }),
  );

  const indDataFlat = data5years.map((row) => row.indicatorData).flat();

  // Find the indicators that were red last year
  const redLastYear = indDataFlat
    .filter((row) => {
      const lastYear = row.data.find((p) => {
        return p.year === currentYear - 1;
      });

      if (lastYear) {
        return level(lastYear) === "L";
      } else return false;
    })
    .map((row) => row.indicatorID);

  // Find the indicators that have bben red the last 5 years
  const redLast5Years = indDataFlat
    .filter((row) => {
      return row.data
        .map((row) => {
          return level(row) === "L";
        })
        .every((v) => v == true);
    })
    .map((row) => row.indicatorID);

  let indicatorSubset: string[];

  setting === "last-year"
    ? (indicatorSubset = redLastYear)
    : (indicatorSubset = redLast5Years);

  const filteredData = data
    .filter((row: Indicator) => {
      return (
        row.year === currentYear - 1 && indicatorSubset.includes(row.ind_id)
      );
    })
    .reduce((acc: Indicator[], val: Indicator) => {
      if (!acc.map((row: Indicator) => row.ind_id).includes(val.ind_id)) {
        acc.push(val);
      }
      return acc;
    }, [] as Indicator[]);

  return (
    <div>
      <div>
        <h1>Indikatorliste</h1>
      </div>
      <Box>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Alternativer
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setSetting("last-year");
              setAnchorEl(null);
            }}
          >
            Lav måloppnåelse siste år
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSetting("last-5-years");
              setAnchorEl(null);
            }}
          >
            Lav måloppnåelse siste 5 år
          </MenuItem>
        </Menu>
      </Box>
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
                return (
                  <IndicatorRow
                    data={data}
                    row={row}
                    currentYear={currentYear}
                    key={row.ind_id}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
