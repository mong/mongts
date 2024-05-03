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
import { Box, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  createData,
  RegisterData,
  IndicatorData,
  DataPoint,
} from "qmongjs/src/components/IndicatorTable/IndicatortablebodyV2";

const getVar = (data: Indicator[], year: number) => {
  const rows = data.filter((row: Indicator) => {
    return row.year === year;
  });

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
          <TableRow>
            <TableCell>2020</TableCell>
            <TableCell>2021</TableCell>
            <TableCell>2022</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              {filteredData ? getVar(filteredData, 2020) : null}
            </TableCell>

            <TableCell>
              {filteredData ? getVar(filteredData, 2021) : null}
            </TableCell>

            <TableCell>
              {filteredData ? getVar(filteredData, 2022) : null}
            </TableCell>
          </TableRow>
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [setting, setSetting] = React.useState("last-year");

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentYear = new Date().getFullYear();
  const last5years = Array.from(
    { length: 5 },
    (value, index) => currentYear - 5 + index,
  );

  const context = "caregiver";
  const unitNames = ["Nasjonalt"];
  const type = "ind";

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

  const data = createData(indicatorQuery.data);

  const indDataFlat = data.map((row) => row.indicatorData).flat();

  console.log(indDataFlat);

  let filteredDataLastYear = indicatorQuery.data.filter((row: Indicator) => {
    return row.year === currentYear - 1 && level(row) === "L";
  });

  let filteredData: Indicator[];

  const indIDs = filteredDataLastYear.map((row) => row.ind_id);

  setting === "last-year"
    ? (filteredData = filteredDataLastYear)
    : (filteredData = filteredDataLastYear);

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
        <Button
          variant="text"
          onClick={() => {
            const items = filteredData;
            const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
            const header = Object.keys(items[0]);
            const csv = [
              header.join(","), // header row first
              ...items.map((row) =>
                header
                  .map((fieldName) => JSON.stringify(row[fieldName], replacer))
                  .join(","),
              ),
            ].join("\r\n");

            var a = document.createElement("a");
            var file = new Blob([csv], { type: "text/plain" });
            a.href = URL.createObjectURL(file);
            a.download = "json.txt";
            a.click();
          }}
        >
          Last ned data
        </Button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            ,
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
                    key={row.id + row.medfield_id}
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

export default Indikatorliste;
