import React, { useState } from "react";
import { DataPoint, IndicatorData, RegisterData } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams, useIndicatorQuery } from "../../helpers/hooks";
import { customFormat, newLevelSymbols, level2, skdeTheme } from "qmongjs";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { ArrowLink } from "../ArrowLink";

const result = (data: IndicatorData, point: DataPoint, dg?: boolean) => {
  let pointVar: number | null;

  if (dg) {
    pointVar = point && point.dg ? point.dg : null;
  } else {
    pointVar = point && point.var ? point.var : null;
  }

  return pointVar ? (
    <Stack direction="row">
      {customFormat(data.format!)(pointVar)}
      {!dg
        ? newLevelSymbols(
            level2(data, point),
            "indicator-row-symbol" + data.indicatorID,
          )
        : null}
    </Stack>
  ) : (
    "NA"
  );
};

const getDataSubset = (
  indData: IndicatorData[],
  currentYear: number,
  index: number,
) => {
  const selectedLevel: "H" | "M" | "L" | undefined =
    index === 0 ? "H" : index === 1 ? "M" : index === 2 ? "L" : undefined;

  const dataSubset = indData.filter((indDataRow) => {
    if (indDataRow.data === undefined) {
      return false;
    }

    const lastYear = indDataRow.data.find((p) => {
      return p.year === currentYear;
    });

    if (lastYear) {
      return level2(indDataRow, lastYear) === selectedLevel;
    } else return false;
  });

  return dataSubset;
};

const IndicatorRow = (props: { row: IndicatorData; currentYear: number }) => {
  const { row, currentYear } = props;

  const [open, setOpen] = useState(false);

  const lastYear = row.data!.filter((el: DataPoint) => {
    return el.year === currentYear;
  })[0];

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
        <TableCell>{result(row, lastYear)}</TableCell>
      </TableRow>

      <TableRow
        key={row.indicatorID + "-collapse"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <TableCell />
        <TableCell colSpan={2}>
          <Stack direction="row" justifyContent="space-evenly">
            {lastYear ? (
              <Stack direction="row">
                <Box sx={{ marginRight: 1 }}>Dekningsgrad:</Box>
                {result(row, lastYear, true)}
              </Stack>
            ) : null}

            {lastYear ? (
              <ArrowLink
                href={
                  "https://apps.skde.no/behandlingskvalitet/?selected_treatment_units=" +
                  lastYear.unitName +
                  "&selected_row=" +
                  lastYear.indicatorID
                }
                externalLink={true}
                text="Mer om indikatoren"
              />
            ) : null}
          </Stack>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

type LowLevelIndicatorListProps = {
  context: string;
  unitNames: string[];
  type: string;
  year: number;
};

export const LowLevelIndicatorList = (props: LowLevelIndicatorListProps) => {
  const { context, unitNames, type, year } = props;

  // UI stuff
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ["Høy", "Middels", "Lav"];

  // Get data
  const queryParams: FetchIndicatorParams = {
    context: context,
    unitNames: unitNames,
    type: type,
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

  const dataSubset = getDataSubset(indData, year, selectedIndex);

  return (
    <div>
      <Box>
        <List component="nav" aria-label="Device settings">
          <ListItemButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
            sx={{
              backgroundColor: skdeTheme.palette.primary.light,
              width: 200,
              marginLeft: 2,
              borderRadius: "24px",
              ":hover": {
                backgroundColor: skdeTheme.palette.secondary.light,
              },
            }}
          >
            <ListItemText
              primary="Velg måloppnåelse"
              secondary={options[selectedIndex]}
            />
          </ListItemButton>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <div>
        <TableContainer sx={{ overflowX: "clip" }}>
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
                return (
                  <IndicatorRow
                    row={row}
                    currentYear={year}
                    key={"indicator-row-" + row.indicatorID}
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
