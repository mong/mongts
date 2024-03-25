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
import { customFormat, level } from "../../../helpers/functions";

export type IndicatorTableBodyV2Props = {
  context: string;
  type: string;
  year: number;
  registers: string[];
  unitNames: string[];
  level: string;
  medfields: string[];
};

type DataPoint = {
  unitName: string;
  var: number;
  numerator: number;
  denominator: number;
  format: string | null;
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
  indicatorData: IndicatorData[];
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
          indicatorData: [] as IndicatorData[],
        };
      }

      // Add indicator to register and initialise if not already there
      if (
        !returnData[i].indicatorData
          .map((row) => {
            return row.indicatorID;
          })
          .includes(row.ind_id)
      ) {
        returnData[i].indicatorData.push({
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
      const j = searchArray(returnData[i].indicatorData, row.ind_id);

      if (  
        // The same regstry can belong to different medfields
        // If so, the unit will appear more than once
        // We therefore need to check if it is already there
        !returnData[i].indicatorData[j].data
          .map((row) => {
            return row.unitName;
          })
          .includes(row.unit_name)
      ) {
        returnData[i].indicatorData[j].data.push({
          unitName: row.unit_name,
          var: row.var,
          numerator: Math.round(row.var * row.denominator),
          denominator: row.denominator,
          format: row.sformat,
        });
      }

      return returnData;
    },
    [] as RegisterData[],
  );

  return regData;
};

type TableCellCollectionProps = {
  rowNames: string[] | number[];
  keyPrefix: string;
};

const TableCellCollection: React.FC<TableCellCollectionProps> = (props) => {
  return props.rowNames.map((row) => {
    return (
      <TableCell key={props.keyPrefix + row} align={"center"}>
        {row}
      </TableCell>
    );
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
        <TableRow onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
          <TableCell>{row.indicatorName}</TableCell>
          <TableCellCollection
            rowNames={row.data.map((row) => {
              const format = row.format === null ? ",.0%" : row.format;
              return customFormat(format)(row.var);
            })}
            keyPrefix={row.indicatorID}
          />
        </TableRow>
        <TableRow sx={{ visibility: open ? "visible" : "collapse" }}>
          <TableCell colSpan={unitNames.length + 1}>
            {row.shortDescription}
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

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{regData.registerName}</TableCell>
        <TableCellCollection
          rowNames={unitNames}
          keyPrefix={regData.registerName}
        />
      </TableRow>
      <IndicatorSection unitNames={unitNames} data={regData.indicatorData} />
    </React.Fragment>
  );
};

export const IndicatorTableBodyV2: React.FC<IndicatorTableBodyV2Props> = (
  props,
) => {
  const { context, type, year, registers, unitNames, level, medfields } = props;

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

  // Filtrering her?
  const rowData = createData(indicatorQuery.data).filter((row) => true);

  // Returnere tabell isteden?
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align={"left"}>{"Kvalitetsindikator"}</TableCell>
            <TableCell colSpan={unitNames.length} align={"right"}>
              {"Målnivå"}
            </TableCell>
          </TableRow>

          {rowData.map((row) => (
            <RegistrySection
              key={row.registerName}
              unitNames={unitNames}
              regData={row}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
