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
  context: string;
  type: string;
  year: number;
  registers: string[];
  unitNames: string[];
  width: number;
};

type DataPoint = {
  unitName: string;
  var: number;
  numerator: number;
  denominator: number;
};

type IndicatorData = {
  indicatorID: string;
  indicatorName: string | null;
  targetMeasure: number | null;
  shortDescription: string | null;
  longDescription: string | null;
  sortingName: string | null;
  data: DataPoint[];
};

type RegisterData = {
  registerName: string;
  registerID: number;
  medfieldID: number;
  data: IndicatorData[];
};

// Find the index of the array element where the indicator ID is equal to the input string
const searchArray = (arr: Array<IndicatorData>, target: string) => {
  let i = 0;

  while (arr[i].indicatorID !== target) {
    i++;
  }

  return i;
};

const createData = (indicatorData: Indicator[]) => {
  const regData: RegisterData[] = indicatorData.reduce(
    (returnData: RegisterData[], row) => {
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
      }

      // Add indicator to register and initialise if not already there
      if (
        !returnData[i].data
          .map((row) => {
            return row.indicatorID;
          })
          .includes(row.ind_id)
      ) {
        returnData[i].data.push({
          indicatorID: row.ind_id,
          indicatorName: row.ind_title,
          targetMeasure: row.level_green,
          shortDescription: row.ind_short_description,
          longDescription: row.ind_long_description,
          sortingName: row.ind_name,
          data: [] as DataPoint[],
        });
      }

      // Add data to indicator
      const j = searchArray(returnData[i].data, row.ind_id);
      returnData[i].data[j].data.push({
        unitName: row.unit_name,
        var: row.var,
        numerator: Math.round(row.var * row.denominator),
        denominator: row.denominator,
      });

      return returnData;
    },
    [] as RegisterData[],
  );

  return regData;
};

type TableCellCollectionProps = {
  rowNames: string[];
};

const TableCellCollection: React.FC<TableCellCollectionProps> = (props) => {
  return props.rowNames.map((row) => {
    return <TableCell align={"right"}>{row}</TableCell>;
  });
};

const IndicatorSection = (props: {
  unitNames: string[];
  data: IndicatorData[];
}) => {
  const { unitNames, data } = props;

  return data.map((row) => {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow
          sx={{ "& > *": { borderBottom: "unset" } }}
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        >
          <TableCell colSpan={unitNames.length}>{row.indicatorName}</TableCell>

          <TableCell align="right">
            <IconButton aria-label="expand row" size="small">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={unitNames.length + 1}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table>
                  <TableCell>{row.shortDescription}</TableCell>
                  <TableCell align="right">{row.data[0].var}</TableCell>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  });
};

const RegistrySection = (props: {
  unitNames: string[];
  regData: RegisterData;
}) => {
  const { unitNames, regData } = props;
  console.log(regData);
  return (
    <Table>
      <TableRow>
        <TableCell>{regData.registerName}</TableCell>
        <TableCellCollection rowNames={unitNames} />
      </TableRow>
      <IndicatorSection unitNames={unitNames} data={regData.data} />
    </Table>
  );
};

export const IndicatorTableBodyV2: React.FC<IndicatorTableBodyV2Props> = (
  props,
) => {
  const { context, type, year, registers, unitNames, width } = props;

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
  // Returnere tabell isteden?
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableRow>
          <TableCell align={"left"}>{"Kvalitetsindikator"}</TableCell>
          <TableCell align={"right"}>{"Målnivå"}</TableCell>
        </TableRow>
      </Table>
      {rowData.map((row) => (
        <RegistrySection
          key={row.registerName}
          unitNames={unitNames}
          regData={row}
        />
      ))}
    </TableContainer>
  );
};
