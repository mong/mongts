import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/system";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ArrowLink,
  useIndicatorQuery,
  level,
  newLevelSymbols,
  minDG,
} from "qmongjs";
import { Indicator } from "types";

const colWidth1 = "5%";
const colWidt2 = "20%";

const ExpandCircleUpOutlined = styled(ExpandCircleDownOutlined)({
  transform: "rotate(180deg)",
});

export type MedfieldTableProps = {
  unitNames: string[];
  treatmentYear: number;
  context: string;
  type: string;
};

const createSymbols = (
  green: number,
  yellow: number,
  red: number,
  lineBreak: boolean,
) => {
  const symbols = [];

  for (let i = 0; i < green; i++) {
    symbols.push(newLevelSymbols("H", "green" + i.toString()));
  }

  if (lineBreak && green > 0 && yellow > 0) {
    symbols.push(<br key="break 1" />);
  }

  for (let i = 0; i < yellow; i++) {
    symbols.push(newLevelSymbols("M", "yellow" + i.toString()));
  }

  if (lineBreak && (green > 0 || yellow > 0) && red > 0) {
    symbols.push(<br key="break 2" />);
  }

  for (let i = 0; i < red; i++) {
    symbols.push(newLevelSymbols("L", "red" + i.toString()));
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
    full_name: string;
    short_name: string;
    id: string;
    green: number;
    yellow: number;
    red: number;
  }[];
  unitNames: string[];
};

export const createMedfieldTableData = (data: Indicator[]) => {
  // Set indicator colour from value and colour limits
  const levels = data.map((row) => {
    const indicatorLevel = level(row);
    return {
      ind_id: row.ind_id,
      registry_id: row.registry_id,
      registry_name: row.registry_name,
      registry_full_name: row.registry_full_name,
      registry_short_name: row.registry_short_name,
      medfield_id: row.medfield_id,
      medfield_full_name: row.medfield_full_name,
      level: row.dg === null || row.dg > minDG ? indicatorLevel : undefined,
    };
  });

  // Group by medfield and registry and initialise counts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowData: RowData[] = levels.reduce((result: any[], value) => {
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
      name: value.registry_name,
      full_name: value.registry_full_name,
      short_name: value.registry_short_name,
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

const Row = (props: {
  row: RowData;
  unitNames: string[];
  rowID: string;
  openRowID: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { row, unitNames, rowID, openRowID, setOpenRowID } = props;
  const { name, green, yellow, red, registers } = row;

  let open: boolean;

  if (openRowID === "") {
    open = false;
  } else if (openRowID === rowID) {
    open = true;
  } else {
    open = false;
  }

  const onClick = () => {
    if (!open) {
      open = true;
      setOpenRowID(rowID);
    } else {
      open = false;
      setOpenRowID("");
    }
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <TableCell sx={{ border: 0 }}>
          <IconButton size="small">
            {open ? <ExpandCircleUpOutlined /> : <ExpandCircleDownOutlined />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ border: 0 }}>
          <Typography variant="body1">{name}</Typography>
        </TableCell>
        <TableCell sx={{ border: 0 }}>
          {createSymbols(green, yellow, red, true)}
        </TableCell>
      </TableRow>
      <TableRow key={row.name + "-collapse"}>
        <TableCell
          sx={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          colSpan={3}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell width={colWidth1} sx={{ marginBottom: 0 }} />
                  <TableCell width={colWidt2}>
                    <Typography variant="overline">Register</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="overline">
                      Kvalitetsindikatorer
                    </Typography>
                  </TableCell>
                </TableRow>

                {registers.map((registerRow) => (
                  <TableRow
                    key={registerRow.name}
                    sx={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    <TableCell />
                    <TableCell>
                      <ArrowLink
                        href={
                          "/behandlingskvalitet/" +
                          registerRow.name +
                          "/?selected_treatment_units=" +
                          unitNames.join("_")
                        }
                        text={registerRow.short_name}
                        externalLink={true}
                        button={true}
                        textVariant="overline"
                      ></ArrowLink>
                    </TableCell>
                    <TableCell>
                      {createSymbols(
                        registerRow.green,
                        registerRow.yellow,
                        registerRow.red,
                        false,
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const MedfieldTable = (medfieldTableParams: MedfieldTableProps) => {
  const { unitNames } = medfieldTableParams;

  const [openRowID, setOpenRowID] = useState<string>("");

  // Fetch aggregated data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(medfieldTableParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const rowData: RowData[] = createMedfieldTableData(indicatorQuery.data);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={colWidth1} />
            <TableCell width={colWidt2}>
              <Typography variant="subtitle1">
                <b>Fagområde</b>
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="subtitle1">
                <b>Resultat</b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <Row
              key={row.name}
              row={row}
              unitNames={unitNames}
              rowID={row.name}
              openRowID={openRowID}
              setOpenRowID={setOpenRowID}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
