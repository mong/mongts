import React from "react";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { RegisterData, IndicatorData, OptsTu } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import {
  FetchIndicatorParams,
  useUnitNamesQuery,
} from "qmongjs/src/helpers/hooks";
import { level2, skdeTheme } from "qmongjs";
import { Skeleton } from "@mui/material";
import {
  StyledTableCellStart,
  StyledTableCellMiddle,
  StyledTableCellEnd,
} from "./IndicatorTableStyles";
import { useIndicatorQuery } from "qmongjs";
import { IndicatorSection } from "./IndicatorSection";

type RegistrySectionProps = {
  unitNames: string[];
  levels: string;
  medfield: string;
  openRowID: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  type: string;
  year: number;
  chartColours: string[];
};

export const RegistrySection = (props: RegistrySectionProps) => {
  const {
    unitNames,
    levels,
    medfield,
    openRowID,
    setOpenRowID,
    context,
    type,
    year,
    chartColours,
  } = props;

  const queryParams: FetchIndicatorParams = {
    context: context,
    registerShortName: medfield, // Not the same as the short_name column in the database
    unitNames: unitNames,
    type: type,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nestedDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    ...queryParams,
    nested: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesByLevelQuery = useUnitNamesQuery(medfield, context, type);

  if (nestedDataQuery.isFetching || unitNamesByLevelQuery.isFetching) {
    return <Skeleton variant="rectangular" width={"100%"} height={2000} />;
  }

  const treatmentUnitsByLevel = unitNamesByLevelQuery.data.opts_tu as OptsTu[];

  const rowData = nestedDataQuery.data as RegisterData[];

  rowData.sort((a: RegisterData, b: RegisterData) => {
    return (
      Math.min(...a.medfieldID) - Math.min(...b.medfieldID) ||
      (a.registerShortName === b.registerShortName
        ? 0
        : a.registerShortName < b.registerShortName
          ? -1
          : 1)
    );
  });

  const regData = rowData[0];

  if (!regData || !regData.indicatorData) {
    return null;
  }

  regData.indicatorData.sort((a: IndicatorData, b: IndicatorData) => {
    return a.sortingName === b.sortingName
      ? 0
      : a.sortingName === null
        ? 1
        : b.sortingName === null
          ? -1
          : a.sortingName < b.sortingName
            ? -1
            : 1;
  });

  // Sjekk om hele registerseksjonen skal filtreres bort på grunn av målnivåfilter
  let showSection: boolean;

  if (levels === undefined) {
    showSection = true;
  } else {
    showSection = !regData.indicatorData
      .map((indRow) => {
        return indRow.data
          ? !indRow.data
              .map((dataRow) => {
                return level2(indRow, dataRow) === levels;
              })
              .every((x) => x == false)
          : null;
      })
      .every((x) => x == false);
  }

  if (showSection) {
    return (
      <React.Fragment>
        <TableHead>
          <TableRow key={regData.registerName + "-row"}>
            <StyledTableCellStart
              key={regData.registerName}
              sx={{
                backgroundColor: skdeTheme.palette.secondary.light,
                width: "3rem",
              }}
              colSpan={1}
            >
              <div
                lang="no"
                style={{ wordWrap: "break-word", hyphens: "auto" }}
              >
                {regData.registerFullName}
              </div>
            </StyledTableCellStart>
            <StyledTableCellMiddle
              sx={{
                backgroundColor: skdeTheme.palette.secondary.light,
                width: "3rem",
              }}
            >
              Ønsket målnivå
            </StyledTableCellMiddle>
            {unitNames.map((row, index, arr) => {
              let CellType;

              if (index === arr.length - 1) {
                CellType = StyledTableCellEnd;
              } else {
                CellType = StyledTableCellMiddle;
              }

              return (
                <CellType
                  align="left"
                  key={regData.registerName + index}
                  sx={{ backgroundColor: skdeTheme.palette.secondary.light }}
                  width={"12rem"}
                >
                  <div
                    lang="no"
                    style={{ wordWrap: "break-word", hyphens: "auto" }}
                  >
                    {row}
                  </div>
                </CellType>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          <IndicatorSection
            key={regData.registerName}
            unitNames={unitNames}
            medfield={medfield}
            levels={levels}
            data={regData.indicatorData}
            openRowID={openRowID}
            setOpenRowID={setOpenRowID}
            registryName={regData.registerFullName}
            context={context}
            type={type}
            year={year}
            chartColours={chartColours}
            treatmentUnitsByLevel={treatmentUnitsByLevel}
          />
        </TableBody>
      </React.Fragment>
    );
  } else {
    return null;
  }
};
