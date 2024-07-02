import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DataPoint, IndicatorData, RegisterData } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams, useIndicatorQuery } from "../../helpers/hooks";
import { customFormat, newLevelSymbols, level2 } from "qmongjs";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Box, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const IndicatorRow = (props: { row: IndicatorData; currentYear: number }) => {
  const { row, currentYear } = props;

  const [open, setOpen] = React.useState(false);

  const lastYear = row.data!.filter((el: DataPoint) => {
    return el.year === currentYear - 1;
  })[0];

  let lastYearVar: number | null;
  lastYear && lastYear.var
    ? (lastYearVar = lastYear.var)
    : (lastYearVar = null);

  return (
    <React.Fragment>
      <TableRow
        key={row.indicatorID}
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <TableCell>
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label="expand"
            size="small"
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.indicatorTitle}</TableCell>
        <TableCell>
          {lastYearVar
            ? [
                customFormat(row.format!)(lastYearVar),
                "  ",
                newLevelSymbols(
                  level2(row, lastYear),
                  "indicator-row-symbol" + row.indicatorID,
                ),
              ]
            : "NA"}
        </TableCell>
      </TableRow>

      <TableRow
        key={row.indicatorID + "-collapse"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      ></TableRow>
    </React.Fragment>
  );
};

type LowLevelIndicatorListProps = {
  context: string;
  unitNames: string[];
  type: string;
};

export const LowLevelIndicatorList = (props: LowLevelIndicatorListProps) => {
  // UI stuff
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [setting, setSetting] = React.useState("last-year");

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nestedIndicatorQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    ...queryParams,
    nested: true,
  });

  if (nestedIndicatorQuery.isFetching) {
    return null;
  }

  const data = nestedIndicatorQuery.data as RegisterData[];

  const indData = data.map((row) => row.indicatorData).flat();

  let dataSubset: IndicatorData[];

  setting === "last-year"
    ? // Find the indicators that were red last year
      (dataSubset = indData.filter((indDataRow) => {
        if (indDataRow.data === undefined) {
          return false;
        }

        const lastYear = indDataRow.data.find((p) => {
          return p.year === currentYear - 1;
        });

        if (lastYear) {
          return level2(indDataRow, lastYear) === "L";
        } else return false;
      }))
    : // Find the indicators that have been red the last 5 years
      (dataSubset = indData
        .filter((indDataRow) => {
          return indDataRow.data !== undefined;
        })
        .filter((indDataRow) => {
          return indDataRow
            .data!.map((dataPoint) => {
              return (
                level2(indDataRow, dataPoint) === "L" &&
                dataPoint.year >= currentYear - 5
              );
            })
            .every((v) => v == true);
        }));

  return (
    <div>
      <Box>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDown />}
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Indikator</TableCell>
                <TableCell>Resultat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSubset.map((row: IndicatorData) => {
                return <IndicatorRow row={row} currentYear={currentYear} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
